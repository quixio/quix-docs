# YAML 1.0 and 2.0

Every Quix project is described by two kinds of YAML file: one **pipeline descriptor**, `quix.yaml`, at the root of the project, and one **application descriptor**, `app.yaml`, in each application folder. The `metadata.version` field at the top of `quix.yaml` selects the descriptor version.

From **version 2.0** — informally "YAML 2.0" — a deployment **inherits** its variables from the application's `app.yaml` instead of repeating them in `quix.yaml`. Version 1.0 has no inheritance: every deployment carries the full definition of each variable.

This page explains why version 2.0 exists, how inheritance works, the same deployment shown across versions (written and computed), and how to migrate. For how `quix.yaml` and `app.yaml` sit in the repository, see [Project structure](./project-structure.md).

!!! tip "Always use version 2.0"

    Version 2.0 is the current descriptor and unlocks the full capabilities of the platform, including variable inheritance. New projects use it by default. Set `metadata.version` to `2.0` in any project still on 1.0.

## Why version 2.0

Under **version 1.0**, every deployment in `quix.yaml` repeats the complete definition of each variable — its `inputType`, `description`, `required` flag, and value. The same description and the same properties are duplicated in `app.yaml`, in `quix.yaml`, and across each deployment of the same application. Changing one detail of an application means editing it in several places.

**Version 2.0** removes that duplication:

* The application declares each variable **once**, in its `app.yaml`.
* Each deployment of that application **inherits** the declaration. `quix.yaml` records only the properties a deployment overrides.
* Editing the application — adding a variable, changing a description or a default — reaches every deployment of it the next time it is deployed, with no edit to `quix.yaml`.

The result is a shorter, clearer `quix.yaml` that holds only what differs between deployments, and a single source of truth for each variable in `app.yaml`.

## How inheritance works

Inheritance resolves a deployment's variables from the application it references:

* **`app.yaml` is the source of truth.** It declares each variable's `inputType`, `description`, `required` flag, and its value or key (the `defaultValue` field). The portal writes `app.yaml` for you when you add an application variable in the UI.
* **A deployment inherits the whole set** when it references an application by both `application` and `version`. Properties left at the application default are omitted from `quix.yaml`.
* **`quix.yaml` records only overrides.** A deployment lists a variable solely to change a property for that deployment. A deployment that overrides nothing has **no `variables:` block at all**.
* **Override one property** by declaring just that variable with the changed field; the rest stays inherited.

The same variable uses a different field name on each side:

| Concept | `app.yaml` (declare once) | `quix.yaml` deployment (override only) |
|---|---|---|
| Plain value | `defaultValue: orders` | `value: orders` |
| Project-variable key | `defaultValue: THIRD_PARTY_API_KEY` | `variableKey: THIRD_PARTY_API_KEY` |
| Variable-group reference | `variableGroupId: redis-config` | `variableGroupId: redis-config` |
| Secret flag | `secret: true` | `secret: true` |

Inheritance applies only when:

* `metadata.version` is **2.0 or higher**. Under 1.0 nothing is inherited.
* The deployment references both an `application` and a `version`. A deployment that omits either — such as one built from a raw `image` — or a **managed** deployment, does not inherit.

Variable names are matched **case-insensitively** between `quix.yaml` and `app.yaml`.

## The same deployment across versions

One application, shown four ways: the `app.yaml` that declares the variables, then a single deployment of it written as **version 1.0**, written as **version 2.0**, and the **version 2.0 file the platform computes** at deploy time.

### The application: `app.yaml`

The `order-processor` application declares an input topic, a project variable, and two [variable groups](../deployments/global-variables.md). A group carries its full definition in `app.yaml` — its identifier, names, and the **nested `variables:`** that make up the group:

```yaml
# app.yaml — declares the application's variables once
name: order-processor
language: python
variables:
  - name: input
    inputType: InputTopic
    required: true
    defaultValue: orders
  - name: API_KEY
    inputType: ProjectVariable
    description: Third-party API key
    required: true
    defaultValue: THIRD_PARTY_API_KEY
    secret: true
  - name: redis
    inputType: VariableGroup
    required: true
    variableGroupId: redis-config
    variableGroupName: Redis config
    variableGroupDescription: Shared Redis connection
    variables:                          # the group's variables
      - key: REDIS_HOST
        description: Redis server hostname
        defaultValue: localhost
        required: true
      - key: REDIS_PORT
        description: Redis server port
        defaultValue: "6379"
        required: true
      - key: REDIS_PASSWORD
        description: Redis auth password
        secret: true
        required: true
  - name: payments
    inputType: VariableGroup
    required: true
    variableGroupId: payment-provider
    variableGroupName: Payment provider
    variableGroupDescription: Payment provider credentials
    variables:                          # the group's variables
      - key: PAYMENT_API_KEY
        description: Payment provider API key
        secret: true
        required: true
      - key: PAYMENT_API_URL
        description: Payment provider base URL
        defaultValue: https://api.payments.example
        required: true
dockerfile: build/dockerfile
runEntryPoint: main.py
```

A deployment references the group, not its members — the nested `variables:` list never appears in `quix.yaml`. At deploy time the group's actual values come from the [value set](../deployments/global-variables.md) assigned to the environment.

### Version 1.0: every variable written out

Under 1.0 the deployment carries the full definition of each variable itself, duplicating what `app.yaml` already declares:

```yaml
# quix.yaml — version 1.0
metadata:
  version: 1.0

deployments:
  - name: Order processor
    application: order-processor
    version: latest
    deploymentType: Service
    resources:
      limits:
        cpu: 200
        memory: 500
      replicas: 1
    variables:
      - name: input
        inputType: InputTopic
        required: true
        value: orders
      - name: API_KEY
        inputType: ProjectVariable
        description: Third-party API key
        required: true
        variableKey: THIRD_PARTY_API_KEY
        secret: true
      - name: redis
        inputType: VariableGroup
        required: true
        variableGroupId: redis-config
        variableGroupName: Redis config
        variableGroupDescription: Shared Redis connection
      - name: payments
        inputType: VariableGroup
        required: true
        variableGroupId: payment-provider
        variableGroupName: Payment provider
        variableGroupDescription: Payment provider credentials
```

### Version 2.0: what you write

The deployment inherits every variable from the application, so the file you keep in Git holds only the pipeline fields — no `variables:` block at all:

```yaml
# quix.yaml — version 2.0, the written form
metadata:
  version: 2.0

deployments:
  - name: Order processor
    application: order-processor
    version: latest
    deploymentType: Service
    resources:
      limits:
        cpu: 200
        memory: 500
      replicas: 1
```

### Version 2.0: what the platform computes

When the platform reads the descriptor to deploy, it expands the minimal file by inheriting the application's variables. This resolved form is **virtual** — computed in memory at deploy time and never written to Git:

```yaml
# quix.yaml — version 2.0, the computed (virtual) form
metadata:
  version: 2.0

deployments:
  - name: Order processor
    application: order-processor
    version: latest
    deploymentType: Service
    resources:
      limits:
        cpu: 200
        memory: 500
      replicas: 1
    variables:
      - name: input
        inputType: InputTopic
        required: true
        value: orders
      - name: API_KEY
        inputType: ProjectVariable
        description: Third-party API key
        required: true
        variableKey: THIRD_PARTY_API_KEY
        secret: true
      - name: redis
        inputType: VariableGroup
        required: true
        variableGroupId: redis-config
        variableGroupName: Redis config
        variableGroupDescription: Shared Redis connection
      - name: payments
        inputType: VariableGroup
        required: true
        variableGroupId: payment-provider
        variableGroupName: Payment provider
        variableGroupDescription: Payment provider credentials
```

This computed form is identical to the version 1.0 file above, apart from `metadata.version`: version 2.0 produces the same result from a far smaller file. The `input` value and the `API_KEY` project-variable key (`variableKey`) are materialized from the application defaults; the `redis` and `payments` references are materialized as references only — the group's member variables (`REDIS_HOST`, `PAYMENT_API_KEY`, and so on) are not inlined, since their values resolve from the environment's value set at deploy time.

### Override a single deployment

To run one deployment differently — a different input topic, say — declare just the changed variable on that deployment. Everything else stays inherited:

```yaml
# quix.yaml — override the input topic for one deployment
deployments:
  - name: Order processor
    application: order-processor
    version: latest
    deploymentType: Service
    variables:
      - name: input
        value: priority-orders
```

Every other property of `input`, and every other variable, is still inherited from `app.yaml`.

## Migrate from 1.0 to 2.0

Moving a project to version 2.0 takes two steps:

1. **Confirm `app.yaml` declares the variables.** Each application's variables must exist in its `app.yaml`, since that is what deployments inherit from. The portal writes them there when you add an application variable in the UI.
2. **Set the descriptor version.** Change `metadata.version` to `2.0`. Inheritance takes effect immediately — from this point the platform resolves each deployment's variables from its application.

The stored `quix.yaml` is **not** rewritten the moment you switch to 2.0. Minimizing the file is **eventually consistent**: the next time you change anything the descriptor covers — a deployment, a variable, resources, a topic — through the UI or the API, the platform saves the file in its migrated, minimal form, stripping every property that matches an application default. Until that next change, `quix.yaml` keeps its existing entries; they still resolve correctly, because inheritance happens when the descriptor is read regardless of how the file is written.

What to expect:

* **No immediate rewrite.** The version change alone neither minimizes the file nor redeploys anything.
* **Migration on the next save.** The first operation that persists the descriptor writes the minimal form.
* **Unchanged runtime behavior.** The resolved variables a deployment receives are the same before and after migration — they always come from `app.yaml` defaults, project variables, and variable-group value sets.

## Reference

This section specifies the resolution rules precisely, for power users and for tooling or AI assistants that generate the YAML.

* **Version gate.** Inheritance and default-stripping apply only when `metadata.version` is `2.0` or higher. A 1.0 descriptor, or a deployment whose version cannot be read, is left exactly as written.
* **Eligible deployments.** A deployment inherits only when it sets both `application` and `version` and its `deploymentType` is not `Managed`. A deployment that omits either field — including one built from a raw `image` — and managed deployments are skipped.
* **Matching.** A `quix.yaml` variable is matched to an `app.yaml` variable by `name`, case-insensitively.
* **Property precedence.** A property set explicitly in `quix.yaml` wins. A property left unset is inherited from the matching `app.yaml` variable. Applicable properties are `inputType`, `description`, `required`, `multiline`, the value or key (`value` / `variableKey`, or legacy `secretKey`), the variable-group fields (`variableGroupId`, `variableGroupName`, `variableGroupDescription`), and the `secret` flag.
* **Materialized defaults.** Variables declared in `app.yaml` but omitted from a deployment are added to the computed descriptor at deploy time with their application defaults.
* **Group members are not inlined.** A deployment carries a group's reference fields (`variableGroupId`, plus the inherited `variableGroupName` and `variableGroupDescription`), but never the group's **nested member variables** — those live in `app.yaml` and in the [variable group](../deployments/global-variables.md) definition. Their values resolve from the environment's assigned value set.
* **Lazy write-back.** Switching to 2.0 does not rewrite `quix.yaml`. On the next descriptor save — any UI or API change that persists the file — each deployment property equal to the application default is stripped, keeping the stored file minimal.

## Related pages

* [Project structure](./project-structure.md) — how `quix.yaml` and `app.yaml` sit in the project repository.
* [Project variables](../deployments/project-variables.md) — per-environment values and secrets a deployment inherits from its application.
* [Global variables](../deployments/global-variables.md) — organization-wide variable groups referenced from `app.yaml`.
* [Pipeline descriptor reference](../../quix-cli/yaml-reference/pipeline-descriptor.md) — the full field reference for `quix.yaml`.
