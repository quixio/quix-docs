# Roles and permissions

Quix Cloud uses roles to control what users can do. You can assign different roles at different levels - organisation, project, or environment - giving you fine-grained control over access.

A role can be assigned to a user directly, or to a [user group](#user-groups) so that every member of the group gets the same access.

You can manage roles using the Quix Cloud UI or programmatically via the [Quix CLI](#managing-roles-with-the-cli).

## Available roles

Quix Cloud provides six roles, each granting different levels of access:

![Role selection dropdown](../images/quix-cloud/roles-dropdown.png){width=50%}

| Role | Description | Use when... |
|------|-------------|-------------|
| Admin | Full control including global variables, user and group management, and deployment sizes | All permissions within the scope including global variables and user management |
| Manager | Manage resources, users, and global variables | Create, delete, edit, view resources within the scope |
| Editor | Create and manage resources (read-only user access) | Edit, view resources within the scope |
| Viewer | Read-only access to view resources | View resources within the scope |
| Operator | Full plugin access only | Manage plugins with limited access to other resources |
| None | No permissions - blocks access at this scope | No permissions within the scope |

The same six roles apply whether you assign them to a user or to a user group.

## Permissions matrix

The following table shows what each role can do with different resource types:

| Resource | Admin | Manager | Editor | Viewer | Operator |
|----------|:-----:|:-------:|:------:|:------:|:--------:|
| **Organisation** | ✅ | read | read | read | ❌ |
| **Global Variables** | ✅ | ✅ | read/update | read | ❌ |
| **Users** | ✅ | ✅ | read | ❌ | ❌ |
| **User Groups** | ✅ | read | read | read | ❌ |
| **Profile** | ✅ | ✅ | ✅ | read | read |
| **Workspace** | ✅ | ✅ | ✅ | read | ❌ |
| **Repository** | ✅ | ✅ | ✅ | read | ❌ |
| **Deployments** | ✅ | ✅ | ✅ | read | ❌ |
| **Plugins** | ✅ | ✅ | ✅ | read | ✅ |

**Legend:**

- ✅ Full access (create, read, update, delete)
- read: view only
- ❌ No access

Creating, editing and deleting user groups, managing their members, and [restricting deployment sizes](#restricting-deployment-sizes-to-users-and-groups) are organisation-level settings, so they need the Admin role at the organisation level.

!!! note
    The Operator role is designed for users who only need to manage plugins (e.g., external monitoring tools or dashboards). See the [Plugin system](./services/plugin.md) documentation for details.

??? info "Looking for Kafka access?"
    Roles control access to Quix Cloud features. For Kafka/streaming access in your applications, use a [Streaming Token](./access-security/streaming-token.md) instead.

## Permission levels

Permissions are applied at three hierarchical levels, from broadest to most specific:

| Level | Scope | Example use case |
|-------|-------|------------------|
| Organisation | Role applies to everything in the organisation | Give a team lead oversight of all projects |
| Project | Role applies to all environments in that project | Give a developer access to a specific project |
| Environment | Role applies only to that specific environment | Restrict production access to senior engineers |

The same three levels are available when you assign roles to a user group.

## Inheritance

Roles cascade down the hierarchy, so you don't need to set permissions on every resource individually. When you set a role at a higher level, it automatically applies to everything below it. You can override this by setting a different role at a lower level.

**Example:**
- Set a user as **Viewer** at the organisation level
- Override with **Editor** for a specific project
- Override with **Admin** for a specific environment

The user will have:
- Admin access in that one environment
- Editor access in other environments within that project
- Viewer access everywhere else

You can also select **Inherited** to keep the role from the parent level.

Inheritance works the same way for a group's role assignments: set a base role for the group at the organisation level and override it for individual projects or environments.

## User groups

A user group is a named set of role assignments that applies to every member of the group. Instead of assigning the same roles to each engineer on a team, you assign them once to the group and add the engineers as members.

- Groups belong to an organisation.
- A user can be a member of **one group at a time**.
- A group's role assignments use the same [roles](#available-roles), [levels](#permission-levels) and [inheritance rules](#inheritance) as a user's own assignments.
- Group membership does not change a user's permissions by itself - see [How group roles and user roles combine](#how-group-roles-and-user-roles-combine).

Groups are managed in the Quix Cloud UI under **Users** in your organisation settings, on the **User Groups** tab. You need the Admin role at the organisation level to create, edit or delete a group, or to change its members.

### Create a group

1. Open your organisation's **Users** page and select the **User Groups** tab.
2. Click **New group**.
3. Enter a **name** (up to 64 characters, unique within the organisation) and an optional **description** (up to 200 characters), and pick an icon.
4. Click **Create group**.

The group list shows each group's members, its organisation-level role, and when it was created and last modified. A group's role is shown with a **(Custom)** suffix - for example `Editor (Custom)` - when its assignments go beyond a single organisation-wide role.

### Give a group access

1. Open the group and select the **Project permissions** tab.
2. Set a role at the organisation level, and override it for specific projects or environments where needed - exactly as you would for a single user.
3. Click **Save changes**.

**Example:** a `Data Engineering` group set to **Editor** at the organisation level, overridden with **Viewer** on the `production` environment of the `payments` project. Every member who inherits from the group can edit everywhere except that environment, where they can only view.

### Add members

1. Open the group and select the **Users** tab.
2. Click **Add users** and pick the users to add.

Because a user can only belong to one group, adding a user who is already in another group moves them to this group. You cannot add or remove yourself, or change your own permission source.

The **Project permissions** column on the Users tab shows, for each member, whether their permissions currently come from the **Group** or from their own **User** assignments. Adding a member does not switch them to group permissions - an organisation Admin does that per user, as described below.

### What each group tab controls

| Tab | What it controls | Where it takes effect |
|-----|------------------|-----------------------|
| **Users** | Who is a member of the group | Membership is the basis for everything else on this table, and for [deployment size restrictions](#restricting-deployment-sizes-to-users-and-groups) |
| **Quix AI** | Whether Quix AI is enabled for the group | Every member |
| **Project permissions** | The group's role assignments at organisation, project and environment level | Members whose **Inherit from group** setting is on |
| **Storage permissions** | Folder access the group grants in your organisation's storage, managed through the [Storage Access Gateway](./quix-lake/secure-storage-access.md) | Every member by default. Group storage grants are added to the member's own grants regardless of the Inherit from group setting, but a member can be opted out of the group's grants from their own **Storage permissions** tab |

### How group roles and user roles combine

Each user has a single **permission source**: either their own role assignments or their group's. An organisation Admin chooses the source per user with the **Inherit from group** toggle on the user's **Permissions** tab. The toggle is only available for users who belong to a group.

| Inherit from group | Effective role assignments |
|--------------------|----------------------------|
| **Off** (default) | The user's own assignments. The group's role assignments are ignored. |
| **On** | The group's assignments **replace** the user's own assignments at every level. The user's own assignments are kept but ignored, and can't be edited while the toggle is on. |

The two sets are never merged. If a user's direct role and their group's role disagree at the same level - say the user is **Admin** on a project and the group is **Viewer** on it - the permission source decides: with the toggle off the user is Admin there, with it on they are Viewer. The same applies at every other level, including levels where only one of the two sets has an assignment.

Other rules worth knowing:

- Adding a user to a group does not turn the toggle on. Removing a user from their group turns it off, so their own assignments apply again. Moving a user to another group leaves the toggle as it is, so a user who inherits starts inheriting the new group's roles immediately.
- If the toggle is on and the group grants no roles, the user has **no** permissions. Quix Cloud does not fall back to the user's own assignments.
- If you inherit your own permissions from a group, you cannot change that group's organisation-level role assignments. This mirrors the rule that stops you editing your own organisation-level role.
- Group membership still applies when the toggle is off: the member can use [deployment sizes restricted to the group](#restricting-deployment-sizes-to-users-and-groups), receives the group's storage permissions, and is covered by the group's Quix AI setting.

The Users list shows each user's effective role and, when it comes from a group, the group it is inherited from.

### Delete a group

Open the group and click **Delete** in the group details panel. A group that still has members cannot be deleted - remove its members first. Deleting a group removes the access it grants to its members.

## Restricting deployment sizes to users and groups

Organisation Admins define the **deployment sizes** (named CPU and memory presets) that users pick from when they deploy - see [Deployment sizes and resources](./deployments/deployment-sizes.md). By default every size is available to all users. A size can instead be **restricted** to specific users, specific groups, or a mix of both.

To restrict a size, edit it in your organisation's **Deployment sizes** settings, turn on **Restrict to specific users or groups**, and select the allowed users and groups. The sizes list then shows the size as **Restricted** with a summary of who can use it; unrestricted sizes show **All users**, and a size restricted through the API to nobody shows **-**.

Who can pick a restricted size:

| User | Sizes available when deploying |
|------|--------------------------------|
| Admin at the organisation level | Every size, restricted or not |
| A user in the size's allowed users, or a member of an allowed group | Unrestricted sizes plus that size |
| Anyone else | Unrestricted sizes only |

Group membership alone is enough - the member's **Inherit from group** setting does not matter here.

This is the rule the platform applies whenever a deployment is created or updated. If your organisation has deployment sizes enabled and also **enforces deployment size limits**, the CPU and memory a user can request are capped by the largest size available to them, and a user with no available sizes cannot deploy at all until an Admin allows them a size.

!!! warning "Group-allowed sizes in the deployment dialog"
    The deployment dialog currently offers unrestricted sizes and restricted sizes that name you directly. A size you are allowed to use only through a group does not yet appear in its size list. Until it does, add the users who need to pick such a size in the dialog to the size's allowed users as well.

!!! note "An empty allow list is not a restriction"
    In the Quix Cloud UI, a restriction only takes effect when at least one user or group is selected. Turning the toggle on and saving without selecting anyone leaves the size available to all users. When you edit a size through the Portal API instead, sending an empty list of allowed users and groups restricts the size to organisation Admins only.

## Best practices

Follow these guidelines to maintain a secure and manageable permission structure:

- **Start with Viewer**: Give new users read-only access, then increase as needed
- **Use inheritance**: Set a base role at organisation level, override only where needed
- **Use groups for teams**: Put each team in a group, assign roles to the group, and turn on **Inherit from group** for its members so access changes in one place
- **Limit Admin access**: Only give Admin to users who need global variables and user management
- **Use None to restrict**: If someone should see most projects but not a sensitive one, set None on that project
- **Restrict large deployment sizes**: Limit expensive sizes to the groups that need them so a mistake in a deployment dialog can't consume them

## Managing roles with the CLI

You can manage user permissions using the Quix CLI. The following commands are available:

```bash
# List all users and their permissions
quix cloud users permissions list

# Get permissions for a specific user
quix cloud users permissions get <user-id>

# Set a user's role at a specific scope
quix cloud users permissions set <user-id> --scope <scope> --role <role>

# Edit a single permission assignment
quix cloud users permissions edit <user-id> --permission-assignments "[{Scope, Role}]"

# Remove a permission
quix cloud users permissions delete <user-id> --scope <scope>

# Copy permissions from one user to another
quix cloud users permissions copy <source-user-id> --to <target-user-id>
```

**Scope format:**

- Organisation: `Organisation:myorg`
- Project: `Project:myorg-projectname`
- Environment: `Workspace:myorg-projectname-environmentname`

**Available roles:** `Admin`, `Manager`, `Editor`, `Viewer`, `Operator`, `None`

These commands manage a user's **own** assignments. User groups are managed in the Quix Cloud UI, or through the [Portal API](./apis/portal-api/overview.md) under `organisations/user-groups`.

For full CLI documentation, see the [Quix CLI reference](../quix-cli/cli-reference/cloud/users/permissions/index.md).

## Advanced: How permissions work

This section explains the technical details of how permissions are evaluated. For most users, the information above is sufficient.

### Permission format

Each role grants a set of permissions. Permissions follow the format `resource:action`:

| Format | Example | Description |
|--------|---------|-------------|
| `resource:action` | `workspace:read` | Specific action on a resource |
| `resource:*` | `deployment:*` | All actions on a resource |

When you assign a role to a user, they receive all the permissions associated with that role.

### Available resources

| Resource | resourceId | Description |
|----------|------------|-------------|
| `organisation` | organisation ID | Organisation-level settings, including user groups and deployment sizes |
| `globalVariable` | organisation ID | Global variable management |
| `user` | user ID | User account management |
| `profile` | user ID | User profile information |
| `repository` | repository ID | Git repository access |
| `workspace` | workspace ID | Environment access |
| `topic` | workspace ID | Kafka topic management |
| `stream` | workspace ID | Data streaming operations |
| `plugin` | workspace ID | Plugin access |
| `audit` | organisation ID | Audit log access (read-only) |

### Available actions

| Action | Description |
|--------|-------------|
| `create` | Create new resources |
| `read` | View resources |
| `update` | Modify resources |
| `delete` | Remove resources |
| `write` | Write data (streaming only) |
| `*` | All actions |

### Permission resolution

The system first selects the user's permission source: their own role assignments, or their group's assignments when **Inherit from group** is on (see [How group roles and user roles combine](#how-group-roles-and-user-roles-combine)). Only that one set of assignments is used.

It then looks at the three [permission levels](#permission-levels) from most specific to broadest: Environment → Project → Organisation. If a permission isn't found at the environment level, the system checks the project level, then the organisation level.

### Personal Access Tokens

When using [Personal Access Tokens](./access-security/personal-access-token.md) (PATs), the effective permissions are the **intersection** of:

- The user's permissions (based on their role)
- The token's configured permissions

This means a PAT can only have equal or fewer permissions than the user who created it. This is useful for creating tokens with limited scope, such as read-only tokens for monitoring.

## See also

- [Checking permissions programmatically](./services/plugin.md#checking-permissions-programmatically) - API endpoint to query permissions
- [Plugin system](./services/plugin.md) - Build embedded UIs with permission-aware authentication
- [Security](./security.md) - Overview of Quix Cloud security
- [Personal Access Tokens](./access-security/personal-access-token.md) - Token-based authentication
- [Deployment sizes and resources](./deployments/deployment-sizes.md) - Defining sizes, requests and limits
- [Storage Access Gateway](./quix-lake/secure-storage-access.md) - Folder-level storage permissions that groups can grant
- [Quix CLI](../quix-cli/overview.md) - Command-line interface documentation
