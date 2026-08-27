---
title: Variables overview
description: Which kind of Quix variable to use, and how its value reaches a deployment — {{ }} substitution at sync time versus inputType binding at deploy time.
---

# Variables overview

A deployment can take configuration from literal YAML or from a variable — for example, a CPU limit, hostname, or API key. Quix offers four kinds of variable, and two routes for getting a value out of one and into your pipeline. This page answers both questions: which kind of variable holds the value, and how that value reaches your `quix.yaml` or your running container. Each variable kind's own page covers its syntax in full.

!!! info "Beta feature"

    [Global variables](global-variables.md) are currently in beta. The other variable kinds on this page are generally available.

## Which kind of variable do you need?

| You want to… | Use |
|---|---|
| Share config across multiple projects | [Global variables](global-variables.md) |
| Store a per-environment value or secret within one project (`CPU`, `MEMORY`, `REPLICAS`, API keys) | [Project variables](project-variables.md) |
| Set a static value on one deployment | [Environment variables](environment-variables.md) |
| Read a platform-provided identifier | [Quix variables](quix-variables.md) |

Environment variables are the starting point for runtime configuration: your code receives a name/value pair from the deployment's container environment. `inputType` chooses whether that value is literal, comes from a project variable, or comes from a variable group. See [Environment variables](environment-variables.md) for the basics and minimal YAML examples.

## Two ways to reference a variable

**`{{ }}` substitution** embeds the resolved value directly into a `quix.yaml` field, as text. Use it for fields that need to vary per environment or across projects but don't need to be secret — resource sizing, public URL prefixes, feature toggles.

* `{{ VARIABLE_NAME }}` — a project variable. See [Project variables → Pattern 1](project-variables.md#pattern-1-substitute-into-a-quixyaml-field).
* `{{ groupId:variableKey }}` — a single member of a global-variable group. See [Global variables → Pattern 1](global-variables.md#pattern-1-substitute-a-group-member-into-a-quixyaml-field).

**`inputType:` binding** binds a deployment variable to a container environment variable at deploy time — the value never lands in `quix.yaml`.

* `inputType: ProjectVariable` + `variableKey` — one project variable. See [Project variables → Pattern 2](project-variables.md#pattern-2-bind-to-a-container-environment-variable).
* `inputType: VariableGroup` + `variableGroupId` — an entire global-variable group, injected as one environment variable per member. See [Global variables → Pattern 2](global-variables.md#pattern-2-bind-a-whole-group-to-container-environment-variables).

Both patterns can appear on the same deployment:

```yaml
deployments:
  - name: my-service
    resources:
      replicas: {{REPLICAS}}       # {{ }} — substituted into the YAML at sync
    variables:
      - name: DB
        inputType: VariableGroup   # binding — resolved into the container at deploy
        variableGroupId: redis-config
```

## When each one resolves

|   | `{{ }}` substitution | `inputType:` binding |
|---|---|---|
| Resolved at | **Sync** — baked into the rendered descriptor | **Deploy** — injected into the container |
| Committed to Git | **No** — only the `{{ }}` token is committed, never the resolved value | No |
| Visible in the sync diff | **Yes** — the resolved value renders in the before/after comparison shown when you sync | No |
| Applies to | Any `quix.yaml` field (`cpu`, `replicas`, `urlPrefix`, `disabled`, and so on) | Container environment variables only |
| Reaches your code as an env var | No, not by itself | Yes |
| Picking up a changed value | **Sync the environment** | **Redeploy** — the binding resolves again at deploy time. Syncing the environment detects the change and restarts the deployment for you |
| Secrets allowed | **No** | Yes |

Because `{{ }}` resolves at sync time, the resolved value renders in the **sync diff** — the before/after comparison shown when you sync — while the file Git actually stores keeps the `{{ }}` token itself, never the value. (The YAML *editor* in the sync dialog also shows tokens rather than values; only the diff renders them resolved.) The next rule follows from that diff, not from Git.

## Why secrets are never substituted

A secret project variable, or a secret member of a global-variable group, is never resolved through `{{ }}` — doing so would render the secret's plaintext in the sync diff. Both sides reject the reference at sync time:

* **Project variable** — the sync fails with: `Secret project variables ('MY_SECRET') cannot be referenced via {{ }} template syntax. Use inputType: ProjectVariable with variableKey instead.`
* **Global-variable member** — the sync dialog's `Unresolved variable groups` step reports *"Secret variables cannot be used in YAML templates"*, with the remediation *"Remove the secret reference from the YAML. Secret values are never displayed."*

Use an `inputType:` binding instead. The fix looks different on each side:

* **Project variable** — the secret is one key among many, so switch just that key to `inputType: ProjectVariable` with `variableKey`. Every other `{{ }}` reference stays as it was.
* **Global-variable member** — there is no per-member binding: `inputType: VariableGroup` injects the **entire** group. That binding is additive — it leaves every existing `{{ groupId:variableKey }}` reference untouched, and the two resolve independently. Add the group binding **alongside** the remaining template references rather than replacing them.

## Where references work

Not every file resolves every reference:

* **`quix.yaml`** — both patterns work. `{{ }}` substitution resolves in any field, and `inputType:` bindings sit under a deployment's `variables:`.
* **`app.yaml`** — an application can *define* a variable group, including its identifier and the nested schema of the variables inside it, and every deployment of that application inherits the reference. `{{ groupId:variableKey }}` substitution, however, is **not** resolved in `app.yaml`, nor in a code sample's `library.json`. Keep group-member substitutions in `quix.yaml`.
* **Quix CLI** — the CLI can substitute a colon-bearing token such as `{{ groupId:variableKey }}` when a local `.quix.yaml.variables` file supplies a value for that exact token. It does not fetch or resolve Quix Cloud variable-group assignments; Cloud resolves those when you sync an environment.

## When container environment-variable names collide

Collisions apply only to values injected into the container environment — literal environment variables, `inputType: ProjectVariable`, and `inputType: VariableGroup`. `{{ }}` substitutions change descriptor fields and do not participate.

Use one owner for every injected environment-variable name. In particular, do not bind groups with overlapping member keys: their iteration order is not a public contract, so the result must not be relied on.

Quix does not validate these overlaps, so avoid them rather than attempting to establish a precedence order. If a collision does slip through, the value that reaches the container today comes from the variable group — bindings are merged after project variables, which are merged after literal values — but that ordering is an implementation detail, not a guarantee.

## A complete example

This deployment uses both routes at once. Two project variables, `CPU` and `MEMORY`, size it; the shared `release-tiers` group supplies its replica count; and the shared `redis-config` group provides its connection settings.

**What you write in `quix.yaml`:**

```yaml
deployments:
  - name: Order processor
    application: order-processor
    deploymentType: Service
    resources:
      limits:
        cpu: {{CPU}}                              # project variable
        memory: {{MEMORY}}                        # project variable
      replicas: {{release-tiers:REPLICA_COUNT}}   # global-variable group member
    variables:
      - name: redis
        inputType: VariableGroup                  # the whole redis-config group
        variableGroupId: redis-config
        required: true
```

**What the sync renders**, in an environment where `CPU` is `200`, `MEMORY` is `500`, and `release-tiers` resolves `REPLICA_COUNT` to `3`:

```yaml
    resources:
      limits:
        cpu: 200
        memory: 500
      replicas: 3
    variables:
      - name: redis
        inputType: VariableGroup
        variableGroupId: redis-config
        required: true
```

The three `{{ }}` fields now hold values; the binding is untouched, because it is still a reference. The `quix.yaml` committed to Git keeps all four lines exactly as you wrote them.

**What reaches the container**, at deploy time, from the value set that `redis-config` is assigned in this environment:

```text
REDIS_HOST=prod.redis.example.com
REDIS_PORT=6379
REDIS_PASSWORD=<the group's secret value, decrypted>
```

`CPU`, `MEMORY`, and `REPLICA_COUNT` are absent from that list. Substitution changes the deployment's configuration; only a binding reaches the deployment's environment.

## Related documentation

* [Environment variables](environment-variables.md) — runtime configuration basics, value sources, and code examples.
* [Project variables](project-variables.md) — `{{ }}` and `inputType: ProjectVariable` in full, including validation errors and recipes.
* [Global variables](global-variables.md) — variable groups, value sets, `inputType: VariableGroup`, and `{{ groupId:variableKey }}` in full.
* [YAML 1.0 and 2.0](../projects/yaml-2-0.md) — how `app.yaml` and `quix.yaml` compute the descriptor these variables end up in.
