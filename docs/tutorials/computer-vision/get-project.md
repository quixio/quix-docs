# Get the project

While you can see the [deployed project running in Quix](https://portal.platform.quix.io/pipeline?workspace=demo-computervisiondemo-prod&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qVTBRVE01TmtJNVJqSTNOVEpFUlVSRFF6WXdRVFF4TjBSRk56SkNNekpFUWpBNFFqazBSUSJ9.eyJodHRwczovL3F1aXguYWkvb3JnX2lkIjoiZGVtbyIsImh0dHBzOi8vcXVpeC5haS9vd25lcl9pZCI6ImF1dGgwfDI4YWQ4NWE4LWY1YjctNGFjNC1hZTVkLTVjYjY3OGIxYjA1MiIsImh0dHBzOi8vcXVpeC5haS90b2tlbl9pZCI6ImMzNzljNmVlLWNkMmYtNDExZC1iOGYyLTMyMDU0ZDc5MTY2YSIsImh0dHBzOi8vcXVpeC5haS9leHAiOiIxNzM3ODI5NDc5LjIyMyIsImlzcyI6Imh0dHBzOi8vYXV0aC5xdWl4LmFpLyIsInN1YiI6ImtyMXU4MGRqRllvUUZlb01nMGhqcXZia29lRkxFRDVBQGNsaWVudHMiLCJhdWQiOiJxdWl4IiwiaWF0IjoxNjk1NzE2MDI4LCJleHAiOjE2OTgzMDgwMjgsImF6cCI6ImtyMXU4MGRqRllvUUZlb01nMGhqcXZia29lRkxFRDVBIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwicGVybWlzc2lvbnMiOltdfQ.Ndm0K2iNHPxDq1ohF-yb-6LzIqx_UY8Ptcq0kAwSNye12S3deX_eDkC4XqZqW2NoSLd3GsmWV9PZGetGGp2IlqshQFZtUMp6WP6hq917ZC1i8JFx93PAbY7NT_88nFDovVlaRcoTpWvI-03KbryLkAoB28c6qb3EFwjCWFBuy_yA4yjQ8uF0-AZ0R9Qi4IBaekXWqcgO0a91gVRg0oA_hnzJFoR-EnZ2G1ZSxtuVgnyyPuQTMUvzJuUT_IJTLzEB_kejX0pcXRZBIwHP8MWLB4mE5DtIdz4jm8WIA4eZJZ7ZCG4dk-adQwZ2BdkNknV5eEwRgRJL4ybaplkaDlR-dg){target=_blank}, it can be useful to learn how to get a project up and running in Quix. 

Once you have the project running in your Quix account, you can modify the project as required, and save your changes to your copy of the project.

## Clone the project

See the [clone a project documentation](../../create/clone-project.md) for further information on how to do this.

## Add secrets

As the project uses Quix API credentials, you'll now need to configure your credentials for the services that require API keys. The main ones are:

* TfL camera feed - TfL API key
* Web UI - a bearer token ([PAT](../../apis/streaming-reader-api/setup.md#personal-access-token-pat)) 

You need to [create secrets](../../deploy/secrets-management.md) for these and then assign them to the appropriate [environment variables](../../deploy/environment-variables.md).

### TfL camera feed

To get this service to run, you'll need to configure it with your TfL API key.

Create a new secret that contains your TfL API key. Now link that secret to the `tfl_api_key` environment variable in the TfL camera feed service.

[Read more about environment variables and secret management](../../deploy/environment-variables.md).

Watch the video:

<div style="position: relative; padding-bottom: 50.11160714285714%; height: 0;"><iframe src="https://www.loom.com/embed/11baa3bdaf1c4c4cb4d2589f7f778a10?sid=199727a5-e12d-4b6f-a63e-732ff4690496" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

??? "Transcript"

    0:01 Hello again welcome back to this video of the computer vision tutorial. Now in the previous video we got the pipeline up and running, you synchronized Thank you.

    0:16 Bye. To our environment. Everything was building quite happily. However, as we look around the pipeline, we can see that there is an issue, which is there's a runtime error occurring.

    0:32 On the TFL camera feed service. And you can see that we've already had a number of restarts. So let's have a look, see what's going on here.

    0:44 Well, the, the problem is apparent because we're we haven't configured our TFL API key. So that's what we need to do here to get this running.

    0:58 Now in the prerequisites for the tutorial, I gave you a list of resources or the site to go to and you can sign up for the API key.

    1:08 You can see there's a runtime error here. You haven't configured your TFL API key. So that's what we're going to do now.

    1:15 So if you sign up to the site, you, you copy your API key See you next week. Then it needs to go in here.

    1:22 But because we want to keep that information secret, it needs to be configured as a secret. So there's various ways you can do that.

    1:31 But let's see the simplest way while we're on this screen. So I just got to variable. These are the environment variables that we have.

    1:40 We'll go up here and click edit the variables. And you can see straight away that we have a missing secret associated with this variable here.

    1:53 We need to create that. So if I click on here, it takes me to the secrets management dialogue. I can create a new key.

    2:03 In this case, I'm going to call it TFL API key. And then I'll paste it in and I'm going to recycle this API key anyway.

    2:16 So there's, with the secret keys, you can have a default value and then you can have a value specific. For a certain environment, we're in the tutorial environment here.

    2:30 But in this case, I'm just going to put them as both as the same value. You could just put a default value that would be fine and save that.

    2:41 Close the secrets management dialogue and you can see this drop down here, we now have the secret that I just created, which we can associate now.

    2:57 With that variable and then I can redeploy the service with the new API key. So let me do that. So we can see the data has been loaded now.

    3:22 Let's make sure we've got all the other configuration that we need done. But what I'll do, is I'll stop the video here now that we've configured this and show you the next piece of configuration in the next video.

### Web UI service

Note if you just want to try out the UI without performing the following steps, you can do that in the [demo](https://app-demo-computervisiondemo-prod.deployments.quix.io/){target=_blank}.

You'll need a [PAT](../../apis/streaming-reader-api/setup.md#personal-access-token-pat) for the UI as it uses the Streaming ReaderAPI which needs to be authenticated. 

Once you have your PAT copied to the clipboard, create a new secret to contain it. Then link that secret to `bearerToken` environment variable for the UI.

[Read more about environment variables and secret management](../../deploy/environment-variables.md).

Watch the video:

<div style="position: relative; padding-bottom: 50.44843049327354%; height: 0;"><iframe src="https://www.loom.com/embed/ac276c49b5144102a364b9f1c04bedcf?sid=903a04cd-e5f7-4c97-a80e-27281a49c9dc" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

??? "Transcript"

    0:01 Hi, welcome back to another video. In the last video you saw that we were getting a runtime error on the TFL camera feed service so we needed to configure the TFL API key secret for that and you saw how to do that.

    0:18 There is also another service that needs a bit of configuration and that's the project frontend so in this video I'm going to talk a bit about that.

    0:29 I, because it's exactly the same technology. Because you saw in the previous video I've not gone through the whole process of creating a secret again but I did want to talk about this bearer token that you need for the project frontend.

    0:46 So what is this bearer token? Well I've configured it to this secret PAT. What's a PAT? Well, PAT is a personal access token.

    0:59 Why do we need the bearer token? Why do we need this personal access token? Well the bearer token is used by the front end which is web client to authenticate something called the streaming reader API.

    1:15 The streaming reader API allows web client to read information from a quick topic and obviously in this case the front end needs to, needs to do that for this use case.

    1:30 But that streaming reader API needs to be authenticated and you authenticate using a personal access token or PAT. And so once we have that PAT we can configure it in here in this variable called bearer token.

    1:48 So where do we get the PAT from? There's several ways of doing it. Which are covered in documentation. However the simplest way is just to click on your profile pick and then click personal access tokens.

    2:05 And in here you can click generate token. Give your token a name send an expiration date and then create the token.

    2:25 The token's created, you can copy it to clipboard, and then once it's in the clipboard, you can configure the secret.

    2:35 In this case, my secret is simply called PAT. So it contains that token copied for you. The clipboard or a token from a clipboard.

    2:47 So that's, that should be all you need to do there. We can just quickly check this is all working. Let's go back.

    2:58 To here, start the service up. I tend not to leave the camera feed running. So we can see some data coming through.

    3:14 Now the green lines. Let's have a look in the project front end. Okay, so we can see here the real time.

    3:30 Pictures, the, the frames that have been grabbed and coming in. So that looks, that looks good. That means the streaming reader has been authenticated and the web client is able to read the information from the topic.

    3:46 Now we're getting this dialogue here because we've not configured a Google Maps API key, I don't have one, if you have one you can configure your project with a Google Maps API key.

    4:02 But we have all the key information being displayed so, and you can see this is all working nicely, so that looks good.

    4:16 Okay let's just quickly zoom in. Zoom in and out. Just make sure that's working okay. That looks fine. There we go.

    4:29 So, yep, everything should be configured. So, just going back and recapping on that. You had to configure a couple of services.

    4:38 You had to configure the TfL camera feed. You had to configure the TfL API key. That's your TfL API key that you get from that website.

    4:50 In addition to that you had to configure what's called the bearer token, the bearer token variable here and to do that you generate a PAT, a PAT, a personal access token and configure it here.

    5:07 Now just in case you've forgotten how to configure secrets, as I said before there are a couple of ways we can go in here and we can use this to access the secrets management facility.

    5:27 But there are other ways if you, if you go into your environment configuration, for example, you can see there is the ability to visit the same.

    5:39 Dialogue here. So if I wanted to create a new secret here, new secret, and I can put in my value here, default value, and then value.

    5:55 Specific to the environment as well, and save my changes. So now if you're configuring a secret, like we were doing back in the pipeline, so if I go here, go here.

    6:11 Here you can see the new secret in the dropdown. So I'll just escape out of that. Okay, so hopefully that should see you good for the configuration of the project.

    6:27 And as always, thanks for watching and see you in the next video.

#### Google Maps API key

When testing the UI you see "For development purposes only" displayed on the map. Optionally, if you have a Google Maps API key, you can avoid this.

To add your own Google Maps API key you need to edit `src/app/app.module.ts` and modify the `apiKey` field in `AgmCoreModule.forRoot` to include your Google Maps API key:

``` typescript
AgmCoreModule.forRoot({apiKey: '<your_google_maps_api_key>'}),
```

### Other services

Other optional services may require similar configuration, for example, the Quix Amazon S3 connector service requires your S3 credentials if you want to use it.

## 🏃‍♀️ Next step

[Part 2 - TfL camera feed :material-arrow-right-circle:{ align=right }](tfl-camera-feed.md)
