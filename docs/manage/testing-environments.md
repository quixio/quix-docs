# Testing multiple environments

Sometimes you want a Quix Streams client to initially use one environment, and then configure it to work with another environment. This is sometimes done to test different environments. This can be achieved by simply changing the streaming token used to authenticate your Quix Streams client.

In Quix Streams a [streaming token](../develop/authentication/streaming-token.md) is used to authenticate Quix Streams with a specific environment. 

!!! tip

    Quix Cloud automatically injects the streaming token inside the Quix Streams configuration using the `Quix__Sdk__Token` environment variable. Note that the streaming token is also known as an SDK token.


## Token is scoped to an environment

Each streaming token is scoped to one environment - this is the environment in which it is obtained. For example, if you obtain the token from your production environment, then it is scoped to work only with that environment.


## Using `.env` and the Quix CLI to select an environment

If you are working locally you may  to point to different environments while you are developing your pipeline. 

You can use the Quix CLI to select the environment you want to connect to, and it will manage your `.env` file configuration for you. 

First you use the `quix use` command to select your environment. Then you run `quix local variables export` inside your application folder which generates the `.env` file to configure the streaming token of the selected environment.

!!! tip

    This command is run automatically by your IDE if you have configured it previously with the command `quix local init`, for example, `quix local init --vscode`.

You might want to connect to a local broker for testing and development. Use the `quix context broker set` command to set up your local broker configuration.

You can then switch from a local broker to the Quix Cloud environment using `quix context broker toggle`.

!!! tip

    Use `quix context current` to check which environment or local broker you are pointing to.

## Passing token to the Application object

Alternatively, you can specify the SDK token directly in your client code. This is done when creating the `Application` object in your Quix Streams client, for example:

``` python
Application(quix_sdk_token="sdk-49..a5")
```

This value overrides the `Quix__Sdk__Token` environment variable, which is set for you automatically when running code in Quix Cloud, or any local environment you may have set through using Quix CLI or environment files or variables.

## Topic names across multiple environments

Topics have a topic name and a topic ID. The topic name is a short textual name which may be the same across multiple environments. The topic ID uniquely identifies the topic across all organizations, projects, and environments. 

As streaming tokens are scoped to a specific environment, it means you can specify a topic name, even if that same topic name is used across multiple environments. This is because the topic ID is automatically used for you, based on the streaming token used. For example, if you had a topic called `f1-data` in production and development environments, you could simply use the topic name of `f1-data` in your code, regardless of the environment you're connecting to. In production, the topic ID might be `orgname-projectname-prod-f1-data`, and in development it might be `orgname-projectname-dev-f1-data`, however, the correct topic ID is automatically used by Quix Streams, as the environment is identified in the token, and therefore the correct prefix to the topic name can be generated.
