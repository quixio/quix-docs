
# Quix Variables

These [environment variables](./environment-variables.md) are automatically injected by the Quix platform into your deployment's runtime environment.
Use them to access deployment, application, and environment-specific metadata in your project code.

State-related variables are only present when [state management](./state-management.md) is enabled, and `Quix__Deployment__Network__PublicUrl` is only present when [public access](./deploy-public-page.md) is enabled.

| Variable                              | Description                                                                                           |
|---------------------------------------|-------------------------------------------------------------------------------------------------------|
| `Quix__Workspace__Id`                 | The id of the environment the deployment is running in.                                               |
| `Quix__Environment`                   | The name of the environment the deployment is running in.                                             |
| `Quix__Organisation__Id`              | The id of the organisation the deployment is running in.                                              |
| `Quix__Deployment__Limits__Replica`   | The number of replicas the deployment is set to have.                                                 |
| `Quix__Deployment__Limits__Memory`    | The amount of maximum memory a single replica of the deployment may use (in MB).                      |
| `Quix__Deployment__Limits__Cpu`       | The amount of maximum cpu a single replica of the deployment may use (in Millicores).                 |
| `Quix__Deployment__State__Enabled`    | Whether a storage for state is attached to the deployment. Used by the Quix streaming client when using state functionality. |
| `Quix__Deployment__State__Size`       | State size limit (in GB).                                                                             |
| `Quix__Deployment__State__Type`       | State storage type (Local / Shared).                                                                  |
| `Quix__Deployment__State__Path`       | The mount path for the state volume (default: `/app/state`). Used by the Quix Streams client for state storage location. |
| `Quix__Deployment__Network__PublicUrl`| The public URL of the deployment when public access is enabled.                                       |
| `Quix__Deployment__Id`                | The unique Id of the deployment. Same for all replicas.                                               |
| `Quix__Deployment__Type`              | Type of Deployment (Job / Service).                                                                   |
| `Quix__Deployment__Name`              | The display name of the deployment.                                                                   |
| `Quix__Deployment__ReplicaName`       | Replica name of the deployment.                                                                       |
| `Quix__Application__Id`               | The application Id the deployment is built from.                                                      |
| `Quix__Application__Name`             | The application name the deployment is built from.                                                    |
| `Quix__Application__Git__CommitRef`   | The application's git commit reference the deployment is built from.                                  |
| `Quix__Application__Git__Ref`         | The application's git reference (such as a tag) the deployment is built from.                         |
| `Quix__Build__Id`                     | The build Id of the deployment. Multiple deployments will have the same build id if referencing the same commit of a application. |
| `Quix__Portal__Api`                   | The portal API endpoint, which depends on the environment.                                            |
| `Quix__Sdk__Token`                    | SDK Token 1, as described [here](../access-security/streaming-token.md).                       |

## Storage and Quix Lake variables

The variables below are **conditional** — unlike the ones above, they are not always present:

- **`Quix__BlobStorage__Connection__Json`** is injected only when the deployment has a [blob storage connection](../quix-lake/blob-storage.md) **bound**.
- The **`Quix__Lakehouse__*`** variables (and the `CATALOG_URL` / `QUIX_LAKE_URL` aliases) are injected only when that connection also has **[Quix Lake](../quix-lake/overview.md) enabled**.

If neither condition is met, none of these variables are set, so guard for their absence in your code. The same variables are also injected into [dev sessions](../applications/dev-sessions/overview.md).

| Variable                              | Description                                                                                           |
|---------------------------------------|-------------------------------------------------------------------------------------------------------|
| `Quix__BlobStorage__Connection__Json` | The bound blob storage connection as a JSON document — provider plus credentials and bucket/container. Injected as a secret. |
| `Quix__Lakehouse__Catalog__Url`       | The Quix Lake Catalog URL (preferred name).                                                           |
| `CATALOG_URL`                         | The Catalog URL — legacy / PyIceberg alias of `Quix__Lakehouse__Catalog__Url`.                        |
| `QUIX_LAKE_URL`                       | The Catalog URL — QuixLake / QuixLab alias of `Quix__Lakehouse__Catalog__Url`.                        |
| `Quix__Lakehouse__Catalog__AuthToken` | Auth token your code sends to authenticate requests to the Catalog — use it together with `Quix__Lakehouse__Catalog__Url`. Injected as a secret. |
| `Quix__Lakehouse__Query__Url`         | The Quix Lake Query URL.                                                                               |
| `Quix__Lakehouse__Query__AuthToken`   | Auth token your code sends to authenticate requests to the Query service — use it together with `Quix__Lakehouse__Query__Url`. Injected as a secret. |
