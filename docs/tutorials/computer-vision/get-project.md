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

### Web UI service

Note if you just want to try out the UI without performing the following steps, you can do that in the [demo](https://app-demo-computervisiondemo-prod.deployments.quix.io/){target=_blank}.

You'll need a [PAT](../../apis/streaming-reader-api/setup.md#personal-access-token-pat) for the UI as it uses the Streaming ReaderAPI which needs to be authenticated. 

Once you have your PAT copied to the clipboard, create a new secret to contain it. Then link that secret to `bearerToken` environment variable for the UI.

[Read more about environment variables and secret management](../../deploy/environment-variables.md).

Watch the video:

<div style="position: relative; padding-bottom: 50.44843049327354%; height: 0;"><iframe src="https://www.loom.com/embed/ac276c49b5144102a364b9f1c04bedcf?sid=903a04cd-e5f7-4c97-a80e-27281a49c9dc" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

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
