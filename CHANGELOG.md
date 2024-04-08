# Quix product changelog

This is the product changelog for the current year. 

See [here](https://github.com/quixio/quix-docs/wiki/Docs-Releases) for the docs changelog.

## Changelog archives

Changelogs for previous years can be found [here](#changelog-archives).

* [2022](./changelogs/2022-archive.md)
* [2023](./changelogs/2023-archive.md)

## 2024-04-02 | 08 APRIL 2024

`BUG FIXES`

- Secrets were being filtered by environment
- Variables weren't updating in the deployments dialogue
- External topics weren't being recognised by new deployments

## 2024-03-02-topic-details-hf | 13 MARCH 2024

`IMPROVEMENTS`

- Topics
    - Improved performance and memory consumption in Topics message browser feature

`BUG FIXES`

- Fixed "Missing 're-captcha-response' header" error
- Non-admin users were losing some permissions after editing their name
- Fixed an error where Users couldn't modify their name
- Topics message browser feature was not showing RAW messages produced by Quix Streams v2
- Fixed some errors caused by some Deployment builds being deleted prematurely
- Fixed an error where users couldn’t introduce new YAML variables in quix.yaml before creating the variable in the environment.

## 2024-03-01-topic-details | 04 MARCH 2024

`NEW FEATURES`

- Topics
    - Topic detail view: Users can explore information and data on a centralized topic view.
    - Topic messages browser: Added new options to query data of the topic from Newest, Oldest, or Custom Kafka offsets.
- Deployments
    - Real-time build logs: view build logs in real time during the build process.
- Users
    - Audit information: admin users can now get audit information of users actions via Quix CLI
- Other
    - Added Upstash broker type on the available message brokers integrations

`IMPROVEMENTS`

- Topics
    - Checkbox for toggling *Topics* view to filter by `Compacted topics`
- Code samples library
    - Added support for secrets input type in Code samples library items
- Personal Access Tokens
    - Sort by state: active/expired/revoked
    - Added ability to update token permissions via Quix CLI
- Applications
    - User can now modify `app.yaml` from the IDE
- Secrets
    - Added *unsaved changes* modal
    - Updated error UI of invalid secrets
- Deployment Details
    - Error icon for when application associated with deployment does not exist
    - Use `RAW` icon for messages with unknown types
- YAML
    - Added Default column on YAML variables so that they can be used on a Project-wide scope
    - Added `latest` version support for Deployment. Sync process will keep the deployment updated with the latest version of the code available in the branch of the environment.
    - Starting/stopping a `service` deployment no longer creates a commit in the YAML
        - Use `DesiredStatus: Running` or `DesiredStatus: Stopped` to define the default running status
- Pipeline
    - Pipeline boundaries updated to prevent user getting lost
- Users
    - Return email verification link on sign up: Icon in user table, that contains email verification link, when inviting users to an organisation.
    - Landing page for when a user is not an authorized user of the portal
    - Added validation when creating a Personal Access Token
    - Hide user update notifications
    - Remove email from url when redirecting from the signup confirmation
    - Added timezone to maintenance page
- Other
    - Improved Git service behavior when dealing with big files. Now it will fail before filling the memory of the service.
    - Reduced the number of calls Git service is doing to the remote relying now more on manual pulls instead of periodic pulls.
    - Printing full errors returned by *GIT*
    - Drag supported on onboarding carousel
    - Disabling/deleting an environment doesn’t kick you out of a *Project* anymore
    - Pressing `enter` key in dialogues now invoke primary CTA
    - Reinstated middle-click functionality for links (to open in a new tab)
    - Alignment of variables displayed in *Applications* and *Deployment details*
    - Added *Environment name* to error notifications to idenfity which *Environment* the error originated from
    - Updated external Kafka setup guides
    - Minor UI styling and alignment fixes
    - Minor spelling and grammar fixes
    - Added loading spinners on various CTAs to improve visiblity of click feedback

`BUG FIXES`

- Applications
    - Modifying a variable now loads app.yaml file again
    - Switching to a V1 project was trying to call V2 endpoint
    - Switching to another environment was trying to open the same application in the other environment (returns error if the application doesn’t exist)
    - Clear *secret key* input field when switching application vairable to a *secret*.
    - Send session setup with `force` when user clicks “Install dependencies”
    - `Run` should not move vertical scroll in the code editor
- YAML
    - Disable editor when saving changes
- Topics
    - Changing retention to a non-numerical value causes the field to be empty
    - If topic update/create fails, users were unable to revert their changes
    - Fixed an issue when deleting and recreating a topic using the same name
- Data explorer
    - Query selector
        - switching topic causes the selected streams to disappear but look selected
        - Location dropdown selection was behaving weirdly
        - Double `x` icon in stream selection
        - *Persist* option disappears if it triggers *out-of-sync* modal
        - If *search* returns no results, *next* button is disabled, even if there are streams selected (The modal thinks nothing is selected)
        - If *search* returns no results, the empty-state text displayed was incorrect
    - Code is not resizing when resizing the panel
    - Toggling *aggregation* sometimes rendered an empty waveform
- Code samples
    - *Create* *application* was calling *projects* (v1) endpoint
- Pipeline
    - Disable sync button for ungated users
    - Draft applications with no input and output were not visible
- Deployment details
    - Previous logs from a crashed deployment were not retrieved correctly
    - Clicking cancel on a docker file download caused it to be stuck in a loading state
    - Clicking *edit code* was navigating to latest version, not the deployed version
    - Missing tooltip when topic metrics were loading
    - Deploying was not navigating user to deployment details
    - Paginated scrolling in logs were not working
    - Refreshing the page in an external source/destination was rendering a blank screen
- Deployment modal
    - “Missing secret” still visible, even after adding said missing secret
    - Disabling statesize should not trigger a `Reducing StateSize is not allowed` error
- Ungated demo
    - Urls weren’t navigating user directly to a workspace
    - Disable sync button on header
    - Banner height was pushing content off the screen
    - Cloning a template while logged into the platform in another tab cause the other tab to reload in a half-ungated state
- Persisted data
    - Dialogue was not appearing when *unpersisting* a topic
    - Updated empty state and disabled next &
- Users
    - Disable email field if you are editing your own user
    - *Disable account* dialogue CTA was stuck in loading state
    - UI getting stuck on loading screen during onboarding
    - Removed link to *billing* on “Payment confirmed” modal during onboarding
- Other
    - Various external links fixed
    - Local storage issues causing `undefined` for repository/workspace ID arguments in network calls

## 2024-01-06 | 30 JANUARY 2024

`BUG FIXES`

- Replay service now replays the locations
- Telemetry writer memory fix

## 2024-01-05-workspace-services | 19 JANUARY 2024

`BUG FIXES`

- Fix workspace services misbehaving with excessive amount of split messages
- Fix message split in replay service

## 2024-01-04-permissions-hf3 | 19 JANUARY 2024

`BUG FIXES`
 
- Fix parameters/events not persisting metadata when no root parameter/event was present

## 2024-01-03-permissions-hf2 | 17 JANUARY 2024

`BUG FIXES`

- Updated top banner for ungated users
- Added some icons on the pipeline empty state
- Fixed an issue where all PAT tokens were getting fewer permissions than expected
- Fixed an issue where some Import projects failed when you had an existing Repository with the same name.

## 2024-01-02-permissions-hf | 15 JANUARY 2024

`BUG FIXES`

- Users
    - The ungated experience was not selecting the workspace correctly from the marketing side.
    - Invited users with limited permissions were getting always an onboarding screen.
- Permissions
    - Fixing tokens that are stored in user service to use proper permissions instead of blanket all.
    - Fixing the migration process. SDK tokens only have access to the workspace they belong to.

## 2024-01-01-permissions | 15 JANUARY 2024

`NEW FEATURES`

- New Import templates feature
    - Existing and new users can now import Project templates directly from https://quix.io/templates
- Quix CLI (alpha version)
    - Available the first version of the Quix CLI
    - Try it out from here: https://github.com/quixio/quix-cli
- Permission system (CLI only)
    - New permission system allowing granular permission using roles such as Admin, Manager, Editor and Viewer on platform resources like Environments and Projects. More information here: https://quix.io/docs/get-started/cli.html#setting-permissions
- Added support for Git-Submodules on our Git integration
- Private Code Samples support for BYOC clusters
- Project settings refactor
    - Simplified navigation
    - New danger zones for disabling/deleting environments
    - Secrets management options
- Sync: Missing YAML variables and missing Secrets wizards
    - Detect missing YAML variables and Secret before the synchronization process starts
    - Allow add them automatically from new wizard dialogs.
- Help & support bubble
    - New menu in the bottom right corner for help and support options
    - New option to allow users to take screenshots of issues and submit them directly to us within the platform
- Topics updates
    - New options to Update existing topic configurations from the UI
    - New property cleanupPolicy to set the Cleanup policy of a topic as Delete or Compact.

`IMPROVEMENTS`

- YAML
    - Improved several empty states related to YAML and Out of Sync status
    - Improved grid component behavior on Secrets and YAML variables options
    - Improved supplementary message on YAML syncing with 0 changes to inform the user that no changes are made during sync
    - Editing YAML retains carat position (if you click on the YAML section you want to edit before you click edit, then we take you there)
    - Added search box on Secrets and YAML variable management options
- Deployments
    - Improved error handling and PVC cleaning
    - Improved deployments stop monitoring to avoid zombie pods
- Topics
    - Increased Topic name max length to 205 characters
    - Improved Messages tab experience retrieving always the last 50 messages of the topic when the user subscribes.
- Environments
    - New option for environment renaming
    - Sorting environments in Project cards based on status - moved “non-ready” envs to the bottom
    - Reversed target/source order in Merge request option
    - Git warnings will only appear for the environment you have selected
- Builds
    - Added priority system to Build service
- Applications
    - Improved error handling for Applications with a wrong app.yaml format
- Others
    - New modal dialogs for protected and unauthorized actions for Guest users
    - Improved Code samples and view/deploy pages
    - Improved Replays status and error management
    - Improved Self-hosted kafka validation to fail when the user doesn’t have enough permissions to describe all the topics available
    - New Maintenance page for when we need to take the site down
    - Various loading spinners on CTAs to improve click-action feedback
    - Enabled “+ Add new” button in Topic input field
    - Updated tab names related to domain changes
    - Minor UI color and spacing
    - Capitalization across platform
    - Allow Trial period increase for non Trial users

`BUG FIXES`

- Organisation Homepage
    - Prevent “undefined” repository issue when switching in and out of projects too quickly
    - Prevent “login required” error in ungated experience
- Pipeline
    - Changing topic on a deployment wasn’t updating the pipeline view
    - Adding replays from placeholders didn’t use the correct topic
    - Link for *Public URL* on deployment cards weren’t pointing to the *Public URL*
    - Incorrect pipeline positioning when switching workspaces
    - Some flickering was happening when loading the pipeline view
    - Application changes were not updating pipeline view correctly
- Builds
    - Added support for docker images to work both locally and remotely
- YAML
    - *YAML* was appearing in edit mode when *YAML* was loading
    - Switching environments when viewing the *YAML* was not updating the environment variables in the *variables* tab
    - Error in sync dialogue was clipping code
- Deployments
    - Improved “skipped” message in *Messages* tab
    - Messages from input topic were appearing eventually in output topic table
    - State management slider is accessible when editing a deployment
    - Deployment dialogue sliders for *CPU* and *Memory* were using the wrong increments
    - *CPU* and *Memory* metrics weren’t cleared when switching to a stopped deployment
    - Destinations were appearing as Transformations in *Lineage* views
    - Improved some error messages regarding Public URL format
- Applications
    - Uploading and replacing file wasn’t working properly in some edge cases
    - Progress bars on *replays* in the *Lineage* tab weren’t moving
    - Heartbeat connection was not reconnecting after disconnection, and it was calling to a V1 endpoint
    - Topics were not being created properly when user was adding variables
    - IDE no longer scrolls to the top after committing changes to a file
    - External link appears when you click run
    - File tree interactions fixes when adding files/folders on the online IDE
    - Non-topic variables appearing in messages tab topic dropdown
    - Application variables updating currently deployed variables in redeploy dialogue
    - Installed dependencies weren’t appearing in the console
    - Fixed timeout issues when opening IDE sessions and there is no idle session available
- Topics
    - “Topic created” notifications weren’t taking the user to the *Topics* page
    - Fixed topic quota logic when using external topics
    - Fixed an issue where the Persisted property where not propagated correctly when synchronizing a new environment
- Data Explorer
    - Refresh button wasn’t updating waveform timeframes on Persisted data
    - Duplicated entries in Messages option
    - Live data was stuck on loading when navigating after leaving it in a *paused* state
    - Waveform was disappearing in some cases if you came from *Live data*
- Code samples
    - If searching with a filter applied yields no results: empty state message and CTA changed to ***clear*** applied filters
- Other
    - Fixed swagger documentation for some endpoints where the Request body was missing in the Streaming Writer service
    - Fixed an error cleaning Streamings from the database when StreamId contains special characters
    - Fixed some error UI guards that were falling over
    - Various component-interaction console errors have been fixed
    - Error messages kept visible in various dialogues of the UI
    - Restricted some reserved organization names that were causing issues in some internal services
    - Various UI width fixes
