# Try the UI

In this part of the tutorial you try out the UI to get a feel for the project and what it does.

!!! tip

    In the pipeline view, you can always determine a topic name by hovering over the connecting line that represents that topic. You can also click the connecting line, to see its name, and optionally to jump to the Data Explorer to view live data for the topic.

## Prerequisites

You need your [workspace ID](../../how-to/get-environment-id.md) and a [PAT](../../how-to/personal-access-token-pat.md) to get the UI working. Once you have these, you'll need to access the code for the service, and set these values.

To do this, in the Applications list, click on the `Sentiment Demo UI` application. In the file `src/app/services/quix.service.ts`, locate the following code and replace the place holders with your values:

``` typescript
/*~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-*/
  /*WORKING LOCALLY? UPDATE THESE!*/
  private workingLocally = false; // set to true if working locally
  private token: string = '<your_pat>'; // Create a token in the Tokens menu and paste it here
  public workspaceId: string = '<your_workspace_id>'; // Look in the URL for the Quix Portal your workspace ID is after 'workspace='
```

Note if you just want to try out the UI without performing the following steps, you can do that in the [demo](https://sentimentdemoui-demo-chatappdemo-prod.deployments.quix.ai/chat){target=_blank}.

## Try out the UI in your Quix account

Now try out the UI you just deployed. To do this:

1. In the pipeline view find the UI service tile, as shown in the following screenshot:

	![Deployed UI tile](./images/web-ui-pipeline-segment.png){width=200px}

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