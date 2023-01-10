# Using an SDK token

SDK token is a type of bearer token that can be used to authenticate
against some of our APIs to access functionality necessary for streaming
actions. Think of SDK tokens like a token you use to access portal but
very limited in scope.

Each workspace comes with two of these tokens, limited in use for that
specific workspace. We call them `Token 1` and `Token 2`, also known as
`Current` and `Next` token.

## How to find

You can access these tokens by going to your topics and clicking on
**broker settings**.

## How to use

These tokens can be used to authenticate against the API, but their
primary intended use is to be used with the [SDK QuixStreamingClient](../../sdk/connect.html#using-quixstreamingclient).
When using it with QuixStreamingClient, you no longer need to provide
all broker credentials manually, they’ll be acquired when needed and set
up automatically.

When deploying or running an online IDE, among other environment
variables `Quix__Sdk__Token`
is injected with value of `Token 1`.

You should always use `Token 1`, unless you’re rotating.

> **Caution**
> 
> Your tokens do not have an expiration date. Treat them as you would a
> password. If you think they’re exposed, rotate them.

## Rotating

Having two keys lets you update your services without interruption, as
both `Token 1` and `Token 2` are always valid. Rotating deactivates
`Token 1`, `Token 2` takes its place and a new `Token 2` will be
generated.

You have two main options regarding how you rotate.

The easiest way to rotate comes with some service downtime. This assumes
you do not directly set the token for your QuixStreamingClient, instead
you let the platform take care of it for you by using the default
`Quix__Sdk__Token`
environment variable. In this scenario all you have to do is rotate
keys, stop and start all your deployments. Until a service is restarted
it’ll try to communicate with the platform using the deactivated token.
If you’re using local environments, those need updating manually.

The alternative option is a bit more labour intense, but you can achieve
no downtime. This requires you to set a new environment variable you
control. This should point to the token to be used. Provide the value of
this environment variable to QuixStreamingClient by passing it as an
argument. Once you have that, set the value of this environment variable
to `Token 2` and start your services. When you’re sure you replaced the
tokens for all services, rotate your keys.

!!! note

	Only users with Admin role can rotate.
