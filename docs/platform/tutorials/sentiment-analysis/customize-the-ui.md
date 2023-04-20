# Customizing the Sentiment Demo UI

In this optional tutorial part, you learn how to customize the Sentiment Demo UI.

If you want to customize the Sentiment Demo UI, you would follow three main steps:

1. Create the new project from the existing UI code.
2. Modify the code in your next project as required to customize the UI.
3. Deploy the modified UI.

## Create the project

1. Navigate to the Samples and locate `Sentiment Demo UI`.

2. Click `Preview code` and then `Edit code`.

3. Ensure that the `sentiment` input box contains `sentiment`.

	This topic will be subscribed to and will contain the sentiment scores from the sentiment analysis service, you'll deploy this in a later part of this tutorial.

3. Ensure that the `messages` input contains `messages`.

	- This topic will contain all the chat messages.
	- The UI will subscribe to this topic, to display new messages, as well as publishing to the topic when a user sends a message using the 'send' button in the UI.
	- Later, the sentiment analysis service will also subscribe to messages on this topic to produce sentiment scores.

3. Click `Save as project`. 

	The code for this Angular UI is now saved to your workspace.

You have created the project and you can now modifiy the code as required.

## Modify the code

At this stage if you want to customize the code you can do so. You can also deploy what you have and customize it later by repeating the steps in the following section.

## Deploy your modified code

1. Click the `+tag` button at the top of any code file.

2. Enter `v1` and press ++enter++.

3. Click `Deploy` near the top right corner.

4. In the deployment dialog, select your tag, for example, `v1` under the `Version Tag`.
	
	This is the tag you just created.

5. Click `Service` in `Deployment Settings`.
	
	This ensures the service runs continuously.

6. Click the toggle in `Public Access`.

	This enables access from anywhere on the internet.

7. Click `Deploy`.
	
	- The UI will stream data from the `sentiment` and `messages` topics as well as send messages to the `messages` topic.
	- The `sentiment` topic will be used later for sentiment analysis.

In this tutorial you've learned how you can modify the Sentiment Demo UI.
