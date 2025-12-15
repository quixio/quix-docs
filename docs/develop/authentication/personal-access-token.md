# Personal Access Token (PAT)

Personal Access Tokens, or PATs, are bearer tokens that can be used to authenticate the various Quix APIs, such as the Portal API, Streaming Reader API, and so on.

## Creating a PAT

To obtain a PAT, log in to Quix, and click on your profile icon in the top right corner, then click `Personal Access Tokens`. You can then generate a PAT with a lifetime suitable for your use case.

Alternatively, log in to Quix, and click `Settings` in the main left-hand navigation. Then, for a specific environment, click `APIs and tokens`.

In the `APIs and tokens` dialog, you can click `Personal Access Tokens` to generate PATs, or a Streaming Token (SDK Token) for use with the Quix Streams client library.

## PAT permissions

A PAT inherits permissions from the user who created it, but can be configured with more restricted access. The effective permissions are the **intersection** of:

- The user's permissions (based on their [role](../../quix-cloud/roles.md))
- The token's configured permissions

This means a PAT can only have equal or fewer permissions than you have. This is useful for:

- Creating read-only tokens for monitoring dashboards
- Limiting tokens to specific environments
- Reducing risk if a token is compromised

For more details on how permissions work, see [Permissions](../../quix-cloud/permissions.md).

## See also

- [Roles](../../quix-cloud/roles.md) - Understanding user roles
- [Permissions](../../quix-cloud/permissions.md) - How permissions work
- [Streaming Token](./streaming-token.md) - SDK tokens for Quix Streams
