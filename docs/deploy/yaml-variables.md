# Configure deployments using YAML variables

YAML variables enable you to create variables that can have different values across different environments. For example, if you want to allocate more memory for a deployment in your production environment, you could have a variable `MEMORY` that has a value of 500 in the development environment and 1000 in production.

## Watch a video

You can watch a video on YAML variables here:

<div style="position: relative; padding-bottom: 51.728110599078335%; height: 0;"><iframe src="https://www.loom.com/embed/c66029f67b8747bbb28c0605f5ea3fad?sid=ce696556-b98d-4231-8282-a4bbfdf9795c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## Example

In the pipeline view, click on the service you want to configure, and then click the YAML button in the top right of the view. You see the `quix.yaml` code, such as the following:

``` yaml
# Quix Project Descriptor
# This file describes the data pipeline and configuration of resources of a Quix Project.

metadata:
  version: 1.0

# This section describes the Deployments of the data pipeline
deployments:
  - name: CPU Threshold
    application: Starter transformation
    deploymentType: Service
    version: transform-v2
    resources:
      cpu: 200
      memory: 500
      replicas: 1
    desiredStatus: Stopped
    variables:
      - name: input
        inputType: InputTopic
        description: Name of the input topic to listen to.
        required: false
        value: cpu-load
      - name: output
        inputType: OutputTopic
        description: Name of the output topic to write to.
        required: false
        value: transform
  - name: CPU Alert SMS
  ...
```

In this case you want to configure the memory for the service.

Click the `Variables` tab and then click `+ New variable`. Click `+ New variable` on the dialog and create a variable called `MEMORY`. Set the values for memory for each of the environments, such as develop and production. For example, you might set `MEMORY` to 1000 for production, and 500 for develop.

Now create any other variables you would like to have, such as `CPU`. This might be set to 1000 for production and 200 for develop.

Now edit the `quix.yaml`:

``` yaml
    resources:
      cpu: 200
      memory: 500
      replicas: 1
```

Change this to:

``` yaml
    resources:
      cpu: {{CPU}}
      memory: {{MEMORY}}
      replicas: 1
```

This specifies that the variable values should be used, rather than the hard-coded values.

!!! note

    Curly braces are required to denote YAML variables.

Now sync up your environment. If you've made your changes to your develop environment, you will now need to merge those into your production environment, and then sync production.
