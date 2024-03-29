# Add an external source

At this point you have an external program sending data into Quix, and it is writing into a Quix topic. However, you can't see this external program in the Pipeline view. To help you visualize what you've created, you can add an external source component, to provide a visual entity in the pipeline view. To do this, log into Quix Cloud:

1. Click on `Code Samples`.
2. Select the `Python`, `Source`, and `Basic templates` filters.
3. On the `External Source` sample, click `Add external source`.
4. Give the component a name, such as "Laptop CPU Load".
5. For output topic select `cpu-load`.
6. Click `Add external source`.

This now appears in the pipeline view as a reminder (visual cue) as to the nature of the source generating the data for this topic, and you can easily add further pipeline services on the output of this source.

Watch a video on adding an external source:

<div style="position: relative; padding-bottom: 62.24066390041494%; height: 0;"><iframe src="https://www.loom.com/embed/0c9be6ea1f9540618d8bf0c2dabc8533?sid=728b4cad-a224-4ffa-82fe-7f0bbe737779" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

??? "Transcript"

    0:01 Welcome back to another video. In this video I'll show you how to improve your pipeline view by creating an external source.

    0:11 So let's go straight into it. The easiest way to do this, there's various ways that you can do this, but as you see there is a nice big box here, add external source, you can just click on that.

    0:28 The reason that I'm adding an external source is because my command line program that's capturing CPU load and publishing that into Quix is external to the Quix and environment.

    0:42 You'll see other examples where we use Quix's built-in code samples and connectors to build your pipeline, but they're internal to Quix, so you just use an ordinary source.

    0:57 So for our purposes here, we're going to create an example. External source. I'm going to call it server load, CPU load.

    1:10 You can call it anything you like really, as long as it makes sense to you. We also need to select the output topic.

    1:21 Well, we know the topic is CPU load because it's the only one we've got So let's go ahead and add that source now we can see The external source appears in the pipeline view And then later in the quick stall we're going to extend this pipeline So in the second part of the tour you'll add a transformation

    1:44 here and then when that's done on the other side of the transformation you'll create a destination to complete the pipeline.

    1:56 Okay that's it for this video thanks for watching and see you in the next video.

Note, this video is for a different project, but the principle is the same.

## 🏃‍♀️ Next step

[Part 3 - Add InfluxDB destination :material-arrow-right-circle:{ align=right }](./influxdb-destination.md)

