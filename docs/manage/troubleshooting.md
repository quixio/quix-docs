# Troubleshooting

This section contains solutions, fixes, hints and tips to help you solve the most common issues encountered when using Quix.

## Error using Quix Streams - Cannot provide both broker address and Quix SDK Token

If you are using previous version of Quix Streams (but still in the version 2.x family), you may have set your consumer group as the first argument for `Application()` as in the following example:

``` python
app = Application(
    "myconsumergroup",
    auto_offset_reset="earliest",
    auto_create_topics=True,  # Quix app has an option to auto create topics
)
```

However, the latest version of Quix Streams expects this to be the broker address. So if you set this first argument while running code in the Quix environment, you will get an error:

```
Traceback (most recent call last):
  File "/app/main.py", line 77, in <module>
    app = Application(
          ^^^^^^^^^^^^
  File "/usr/local/lib/python3.11/site-packages/quixstreams/app.py", line 202, in __init__
    raise ValueError("Cannot provide both broker address and Quix SDK Token")
ValueError: Cannot provide both broker address and Quix SDK Token
sys:1: ResourceWarning: unclosed <ssl.SSLSocket fd=3, family=2, type=1, proto=6, laddr=('10.0.2.227', 59714), raddr=('34.149.137.116', 443)>

[ - Logs stream closed - ]
```

This is because Quix automatically passes a Quix SDK token to Quix Streams in the Quix Cloud environment. As you've passed the first argument without a property name, it interprets that as you trying to pass in the broker address too.

To fix this, set the consumer group using the property name as show in the following example:

``` python
app = Application(
    consumer_group="myconsumergroup",
    auto_offset_reset="earliest",
    auto_create_topics=True,  # Quix app has an option to auto create topics
)
```

## Kafka disconnections

Sometimes you can experience Kafka disconnection messages such as the following:

```
[2024-04-30 14:51:46,791] [INFO] : FAIL [rdkafka#producer-4] [thrd:sasl_ssl://kafka-k5.quix.io:9093/5]: sasl_ssl://kafka-k5.quix.io:9093/5: Disconnected (after 154139ms in state UP, 1 identical error(s) suppressed)
[2024-04-30 14:51:46,791] [INFO] : FAIL [rdkafka#producer-4] [thrd:sasl_ssl://kafka-k5.quix.io:9093/5]: sasl_ssl://kafka-k5.quix.io:9093/5: Disconnected (after 154139ms in state UP, 1 identical error(s) suppressed)
[2024-04-30 14:51:46,791] [ERROR] : Kafka producer error: sasl_ssl://kafka-k5.quix.io:9093/5: Disconnected (after 154139ms in state UP, 1 identical error(s) suppressed) code="-195"
[2024-04-30 14:51:46,791] [ERROR] : Kafka producer error: sasl_ssl://kafka-k5.quix.io:9093/5: Disconnected (after 154139ms in state UP, 1 identical error(s) suppressed) code="-195"
```

This happens because idle connections are reaped on occasion, and nodes are sometimes restarted to apply security fixes and so on. Kafka being high availability by design, your topics are replicated, in the case of Quix-managed broker, twice. Your service will automatically fail over to the other node, while the connection to the other node recovers.

In the underlying Kafka library, disconnects are often reported, even if there is no message to be delivered, which can be problematic for producers. The connection is re-established in the background, but the default log level does not record this, so it may appear inactive according to the logs, while in fact it is still functioning.

Quix aims to restart nodes as infrequently as possible, but it may happen every now and then. When it does happen, they are restarted in a rolling manner to always have at least one replica for your streaming needs available.

## Kafka message too large errors

Sometimes you may receive Kafka message too large errors, if your messages are larger than 1MB. You would receive the following error message:

```
KafkaError{code=MSG_SIZE_TOO_LARGE,val=10,str="Unable to produce message: Broker: Message size too large"}
```

To work around this, see our [documentation on handling compressed messages](../develop/integrate-data/compressed-data.md).

## Data is not being received into a Topic

If data is not being received in a topic:

* Ensure the Topic Name or Id is correct in Topics option of the Quix UI.

* You can check the data in / out rates on the Topics tab.

* If you want to see the data in the Quix data store please make sure you are persisting the data to the Topic otherwise it may appear that there is no data.

* If you are using a consumer group, check that no other services are using the same group. If you run your code locally and deployed somewhere and they are both using the same consumer group one of them may consume all of the data.

## Topic Authentication Error

If you see errors like these in your service or job logs then you may have used the wrong credentials or it could be that you have specified the wrong Topic Id.

Authentication failed during authentication due to invalid credentials with SASL mechanism SCRAM-SHA-256 Exception receiving package from Kafka 3/3 brokers are down Broker: Topic authorization failed

Check very carefully each of the details.

The following must be correct:

  - TopicId or TopicName

  - Sdk Token

These can all be found in Topics option of the Quix UI.

## Broker Transport Failure

If you have deployed a service or job and the logs mention *broker transport failure* then check the environment name and password in the SecurityOptions.

Also check the broker address list. You should have these by default:

```
kafka-k1.quix.io:9093,kafka-k2.quix.io:9093,kafka-k3.quix.io:9093
```

## 401 Error

When attempting to access the web APIs you may encounter a 401 error. Check that the bearer token is correct and has not expired. If necessary generate a new bearer token.

Example of the error received when trying to connect to the Streaming Reader API with an expired bearer token

signalrcore.hub.errors.UnAuthorizedHubError

Quix provided APIs require a valid bearer token, such as the Portal API:

- https://portal-api.cloud.quix.io/swagger/index.html
    
## Service keeps failing and restarting

If your service continually fails and restarts you will not be able to view the logs. Redeploy your service as a job instead. This will allow you to inspect the logs and get a better idea about what is happening.

## Possible DNS Propagation Errors

There are currently two scenarios in which you might encounter an issue caused by DNS propagation:

1. Quix data store has been deployed but DNS entries have not fully propagated. In this scenario you might see a banner when accessing the Quix data store.

    ![Quix data storage warning](../images/quix-data-store.png)

2. A dashboard or other publicly visible deployment is not yet accessible, again due to DNS propagation.

    ![Site can't be reached](../images/site-cant-be-reached.png)

!!! tip

	In these scenarios simply wait while the DNS records propagate. It can take up to 10 minutes for DNS to records to propagate fully.

## Python Version

If you get strange errors when trying to compile your Python code locally please check that you are using Python >=3.6 and <4

For example you may encounter a *ModuleNotFoundError*:

``` python
ModuleNotFoundError: No module named 'quixstreams'
```

For information on using the Quix Client Library please check out this [section](https://quix.io/docs/quix-streams/introduction.html) in the client library documentation.

## Jupyter Notebooks

If you are having trouble with Jupyter Notebooks or another consumer of Quix data try using aggregation to reduce the number of records returned.

For more info on aggregation check out this [short video](https://youtu.be/fnEPnIunyxA).

## Process Killed or Out of memory

If your deployment’s logs report "Killed" or "Out of memory" then you may need to increase the amount of memory assigned to the deployment.

You may experience this:

  - At build time if you want to load large third party packages into
    your code

  - At runtime if you are storing large datasets in memory.

## Missing Dependency in online IDE

Currently the online IDE does not use the same docker image as the one used for deployment due to time it would take to build it and make it available to you. (Likely feature for future however) Because of this you might have some OS level dependencies that you need to install from within your python code to be able to make use of the **Run** feature in the IDE. The section below should give you guidance how to achieve this.

In your `main.py` (or similar) file, add as the first line: `import preinstall`. Now create the file `preinstall.py` and add content based on example below:

  - TA-Lib  
    This script will check if TA-Lib is already installed (like from
    docker deployment). If not then installs it.
    
    ```python
    import os
    import sys
    
    ta_lib_pip_details = os.system("python3 -m pip show TA-Lib")
    if ta_lib_pip_details == 0:
        print("TA-Lib already installed")
    else:
        if os.system("apt-get update") != 0:
            print("Failed apt-get update")
            sys.exit(1)
        if os.popen("if [ -e ta-lib-0.4.0-src.tar.gz ]; then echo \"ok\"; else echo \"nok\"; fi").read().strip() == "ok":
            print("TA-Lib already downloaded")
        else:
            print("Downloading ta-lib")
            if os.system("apt-get install curl -y") != 0:
                print("Failed apt-get install curl -y")
                sys.exit(1)
            if os.system("curl https://jztkft.dl.sourceforge.net/project/ta-lib/ta-lib/0.4.0/ta-lib-0.4.0-src.tar.gz -O") != 0:
                print("Failed to download ta-lib")
                sys.exit(1)
    
        zipmdsum = os.popen("md5sum ta-lib-0.4.0-src.tar.gz | cut -d ' ' -f 1").read().strip()
        if zipmdsum == "308e53b9644213fc29262f36b9d3d9b9":
            print("TA-Lib validated")
        else:
            print("TA-Lib has incorrect hash value, can't trust it. Found hash: '" + str(zipmdsum) + "'")
            sys.exit(1)
    
        if os.system("tar -xzf ta-lib-0.4.0-src.tar.gz") != 0:
            print("Failed to extract TA-Lib zip")
            sys.exit(1)
    
        if os.system("apt-get install build-essential -y") != 0:
            print("Failed apt-get install build-essential -y")
            sys.exit(1)
    
        os.chdir(os.path.abspath(".") + "/ta-lib")
    
        if os.system("./configure --prefix=/usr") != 0:
            print("Failed to configure TA-Lib for build")
            sys.exit(1)
    
        if os.system("make") != 0:
            print("Failed to make TA-Lib")
            sys.exit(1)
    
        if os.system("make install") != 0:
            print("Failed to make install TA-Lib")
            sys.exit(1)
    
        print("Installed dependencies for TA-Lib pip package")
    
        if os.system("python3 -m pip install TA-Lib") != 0:
            print("Failed to pip install TA-Lib")
            sys.exit(1)
    
        print("Installed TA-Lib pip package")
    ```

With this, the first time you press **Run**, the dependency should install. Any subsequent run should already work without having to install.
