# Personal Access Token (PAT)

Personal Access Tokens, or PATs, are bearer tokens that can be used to authenticate the various Quix APIs, such as the Portal API, Streaming Reader API, and so on.

## Creating a PAT

To obtain a PAT, log in to Quix, and click on your profile icon in the top right corner, then click `Personal Access Tokens`. You can then generate a PAT with a lifetime suitable for your use case.

Alternatively, log in to Quix, and click `Settings` in the main left-hand navigation. Then, for a specific environment, click `APIs and tokens`.

In the `APIs and tokens` dialog, you can click `Personal Access Tokens` to generate PATs, or a Streaming Token (SDK Token) for use with the Quix Streams client library.

## PAT permissions

A PAT can never do more than the user who created it. A token created in the Quix Cloud UI gets the permissions of the user's [role](../roles.md) assignments at that moment, or of their group's when **Inherit from group** is on.

## See also

- [Roles and Permissions](../roles.md) - Understanding user roles and permissions
- [Streaming Token](./streaming-token.md) - SDK tokens for Quix Streams
