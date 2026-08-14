# How to add environment variables in Quix

Environment variables are literal, deployment-specific values that your code can access at runtime. They are useful for configuration that does not vary between environments and is not sensitive.

For credentials and any value that varies between environments, prefer defining a [project variable](./project-variables.md) and binding it to the environment variable — or, if the value is shared across projects, a [global variable](./global-variables.md). See [Which kind of variable do you need?](./variables/index.md#which-kind-of-variable-do-you-need) for the full picture. Quix also injects a set of [platform-provided variables](./quix-variables.md) into every deployment.

## To create an environment variable

To add environment variables that you can access from your code, open the code view for your service, and in the `Environment variables` panel, click `+ Add`. 

![Add environment variable](../../images/env-variables/add-env-var.png){width=60%}

Give the variable a name and choose where its value comes from. The `inputType` records that choice in YAML:

* **`FreeText`** stores a literal `value` on this deployment. See the example below.
* **`ProjectVariable`** binds one project variable, selected with `variableKey`. See [Project variables](project-variables.md#pattern-2-bind-to-a-container-environment-variable).
* **`VariableGroup`** binds every member of a global-variable group, selected with `variableGroupId`. See [Global variables](global-variables.md#pattern-2-bind-a-whole-group-to-container-environment-variables).

For example, this literal variable makes `LOG_LEVEL=info` available to the container:

```yaml
variables:
  - name: LOG_LEVEL
    inputType: FreeText
    value: info
```

Use `FreeText` only for non-sensitive values that stay the same for this deployment. For credentials or environment-specific values, use a project-variable or variable-group binding instead.

## To access an environment variable

Once the variable has been created, you can then access the variable in your code using `os.environ["variable"]`. For example, to access the environment variable `API_SECRET`, your code would be:

```python
api_secret = os.environ["API_SECRET"]
print(api_secret)
```
