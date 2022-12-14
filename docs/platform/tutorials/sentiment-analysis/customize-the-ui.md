If you want to customize the sentiment analysis UI in any way, follow these steps to save the UI code to your workspace and deploy it.

1. Navigate to the Library and locate `Sentiment Demo UI`.

2. Click `Edit code`

3. Ensure that the `sentiment` input box contains `sentiment`

	- This topic will be subscribed to and will contain the sentiment scores from the sentiment analysis service, you'll deploy this in a later part of this tutorial.

3. Ensure that the `messages` input contains `messages`

	- This topic will contain all the chat messages.
	- The UI will subscribe to this topic, to display new messages, as well as publishing to the topic when a user sends a message using the 'send' button in the UI.
	- Later, the sentiment analysis service will also subscribe to messages on this topic to produce sentiment scores.

3. Click `Save as project` 

	- The code for this Angular UI is now saved to your workspace

4. At this stage if you want to customize the code you can do so. You can also deploy what you have and customize it later by repeating the steps below. 

5. Click the `+tag` button at the top of any code file

6. Enter `v1` and press enter

7. Click `Deploy` near the top right corner

8. In the deployment dialog, select your tag e.g. `v1` under the `Version Tag`
	
	- This is the tag you just created

9. Click `Service` in `Deployment Settings`
	
	- This ensures the service runs continuously

10. Click the toggle in `Public Access`

	- This enables access from anywhere on the internet

11. Click `Deploy`
	
	- The UI will stream data from the `sentiment` and `messages` topics as well as send messages to the `messages` topic.

	- The `sentiment` topic will be used later for sentiment analysis.
