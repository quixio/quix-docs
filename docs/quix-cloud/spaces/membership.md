---
title: Assign members
description: Decide who works in each space by binding permission groups and adding individual users, from the space designer or from the Users pages.
---

# Assign members

Membership decides who sees a space. It never changes what anyone can access. See [What a space doesn't control](overview.md#what-a-space-doesnt-control).

## How membership works

A user joins a space in one of two ways:

* **Through a permission group.** Bind a group to the space, and everyone in it is a member. Binding is live: people who join the group later become members, and people who leave it lose the space.
* **Directly.** Add a named user, for exceptions such as one person from another team.

A user can belong to several spaces, with one active at a time. A user in no space sees the standard portal. Users whose only role is the deprecated Operator role can't open a space's apps. See [Replace the Operator role with a space](replace-operator-role.md).

## Where to manage it

* **The designer's `Membership` section** sets the whole audience of one space. Changes apply when you click `Save space`. A member who already works in another space must switch to the new one from the space chip.
* **The `Spaces` field** on a user's or group's page, and in the `Edit details` and `Edit group` dialogs, sets that user's or group's spaces.

!!! warning "Changes on the Users pages apply immediately"

    Saving the `Manage spaces` dialog, or clicking **×** on a space chip, applies the change at once, without asking you to confirm. Cancelling `Edit details` or `Edit group` afterwards doesn't undo it.

A space marked `via group` comes from the user's permission group. You can remove it only by unbinding the group from the space, which removes the space for everyone in the group.

Spaces you pick in the `New group` dialog aren't saved. Create the group first, then add its spaces from the group's page or the designer.

## Don't change groups to change spaces

A user's permission group also sets their permissions, so moving someone to another group changes what they can do. To change one person's spaces, add or remove them directly.

## See also

* [Create and design a space](create-space.md)
* [User groups](../access-security/user-groups.md)
