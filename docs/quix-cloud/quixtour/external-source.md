# Create an external source

At this point, you have completed the [Quickstart](../quickstart.md), and you have an external program sending data into Quix, and it is writing into a topic. 

However, you can't currently see this in the Pipeline view. To help you visualize what you've created, you add an external source component, to provide a visual entity in the pipeline view. 

## How to add an external source

To add an external source:

1. Go to the pipeline view.
2. Click `+ New` in the top right corner of the view.
3. Select `External source`.
4. In `Output` select the topic you are going to publish to, or add a new topic with `+ Add new`. In this case select the `cpu-load` topic.
5. In `Name` type any suitable name, such as "Laptop CPU Load".
6. Click `Add external source`.

The external source now appears in the pipeline view as a reminder (visual cue) as to the nature of the source generating the data for this topic.

## 🏃‍♀️ Next step

Build a transform service to process your data!

[2. Process your data :material-arrow-right-circle:{ align=right }](./process-threshold.md)
