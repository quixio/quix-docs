# Quix Documentation

Welcome to the Quix developer documentation!

!!! note "Beta"

    **See [here](./platform/changes.md) for significant recent changes.**

!!! tip
    
    Our docs support hotkeys. Press ++slash++, ++s++, or ++f++ to activate search, ++p++ or ++comma++ to go to the previous page, ++n++ or ++period++ to go to the next page.

## See Quix in action

See the following live demos and running pipelines:

<div class="grid cards" markdown>

- __Image processing demo__

    ---

    See a real-time image processing live demo!

    [:octicons-arrow-right-24: Image processing demo](https://app-demo-computervisiondemo-prod.deployments.quix.ai/){target=_blank}

- __Image processing pipeline__

    ---

    See a real-time image processing pipeline running!

    [:octicons-arrow-right-24: Image processing pipeline](https://portal.platform.quix.ai/pipeline?workspace=demo-computervisiondemo-prod&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qVTBRVE01TmtJNVJqSTNOVEpFUlVSRFF6WXdRVFF4TjBSRk56SkNNekpFUWpBNFFqazBSUSJ9.eyJodHRwczovL3F1aXguYWkvb3JnX2lkIjoiZGVtbyIsImh0dHBzOi8vcXVpeC5haS9vd25lcl9pZCI6ImF1dGgwfDI4YWQ4NWE4LWY1YjctNGFjNC1hZTVkLTVjYjY3OGIxYjA1MiIsImh0dHBzOi8vcXVpeC5haS90b2tlbl9pZCI6ImMzNzljNmVlLWNkMmYtNDExZC1iOGYyLTMyMDU0ZDc5MTY2YSIsImh0dHBzOi8vcXVpeC5haS9leHAiOiIxNzM3ODI5NDc5LjIyMyIsImlzcyI6Imh0dHBzOi8vYXV0aC5xdWl4LmFpLyIsInN1YiI6ImtyMXU4MGRqRllvUUZlb01nMGhqcXZia29lRkxFRDVBQGNsaWVudHMiLCJhdWQiOiJxdWl4IiwiaWF0IjoxNjk1NzE2MDI4LCJleHAiOjE2OTgzMDgwMjgsImF6cCI6ImtyMXU4MGRqRllvUUZlb01nMGhqcXZia29lRkxFRDVBIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwicGVybWlzc2lvbnMiOltdfQ.Ndm0K2iNHPxDq1ohF-yb-6LzIqx_UY8Ptcq0kAwSNye12S3deX_eDkC4XqZqW2NoSLd3GsmWV9PZGetGGp2IlqshQFZtUMp6WP6hq917ZC1i8JFx93PAbY7NT_88nFDovVlaRcoTpWvI-03KbryLkAoB28c6qb3EFwjCWFBuy_yA4yjQ8uF0-AZ0R9Qi4IBaekXWqcgO0a91gVRg0oA_hnzJFoR-EnZ2G1ZSxtuVgnyyPuQTMUvzJuUT_IJTLzEB_kejX0pcXRZBIwHP8MWLB4mE5DtIdz4jm8WIA4eZJZ7ZCG4dk-adQwZ2BdkNknV5eEwRgRJL4ybaplkaDlR-dg){target=_blank}

- __Sentiment analysis demo__

    ---

    See a sentiment analysis live demo!

    [:octicons-arrow-right-24: Sentiment analysis demo](https://sentimentdemoui-demo-chatappdemo-prod.deployments.quix.ai/chat){target=_blank}

- __Sentiment analysis pipeline__

    ---

    See a sentiment analysis pipeline running!

    [:octicons-arrow-right-24: Sentiment analysis pipeline](https://portal.platform.quix.ai/pipeline?workspace=demo-chatappdemo-prod&token=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qVTBRVE01TmtJNVJqSTNOVEpFUlVSRFF6WXdRVFF4TjBSRk56SkNNekpFUWpBNFFqazBSUSJ9.eyJodHRwczovL3F1aXguYWkvb3JnX2lkIjoiZGVtbyIsImh0dHBzOi8vcXVpeC5haS9vd25lcl9pZCI6ImF1dGgwfDI4YWQ4NWE4LWY1YjctNGFjNC1hZTVkLTVjYjY3OGIxYjA1MiIsImh0dHBzOi8vcXVpeC5haS90b2tlbl9pZCI6ImMzNzljNmVlLWNkMmYtNDExZC1iOGYyLTMyMDU0ZDc5MTY2YSIsImh0dHBzOi8vcXVpeC5haS9leHAiOiIxNzM3ODI5NDc5LjIyMyIsImlzcyI6Imh0dHBzOi8vYXV0aC5xdWl4LmFpLyIsInN1YiI6ImtyMXU4MGRqRllvUUZlb01nMGhqcXZia29lRkxFRDVBQGNsaWVudHMiLCJhdWQiOiJxdWl4IiwiaWF0IjoxNjk1NzE2MDI4LCJleHAiOjE2OTgzMDgwMjgsImF6cCI6ImtyMXU4MGRqRllvUUZlb01nMGhqcXZia29lRkxFRDVBIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwicGVybWlzc2lvbnMiOltdfQ.Ndm0K2iNHPxDq1ohF-yb-6LzIqx_UY8Ptcq0kAwSNye12S3deX_eDkC4XqZqW2NoSLd3GsmWV9PZGetGGp2IlqshQFZtUMp6WP6hq917ZC1i8JFx93PAbY7NT_88nFDovVlaRcoTpWvI-03KbryLkAoB28c6qb3EFwjCWFBuy_yA4yjQ8uF0-AZ0R9Qi4IBaekXWqcgO0a91gVRg0oA_hnzJFoR-EnZ2G1ZSxtuVgnyyPuQTMUvzJuUT_IJTLzEB_kejX0pcXRZBIwHP8MWLB4mE5DtIdz4jm8WIA4eZJZ7ZCG4dk-adQwZ2BdkNknV5eEwRgRJL4ybaplkaDlR-dg){target=_blank}

</div>

## Get started

If you're new to Quix, here are some resources to help get you started quickly.

First, sign up for a [free account](https://portal.platform.quix.ai/self-sign-up){target=_blank}.

<div class="grid cards" markdown>

- __Quickstart__

    ---

    Get data into Quix, and display it, in under 10 minutes.

    [:octicons-arrow-right-24: Quickstart](./platform/quickstart.md)

- __Quix Tour__

    ---

    Build a complete stream processing pipeline in under 30 minutes.

    [:octicons-arrow-right-24: Quix Tour](./platform/quixtour/overview.md)

- __What is Quix?__

    ---

    New to Quix? Find out more!

    [:octicons-arrow-right-24: What is Quix?](./platform/what-is-quix.md)

- __Glossary__

    ---

    List of Quix terms.

    [:octicons-arrow-right-24: Glossary](./platform/glossary.md)
 
- __Ingest data__

    ---

    Read about some of the many ways you can get your data into Quix.

    [:octicons-arrow-right-24: Ingest data](./platform/ingest-data.md)

-   __Help__

    ---

    If you need any help, please sign up to the [Quix community forum](https://forum.quix.io/){target=_blank}.
    
    [:octicons-arrow-right-24: Join the Quix community forum](https://forum.quix.io/){target=_blank}

</div>

## Tutorials
 
By following these tutorials, you can learn how to build data-driven apps, and integrate Quix with external systems.

<div class="grid cards" markdown>

-   __Data Science__

    ---
    
    Deploy a real-time **data science** application into a scalable self-maintained solution.

    [:octicons-arrow-right-24: Data Science](./platform/tutorials/data-science/index.md)    
    
-   __Image Processing__

    ---
    
    Deploy a real-time image processing pipeline using ML and London's 'Jam Cams'.

    [:octicons-arrow-right-24: Image Processing](./platform/tutorials/image-processing/index.md)

</div>

## Core resources

Read more about the Quix Streams Client Library and APIs.

<div class="grid cards" markdown>

-  __Connect to Quix - Client Library__

    ---

    Discover how to connect Quix and your application using Quix Streams.

    [:octicons-arrow-right-24: Learn more](./client-library/connect.md)

-   __Publish data - Client Library__

    ---

    Read how to publish real-time data to Kafka topics using Quix Streams.

    [:octicons-arrow-right-24: Learn more](./client-library/publish.html)

-   __Subscribe to data - Client Library__

    ---

    Learn how to subscribe to real-time data in your application using Quix Streams.

    [:octicons-arrow-right-24: Learn more](./client-library/subscribe.html)

-   __Streaming Writer API__

    ---

    Stream data to Quix Kafka topics via HTTP with this API.

    [:octicons-arrow-right-24: Learn more](./apis/streaming-writer-api/index.md)

-   __Streaming Reader API__

    ---

    Work with this API to receive live data in your Web applications from Quix Kafka topics via Websockets.

    [:octicons-arrow-right-24: Learn more](./apis/streaming-reader-api/index.md)

-   __Portal API__

    ---

    Automate creation and management of your project and pipeline.

    [:octicons-arrow-right-24: Learn more](./apis/portal-api/index.md)

-   __Query API__

    ---

    Query historical time series data in Quix using HTTP interface.

    [:octicons-arrow-right-24: Learn more](./apis/query-api/index.md)

</div>

## Documentation changelog

The documentation changelog can be found in the [documentation repository Wiki](https://github.com/quixio/quix-docs/wiki/Docs-Releases).

This is in addition to general product changes which are summarized in the [changes documentation](./platform/changes.md).

## Contribute

<div class="grid cards" markdown>

-   __Contribute__

    ---

    We welcome contributions to the docs.

    [:octicons-arrow-right-24: Contribution guide](https://github.com/quixio/quix-docs/blob/dev/CONTRIBUTING.md){target=_blank}

</div>
