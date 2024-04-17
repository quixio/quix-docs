# Testing multiple environments

Sometimes you want a Quix Streams client to initially use one environemtn, and then configure it to work with another environment. This is sometimes done to test different environments. This can be achieved by simply changing the streaming token, also known as the SDK token, used to authenticate your Quix Streams client.

In Quix Streams a [streaming token](../develop/authentication/streaming-token.md) is used to authenticate Quix Streams with a specific environment. Each streaming token is scoped to one environment - this is the environment in which it is obtained. For example, if you obtain the token from your production envuironment, then it is scoped to work only with that environment.

If your client needs to connect to different environments, then you can store your tokens in a `.env` file and select the token based on which environment you want to connect to. 

For example, a `.env` file would contain:

```
# Streaming token for production environment
#Quix__Sdk__Token="sdk-12..ef"
# Streaming token for testing environment
Quix__Sdk__Token="sdk-49..a5"
```

In the previous example the client is configured to connect to the testing environment.

Alternatively, you can specify the SDK token directly in your client code. This is done when creating the `Application` object in your Quix Streams client, for example:

``` python
Application(quix_sdk_token="sdk-49..a5")
```

This value overrides the `Quix__Sdk__Token` environment variable.

!!! tip

    The streaming token is also known as an SDK token.
