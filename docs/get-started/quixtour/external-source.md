# Create an external source

At this point, you have completed the [Quickstart](../quickstart.md), and you have an external program sending data into Quix, and it is writing into a topic. 

However, you can't currently see this in the Pipeline view. To help you visualize what you've created, you add an external source component, to provide a visual entity in the pipeline view. 

To add an external source:

1. Click on `Code Samples`.
2. Select the `Python`, `Source`, and `Basic templates` filters.
3. On the `External Source` sample, click `Add external source`.
4. Give the component a name, such as "Laptop CPU Load".
5. For output topic select `cpu-load`.
6. Click `Add external source`.

This now appears in the pipeline view as a reminder (visual cue) as to the nature of the source generating the data for this topic.

Watch a video on adding an external source:

<div style="position: relative; padding-bottom: 62.24066390041494%; height: 0;"><iframe src="https://www.loom.com/embed/0c9be6ea1f9540618d8bf0c2dabc8533?sid=728b4cad-a224-4ffa-82fe-7f0bbe737779" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## 🏃‍♀️ Next step

Build a transform to process your data!

[2. Process your data :material-arrow-right-circle:{ align=right }](./process-threshold.md)
