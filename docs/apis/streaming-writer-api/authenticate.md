# Authenticate

## Before you begin

  - Sign up on the Quix Portal

## Get a Personal Access Token

You should authenticate requests to the Streaming Writer API using a
Personal Access Token (PAT). This is a time-limited token which you can
revoke if necessary.

Follow these steps to generate a PAT:

1.  Click the user icon in the top-right of the Portal and select the
    Tokens menu.

2.  Click **GENERATE TOKEN**.

3.  Choose a name to describe the token’s purpose, and an expiration
    date, then click **CREATE**.

4.  Copy the token and store it in a secure place.

!!! warning

	You won’t be able to retrieve your token from the Portal once you’ve created it, so make sure to take a copy.

!!! warning

	Treat your tokens like passwords and keep them secret. When working with the API, use tokens as environment variables instead of hardcoding them into your programs.

## Sign all your requests using this token

Make sure you accompany each request to the API with an `Authorization`
header using your PAT as a bearer token, as follows:

``` http
Authorization: bearer <token>
```

Replace `<token>` with your Personal Access Token. For example, if
you’re using curl on the command line, you can set the header using
the `-H` flag:

``` shell
curl -H "Authorization: bearer <token>" ...
```

!!! warning

	If you fail to send a valid Authorization header, the API will respond with a `401 UNAUTHORIZED` status code.
