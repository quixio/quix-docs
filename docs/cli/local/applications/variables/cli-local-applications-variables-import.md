# quix local applications variables import

Imports .env file values to `app.yaml`. Values from the .env file will replace those in `app.yaml`.

**Aliases:** import, imp, import-from-dotenv

**Usage:**

```
quix local applications variables import [options]
```

**Options:**

- `--env-file-name <env-file-name>`: Specify the .env file name (default: `.env`).
- `--from-app-variables`: If enabled, variables from the .env file will take precedence over those in `app.yaml` (default: False).
- `--reset`: Removes all variables from `app.yaml` and adds them from the .env file (default: False).