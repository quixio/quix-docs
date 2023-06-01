# Quix Documentation Best Practice Guide

This document describes the best practices used by Quix in writing technical documentation. In particular, it covers the main paradigm used in creating Quix documentation: topic-based writing. Topic-based writing is a long-established industry standard for writing web-based technical documentation. This guide also covers aspects of technical docs such as search, navigation, and information architecture.

This is a companion document to our [Writing Style Guide](./WRITING-STYLE.md), which you should read to understand our "house style" for writing technical documentation. The style guide covers such details as tense, language, spelling, common technical terms, capitalization, section and topic headings, and many other aspects of writing Quix technical documentation.

## What is topic-based writing?

Topic-based writing has a long history in technical writing, becoming a significant paradigm with the creation of [DITA](https://en.wikipedia.org/wiki/Darwin_Information_Typing_Architecture) in the early 2000s by IBM. The roots of DITA go back further, to SGML, which was invented by IBM in the 1960s. The DITA specification is currently managed by [OASIS](https://www.oasis-open.org/). 

It's important to note that while DITA (and SGML) are XML-based technologies, the key idea of topic-based writing can be expressed with any technology from XML to Markdown.

So what is topic-based writing exactly? Topic-based writing (TBW) is an approach to writing technical information where you write material in focused, self-contained topics. There can be different topic types, such as concept, and task (sometimes called "how tos"). Topic types are discussed in more detail later. 

TBW is in contrast to the model that is commonly used in books and manuals, where you have a long progressional structure: you start at the beginning and read all the way to the end. The probem with the "linear progression" paradigm was found to be, after research, that almost nobody used technical documentation in this manner - they tended to dip into specific sections, or order to gain specific knowledge. 

This affinity with "just in time" information has been made even more true with the advent of web-based documentation, and the prevalence of search engines such as Google, and Q&A sites such as Stack Overflow. People tend to start with search, and look for an immediate solution to their current pain point, which may be, in practical terms, trying to understand a concept, or configure a specific part of the software.

With TBW, combined with powerful integrated search, as well as the use of external search engines that index web-based documentation, as well as effective information architecture and navigation, readers can quickly locate the specific information required, without having to wade through a lot of extraneous information, that may be useful, but not at the current moment.

**Note:** To prevent confusion with Kafka Topics, writers should avoid using the term "topic" in the main documentation, when referring to documentation. For example, rather than writing "In this topic...", use "In this documentation...", or "In the following sections...".

## Topic types

In common with industry-wide practices, Quix uses four main topic types in its technical documentation:

1. Concept
2. How-To (sometimes called a guide)
3. Reference
4. Tutorial

These types are very commonly used. They are explained in detail in Divio's excellent guide to [writing technical documentation](https://documentation.divio.com/).

Summarizing Divio's guide, concepts help with understanding, how-tos with getting stuff done, reference topics are informational, and tutorials provide learning experiences. The latter should be briefly explained. While it is always desirable to learn something useful from working through a tutorial, their main function is to provide experience of using the product. That should ideally be a pleasant, and even fun, interaction. That is something that the technical writing team at Quix strives for. We want the explorations of the product to be fun, enjoyable, *and* informative. This way we believe the reader will come back for more, and explore all parts of the system, and eventually adopt the product as a solution to their own real-time streaming use cases.

There's also an excellent [video presentation](https://www.youtube.com/watch?v=t4vKPhjcMZg) on the different topic types listed here, and their purpose.

## What makes a good topic?

A good topic should ideally be as focused and self-contained as possible. It should not ramble or try to cover too much information in the topic, as the reader will quickly become overwhelmed. By keeping the topic focused, and using good headings (see our [writing style guide](./WRITING-STYLE.md#section-headings)), the reader (such as a developer or data scientist) will be able to find the required information more easily, using the Quix documentation integrated search. 

## Search

Good search is **critical** to effective TBW. For this reason, the Quix documentation features a powerful built-in search facility. External search engines such as Google are also supported, as the Quix documentation is generated as HTML, compliant with the latest W3C standards, and as such can be efficiently indexed by external search engines.

The Quix documentation search facility is incremental - you start typing your search term, and the search engine starts to find matching topics immediately. Of course, the reader can also avail themselves of external search engines, and this is often their starting point before landing in the Quix documentation. When a reader lands inside the Quix documentation from an external source, navigation becomes critical, and this is explained in the next section.

## Navigation and information architecture

Good navigation is **critical** to effective TBW. Once a reader finds themselves in the Quix documentation, they need to be able to quickly orientate themselves on the page and in the documentation set overall.

The main left-hand navbar, or TOC, provides the main element of the information architecture, and is purposely organized into the following top-level hierarchy:

1. **Landing page and Quickstart**. The idea here is to quickly orientate the reader. From the landing page they can jump to key pieces of documentation. The Quickstart provides an easy way to "dip a toe" into Quix, and try the product out. The Quickstart is divided into two parts: one aimed at all users, and one specifically targeting developers.
2. **Quix Platform**. This is the main Quix product, and consists of the SaaS offering, UI, pipelines, deployments, and pre-built connectors and transforms. Concepts, How-Tos and Tutorials for Quix Platform are contained in here.
3. **Client Library**. The Quix Streams client library provides a very effective way to write scalable real-time streaming applications. Using Quix Streams you can create solutions that work with Quix Platform, or with other services depending on your requirement. The `Client Library` section also includes API reference documentation generated from source code for both the Python and C# versions of Quix Streams.
4. **APIs**. These are additional Quix APIs, other than those provided by Quix Streams. The documentation consists of general topics, as well as REST API references based on OAS3 documents.

The longer topics can be navigated using the right-hand "on this page" TOC. This allows you to quickly navigate through the sections of a topic. It is important that topics are structured with the correct heading levels. There should only ever be one `h1` heading per topic, but there can be several `h2`s. Section headings below `h3` should be used sparingly, as they won't be displayed in the navigation, and could indicate the topic has become too convoluted. The solution can be to split the topic into multiple topics, or otherwise rethink the structure.

It's important that the end of the topic should not leave the reader hanging, so a well-written topic ideally ends with a "Next steps" section, where the reader can find suggested resources that enable their Quix learning journey to continue. 

## Tutorials

As mentioned before, tutorials not only serve to inform, but to provide a learning experience with the product. The reader should be left interested, informed, and **confident** to further explore the product. 

**IMPORTANT:** Tutorials that fail, because they are not maintained, create the opposite to the required experience - they leave the reader confused, and create an unpleasant (not very fun) experience. They leave the reader feeling disengaged, and reluctant to explore further.

As tutorials tend to be longer-form material, Quix uses the approach of splitting the tutorials up into *parts*. This allows the reader to attempt a part, leave it to one side should they so wish, and then return to continue with the tutorial when time permits. To help the tutorial be manageable, each part is further divided into steps. Steps are numbered to provide an additional source of reference, and make working through the procedure easier to track. 

The Quix technical writing team attempts to keep the structure of each tutorial consistent, so that the layout for readers feels familiar. An example of this structure can be found in the [Sentiment Analysis tutorial](https://docs.quix.io/platform/tutorials/sentiment-analysis/index.html). Writers should always try to follow this structure consistently. 

Note this particular tutorial also includes optional parts. This is done to keep the main tutorial length reasonable - the longer the tutorial, the less likely the reader is to complete it, as they can get lost in the myriad steps and configurations. By keeping things as simple as possible, and providing optional parts as self-contained addendum, things are kept much more manageable. 

Another approach (and perhaps to be preferred), is to create a new separate tutorial that covers the optional or additional parts. This is not always possible though, as some steps may be required for both tutorials, and you want to avoid repeating steps unnecessarily. As a writer you use your best judgement at the time, but remember you can always circle back later with a view to improvements.

## "Docs as code" and tooling

Quix documentation uses a "docs as code" approach. What this means is the same tools that are used to manage code are used to manage documentation. There are numerous reasons for this. Primarily, it allows for easier contribution and participation, as tools and technologies, such as Git, GitHub, Markdown, issue trackers, and related workflows are familiar and widely adopted. 

Quix uses GitHub as the repository for the Markdown files that make up the Quix technical documentation, and contributors can avail themselves of full revision history, clones and forks, PRs, PR reviews, branches, tagging, and so on. 

The key tooling used for the Quix documentation includes:

1. [GitHub](https://github.com/quixio/quix-docs) - repositories, issue tracking, PR reviews, revision control.
2. [Markdown](https://github.github.com/gfm/) - the source format for general Quix documentation is GitHub-flavoured Markdown. Our tooling also supports enhancements to this such as for tabbed codeblocks, code annotations, and a wide range of admonitions.
3. [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) - this is our main documentation tooling. After extensive analysis of open source documentation tooling offerings, Quix decided on going with Material for MkDocs. This open source project works with already established technologies such as MkDocs and Python. It provides an unsurpassed documentation experience, with minimal configuration. Quix is an avid sponsor of the [insiders program](https://squidfunk.github.io/mkdocs-material/insiders/), which gives us access to numerous "goodies" that help make our documentation more effective.
4. [OpenAPI](https://swagger.io/specification/) - for REST APIs, Quix uses Open API Specification v3 documents.
5. [GitHub Actions](https://github.com/features/actions) - our build pipelines use GitHub Actions. These are used, for example, to create review apps. Review apps are complete builds of the documentation that can be used to assist in the review process. A link to the review app is automatically added to the docs repo pull request (PR).

## Multiple repositories

Quix uses multiple (currently two) repositories to manage the Quix documentation, these are:

1. [Quix Docs](https://github.com/quixio/quix-docs) - this is the repository for general docs, Quix Platform docs, and API docs.
2. [Quix Streams](https://github.com/quixio/quix-streams) - a stand-alone repository for Quix Streams, including all Quix Streams documentation.

Quix uses the MkDocs [multirepo plugin](https://github.com/jdoiro3/mkdocs-multirepo-plugin) to import a complete repo and make it part of a documentation set. Quix uses this to import the Quix Streams documentation stored in the Quix Streams repo.

## Docs we like

We always look at what other companies are doing and try to follow best practices in documentation. Some documentation sites that the Quix team is impressed by include:

* [Cockroach Labs](https://www.cockroachlabs.com/docs/) - great design and practical information architecture targeting users.
* [Aiven](https://docs.aiven.io/docs/platform) - a very nice example of the use of topic-based writing.
* [ReadySet](https://docs.readyset.io/) - another good example of topic-based writing, with crisp, clear design. They also use Material for MkDocs. 

## See also

Other guides that may be useful if you are thinking of contribnuting to the Quix documentation:

* [README](./README.md) - Contains basic introductory material to help you get started with the Quix documentation repository.
* [Contribution Guide](./CONTRIBUTING.md) - More detailed guide on how to contribute to the Quix documentation.
* [Writing Style Guide](./WRITING-STYLE.md) - Writing style guide covering the writing conventions to use in the Quix documentation.

There are also books that cover best practices in great depth:

* **DITA Best Practices** by Laura Bellamy, Michelle Carey, Jenifer Schlotfeldt - although uses DITA, the ideas and techniques in this book are useful, even if you're not using DITA.
* **Every Page is Page One (Topic-based Writing for Technical Communication and the Web)** by Mark Baker (Foreword by Scott Abel) - excellent guide to the subject, and highlights the importance of navigation and search, including the role of external search engines. 

## Get in touch

* If you need any help, please sign up to the [Quix community forum](https://forum.quix.io/){target=_blank}.