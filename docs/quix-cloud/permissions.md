# Permissions

This page explains how permissions work under the hood. For most users, the [Roles](./roles.md) page provides everything you need to manage access.

## How permissions work

Each role grants a set of permissions. Permissions follow the format `resource:action`:

- `workspace:read` - Can view environments
- `topic:create` - Can create topics
- `deployment:*` - Full access to deployments (the `*` means all actions)

When you assign a role to a user, they receive all the permissions associated with that role.

## Permission levels

Permissions are checked at three levels, from most specific to broadest:

| Level | Description |
|-------|-------------|
| Environment | Permissions for a specific environment |
| Project | Permissions for all environments in a project |
| Organisation | Permissions for everything in the organisation |

If a permission isn't found at the environment level, the system checks the project level, then the organisation level.

## Personal Access Tokens

When using [Personal Access Tokens](../develop/authentication/personal-access-token.md) (PATs), the effective permissions are the **intersection** of:

- The user's permissions (based on their role)
- The token's configured permissions

This means a PAT can only have equal or fewer permissions than the user who created it. This is useful for creating tokens with limited scope, such as read-only tokens for monitoring.

## API reference

For developers building integrations, you can check permissions programmatically using the Portal API.

### Checking permissions

**Endpoint**: `GET /auth/permissions/query`

| Parameter | Type | Description |
|-----------|------|-------------|
| `resourceType` | enum | The type of resource to check |
| `resourceId` | string | The ID of the specific resource |
| `permission` | enum | The permission type to check |

**Returns**: `true` if permission is granted, `false` otherwise.

### Resource types

| Resource Type | resourceId | Description |
|---------------|------------|-------------|
| `Organisation` | organisation ID | Organisation-level settings |
| `Workspace` | workspace ID | Environment access |
| `Topic` | workspace ID | Topic management within an environment |
| `Deployment` | workspace ID | Deployment access within an environment |
| `User` | user ID | User management |
| `Billing` | organisation ID | Billing information |
| `Plugin` | workspace ID | Plugin access within an environment |

### Permission types

| Permission | Description |
|------------|-------------|
| `Create` | Create new resources |
| `Read` | View resources |
| `Update` | Modify resources |
| `Delete` | Remove resources |

## See also

- [Roles](./roles.md) - How to assign and manage user roles
- [Personal Access Tokens](../develop/authentication/personal-access-token.md) - Token-based authentication
- [Security](./security.md) - Overview of Quix Cloud security
- [Portal API](../apis/portal-api/overview.md) - Full API documentation
