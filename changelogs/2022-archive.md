# 2022 changelog archive

## 1.43.0 | 3 NOVEMBER, 2022

`NEW FEATURES`

* New Replay service feature! Users can replay any persisted stream to a Topic as if it was happening now. This feature has been added on Persisted Streams, Pipeline view and Deployment details pages.

* Added new advanced configuration on Topics page. Users can now specify Retention and Partitions configuration when creating new Topics.

* Added new Run configuration on Projects IDE. Users can now specify different environment variable values in each Run of the application without changing default values of the Environment variables.

* Added new Deployments list view on workspace home page.

* Added new External Destination item to the library to signal when a pipeline is sending data to an external system.

* Allow users to save code as a project from the Library, even if they haven't completed the library item setup and configuration.

`IMPROVEMENTS`

* Several performance improvements across the platform.

* Added AWS support. Platform is now compatible with Elastic Kubernetes Service (AKS) installation.

* Added (*) star functionality to the Streaming Reader service. Users can now subscribe to all the Streams, all the Parameters or all the Events of a Topic.

* Improved several error statuses on Topics page.

* Several improvements in the Project IDE regarding file selection, tags and commits navigation.

* Updated Quix logo on the platform (we have a new brand!)

`BUG FIXES`

* Fixed some refresh issues when changing Input/Output variables on Project IDE

* Fixed some visualization issues on Topic metrics component

* Fixed an issue in Data Explorer where null values were shown as 0 instead of null

* Fixed an issue in Data Explorer (Live view) where null values were not drawn properly in the waveform

* Fixed several empty states across the platform

* Fixed an issue in Persisted Streams when filtering by location

* Fixed some issues when selecting/unselecting Drafts on Pipeline view

* Fixed some issues on Data Explorer (Live view) when filtering for specific Stream / Parameters

* Fixed some issues working in Project IDE editor

* Fixed some issues when navigating to a specific branch from Deployments to the Project IDE

* Fixed an issue with the URL link of a deployment with public access

* Fixed an issue where you couldn't delete a User from the workspace

* Fixed some refresh issues on Pipeline view

* Fixed navigation issues on workspace Home

* Fixed some issues updating logs in real time from Project IDE

## 1.42.0 | 2 SEPTEMBER, 2022

`IMPROVEMENTS`

* Added the capability to resize tables across the platform

* Improved sorting for topics list

* Improved several empty states across the platform including a new empty state for the pipeline view

* Improved performance and database calls when querying persisted data

* Updated the look of some older dialogs

`BUG FIXES`

* Fixed an issue where the login and logout functions didn’t always log you in or out

* Streams with the same ID on different topics are now treated independently for Delete and Restore actions in the persisted streams section

* Fixed several bugs related to topics metrics graphs across the platform

* Explore button in persisted streams now clears previously selected parameters and events

* Fixed a bug in the data explorer section that cleared user aggregation selection

* Fixed a bug in the data explorer section in which the table view showed more columns than expected

* Fixed several issues in the data explorer section’s live data view

* Fixed minor issues for those using a Firefox browser

* Fixed UI responsiveness issues when using long topic names

* Fixed UI responsiveness issues when using small screens

* Fixed an issue that caused installation of previous dependencies when modifying requirements.txt file for Python projects

* Fixed an issue that caused the onboarding questions to appear more than once

* Fixed a bug in the library section that caused environment variables to not be created correctly when saving as a project

* Fixed topics section in broker settings — you should now be able to rotate your tokens if you are an admin

## 1.41.0 | 11 AUGUST, 2022

`NEW FEATURES`

* We completely redesigned the data explorer query builder. It’s now topic centric, making it easier to use

* Persisted streams view redesigned with a new look and topic centric view

* It’s now possible to give external sources additional context by renaming them

* External sources now have a dedicated view to help you get going with our APIs

* New elements on cards and pipeline views are now highlighted and centered on the screen to improve ease of use

* List view updates are already automatically synced, but we’ve added a new refresh button just in case

`IMPROVEMENTS`

* We’ve updated the dialogs across the platform to have autofocus and key responsiveness. They now also share a consistent design

* The “copy to clipboard” behavior functions more consistently now

* Improved performance of topic data metrics graphs across the platform for better observability

* The deployments layout has changed to help differentiate between items created from project or library

`BUG FIXES`

* We fixed an issue that caused pipeline view to not render in some cases.

* Notifications should now respect the workspace they belong to rather than showing the current workspace

* In live view the messages can be searched again even when live flow is paused

* Data query service will return a 400 message for invalid requests rather than a cryptic 500 error message

* Project rename is possible again

* Several bugs in the data explorer and query builder are now fixed for a smoother user experience

## 1.40.0 | 26 JULY, 2022

`IMPROVEMENTS`

* The topics screen has a new design so that it’s easier to use — let us know if you like it!

* Quix onboarding is now more responsive to your screen size

* The library now has a landing screen to help new users navigate it

* Fixed a scenario where external sources showed up unnecessarily in the pipeline view

* The platform header now includes improved help

* The billing page now displays prices in USD

`BUG FIXES`

* Removed the extra scrollbar that appeared in some library items

* Ensured that files always show content in the library

* Fixed an issue with notifications appearing multiple times

* Deployment states on the home screen should now constantly update properly, not just the first time

* Inactive topics lacked a tooltip on the home screen and deployment details. We rectified that.

* Broker details now include the list of brokers

* Deployment edit/create dialog no longer allows creating deployment without loading all details of the new version first. This primarily impacts slower connections.

## 1.39.0 | 5 JULY, 2022

`IMPROVEMENTS`

* The live data preview can now handle an enormous number of parameters and streams so that your computer doesn’t sweat so much

* The navigation experience now works better on slower networks. No more accidentally landing where you don’t want to be

* The live preview is now disabled if no live data is running

* The data-explorer errors are now easier for humans to understand them

* Scrolling horizontally in the library code preview is now easier

* Draft loading improved in the home and pipeline view

* Streamlined library flow to clarify code preview and how to modify it

`BUG FIXES`

* Users can now select non-Python code generation in the live preview

* The time-range dialog now consistently shows the correct values

* Creating a deployment from the project source view now consistently selects the correct project

* The waveform now works better with configurations that result in more data than what can be displayed

## 1.38.0 | 27 JUNE, 2022

`IMPROVEMENTS`

* Copying error notification details now appends additional details to help identify issues faster

* Deployment and projects are now set as the title of the browser tab making it easier to keep track of your tabs

* Users receive a warning when losing connections to notifications, and now they will receive feedback when reconnected

* The delete dialog now behaves similarly to all resources

* The data explorer now has an historical and a live mode

* The live mode was previously accessible only through other means, and the new modes make the user experience easier

* In the online IDE, switching files will no longer abort the running Python application

* Added new information tooltips to help guide users

`BUG FIXES`

* The stop button no longer disappears in the deployment details view

* Deployment public access toggle now loads its state when opening deployment details

* Small visual and performance improvements across the Quix portal

* Zooming in too far no longer locks up the UI in data explorer. Now you can zoom back out.

* Fixed the deployment card, which did not always open the expected library item

* Fixed project delete notification, which showed incorrect information

## 1.37.0 | 15 JUNE, 2022

`NEW FEATURES`

* We love feedback. Thanks to suggestions from users, the data explorer now has an option to enable or disable aggregation for all parameters with a single toggle.

* The table and message view — previously available only in deployment details — is now also available in the live topic explorer.

* The live topic explorer now follows the leading edge of a topic instead of being limited to the current time. This lets you see data sent to a topic with times other than current, such as replays.

`IMPROVEMENTS`

* Improved documentation with new tutorials

* Users can now click on the “Select” and “From” titles are now clickable in the data explorer, same as the icons next to the text

* When selection allows, data points on waveforms are now highlighted

* Online IDE dependencies can be forcefully reinstalled using a new entry in the “…” menu next to deploy and run

* Notifications received design and stability improvements

* Improved load state for the data explorer. It now lets users know when it’s loading.

* Improved hover states for arrows in pipeline and lineage views, displaying data to users better

* Sliders in deployment dialogs should display the correct maximum value of your subscription

* Improved the live view of empty states. It now tells users that it’s empty and prompts them for action.

* The data explorer waveform now correctly displays gaps in data instead of interpolating value for the missing range

* Improved the data explorer load times for selecting parameters, events and streams

* The auto-refresh button is now above the waveform in the data explorer

`BUG FIXES`

* The pipeline view now consistently renders as expected in Safari

* Fixed an issue where some workspace cards sometimes overlapped

* The onboarding questionnaire no longer asks questions twice

* Various small changes across the platform to improve the user experience

## 1.36.0 | 18 MAY, 2022

`NEW FEATURES`

* We added a pipeline view to the Quix portal. Now you can see your entire process — from sources through transformations to destinations — in a single glance. Having your architecture depicted in one image expedites monitoring and alleviates the pain of building on top of the current system.

* You can now view parameter data in table format in addition to JSON in the live data view. This makes larger messages easier to understand.

`IMPROVEMENTS`

* The edit deployment dialog has been redesigned to make it easier to use

* The autocomplete for hidden texts in the Quix library has been disabled

* Users now receive a dialog message when losing connection to notifications

* Reaching a deployment limit is now properly communicated through notifications, so you won’t be left wondering why deployment failed

`BUG FIXES`

* Clearing trash via the “Empty trash” button should now always work

* Fixed an issue that sometimes stopped deployments from automatically starting after creation

* The data view under deployment details and online IDE immediately shows the missed messages accrued when changing from “paused” to “live” rather than waiting for the next message

* Fixed the incorrect history that showed when switching between branches

* Parameter groups now have a correct icon in the data view
