# Using a streaming token

A streaming token is a type of bearer token that can be used to authenticate your client to access functionality necessary for streaming actions. Think of streaming tokens as a token you use to access the Quix Portal but
with limited scope.

Each workspace comes with one of these tokens, limited in use for that specific workspace.

## How to find

You can access these tokens by logging into the Quix Portal and clicking on `Settings` in the main left-hand navigation. Then click on `APIs and tokens` and then click on `Streaming Tokens`.

If you are looking for a bearer token to access the Quix APIs, such as the Portal API, you can select `Personal Access Tokens`. These are custom JWTs.

## How to use

The streaming token is primarily used to authenticate the [Quix Streams client library](../../client-library-intro.md).

When using it with `QuixStreamingClient`, you no longer need to provide all broker credentials manually, they’ll be acquired when needed and set up automatically.

!!! warning

	Streaming  tokens do not have an expiration date. Treat them as you would a password. If you think they’re exposed, rotate them.

## Rotating

If you suspect your streaming token may have been exposed, best practice is to rotate it. Within the `Streaming token` dialog, click `rotate them` to display the `Rotating streaming tokens` dialog. Two tokens are then displayed.

Having two keys lets you update your services without interruption, as both `Token 1` and `Token 2` are always valid. Rotating deactivates `Token 1`, `Token 2` takes its place and a new `Token 2` is generated.

You have two main options regarding how you rotate:

1. The easiest way to rotate comes with some service downtime. This assumes you do not directly set the token for your `QuixStreamingClient`, instead you let the platform take care of it for you by using the default environment variable. In this scenario all you have to do is rotate keys, stop and start all your deployments. Until a service is restarted it’ll try to communicate with the platform using the deactivated token. If you’re using local environments, those need to be updated manually.

2. The alternative option is more complicated, but you can achieve no downtime. This requires you to set a new environment variable you control. This should point to the token to be used. Provide the value of this environment variable to `QuixStreamingClient` by passing it as an argument. Once you have that, set the value of this environment variable to `Token 2` and start your services. When you’re sure you replaced the tokens for all services, rotate your keys.

!!! note

	Only users with Admin role can rotate.
