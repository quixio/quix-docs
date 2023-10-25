# State management

When deploying a service it is possible for that service to maintain state between restarts. This can be done by enabling state management for the deployment. Enabling state management creates a storage area that can be used for storage of data and files, and this state is preserved between service restarts.

## Enabling state management

When you deploy a service, it is possible to enable state management: 

![state management](../images/how-to/state/state-management.png){width=80%}

This creates a `state` folder in the service. 

!!! important

    Note that data stored in this area is retained between service restarts and is shared between all replicas of the service, but it is not available globally to other services.

## Storing files in the state folder

You can use this `state` folder as a place to download and store model and other files. 

!!! note

    While the `state` folder is not visible in the UI, it is still available for use.

For example, the following code downloads a model file to the `state` folder. It subsequently loads the model file from the `state` folder when needed:

``` python
import requests

model = requests.get('https://acme.com/models/model1.pkl')
f = open('./state/model1.pkl', 'w')
f.write(model)
f.close()
...
f = open('./state/model1.pkl', 'r')
...
```

The model can be modified at run time, and its state is preserved between service restarts.

!!! note

    There is a 100GB storage limit for the state management storage area.

## Using state from Quix Streams

If you have enabled state management for a service, then you can also use the [state management features](https://quix.io/docs/client-library/state-management.html) of Quix Streams in that service. This enables you to store and retrieve data in various formats, and retain that state between service restarts. See the [documentation](https://quix.io/docs/client-library/state-management.html) for further details.

## Running Quix Streams locally

If you are running Quix Streams locally, rather than using it as part of a deployed service in the cloud, then the `state` folder is created automatically for you when you use state management features of the library. For example, if you ran the following code locally:

``` python
from quixstreams import LocalFileStorage

storage = LocalFileStorage()
storage.clear()

storage.set("KEY1", 12.51)
storage.set("KEY2", "str")
storage.set("KEY3", True)
storage.set("KEY4", False)
```

Then you would see the `state` folder and its contents:

```
$ ls state
key1 key2 key3 key4
```
