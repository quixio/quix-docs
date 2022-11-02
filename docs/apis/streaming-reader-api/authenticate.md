# Authenticate

## Before you begin

  - Sign up on the Quix Portal

## Get a Personal Access Token

You should authenticate requests to the Streaming Reader API using a
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
