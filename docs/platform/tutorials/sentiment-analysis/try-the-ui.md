# Try the UI

TODO

!!! tip

    In the pipeline view, you can always determine a topic name by hovering over the connecting line that represents that topic. You can also click the connecting line, to see its name, and optionally to jump to the Data Explorer to view live data for the topic.

Now try out the UI you just deployed. To do this:

1. In the pipeline view find the UI service tile, as shown in the following screenshot:

	![Deployed UI tile](./images/ui-tile.png){width=200px}

2. In the service tile, click the external link icon to launch the UI in a new tab:

	![The sentiment analysis demo page](./images/running-ui.png)

3. Enter your username (it can be anything) and then type in some messages. Note that the typing indicator displays the sentiment as you type your message.

4. Type various messages and check the sentiment is as expected. Also note that the sentiment analysis is shown in the real-time graph display.

5. Select a different source from the `Message source` dropdown, and observe the messages and corresponding sentiment analysis graph change in real time.

## 👩‍🔬 Lab - examine the code

There are various ways you can view the code for this service. For example:

1. Click `Pipeline` in the left-hand navigation to go to the pipeline view.

2. Click the UI code panel as shown:

	![Code panel](./images/click-code-tile.png){width=60%}

3. The code is displayed in the built-in editor. You can navigate the codebase using the file explorer. The code view also has Intellisense built in - hover over a code construct to see more details.

## 🏃‍♀️ Next step

[Part 3 - Explore the UI service  :material-arrow-right-circle:{ align=right }](ui-service.md)