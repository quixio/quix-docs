# Personal Access Token (PAT)

Personal Access Tokens, or PATs, are bearer tokens that can be used to authenticate the various Quix APIs, such as the Portal API, Streaming Reader API, and so on.

## Creating a PAT

To obtain a PAT, log in to Quix, and click on your profile icon in the top right corner, then click `Personal Access Tokens`. You can then generate a PAT with a lifetime suitable for your use case.

Alternatively, log in to Quix, and click `Settings` in the main left-hand navigation. Then, for a specific environment, click `APIs and tokens`.

In the `APIs and tokens` dialog, you can click `Personal Access Tokens` to generate PATs, or a Streaming Token (SDK Token) for use with the Quix Streams client library.

## PAT permissions

A PAT can never do more than the user who created it. Each permission check on an environment, project or the organisation must pass for both:

- the user's current permissions (based on their [role](../roles.md), or their group's roles when **Inherit from group** is on)
- the permissions configured on the token

A token created in the Quix Cloud UI gets the role assignments the user has when they create it.

## See also

- [Roles and Permissions](../roles.md) - Understanding user roles and permissions
- [Streaming Token](./streaming-token.md) - SDK tokens for Quix Streams
