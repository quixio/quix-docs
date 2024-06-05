# quix local pipeline update

Update `quix.yaml` with the new local applications and update the variables of the existing deployments

**Usage:**
 
```
quix local pipeline update [options]
```

**Options:**

- `--directory <directory>`: Base directory (defaults to current directory)
- `--existing, --only-existing`: Update only existing deployments
- `--new, --only-new`: Add only the applications that are not currently deployed
- `--current, --only-current`: Update only the deployments of the current application folder. (Fails if not in an `app.yaml` is not in the current directory)
- `--reset`: Removes all deployments from the `quix.yaml` file. This operation is performed before any updates or additions to ensure a clean state
- `-v, --verbose, --verbosity`: Display the verbose output
- `-?, -h, --help`: Show help and usage information

**Example usage:**

## Regular usage

When you execute the update local pipeline command without any options:

```
$ quix local pipeline update
```

The update process starts:

```
Updating applications ...
✓ demo-data-source
✓ Event Detection Transformation
```

If everything is updated successfully:

```
✓ 'quix.yaml' is updated
```

If there are no changes detected:

```
! 'quix.yaml' has no changes
```

If there are warnings and manual intervention is needed:

```
✗ Deployment demo-data-source can't be updated because variable 'my-new-variable' is required and it has no value
✓ 'quix.yaml' is updated
✗ Some deployments have warnings. Please, update 'quix.yaml' manually and try again
```

In this case, a new variable `my-new-variable` has been added, and it is required without a default value. The relevant section in the `quix.yaml` file might look like this:

```yaml
variables:
  - name: my-new-variable
    inputType: FreeText
    description: A new variable
    defaultValue:
    required: true
```

When the update command runs, it identifies that `my-new-variable` is required but has no value assigned. This triggers a warning because the pipeline cannot be updated with missing required variables. 

To resolve this, you need to manually edit the `quix.yaml` file and provide a value for the `my-new-variable`:

```yaml
variables:
  - name: my-new-variable
    inputType: FreeText
    description: A new variable
    defaultValue: "your-value-here"
    required: true
```

After updating the `quix.yaml` file with the required value, you can run the update command again to complete the process without warnings. This ensures that all necessary variables are correctly configured for your deployments.