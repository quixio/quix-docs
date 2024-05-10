# Add an external source

At this point you have an external program sending data into Quix, and it is writing into a Quix topic. However, you can't see this external program in the Pipeline view. To help you visualize what you've created, you can add an external source component, to provide a visual entity in the pipeline view. To do this, log into Quix Cloud:

1. Go to the pipeline view.
2. Click `+ New` in the top right corner of the view.
3. Select `External source`.
4. In `Output` select the topic you are going to publish to, or add a new topic with `+ Add new`. In this case select the `cpu-load` topic.
5. In `Name` type any suitable name, such as "Laptop CPU Load".
6. Click `Add external source`.

This now appears in the pipeline view as a reminder (visual cue) as to the nature of the source generating the data for this topic, and you can easily add further pipeline services on the output of this source.

## 🏃‍♀️ Next step

[Part 3 - Add InfluxDB destination :material-arrow-right-circle:{ align=right }](./influxdb-destination.md)

