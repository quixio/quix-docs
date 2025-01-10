
# Quix Variables

These environment variables are automatically injected by the Quix platform into your deployment's runtime environment. 
Use them to access deployment, application, and environment-specific metadata in your project code.

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
| `Quix__Sdk__Token`                    | SDK Token 1, as described in [docs].                                                                  |

> **Note:** State-related variables are only present when state is enabled. Similarly, `Quix__Deployment__Network__PublicUrl` is only present when public access is enabled.
