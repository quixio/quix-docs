---
title: "Build and deploy your own traffic monitoring app using computer vision"
date: 2023-10-12
authors: [tomas-neubauer]
slug: build-deploy-traffic-monitoring-app-using-computer-vision
description: >
   Learn how to fork our new computer vision template and deploy an application that uses London's traffic cameras to gauge current congestion by leveraging object detection to count vehicles.
categories:
  - tutorials
---

# Build and deploy your own traffic monitoring app using computer vision

 Learn how to fork our new computer vision template and deploy an application that uses London's traffic cameras to gauge current congestion by leveraging object detection to count vehicles.

<!-- more -->

## Build and deploy your own traffic monitoring app using computer vision

If you've ever wanted to experiment with computer vision but don’t have the
time to set up a complex development environment, this tutorial is for you.
Computer vision can be a great substitute for physical sensors in certain
situations—especially when it comes to counting things. In this tutorial, I’ll
walk you through a demo application that we’ve released that uses London's
traffic cameras to gauge current congestion by counting vehicles (using object
detection). It’s based on a reusable project template that we’ve created to
help you replicate the project. I’ll then show you how to use this template to
create your own copy of the project and get it up and running in Quix—a tool
to develop and run event streaming applications. Our demo version of the
computer vision application also uses a message broker hosted in [Confluent
Cloud](https://www.confluent.io/confluent-cloud/) (fully managed Apache Kafka
as a service), but it’s not compulsory to have a Confluent Cloud account to
follow the tutorial.

Here’s what the final result should look like:

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/652d41233d53e341fd94aa70_template_preview.png)

You can experiment with this demo version live at the following address:

  * <https://app-demo-computervisiondemo-prod.deployments.quix.ai/>

‍

**What is this app doing?**

The app is using live feeds from London’s traffic cameras (also known as “Jam
Cams”) to count the vehicles and estimate levels of congestion. It then uses
visual indicators to show where congestion is occurring on a map of London.
The vehicles are counted using an ML model for object detection in images
(rather than sensors or GPS data).

‍

**Why use object detection to determine congestion?**

Because other methods are not always reliable. For instance, in 2020, a
Berlin-based artist managed to [create a “virtual” traffic
jam](https://www.theguardian.com/technology/2020/feb/03/berlin-artist-
uses-99-phones-trick-google-maps-traffic-jam-alert) on one of the main bridges
across the river Spree with nothing but a handcart and 99 second-hand phones.
Google Maps then dutifully displayed the area on the map as highly congested.

Errant seagulls notwithstanding, computer vision is now being used by
governmental organizations to augment traffic data and increase accuracy for
traffic volume estimates. For example, on September 22 of last year,
Statistics Canada published a paper titled “[Traffic volume estimation from
traffic camera imagery: Toward real-time traffic data
streams](https://www150.statcan.gc.ca/n1/pub/18-001-x/18-001-x2022001-eng.htm)”
which presented a computer vision-based system to periodically extract vehicle
counts from Canadian traffic camera imagery.

Now with Quix, you don’t need a team of research scientists to try something
like this out. Any capable developer can give it a try and get up and running
within minutes. In this case, though, we’re talking more like 60 minutes
rather than 5 minutes. It is a big project after all!

To reproduce the project, you’ll need two things:

  * An API key for the [Traffic for London API](https://api-portal.tfl.gov.uk/) (for more details see this[ project’s documentation](https://quix.io/docs/platform/tutorials/image-processing/index.html#prerequisites))
  * A free Quix account — if you haven’t created one yet, you can [sign up now](https://portal.platform.quix.ai/workspaces/v2?__hstc=175542013.f29b93ebe4dc70e315a4a87c0eac8abf.1684753498564.1695229727489.1695587054193.138&__hssc=175542013.1.1695587054193&__hsfp=111326546&_ga=2.44653667.69165149.1695587054-1096211039.1684753494) (you can do it in a few clicks with an existing Google, GitHub or Microsoft account).

## Getting your own copy of the project

There are two major steps to getting a copy of the project (and any of our
demo applications):

  1. **Fork our**[**computer vision demo repository**](https://github.com/quixio/computer-vision-demo)**from GitHub.  
‍**This will make it easy for you to customize your version of the project but
still benefit from upstream improvements.  

  2. **Create a project in Quix Cloud, then create a new development environment and link it to your fork  
** This will allow you to run and update the application in Quix Cloud under
your own account.

  3. **Update the credentials for external services such as TfL Camera API and Google Maps.  
** Secrets such as API keys are not transferred into project copies so you’ll
need to add these yourself.

After you have the basics set up, we’ll dive into the code and look at how you
can adapt it.

‍

### **Forking the computer vision demo repository**

```py

{"24hmax_vehicles_allcams": 680.0,
 "24hmax_buses_allcams": 131.0,
 "24hmax_cars_allcams": 522.0,
 "24hmax_trucks_allcams": 94.0,
 "24hmax_motorcycles_allcams": 4.0}
 
```

To get a handle on the code, let’s first fork the Computer Vision Demo
repository. Why fork rather than clone? Because, later you’ll be bringing that
code into your own Quix environment and using a fork is the easiest way to
keep your environment synchronized. You’ll also be able to get any upstream
changes we make to the project template.

For the sake of simplicity, I’m assuming you already have a GitHub account.
However,  you might want to create a specific Git user for this project. Later
you’ll be giving Quix SSH access to the repository and having a separate user
is a good way to ensure that Quix does not have more access than it should.

  * Open GitHub in your web browser, navigate to the Computer Vision Demo repository (<https://github.com/quixio/computer-vision-demo>) and click **Fork.**

  * Make sure you fork all branches (in GitHub Fork wizard, deselect “**Copy the** main **branch only** ”).  
This is because it's better to use the "tutorials" branch for this exercise—so
you want to copy that branch too.

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/652d48bc56a8ed1ef1464488_vision_github_fork.png)

### **Creating a new development environment in Quix**

```py

{"24hmax_vehicles_allcams": 680.0,
 "24hmax_buses_allcams": 131.0,
 "24hmax_cars_allcams": 522.0,
 "24hmax_trucks_allcams": 94.0,
 "24hmax_motorcycles_allcams": 4.0}
 
```

Before you can create an environment in Quix, you first need to create a
project. During the project creation wizard, you’ll then be asked to add an
initial environment. You can add more environments later once you get the hang
of things.

‍

**To create a project and connect an environment to your forked repo, follow
these steps:**

  * Log in to Quix and Click + **New project**.  
  

  * Name your project “ _My computer vision demo_ ” (or something similar) and select **Connect to your own Git** repo.  
  

  * On the next screen, you should see some instructions on how to add the Quix SSH key to your repo—follow those instructions.  
Adding this key enables Quix to automatically synchronize the your repo with
the Quix environment.  

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6527facb25e0afa313371dd9_m-
JSNM5kvVUShyu6_WkfrbnWkR9hoJim6I21Psnnv3c46nl2_aCGzM9qh6WrYnnhT0aYjbDvB0ZVbtRhIAaOyNElDtFg60duq6piOAIw6gJNKOb-
Da0TY4LPwhi7HFfqsMH18dymjfpnyAFdzI-y4LQ.png)

  * On the next screen, you’ll be asked to create an environment—environments enable you to deploy code from different branches in parallel.   
Enter ‘tutorial’ for the environment name and select the  ‘tutorial ‘ branch
from your forked repo.

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/652d4f256294e4407478b303_env_settings.png)

If you want to use this repo in production. it’s advisable to set the branch
as protected so that others don’t commit directly to the main branch and are
required to use standard Git review procedures.

‍

  * Continue through the next steps in the project creation wizard.

The wizard will ask you which message broker you want to use. The original
version of the project uses [Confluent
Cloud](https://www.confluent.io/confluent-cloud/) as a message broker. If you
want to use Confluent Cloud too, you’ll need to have an account first—in which
case you would the select **Connect to your Confluent Cloud** and enter your
credentials.  

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6527facc99c658e0ace3b020_hNRkhTmmq95lFrY5XQExyQlDNWFQJ9GxuDH7RSah8ioqtQLrv5oXDmJzMBwh5WMkpejRVa9xxYwGEBf_P6tj_18u4u1Ysa6jpbM9Fn35od7l9qAJF-
CzyVhnn1dZbogwWvE68pxqMzwoTpUa4VY1sGY.png)

You can find more details in the [Quix
documentation](https://quix.io/docs/platform/integrations/kafka/confluent-
cloud.html).  
  
However, it’s not compulsory to use Confluent Cloud. For this tutorial, you
also can stick with the default Quix message broker

‍

  * Once you have completed the wizard, navigate to the **Pipeline** page (if it’s not open already).  
  
You'll see a standard warning that your Quix environment is out of sync with
the source repository (since the environment starts empty).

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6527facbb8515abd9f5f1154_5JJerXAOx_t2kidV0Degw3Ze7xSylvNXwbRQAxlXpHGeVXJDR8enHMWq4f5KETsaLTN8yu064GdNI9lPzQtqu22FCkp1QjRX0YWq5-_VUOzOhOYGXsiPctfZRcRp-
NB6NZwNb4FKzL7aHb7VIyAn4KM.png)

  * Click the **Sync environment** button to pull the latest code from your forked repo.  
  
**Note** : the sync process is bidirectional so if you change some code within
your environment, it will push it back to the source repo too.

Hopefully the sync was successful. If it worked, you should see all your
services start to build on the Pipeline page.

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/652d4c254d8d87c31451b294_vision_pipeline.png)

There are quite a few of them so it will take a few minutes for all the
services to build and start running.

Note, the S3 service is stopped by default because you’ll need your own AWS
account to get that one working. But it’s not really necessary for this
tutorial anyway.

  * To see the full pipeline, on the Pipeline page, click and drag anywhere on a blank part of the canvas and scroll to the right, or hold down Ctrl / ⌘ and use your mouse wheel to zoom out.

  * Scroll until you can see a service called “Project Front End".

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6536a05e31ea56b54d756dcd_newimage.png)

  

‍

### **Understanding the architecture of the computer vision demo app**

```py

{"24hmax_vehicles_allcams": 680.0,
 "24hmax_buses_allcams": 131.0,
 "24hmax_cars_allcams": 522.0,
 "24hmax_trucks_allcams": 94.0,
 "24hmax_motorcycles_allcams": 4.0}
 
```

The pipeline consists of many services but the architecture can be abstracted
down into three main segments as illustrated in the following diagram:

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6527faca07c6f74c9ae1afb8_1fQnHnQBI3or0O3Ct3Fw0qOmfTWALvDyVTsKAU3D32cZi5kz3qKF8TXB2GkgVIHt3Ngiau_CoDrcRScieoDacgQq9svBrscME5wq8A6XpZ5v4d-33nIH6kJt1YHeQAIoZPokd_dUq8IQMlTlfXmEtk0.png)

  * The first set of services (1-3) taps into London's traffic cameras, identifying vehicles on each monitored road segment.  
  

  * The second set of services (4-7) keep a running total of the vehicle types at each road segment, and log the maximum number of vehicles that were detected in a given frame. This data is then buffered and passed to a REST API service so that data is accessible to any external service that wants to request it.

  * The final service (8), hosts a front end which polls a REST API for aggregated vehicle statistics and listens on a Websocket for live raw data from all of the traffic cameras (such video frames) which comes from a topic in Quix. This combination of polled and real-time data is used to visualize traffic levels on a map of London.

I won't go into too much detail about the specifics of the individual services
because the documentation does a good job of that already. But if you want to
take a look at how they work, here is some reference information with links to
the documentation.

‍

#### **Service Reference**

If you click the service name you can see the actual service running in a Quix
read-only environment including the runtime logs and data lineage.

1\. **Service Name:**[ TfL camera
feed](https://portal.platform.quix.ai/pipeline/deployments/ffbf3990-5076-4f42-b68f-d52e8f247bf6?workspace=demo-
computervisiondemo-prod)

Retrieves the camera feeds from the TfL API endpoint, using a TfL API key and
the “requests” Python library.

  * [Documentation](https://quix.io/docs/platform/tutorials/image-processing/tfl-camera-feed.html)
  * [Source code](https://github.com/quixio/computer-vision-demo/tree/frontend/TFL%20Camera%20Feed)

2\. **Service Name:**[ Frame
grabber](https://portal.platform.quix.ai/pipeline/deployments/047b5ced-685c-4cf3-bcab-52570c6ded07?workspace=demo-
computervisiondemo-prod)

Extracts frames from the video files provided by the Tfl API. By default, the
frame grabber grabs one frame in every 100 frames (which is typically one per
five seconds of video) using the OpenCV Python library.

  * [Documentation](https://quix.io/docs/platform/tutorials/image-processing/tfl-frame-grabber.html)
  * [Source code](https://github.com/quixio/computer-vision-demo/tree/frontend/TfL%20traffic%20camera%20frame%20grabber)

3.**Service Name:**[ Object
detection](https://portal.platform.quix.ai/pipeline/deployments/2a5f5e00-31a7-48ce-8d6f-0ddf257cce69?workspace=demo-
computervisiondemo-prod)

Takes frames from the frame grabber and detects objects in each frame. This
service uses the [YOLOv8 object detection
library](https://github.com/ultralytics/ultralytics).

  * [Documentation](https://quix.io/docs/platform/tutorials/image-processing/object-detection.html)
  * [Source code](https://github.com/quixio/computer-vision-demo/tree/frontend/Computer%20vision%20object%20detection)

4\. **Service Name:**[ Cam
vehicles](https://portal.platform.quix.ai/pipeline/deployments/8a878646-7186-4b83-8173-7447aed9942b?workspace=demo-
computervisiondemo-prod)

Calculates the total vehicles, where a vehicle is defined as one of: car,
'bus', 'truck', 'motorcycle'. This number is fed into the Max vehicle window
service.

  * [Documentation](https://quix.io/docs/platform/tutorials/image-processing/other-services.html#cam-vehicles)
  * [Source code](https://github.com/quixio/computer-vision-demo/tree/frontend/TotalVehicles)

5\. **Service Name:**[ Max vehicle
window](https://portal.platform.quix.ai/pipeline/deployments/c8ef68fd-f3da-468a-814e-62edeafd810a?workspace=demo-
computervisiondemo-prod)

Calculates the maximum vehicles over a time window of one day. This service
sends messages to the Data API service.

  * [Documentation](https://quix.io/docs/platform/tutorials/image-processing/other-services.html#max-vehicles)
  * [Source code](https://github.com/quixio/computer-vision-demo/tree/frontend/Max%20Vehicles)

6\. **Service Name:**[ Data
Buffer](https://portal.platform.quix.ai/pipeline/deployments/c7c767ce-0195-4d51-8565-80e7dcac7e67?workspace=demo-
computervisiondemo-prod)

The data buffer provides a one second data buffer to reduce load on the Data
API service.

  * [Documentation ](https://quix.io/docs/platform/tutorials/image-processing/other-services.html#next-step)
  * [Source code](https://github.com/quixio/computer-vision-demo/tree/main/Data%20Buffer)

7\. **Service Name:**[ Data
API](https://portal.platform.quix.ai/pipeline/deployments/583d9392-0789-4e8c-ad64-907bb51629d8?workspace=demo-
computervisiondemo-prod)

A REST API service that provides two endpoints: one returns the Max vehicle
window values for the specified camera, and the other endpoint returns camera
data for the specified camera. This API is called by the UI to obtain useful
data.

  * [Documentation](https://quix.io/docs/platform/tutorials/image-processing/other-services.html#data-api)
  * [Source code](https://github.com/quixio/computer-vision-demo/tree/frontend/Data%20API)

8\. **Service Name:**[ Project Front
End](https://portal.platform.quix.ai/pipeline/deployments/260917e8-83eb-4f28-a89d-5db406a91023?workspace=demo-
computervisiondemo-prod).

Hosts a front end which checks the API for new data and uses that data to
visualize traffic levels on a map of London

  * [Documentation](https://quix.io/docs/platform/tutorials/image-processing/web-ui.html)
  * [Source code](https://github.com/quixio/computer-vision-demo/tree/frontend/TfL%20image%20processing%20UI)

There’s also [an S3 service](https://github.com/quixio/computer-vision-
demo/tree/main/S3) that can optionally archive the collected data to an S3
bucket, but it’s unnecessary for this tutorial.

What I want to focus on here is showing you **how to customize the project for
your own requirements**.

## Customizing the project

To help you customize the project, I’ll show you how to make a small change to
the aggregation logic in the back end and render that new information in the
front end.

After that, I’ll point you to some external resources that will help you
perform more powerful tasks such as vehicle counting and object tracking. But
first we need to do a bit of admin, such as adding fresh application secrets.

‍

### **Adding your own API credentials and updating the secrets**

```py

{"24hmax_vehicles_allcams": 680.0,
 "24hmax_buses_allcams": 131.0,
 "24hmax_cars_allcams": 522.0,
 "24hmax_trucks_allcams": 94.0,
 "24hmax_motorcycles_allcams": 4.0}
 
```

The project template is configured with some default credentials but you’ll
need to change them to get your copy of the project to work. You’ll need to
define each of these credentials as a secret in your project. The secrets are
as follows.

  * A bearer token the front end to communicate with the SignalR hub in Quix (secret key: ‘ _bearerToken_ ’)
  * Your Tfl API key (secret key: ‘ _tfl_api_key_ ’)

‍

#### **Configuring a bearer token for the Front End**

The front end uses the SignalR client library to communicate with Quix (via a
[Websockets API](https://quix.io/docs/apis/streaming-reader-api/intro.html))
to retrieve and render data from the back end. This API requires a bearer
token to authenticate client applications.

For this tutorial, you’ll create a Quix personal access token to use as your
bearer token. You’ll then create a secret to store this token in your
environment (yes, this is a bit convoluted, but you only have to do it once).

##### Getting a personal access token

Here’s how you get a personal access token in Quix.

  * Open your profile menu on the top-right, and select **Personal Access Tokens**.

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6527facba9a017a027074f5d_rE016wY9KSTAEIvv7sWtL1aJvRQVp4yxnsRvRcUl9H6x6b7-x5ZSInxcU1psWL9OtE6A0zKFL7K32-orlcvamcb4vVhGznNtv6CXYM7wGYPlghIRW7IwpRg09B-k9sNX1rYgipIi2UfWFMyXgNVPPQA.png)

  * In the dialog that appears, click **Generate token** and paste your personal access token in notepad or any other temporary storage location—you’ll need it for the next step.  

##### Adding your personal access token to the secrets

In the Quix portal, open the **Applications** page and click **TfL image
processing UI** to open the Quix IDE.  
  

  * In the **Variables** section (bottom left), click **Secrets management**.
  * In the sidebar that appears, click **\+ New secret** , and enter “bearerToken” as the Secret key.
  * In the “Default” and “Tutorial” columns, paste your Personal Access Token that you created in the previous step as the value in each cell.

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6527facc220929a907929dff_6Bnw6jtH2joiBPG1Dt8MVPKPgrXfFXVOw0OQZuwEELwqoLXPw-
qQ2eq37NNOykA7Id1eDJNhJIX5C-E2CNxUWDUVHdn0t5k9ACYYH11nIW8GZfXHpyjyMEjlWIZef2zQAsA9YmPRSwKAUoY1XxGEaig.png)

#### **Adding your Tfl API key to the secrets**

Assuming you have registered with the [Tfl API portal](https://api-
portal.tfl.gov.uk/) you first need to add your own Tfl API key as a secret
too.

  * To add the secret,  need to follow exactly the same steps as the previous section, but this time add a secret with the key ‘ _tfl_api_key’_.  
  

### **Updating the back end to get the combined maximum number of vehicles
seen throughout London**

Right now,  you can only see the maximum number of vehicles observed _per
camera_ in the last 24 hours. For instance, let's examine the data displayed
underneath this video frame taken from the camera at Kings Cross and Swinton
Street

‍

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6527facbb8515abd9f5f1348_gaRES6WPVYhjbMuYLK6oir_FLiqQzFiFgEPF7bpwm82fyQojjLkDukflyOPFkrekhjIHPYA-5YtCm-7-ir9OHL5NPxU_6QGYzRtCC3O2qPxajYgO1LDrVebHtEA_6_RHill8NtiMCOPXZg94rCk36zg.png)

‍

  * Currently, it thinks that there are 5 vehicles in the frame. 
  * However, the most vehicles that the camera has ever observed (in the same frame) is 11 vehicles.
  * We don’t know _when_ that cluster of 11 vehicles was observed, just that the observation was made some time in the last 24 hours.

But wouldn’t it be interesting to see the same data for all of London? I.e.
What’s the combined maximum number of vehicles observed by London's cameras at
any one time? And what's the maximum number of buses observed by all cameras?

To answer these questions, we want to end up with data that looks something
like this

‍

Note that we’re not talking about total vehicle counts here (I’ll get to that
later), just a snapshot of the most vehicles that London's traffic cameras
have observed in the last 24 hours.

To get this data, you’ll need to make the following changes

  * Get the maximums for each vehicle type observed in the last 24 hours (not just all vehicles).
  * Store the latest maximums, aggregate them all (across all cameras). 
  * Continuously refresh the aggregation when new maximums are observed by different cameras. 

Then, you’re doing to render the data in the front end so that it looks
something like this:

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6527faccfff325c9ab3f7a7c_m5RuGVo1S5OIgP58KJLhKMcdCOw0UV6Ytajrkos55iiU2cOy2mMTGg-
yXGK-2H0qExg__SURl_BgTcCjyYzy3WBGr4p6x2Gcpq6NVUOo6McHW-
kmbmdByOQx2e_n1XYpNcI9hoeFZ3XvPE7QbNqobY8.png)

‍

I’ve created some code for this already, but before you test it, you’ll need a
place to store the new aggregations as they come in. In this example, I’ll
show you how to use a new Kafka topic to store the data.

‍

#### **Adding a new “max-vehicles-agg” topic**

Not entirely sure what a topic is? The [Apache Kafka
documentation](https://kafka.apache.org/documentation/#introduction) is a good
starting point, but in essence, topics are described as similar to a folder in
a filesystem, and the events (in the form of messages) are the files in that
folder. You’ll learn how to create one in the Quix UI—which is a very simple
process.

**To create a topic in the Quix Portal follow these steps:**

  * In the Quix Portal, open the **Topics** page and click **Add new** in the top right corner.  
‍

  * In the dialog that appears, enter a name such as “ _max-vehicles-agg_ ”, leave the default settings as they are and click **Done**.  
  

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6527facbcc2b06900e90a28e_WdhILPAIUPwv_jCWm0qON_dYeVcLzNeU-
JnM-
cQiH08bdwypwBrmlv-3tgpGb0BUTHjNzVzQz_k6LD92A1dJPzAR6sXhWspFwKOlJhYOjY2901kH50zkrFWkf-
cGyrgFk2n8PnDker3btIZYXbYIipg.png)

Now, you’ll need to update the code in the back end to write this topic. The
service that you need to change is called “**Max Vehicle Window** ”. It’s a
Python service that aggregates data using the[ Quix
Streams](https://github.com/quixio/quix-streams) and Pandas Python libraries.

When editing services in general, you always have two options.

  * Edit and test your local IDE, then commit and push your changes to your forked repo.
  * Edit and test in the online Quix IDE.

The Quix IDE can be a bit quicker because all the dependencies are installed
for you and you don’t have to set up a new virtual environment. It also pushes
your changes automatically, which can speed things up a bit. For this example,
I’ll use the Quix IDE.

‍

#### **Updating the max vehicles service to aggregate data for all cameras**

To save time, I’ve created some code for this already, so all you need to do
is paste it into the relevant file.

**To edit the Max Vehicle Window service:**

  * Navigate to **Applications** , and click **Max Vehicle Window** to open the Quix IDE.
  * If it’s not open already, click _main.py_ in the left-hand file menu to open it in the Quix IDE.
  * In another window, open [this file from our tutorials repo](https://github.com/quixio/tutorial-code/blob/main/computer-vision-excercise/max-vehiclesv2_main.py), then copy and paste the code, replacing all of the existing code.  
The code comments should help you understand what changes I made.  

The new code is expecting there to be a new environment variable called “
_output2_ ” which stores the name of the new output topic you created
previously, so let’s create that new variable.

  * In the **Variables** section, click **+Add** to add a new environment variable, 
  * In the dialog that appears, select **Output Topic** as the variable type, name the variable “output2” and select the topic you created as the default value (e.g. “ _max-vehicles-agg_ ”)

Now, you just need to save and deploy your changes.

To redeploy the service, open the deployment dropdown on the top right, and
select “**Edit existing deployment** ” then click “**Redeploy** ”.

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6527facbe849c6b4624c5d1c_6crS6jz6gzGh25U6QO7Q62lwFC3vNSnaeBE1ITHCHG9MCyXRxxvuTcSgplioBNBzB5hHFAAuoqpauYUho3ReezUav2fBopPlNxY49p8mv5su5krX_Or61PY6k1VSKcy4v2yH2SFBHANlfgvQ-
oWUcB4.png)

You should see the data start coming through in your new topic.

To inspect the topic, open the Quix Portal, navigate to the **Topics** page
and click the “ _max-vehicles-agg_ ” topic you created before.

  * Each topic has a view called the “data explorer view” which lets you inspect the messages flowing through a topic.  

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6527facdfb59893c4f619ce7_CiVfZYY3EDC1bEogHHpV4hQTOaZBbiMHugVs6FX9WiXkX9iPTWsrNk_aAFY-
nazU5SoW88eZkgjSbDfqZZ8a1TYSDjpn_JLHnA7lSQDBe-CFcepaO-
EzVzeuKInBHu5X6zC17arfqOEgB3KBMoVd1Yg.png)

You should now see an active stream in the “**SELECT STREAMS** ” section.

  * Select the stream “**aggregated_data** ” (or whatever it happens to be called)
  * Then select all the available **parameters** in the **SELECT PARAMETERS…** section.
  * Finally, select the **Table view** so you can see your selected data.

‍

Note that new data might not come through straight away because the **TFL
Camera Feed** service has a variable sleep timer to avoid hitting the rate
limits of the TfL API. You can configure it in the “ _sleep_interval_ ”
environment variable when you can see in the Quix IDE when you view the source
code TFL Camera Feed service. At the time of writing, it was set to default to
60 seconds.

If you inspect the logs of the **TFL Camera Feed** deployment, you should see
when this timer has been activated. When you see data coming through again,
it’s safe to go back and check your topic

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6527facb2532eff4cb3d6539_2yedUQqxByG6JgK05gN3T3OBQAf6VzwabuJ2u7-yny1P8dsRP2FqutRQNy6aCDK5piE9r3LnlUNypf4A4lF548cQhVxLuT5h5kGJmv0z1zIJPUhdfDoaGkoaZlbyxy5KXVwll3gY5nImV5EwNhAHPko.png)

‍

### **Updating the front end to display the new aggregations**

```py

subscribeToData() {
  this.connection.invoke('SubscribeToParameter', this._topicName, this._streamId, 'image');
  this.connection.invoke('SubscribeToParameter', this._topicName, this._streamId, 'lat');
  this.connection.invoke('SubscribeToParameter', this._topicName, this._streamId, 'lon');
  this.connection.invoke('SubscribeToParameter', 'max-vehicles', '*', 'max_vehicles');
  this.connection.invoke('SubscribeToParameter', 'image-vehicles', '*', '*');

```

If you’re bothered about changing the front end code, you can skip this part.
Quix is mainly a back end tool but we’ve added a front end component so that
you create a fully functional mini application. In this section, you’re going
to update the front end to display the aggregations.  
‍

#### **Display the new aggregation data in the front end**

Now, let's update the UI service to include the new aggregates that we created
in the back end. As a reminder, here’s how it should look when you’re done.

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6527faccfff325c9ab3f7a7c_m5RuGVo1S5OIgP58KJLhKMcdCOw0UV6Ytajrkos55iiU2cOy2mMTGg-
yXGK-2H0qExg__SURl_BgTcCjyYzy3WBGr4p6x2Gcpq6NVUOo6McHW-
kmbmdByOQx2e_n1XYpNcI9hoeFZ3XvPE7QbNqobY8.png)

It’s not pretty, but it gives us the info we need. To update the UI, you’ll
need to edit the following files:

[<repo_root>/TfL image processing
UI/src/app/app.component.ts](https://github.com/quixio/computer-vision-
demo/blob/frontend/TfL_image_processing_UI/src/app/app.component.ts)

[<repo_root>/TfL image processing
UI/src/app/app.component.html](https://github.com/quixio/computer-vision-
demo/blob/frontend/TfL_image_processing_UI/src/app/app.component.html)

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6527facc9442a7305086a578_LfBDpgUAmnFXZHp0rG_WRcXEo16oDlFrgUyAc0_MCY9b-VWxEoxc5Eu7wrKFZJq-
oIHcLHC-kIRlluv326mPRVDK1C_6g0e06alg4OrtAGFOjpcRsAKiAp351MIolcZrO-
aXwVAGSXULiCal7gDhERc.png)

##### **Updating the data subscriptions**

Here, we’re going to be a bit hacky and hard-code the topic references. In
production this should be handled with variables, but it makes the demo
simpler.

‍

And the following extra line underneath the block:

This will initiate a subscription to the topic and read all the parameters in
the message (_parameterData_ is a [specific data
type](https://quix.io/docs/apis/streaming-writer-api/send-data.html) in the
Quix API and It is typically composed of numeric data.)

This line initializes a new variable that you’ll use to store the data from
the messages.

Now, let's assign the data to the variable whenever a new message is detected.

First, locate the following block (after line 108):

Add the following block underneath it:

Now that we have access to the variable, let’s render its contents in the
front end.

‍

##### **Updating the front-end template**

Now, it’s time to finally render the data that we’ve made available to the
front end.

‍

If you want to test it on your local machine first, you can pull the changes
you made in the Quix IDE (Quix pushes them automatically) and follow the
instructions in the [front-end service
README](https://github.com/quixio/computer-vision-
demo/tree/frontend/TfL%20image%20processing%20UI#readme).

  * To redeploy the **TfL image processing UI** service, follow the same process that you did when redeploying the **max vehicles service**. 
  * Once it has redeployed, reopen the front end by clicking the blue launch icon on the **Project Front End** deployment (on the **Pipelines** page).
  * Check the sidebar and confirm that the new data is displayed above the **Traffic density** section.

‍

##### Counting vehicles over longer time periods

As you’re probably noticed, the app is not actually counting vehicles over
time, rather just counting the number of vehicles observed in any given video
frame.

This is because we’re not using the full capabilities of YOLOv8. We are just
using object detection, but to count vehicles properly, you’ll need to use
object tracking. The problem is, object tracking requires more memory which is
not available in the Quix free plan. This demo uses the smallest “nano” YOLO
model but there are four other sizes available, with YOLOv8x being the most
powerful. If you use a larger model, you can get great results for vehicle
tracking and counting.

 Here’s a screenshot from an attempt to run it on my local machine (with
decent GPU) on a TfL camera feed.

![](https://uploads-
ssl.webflow.com/64a7eed956ba9b9a3c62401d/6527facaf7bd7fd9f8a0592a_xjk4LyCIyOQVFQzNAyS2a_bVOslyd4Tbt50Xns_E5ICG9mBl0U1hqyYU18fiiFDeXPzCCHOocboPkvFUyr9xQbBNludEYW-q1De9iawFj0NX6P0lATiUv_zB2dZ8mhql7F3tfBlmLcPn8SQRLWEYjpw.png)

I used YOLO in combination with a couple of other libraries (such as
[supervision](https://supervision.roboflow.com/) from Roboflow) to count
vehicles going both directions along the road.

For more information about how to get similar results, see the following
resources:

  * [**Track and Count Objects Using YOLOv8**](https://blog.roboflow.com/yolov8-tracking-and-counting/)**(roboflow.com)  
** An excellent primer on vehicle counting using computer vision using a
Jupyter Notebook  
**  
**

  * [**YOLOv8 Object Detection & Counting | by Dustin Liu | Sep, 2023 | DataDrivenInvestor  
**](https://medium.datadriveninvestor.com/yolov8-object-detection-
counting-19fa384a9cd3)A walkthrough of an optimized Streamlit version of the
Roboflow Notebook (discussed in the previously linked article)—you can also
[try it out online](https://yolov8-object-counting.streamlit.app/).

## Conclusion

Kudos for making it this far. I hope you were able to successfully customize
it. If you had any issues, be sure to post a question in our [community
forum](https://forum.quix.io/) and one of us will get right on to it.

As you can see, it’s fairly simple to deploy and run complex applications in
Quix. These demos are designed to be self-contained, so we host the front end
too. In a production scenario however, you’d probably want to run your front
end somewhere else. What Quix really excels at is processing event streams and
performing complex computations in an extremely performant way. It leverages
the strengths of Apache Kafka to process data at scale while abstracting away
some of its weaknesses (such as resource management and configuration
complexity). Of course, if you have your own Kafka instance already, or are
using Confluent Cloud, you can use that too. Quix is there to help you
orchestrate and process your event streams in real time.

  * To learn more about how Quix environments are managed in Quix, check out the [relevant section in the Quix documentation](https://quixdocsdev.blob.core.windows.net/pr183/platform/changes.html#environments).
  * To see another fully-functional demo app, why try out our [chat sentiment app demo](https://github.com/quixio/chat-demo-app/tree/develop) which uses the [Hugging Face Transformers library](https://pjreddie.com/darknet/yolo/) to perform live sentiment analysis on chat messages.




## Check out the repo
Our Python client library is open source, and brings DataFrames and the Python ecosystem to stream processing.

[Star us on GitHub](https://github.com/quixio/quix-streams)


