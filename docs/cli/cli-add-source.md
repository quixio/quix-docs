# Add a source

Now create a sample application. In this case you'll first add a data source application. In your project directory enter the following command:

```
quix local app create 
```

You will be prompted to select a library item using the interactive menu. Select `Source` and then `Demo Data`. This will give you a source that generates F1 racing car data from a CSV file. Give the application a suitable name, such as `F1 demo data`.

## Create your local variables

To create your local variables for the source application, run the following command:

```
quix local variables export
```

This generates a `.env` file with several environment variables set for you, including the streaming token used for authenticating with your selected environment, and your input and output topics, for example:

```
Quix__Portal__Api=https://portal-api.platform.quix.io
Quix__Organisation__Id=yourorg
Quix__Workspace__Id=yourorg-tutorial-prod
Quix__Sdk__Token=sdk-349...dd
output=f1-data
```

## Run your code locally

Run your source which will publish data to the `f1-data` topic. In the source application directory:

```
python3 main.py
```

!!! tip

    The required topic(s) are created. If your program generates a timeout error, it means the topic(s) are still being created. Simply wait a few moments and then try running the program again.

You can leave your code running, create a new shell tab, and proceed to the next step.

## Next step

* [Add a transform](./cli-add-transform.md)
