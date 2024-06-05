# quix local applications variables export

Exports variables from `app.yaml` to an .env file.

**Aliases:** export, exp, export-to-dotenv

**Usage:**

```
quix local applications variables export [options]
```

**Options:**

- `--workspace-id <workspace-id>`: Specify the workspace ID.
- `--env-file-name <env-file-name>`: Specify the .env file name (default: `.env`).
- `--reset`: Removes all values of existing environment variables and adds them from `app.yaml` (default: False).