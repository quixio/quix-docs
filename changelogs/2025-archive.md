# Quix product 2025 changelog archive

This is the changelog for 2025. Changelogs for previous years can be found [here](#changelog-archives).

## 2025-12-project-templates | 10 DECEMBER 2025

`NEW FEATURES`

- Project templates: Create new projects from pre-configured templates with a streamlined creation flow. Select from a library of templates, preview their README documentation, and get started quickly with ready-to-use project structures or fully functional, ready-to-deploy solutions. Initial templates include several HTTP and MQTT ingestion pipeline templates, Configuration Management, Monitoring, and Simulink/MATLAB integrations—with more to come.
- Project Documentation: A new Documentation option is now available in the left-side menu, allowing you to browse, view, and edit your project's Markdown files directly from the Portal. This feature is especially useful for Template-based projects that require additional context during the first synchronization.
- Pipeline groups: Organize your pipeline by assigning deployments to groups. A group selector in the pipeline view lets you filter and focus on specific parts of your pipeline. Groups can be assigned via the Edit Deployment option or YAML configuration.
- SSH Key management: A new Manage SSH Key option in Project Settings allows you to view, regenerate, and validate your project's public SSH key for external Git repositories. Regenerating a key immediately replaces the current one and restarts all Quix services to apply the change.
- Replay Transformations and JSON support: The Replay Service now supports message transformations, allowing you to modify keys, headers, and values during replay. Use operations like REPLACE, SET, and REMOVE to manipulate text or JSON properties—ideal for masking sensitive data, changing environments, or adjusting message content on the fly. Additionally, JSON is now fully supported in message keys and headers.
- KeyCloak support: Added support for KeyCloak as an alternative identity provider. Organizations can now choose between Auth0 or KeyCloak through configuration, enabling self-hosted authentication for enterprises with compliance or cost requirements.

`IMPROVEMENTS`

- Deployments:
    - Deployments with embedded plugin UIs enabled now include a toggle to switch between the Embedded view (plugin iframe) and the standard Deployment Details view.
- Users:
    - Admins can now copy invite links directly from the user list for pending users—useful when SMTP is not configured or for quick sharing.
    - Added new Keycloak authentication system compatibility
- Topics:
    - Improved leading edge calculation on the Topic Explorer Waveform for smoother rendering, especially when receiving unsorted data.
- Pipeline:
    - Pipelines containing only services (no input/output topics) now display in a grid layout instead of a single column.
- Other:
    - Improved Drag & Drop features: Reorder elements across the Portal using drag and drop in environment tabs, table columns, and project groups in Settings.
    - Connectivity notifications are now less intrusive with consistent styling, no longer appear during normal navigation, and can be dismissed during reconnection attempts.
    - Enhanced CLI support for non-interactive environments like Claude Code and Codex. Commands no longer hang in automation pipelines, and fully non-interactive modes are now available for all operations.

`BUG FIXES`

- Library:
    - Fixed an issue where the library API could not recover when the local repository was corrupted, leaving the system in an inconsistent state.
    - Fixed excessive git history cloning by implementing shallow copies, significantly reducing setup time on slow disks.
    - Fixed null reference errors occurring in library operations.
- IDE / Online Editor:
    - Fixed an issue where multiple IDE sessions were being initialized simultaneously, causing the frontend to display an infinite spinner.
    - Fixed "Could not find path" errors when accessing files in session included folders.
    - Added exponential backoff for session setup retries to improve reliability when initializing git repositories.
    - Fixed errors when accessing files located in subfolders within the Online IDE.
- Data Lake:
    - Fixed an issue where the WorkspaceId was being repeated/duplicated in replay file paths within the catalog.
    - Fixed 403 Forbidden errors when getting topics from Data Lake.
    - Fixed character escaping issues for special keys in Data Lake Sink metadata.
    - Fixed metadata being persisted with full workspaceId in Data Lake Sink.
    - Fixed data refresh and columns display issues in Data Lake views.
    - Fixed replay progress indicator not showing correct values.
- Deployments:
    - Fixed deployment status checks that were causing "Failed to pull image" errors.
    - Fixed deployment build logs that stopped working mid-stream.
    - Fixed deployment errors exposing internal system details instead of user-friendly messages.
- YAML / Synchronization:
    - Fixed an issue where the "Synchronize" button did not work after editing YAML code directly.
    - Fixed secrets being triggered continuously during sync operations.
    - Fixed sync comparison issues in Managed Services.
- Applications:
    - Fixed an issue where users could not select a tag when deploying applications.
    - Fixed errors thrown when creating a variable with a topic reference.
    - Fixed incorrect LibraryItemId issues in Applications.
    - Fixed managed applications generating variable errors every minute.
- Users / Permissions:
    - Fixed an issue where invited users were incorrectly going through the full onboarding flow.
    - Fixed the first organization signup's admin not being marked as QuixAdmin.
    - Fixed User Permissions editor reverting to previous values after saving changes.
    - Fixed JWT token not storing the token correctly as access_token.
- Environments:
    - Fixed filter on organization overview not correctly searching environments.
    - Fixed the environment card progress bar not displaying at full width.
    - Fixed UI glitch on the Pull Request option display.
    - Fixed timing issues on Project/Environment page navigation.
- Topics / Kafka:
    - Fixed regression in Topic delete/remove functionality.
    - Fixed linked topics not working correctly in Scratchpads.
    - Fixed replication factor not being respected when creating topics.
    - Fixed exception when changing retention period for tiered storage topics.
    - Fixed metrics race condition when loading topics list.
- Git / Organization:
    - Fixed organization deletion not cleaning up associated Git resources properly.

## 2025-10-user-flow-4 | 18 NOVEMBER 2025

`BUG FIXES`

- Deployments:
    - Fixed image unable to pull error
    - Tiered storage retention period update should now always work

## 2025-10-user-flow-3 | 07 NOVEMBER 2025

`IMPROVEMENTS`

- Re-enabled invitation links for new users

`BUG FIXES`

- Notifications:
    - Reduced frequency of live-update disconnect notifications
    - Fixed intermittent issue where project list didn't display all projects
- Topics:
    - Resolved issue where topics with tiered storage failed to load off-loaded offsets

## 2025-10-user-flow-2 | 22 OCTOBER 2025

`NEW FEATURES`

- Data Lake:
    - Added drag-and-drop column reordering capability in Data Lake tables. Column order preferences are automatically saved and persist across sessions for a personalized viewing experience.

`IMPROVEMENTS`

- Replay Controls:
    - Moved action buttons to the top toolbar for easier access to replay operations without scrolling.
- Tables & Data Viewing:
    - Significantly improved table column resizing performance and reliability across all data tables.
    - Enhanced WaveForm stream selection panel with better spacing, improved scrolling, and cleaner tooltip formatting.
- Deployment Metrics:
    - Improved reliability of real-time metrics display with enhanced connection retry logic and state management.
    - Metrics now update consistently without data loss or stale values.

`BUG FIXES`

- Metrics & Monitoring:
    - Fixed deployment metrics not displaying due to connection reliability issues.
    - Resolved state management issues that caused metrics to stop updating.
- UI & Visualization:
    - Fixed spacing and layout issues in WaveForm stream selection panel.
    - Corrected virtual scrolling behavior for better performance with large stream lists.

## 2025-10-user-flow | 15 OCTOBER 2025

`NEW FEATURES`

- Environment Management: Added organization-level environment list view with sortable, configurable columns (Project, Environment, Branch, Group, Cluster, Broker, Blob Storage) for better visibility across your entire organization.
- Topics:
    - Allowed topic names to start with underscores (e.g., __internal-topic). These topics are automatically marked as untracked and excluded from YAML IaC tracking.

`IMPROVEMENTS`

- Quix Lake Replay:
    - Improved replay performance, reliability and providing more accurate progress tracking for large datasets.
- Deployments:
    - Added visual indicators in the sync dialog to clearly identify operations belonging to disabled or excluded deployments, with helpful tooltips explaining their state.
    - Added outdated version indicator to replay pipeline cards for better visibility into which replays need updating.
    - Added replay placeholder visualization in deployment lineage view to show replay relationships in the data flow.
- Library:
    - Added missing descriptions for topic variables when configuring library items, making variable purposes clearer.
- Plugin System:
    - Enabled query parameters to be passed to plugin applications, allowing for deeper integration and context-aware plugin behavior.
- Applications:
    - Improved edit variables button with disabled state and explanatory tooltips when editing is unavailable (e.g., when app is not on latest version).
- Other:
    - Improved signup and user invite flows
    - Credentials (such as PAT token, generated git passwords) will show masked by default

`BUG FIXES`

- IDE & Applications:
    - Fixed "Failed to initialize the IDE session's git repository" error that could occur when opening applications.
- Library:
    - Fixed issue where template files located in subfolders failed to open in the UI, while root-level files worked correctly.
- Deployments:
    - Fixed deployment secrets synchronization detection - changes to deployment secrets now properly trigger synchronization warnings in the UI.
    - Fixed deployment name collision detection across environments when using workspace whitelists.
    - Fixed "View deployment details" navigation for embedded deployments to go directly to the details page instead of the embedded UI.
    - Fixed undefined error displaying in deployment build logs.
    - Fixed few edge cases where builds could fail
- Synchronization:
    - Fixed inconsistent synchronization state detection between environments, ensuring sync status is accurately reflected.
- UI & Navigation:
    - Fixed UI not refreshing automatically when projects or environments are created by other users or in different browser sessions.
    - Fixed plugin sidebar disappearing when navigating back from organization level using browser back button.
    - Fixed timestamp offset selector controls displaying incorrectly in message selection dialog.
- Build:
    - Fixed few edge cases where builds could fail

## 2025-09-data-lake-2 | 16 SEPTEMBER 2025

`IMPROVEMENTS`

- Data Lake:
    - When configuring a new Blob Storage from the Data Lake empty state we now disable the selection of the cluster as it is autoselected based on your current environment.
- Replay:
    - Improved UX on the Replay configuration dialog to provide easy access to the Advanced settings section
    - Improved the Download speed metric to show total accumulated downloaded bytes instead of speed.

`BUG FIXES`

- Replay:
    - Fixed an issue where the limit upload speed configuration on the Replay settings dialog was not saved correctly in the platform.
- Data Lake:
    - Addressed an issue where Data Catalog setup could fail if two clusters shared the same node group ID (e.g., `default`). The setup process now ensures unique identifiers to prevent conflicts.

## 2025-09-data-lake | 15 SEPTEMBER 2025

`NEW FEATURES`

- Quix Lake: Introducing Quix Lake, the new central storage layer of Quix Cloud for persisting, organizing, and replaying Kafka topic data in open formats (Avro & Parquet) on your own cloud storage (S3, GCS, Azure Blob, MinIO).
    - DataLake.Sink: Persist raw Kafka messages with full fidelity (timestamps, headers, partitions, offsets, and gaps).
    - DataLake.Replay: Stream persisted datasets back into Kafka for high-fidelity replays and simulations.
    - DataLake.API: Browse, search, and manage datasets via the integrated UI and API.
    - User Interface: Fully integrated into Quix Cloud with dedicated UIs for Datasets, Replay, and Sink setup.
- Managed Services System: Quix Cloud now includes a Managed Services layer — pre-built, Quix-maintained applications that you can deploy without managing application code, or updates yourself. Quix manages container images, versioning, and updates, while you control when to adopt new versions (latest vs. pinned). Deploy from the Quix UI or YAML with a simplified configuration model — descriptive keys replace long lists of environment variables. Provides a secure, consistent foundation for current and future managed services and connectors.
- Dynamic Configurations: Introducing the Dynamic Configuration Manager, a managed service for storing, versioning, and distributing large configuration files (JSON or binary) for devices, sensors, and physical assets. Works seamlessly with the Quix Streams SDK, which automatically fetches, caches, and joins the right configuration values with live data streams in real time. Includes a REST API and embedded UI for browsing, editing, and managing configurations. Supports multiple content stores: MongoDB (default) or object storage (S3, GCS, Azure Blob, etc.) for very large files. Typical use cases include IoT sensor mappings, industrial machinery setups, and dynamic test/lab system configurations.
- Plugin System: Introducing a new Plugin System, which allows services to expose an embedded UI directly inside Deployment Details (rendered as an iframe), and optionally add a shortcut in the environment's sidebar for quick access.
- Blob Storage Integrations: You can now connect your clusters directly to your own cloud storage buckets/containers (S3, GCS, Azure Blob, or MinIO) to enable new features like Quix Lake, Dynamic Configuration, or any service that needs a Blob Storage connection.

`IMPROVEMENTS`

- Pipeline:
    - Added toolbar buttons to zoom in, zoom out, center, fit, and reset the pipeline — useful for users without a scroll wheel on their mouse or operating system missing that functionality.
- Clusters:
    - Added new filtering options in the historical monitoring view. You can now filter metrics by Project, Environment, and Deployment for more precise analysis.
    - Redesigned the summary for shared clusters. CPU and Memory usage are now clearly displayed, even when the total capacity cannot be calculated.
- Other:
    - Added native support for AWS ECR with automatic authentication via IAM Roles for Service Accounts (IRSA), AWS Access Keys, and default credential chains. Tokens are now cached and refreshed automatically.

`BUG FIXES`

- Library:
    - Fixed an issue where filters applied in Connectors were incorrectly carried over to Services or other library views. Filters are now kept separate per section.
- Deployments:
    - Build service logs now stream from the very beginning, ensuring early steps (e.g., project build and Docker optimization) are visible in real time.
    - Fixed an issue where the deployment type marker in the deployments list was displayed incorrectly.

## 2025-08-build-time-impr | 14 AUGUST 2025

`NEW FEATURES`

- Support docker secrets for build. Previously only ARGs were supported.
- Build logs now have timestamp for each line

`IMPROVEMENTS`

- Improved error messages in several places to easier track what is causing issues
- Decreased average build time, especially for large images
- UI improvements:
    - Big and wide screens can now expand UI to span across the whole screen
    - Broker settings now displays authentication method instead of assuming
    - Improved how browser tab is named
    - State is now listed under deployment overview when enabled
    - It is now possible to select project group when creating one
    - Other minor improvements

`BUG FIXES`

- Automatic image rebuild when Quix managed image is deleted ahead of its time
- Kafka Topic authorization errors on sync now return reason rather than an internal error
- Various UI bugfixes:
    - Deployment lineage was displaying incorrectly in some edge cases
    - Add topic button no longer updates all output topics to the provided value for applications with multiple outputs
    - Clean topic no longer opens delete dialog
    - Topics in error state are no longer hidden in UI

## 2025-07-tiered-storage | 10 JULY 2025

`IMPROVEMENTS`

- Improved cluster metrics for dedicated Quix Deployment clusters environments the cluster previously showed as Shared, but was behaving as dedicated.

`BUG FIXES`

- Switching to topics view should no longer result in infinite spinner sometimes
- Refresh sync status in pipeline view should now correctly refresh
- Deprecated or missing library items should no longer cause exception while navigating around the platform or syncing.
- Fixed a validation error preventing the removal of optional output topic while the environment has a linked topic

## 2025-06-drag-and-drop | 05 JUNE 2025

`NEW FEATURES`

- Drag & Drop: Users can now reorder Projects, Environments, and Project Groups using drag & drop. Custom order is saved per user (via local storage), and Admins can set their layout as the default for the whole organization. Additionally, Projects can now be moved between Project Groups, which applies across the organization.

`IMPROVEMENTS`

- Environments:
    - Environment names can now be up to 30 characters long (previously 20).
- Clusters:
    - Improved monitoring visuals: legends are now properly sorted and X-axis dates display the correct month.
    - Improved monitoring UX: Date range inputs now prevent selecting future dates or timestamps later than the current time.
- Online IDE:
    - The IDE variables panel now automatically adjusts its default height to fit the content (up to 50% of the editor), instead of using a fixed size.

`BUG FIXES`

- Deployments:
    - Fixed an issue with the secret selector dialog not working correctly.
    - Fixed issue where FreeText variables added via YAML to Image deployments were incorrectly shown as multiline in the edit dialog.
    - Fixed a UI issue where deployments from a previous environment could briefly appear in another when switching environments quickly.

## 2025-05-monitoring | 16 MAY 2025

`NEW FEATURES`

- Clusters Monitoring: Introduced Clusters Monitoring, allowing users to track CPU, memory, disk, and pod usage across all available clusters in the organization. The UI provides a summary for a quick overview and historical visualizations with filtering, grouping, and time range options.

`IMPROVEMENTS`

- Deployments:
    - Improved environment provisioning by using a more secure and traceable method (CRD) for creating namespaces. This change enhances reliability, auditability, and access control across deployments.
    - Improved reliability when deleting pods during delete deployments by preventing cluster operations from hanging indefinitely.
    - Improved performance and stability of deployment logs by limiting how much log data can be retrieved at once and how many log requests run at the same time.
    - Improved handling of out-of-resource errors during deployment.
- Topics:
    - Topic creation uses now one less in-sync replica than the total number of Kafka cluster replicas. This gives more flexibility and helps avoid outages when one broker goes down.
    - Topic management service can now better detect when Kafka is unreachable or times out, preventing operations from getting stuck in a pending state.
- Projects:
    - Optimized sync process to avoid marking the environment as "Failed" when the first operation fails and results in no changes.
- Other:
    - Added support for handling External Source and External Destination definitions directly in the YAML to ensure they persist correctly after syncing.
    - Added the ability to edit cluster name and description in the Environment settings.

`BUG FIXES`

- Online IDE:
    - Sessions now fail faster when resources aren't available, with clearer error messages to help users understand and resolve the issue more easily.
    - Improved resource handling for IDE Sessions Service to address high CPU spikes and excessive memory usage, ensuring more stable performance during usage peaks.
    - Resolved an issue where IDE sessions could crash if the project's Git reference wasn't properly set.
- Deployments:
    - When a deployment is updated to remove state management, the associated state configuration is now correctly cleared from the database.
    - Fixed an issue where deployments from commit history were not correctly using the selected commit reference.
- Topics:
    - Fixed an issue where updating a linked topic's workspaceId using a YAML variable showed the correct changes in the Sync dialog but failed to persist them in the database.
    - Fixed an issue where real-time metrics failed after increasing the number of partitions
- Scratchpads:
    - Fixed an issue where locked Scratchpad deployments without multiline settings could block sync operations.
    - Updated the Scratchpad topic selection to display only linkable topics, avoiding errors on synchronization.
    - Addressed a problem where deleting a locked deployment from YAML didn't remove it from the database.
    - Relaxed locking conditions in the Scratchpad graph to prevent unnecessary deployment locks.
- Projects:
    - Fixed a problem where users with Manager role couldn't sync projects due to lacking access to organization container registries.
- Other:
    - Fixed an issue where the secrets management dropdown appeared in the wrong location when configuring connectors

## 2025-04-private-registry | 08 APRIL 2025

`NEW FEATURES`

- Private Container Registries: Now you can deploy images from your own private container registries by configuring registry credentials securely on your organization's Settings page. This feature supports both using private images as a base image in your Dockerfiles and deploying external images directly. Credentials configuration includes authentication via BasicAuth or Token.
- Auxiliary services: We've added a new section to the Application Library called "Services" (aka Auxiliary Services). These are lightweight, ready-to-use containerized services (such as Redis Cache, Prometheus, Grafana, and more), complete with default configurations. Auxiliary services can be easily integrated into your pipelines to enhance and simplify your deployments.
- Multiline FreeText variables support: You can now use multiline input for FreeText variables across Library Items, Applications, and Deployments—perfect for configuration blocks like connector properties. This update introduces Multiline Text Areas for easier editing, Toggle for Multiline Mode in the Online IDE Variables dialog, and Smart Display that limits visible lines by default and expands on demand.
- Clean topics: You can now clean the content of topics without needing to delete and recreate them. This new action allows you to remove all messages from a topic, keep the topic configuration and references intact, and perform this action on individual or multiple topics.

`IMPROVEMENTS`

- Projects:
    - Several UX improvements were applied to the YAML variables editor.
    - Edit YAML button now automatically opens the code editor when triggered from a synchronization error.
- Deployments:
    - Improved the visibility of errors for Failed deployments directly in the UI. Now, when a deployment fails, a clear retry button and informative hover hints are displayed.
    - Added the ability to directly Edit Variable from the Deployment detail page with just one click, streamlining your workflow and improving efficiency.
    - Improved deployment metrics with faster updates and better support for multiple clusters.
    - Added an option to start new deployments in a "Stopped" state by default when syncing environments. This allows users to manually start deployments when they're ready.
- Applications:
    - Added support for default State configuration in Library items (Connectors, Services and Templates).
- Topics:
    - Updated retention time formatting: decimals are removed, durations over 24 hours are shown as "X days Y hours", and durations over 2 days are rounded to "X days".
- Other:
    - Added CLI support for managing cloud secrets, offering the same functionality that is available in the Quix Cloud.
    - Improved the UX of form errors and hints, ensuring consistent spacing and alignment for better readability and a cleaner look when multiple errors are displayed.
    - Updated font weights across the platform for better alignment with the design guidelines.
    - Cluster ping times are now more accurate by using a faster and lighter health check method.

`BUG FIXES`

- Projects:
    - Fixed an issue where cancelling the creation of a Project Group would still create it.
    - Fixed a bug where default values for project variables were not always shown properly in the variables list.
- Applications:
    - Resolved an issue where users could run applications via the Run button in the Online IDE without setting required secrets.
    - Online IDE now correctly fails application updates that introduce duplicated variables, preventing invalid configuration in `app.yaml`.
- Deployments:
    - Fixed an issue where applications using library items with required secrets could be deployed or run without those secrets being provided.
    - Resolved an issue where deployment logs were not available after a deployment crash.
    - Fixed an issue where downloading logs from real-time logs did not select the correct replica.
    - Fixed a bug where deployments proceeded even when required secrets were missing, ensuring deployments now fail gracefully with appropriate validation.
- Topics:
    - Fixed incorrect linked topic validation when deploying Library items.
- Other:
    - Fixed overflow issue in the cluster dropdown to prevent UI clipping of long text values.
    - Improved system stability by addressing socket exhaustion issues caused by excessive or long-running backend calls.

## 2025-03-multicluster | 20 MARCH 2025

`NEW FEATURES`

- Multicluster v2: We've introduced support for multiple dedicated clusters and dedicated Kafka clusters across different regions. Each environment can now be assigned to a specific dedicated cluster and broker, providing greater flexibility in performance, isolation, and compliance requirements. We've also added the ability to run dedicated nodes in limited-connectivity environments (e.g., on-prem). The Quix control plane can now detect connectivity issues and proactively inform users about the health and status of their dedicated clusters. These features have been expanded to both Quix Enterprise customers and the Quix Cloud Business tier.

`IMPROVEMENTS`

- Topics:
    - Added support for keyboard navigation in the topic message explorer. Users can now use the up and down arrow keys to navigate messages efficiently.
- Other:
    - Enhanced exception messages when attempting to delete an application with an active IDE session.

`BUG FIXES`

- Pipeline:
    - Resolved the error "Unexpected error occurred" preventing environment synchronization due to incorrect ordering of deployment variables in the YAML file.
    - Resolved an issue where the environment was not correctly preselected when creating a scratchpad from an environment.
- Applications:
    - Resolved an issue where the public URL for IDE sessions was incorrect.
- Deployments:
    - Addressed a timing issue where historical logs did not refresh correctly after stopping a deployment.
- Topics:
    - Resolved an issue where SDK-generated topics were not being filtered out when importing linked topics, ensuring only relevant topics are displayed.

## 2025-02-project-groups | 27 FEBRUARY 2025

`NEW FEATURES`

- Project Groups: Projects can now be organized into predefined groups set in Organization Settings for consistency. These groups appear in the Organization Overview when you assign a Project to a specific group in Project Settings, making project management clearer and more structured.
- New "Timestamp" Offset Type in Messages Explorer: We've added a new offset type, "Timestamp", to the messages explorer. This option works similarly to the Custom offset selection but allows users to select messages based on a specific timestamp instead of manually entering an offset.

`IMPROVEMENTS`

- Projects:
    - Improved the tab environments dropdown UI to handle multiple environments without breaking the top bar layout.
- Deployments:
    - Updated the deployment dialog settings to allow users to modify the ImageURI when editing a deployment.
- Topics:
    - Added a dropdown next to the topic name in the topic detail page header, allowing users to easily switch between topics.
    - Added support for bulk deletion of topics. This feature is accessible via the three-dot menu, which activates checkboxes for topic selection and updates the top bar with relevant actions.
    - Introduced the new `unmanaged` property in `quix.yaml`, ensuring that topics marked as `unmanaged` are treated as external. This prevents Quix Cloud from creating, modifying, or deleting these topics, enforcing stricter control over externally managed topics.
    - Added the ability to view Headers of messages in the Topic Explorer, providing more visibility into message metadata.
    - Improved Topic Explorer performance by optimizing bound reading to fetch all latest offsets for partitions in a single query.
- Other:
    - Adjusted the notification position to prevent overlap with call-to-action (CTA) buttons, ensuring better accessibility and visibility.
    - Introduced a new post-deployment wizard for the HTTP API Connector, guiding users to send test messages easily. The wizard includes a message box, example code for multiple languages, and a link to the Swagger interface for API exploration.

`BUG FIXES`

- Pipeline:
    - Resolved an issue where deployments using SharedFolders were incorrectly marked as outdated in the pipeline view.
    - Fixed an issue where the YAML variables list did not correctly display default values when environment-specific values were null or empty.
    - Resolved an issue where the "Deploy External Image" option was not displayed when no applications were available.
    - Fixed an issue where an undefined topic in the pipeline would cause it to break.
- Applications:
    - Fixed an issue where paths were not automatically converted to lowercase and spaces were not replaced with hyphens when deploying from a library item.
    - Fixed an issue where duplicating a project with a shared folder did not retain the shared folder reference.
    - Resolved an issue where the Online IDE editor did not refresh the content of the currently selected file after pushing a local commit externally and pressing refresh.
- Deployments:
    - Resolved inconsistencies in deployment metrics, ensuring consistent CPU and memory reporting across different statuses.
    - Fixed an issue where deployments remained stuck in 'Deploying' status by improving event consistency handling.
    - Fixed an issue where Shared Folders were not correctly resolved during deployments in Quix Cloud, causing build failures when accessing subdirectories.
    - Resolved an issue where public URL links for deployments incorrectly redirected to the root or displayed 'undefined' instead of the expected destination.
- Topics:
    - Resolved an issue where clicking on the icon of a data tier in the selection dropdown did not properly select the item.

## 2025-01-02-shared-folders | 29 JANUARY 2025

`NEW FEATURES`

- Shared folders: We added support for code reuse across multiple applications within the same project. Users can now declare shared folders in the app.yaml, enabling shared code to be available in the build process. Additionally, we introduced UI components that allow users to easily configure included folders directly from the Online IDE.
- Disable Deployments: New options to Enable/Disable deployments. When a deployment is disabled, it remains in the pipeline but is not provisioned in the infrastructure. Additionally, an optional property (`Disabled`) has been added to the `quix.yaml`, allowing dynamic configuration per environment via YAML variables.
- Pipeline filters: Introduced options to hide standalone and disabled deployments, helping users focus on active and relevant deployments in the pipeline flow. These preferences are stored locally for a personalized experience.
- Dedicated Compute Nodes: Business Cloud users can now request Dedicated Compute Nodes, ensuring exclusive access to resources in specific regions. This feature offers enhanced performance, private networking, and control through a unified control plane.
- Dedicated Brokers: Introduced the ability to provision and configure Dedicated Brokers tied directly to your Dedicated Compute Nodes. This provides optimized messaging performance and seamless integration with your dedicated infrastructure in specific regions.

`IMPROVEMENTS`

- Pipeline:
    - Added a hover effect on deployments to highlight output topics and their corresponding destination deployments for better clarity.
- Deployments:
    - Added the Quix__Deployment__Network__PublicUrl variable, which provides the public URL assigned to a deployment when public access is enabled. This allows for easy reference to externally accessible endpoints.
- Applications:
    - Improved Suggested Folder Names for New Applications. Folder names are now automatically formatted by converting spaces to "-" and changing uppercase letters to lowercase.
- Topics:
    - Added previous and next navigation buttons when using Custom Offset Selection in Topic Messages. These allow users to browse messages efficiently based on the Max Results setting.
    - Enhanced the edit boxes on Topic configuration dialog to support larger numbers when limits are set to infinite, removing unnecessary restrictions.
    - The default retention time is now infinite for Quix-managed brokers, aligning with existing retention size limits.
- Online IDE:
    - Markdown files (.md) now automatically render in the Online IDE, providing a better reading experience.
- Other:
    - Added a refresh option to the Environment bar, allowing users to manually update the synchronization status.
    - Added the ability to edit the organization name from the Organization Settings.
    - Optimized the branch creation process to handle large repositories more efficiently.

`BUG FIXES`

- Projects:
    - Resolved an issue where linked topics with an external source were incorrectly propagated to the destination project.
    - Fixed an issue where selecting "Use existing repository" during project creation reverted to "Create New Git Repository" and a bug where the SshPublicKey was not sent, preventing environment creation.
- Deployments:
    - Fixed a bug where jobs incorrectly moved to Completed status instead of Running. Jobs will now properly reflect their execution state.
    - Resolved an issue where deployments locked by the Scratchpad prevented updates. Users can now modify versions and other settings without triggering an exception during a synchronization process.
    - Resolved an issue where changes to build arguments in the Dockerfile were not triggering a new build.
    - Fixed a bug where deployment details would switch to another deployment's details when the platform received an update notification.
    - Historical Logs are now stored as compressed files with accurate line counts, improving efficiency and consistency.
- Topics:
    - Resolved an issue where non-JSON messages caused incorrect broker timestamps in Messages views.
    - Fixed a bug where Live Messages always sent data in the Quix format instead of preserving the original message.
    - Fixed an issue where missing partition leaders resulted in UI errors during message exploration.
- Online IDE:
    - Fixed an issue where updates to secrets in the Online IDE were not detected automatically, requiring a session restart.
    - Editing code in the Online IDE is now restricted in Protected environments.
- Other:
    - Fixed a bug where creating a new branch from the Change Branch dialog would close all dialogs without applying the branch change.
    - Fixed an issue where CLI setup instructions were incorrect for environments other than the default Serverless platform. The setup flow now includes an additional step to configure the correct API endpoint when needed.

## 2025-01-01-bug-fixes | 07 JANUARY 2025

`IMPROVEMENTS`

- Enabled Latest Deployments version feature to Submodules.

`BUG FIXES`

- Fixed several issues with Linked topics working together with limited permissions.
- Fixed a bug causing a bottleneck in the Streaming Reader service when handling a large number of parameter names, impacting the Waveform and Table views.
- Fixed issues with refreshing consumer group states and retrieving consumers without commits in the topic.
- Fixed an issue where operations executed via YAML were not registered in the Audit.
- Fixed an issue where Quix reports were not generated since the latest release.
- Fixed an issue where topic updates occasionally failed to propagate properly to the database, causing discrepancies between the Infra and backend.
- Fixed an issue where Topic Retention Minutes was set to 0 for very low retention values (less than 1 minute), causing topic configuration failures in the portal.
- Fixed an issue in the User Service where deleting service accounts failed due to a null value in the authorization ID.

## Changelog archives

* [2024](./2024-archive.md)
* [2023](./2023-archive.md)
* [2022](./2022-archive.md)
