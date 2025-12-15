# Roles

Quix Cloud uses roles to control what users can do. You can assign different roles at different levels - organisation, project, or environment - giving you fine-grained control over access.

For technical details about how permissions work, see the [Permissions](./permissions.md) page.

## Available roles

| Role | Description |
|------|-------------|
| Admin | All permissions within the scope including billing and user management |
| Manager | Create, delete, edit, view resources and manage users within the scope |
| Editor | Create, delete, edit, view resources within the scope |
| Viewer | View resources within the scope |
| Operator | Manage plugins only |
| None | No permissions within the scope |

## Permission levels

You can assign roles at three levels:

| Level | Scope |
|-------|-------|
| Organisation | Role applies to everything in the organisation |
| Project | Role applies to all environments in that project |
| Environment | Role applies only to that specific environment |

## Inheritance

When you set a role at a higher level, it automatically applies to everything below it. You can override this by setting a different role at a lower level.

**Example:**
- Set a user as **Viewer** at the organisation level
- Override with **Editor** for a specific project
- Override with **Admin** for a specific environment

The user will have:
- Admin access in that one environment
- Editor access in other environments within that project
- Viewer access everywhere else

You can also select **Inherited** to keep the role from the parent level.

## When to use each role

| Role | Use when... |
|------|-------------|
| Admin | The user needs full control including billing and user management |
| Manager | The user needs to create and manage resources but not billing |
| Editor | The user needs to manage resources but not users |
| Viewer | The user only needs to see what's happening (stakeholders, auditors) |
| Operator | The user only needs to manage plugins |
| None | You want to explicitly block access to a specific project or environment |

## Best practices

- **Start with Viewer**: Give new users read-only access, then increase as needed
- **Use inheritance**: Set a base role at organisation level, override only where needed
- **Limit Admin access**: Only give Admin to users who need billing and user management
- **Use None to restrict**: If someone should see most projects but not a sensitive one, set None on that project

## See also

- [Permissions](./permissions.md) - Technical details on the permission system
- [Security](./security.md) - Overview of Quix Cloud security
- [Personal Access Tokens](../develop/authentication/personal-access-token.md) - Token-based authentication
