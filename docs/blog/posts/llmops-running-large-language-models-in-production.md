---
title: "LLMOps: running large language models in production"
date: 2023-12-22
authors: [tun-shwe]
slug: llmops-running-large-language-models-in-production
description: >
  LLMOps is a considered, well structured response to the hurdles that come with building, managing and scaling apps reliant on large language models. From data preparation, through model fine tuning, to finding ways to improve model performance, here is an overview of the LLM lifecycle and LLMOps best practices.
categories:
  - industry-insights
---

# LLMOps: running large language models in production

LLMOps is a considered, well structured response to the hurdles that come with building, managing and scaling apps reliant on large language models. From data preparation, through model fine tuning, to finding ways to improve model performance, here is an overview of the LLM lifecycle and LLMOps best practices.

<!-- more -->

LLMOps is on the cusp of becoming the next big theme in DevOps. And, although
the skills, tools and techniques we need to run large language models (LLMs)
in production might look familiar, the specific demands of LLMs require some
rethinking.

From data preparation, through model fine tuning, to finding ways to improve
model performance, read on for an overview of the LLM lifecycle and LLMOps
best practices.

## From DevOps to MLOps to LLMOps

Let’s start by defining what LLMOps is. LLMOps, or Large Language Model
Operations, is an emerging discipline that focuses on the development,
deployment and management of large language models as part of the tech stack
behind your app. You can think of it as a specialized branch of MLOps (Machine
Learning Operations), which is itself a bridge between traditional DevOps
practices and the specific needs of machine learning models, including deep
learning models like LLMs.

So, what should we expect to find in LLMOps? Well, there are three distinct
areas:

  1. **Model development and training:** For most of us, this means taking a foundation model and fine tuning it. Fine tuning is the process of taking pre-trained models and training them further on use case or domain specific data in order to improve performance for specific tasks. The result is a specialized large language model, which doesn't have to be trained from scratch.
  2. **Model deployment and integration:** After the model is fine tuned, the next step is deploying that specialized LLM into production. From here on in, LLMOps draws a great deal on DevOps best practices while catering to the specific ops needs of LLMs. For example, managing the substantial compute resources LLMs rely on and ensuring efficient throughput of text-based data. Perhaps where LLMOps differs, though, is that decoupled, event-driven architectures are more relevant than ever. 
  3. **Model monitoring and maintenance:** Once your LLM-reliant app is in production, LLMOps continues to draw on DevOps. Here we can use the data from model monitoring to detect and respond to issues such as model drift, while also maintaining components including a vector database, various  computational resources and those crucial streaming data pipelines.

In practice, within time you’ll be doing all three of these at once. In this
article, we’re going to focus on the third stage: LLMOps for production
scenarios. But, first, let’s make sure we know _why_ we need LLMOps.

### Why do we need LLMOps?

Until now, software development has been all about precision. As developers,
we know how our code behaves and what outcomes to expect. However, it’s harder
for us to reason about LLMs because they are, essentially, non-deterministic.
Allowing for parallelism, reliance on external data and similar elements of
randomness, we know that a line of code in Python will give us identical
output each time we run it. The same isn’t necessarily true for LLM prompts.

What we do understand about large language models, though, is that integrating
them into our application tech stacks isn’t just about hooking up yet another
new piece of technology. Instead, we need to adapt our approach to DevOps to
take account of the unique challenges LLMs present, such as:

  * **Volume of data:** As they rely on natural language processing, LLMs require the management and processing of very large volumes of text data.
  * **Heavy use of computational resources:** Allocating and optimizing the substantial computational power necessary for both training and running LLMs, especially when performing complex tasks or handling large user bases.
  * **Tendency for models to drift:** Over time, the results delivered by LLMs tend to change. Those differences in output fall into three types, in order of seriousness. First, there are relatively harmless changes in emphasis. Then there are improvements or reductions in performance, such as [a model losing an ability it had previously demonstrated](https://twitter.com/matei_zaharia/status/1681467961905926144). Most problematic, though, are hallucinations and other examples of LLMs confidently presenting fictional or otherwise inappropriate statements as fact. Monitoring for this model drift is as much a part of LLMOps as ensuring the integrity of a relational database is a part of DevOps.
  * **Integration challenges:** Integrating LLMs into our existing tech stack can be tricky because they respond differently to traditional APIs, pose unique data challenges and generally operate under different rules. 
  * **Security and privacy:** Both prompts and responses might include sensitive data in plain text.
  * **Expense:** Whether it’s an external LLM provider, such as OpenAI, or an in-house large language model, costs can escalate quickly.
  * **Scalability and reliability:** Each of these challenges further complicates how we ensure LLM-based applications respond well to changes in demand.

When new terms come along, it can be tempting to dismiss them as buzzwords.
But LLMOps is a considered, well structured response to the hurdles that come
with building, managing and scaling apps reliant on large language models.

So, let’s delve deeper.

## The LLMOps tech stack

First, we need to know what tools we’re working with. LLMOps tooling falls
into five broad areas:

  * Data management
  * Model management
  * Model deployment
  * Prompt engineering and optimization
  * Monitoring and logging.

Let’s look at each in turn.

### Data management

This is where we come across one of the biggest differences when dealing with
an LLM-reliant architecture. Most of the data is unstructured text and is,
potentially, huge. The text data you’ll come across includes:

  * Training and fine tuning data sources, which will vary depending on whether you’re training from scratch or augmenting an existing model.
  * Checkpoints, which are snapshots of the LLM state at different stages of training/fine tuning.
  * Prompts and their responses.
  * Retrieval Augmented Generation (RAG) text, which you’ll need to retrieve for external sources and then deliver to the LLM to provide additional context to user prompts.
  * Text sources used for ongoing model fine tuning.

From ingestion, through streaming around the system, to storage and query,
this comes in three parts:

### Model management

Taking care of the lifecycle of the large language models themselves, from
development to deployment and updating, is important to maintain the
usefulness of your LLM-based app. Here are the key components:

  * **Hosting the model:** If you’re using an open source or other self-hosted model, there’s the LLM itself.
  * **Model testing:** Tools such as [Giskard](https://www.giskard.ai/) provide a framework for automated testing of your models, detecting bias and hallucinations, harmful responses, security problems such as prompt injection vulnerabilities and quality control issues.
  * **Version control and model tracking:** Work with an all in one tool encompassing a model registry, such as [Neptune](https://neptune.ai/), or pick from standalone tools like [lakeFS](https://lakefs.io/), [DVC](https://dvc.org/) (Data Version Control) and Git (with some help from Git LFS for the larger file sizes involved) to handle version control for models and their datasets.
  * **Model training and fine tuning:** This is where tools originally designed for classical ML models, such as TensorFlow and PyTorch, allow you to tune the large language model to the specific needs of your application.

### Model deployment

Deploying large language models into production relies on many of the same
tools as you’d use in a typical DevOps environment, albeit with some
specialized alternatives if you prefer.  

Frameworks such as [Kubeflow](https://www.kubeflow.org/), Netflix’s
[Metaflow](https://metaflow.org/), Databricks’ [MLflow](https://mlflow.org/)
and [Skypilot](https://github.com/skypilot-org/skypilot) take care of the
testing to production lifecycle, spinning up cloud and container resources,
deploying workloads to them and then managing them as demand fluctuates.

As we touched on earlier, the fundamentally conversational nature of LLM-based
applications makes them especially well suited to a decoupled, event-driven
architecture. Rather than relying on potentially brittle synchronous API calls
between microservices, decoupling puts Kafka or a similar stream broker in
charge of managing the flow of data between each element of your LLMOps
architecture. With Quix, you can serve your applications as containers and
orchestrate the data flow between each component using Kafka topics.

### Prompt engineering and optimization

Unlike traditional software engineering, LLMs replace precise code with
imprecise human language. It’s part art and part science. The precision of a
query is less crucial when a student is asking a service like ChatAPI for
homework help.

However, when integrating a large language model into our application's
backend, word choices, sentence structure and other nuances can impact both
the predictability and efficiency of responses. And there are several
prompting techniques that each attempt to formalize a particular approach.
[Chain-of-thought prompting](https://arxiv.org/abs/2201.11903), for example,
breaks a problem down into multiple prompts in an attempt to have the model
reason through a problem, whereas Zero-Shot and Few-Shot prompting is perhaps
closer to the casual questions we might ask of ChatGPT.

The potential complexity involved in getting predictable responses from
prompts has led to the emerging discipline of prompt engineering and tools to
help support creating, testing and managing prompts. You’ll find those tools
fall into categories, such as:

  * **Prompt development and testing:** Just as with other use cases [Jupyter Notebooks](https://jupyter.org/) and [Google’s Colab](https://colab.research.google.com/), offer a sandbox for experimenting with individual prompts, enabling you to iteratively test and refine queries. Dedicated prompt engineering tools are also available. [PromptLayer](https://promptlayer.com/) and  [Knit](https://promptknit.com/), for example, provide an environment to test, run and collaborate on prompts. Testing tools, like [LangBear](https://langbear.runbear.io/introduction), allow for A/B testing of your prompts.
  * **Prompt analysis:** Understanding the linguistic make-up of prompts can help us to identify how different approaches to sentiment, grammatical structure and contextual meaning can influence outcomes. This is another place where NLTK is useful, as it can check for the ambiguity, consistency and efficiency of our prompts. [Models such as those available from Hugging Face](https://huggingface.co/models?pipeline_tag=text-classification&sort=downloads&search=sentiment) analyze sentiment in prompts, which can help to understand the impact of subtle changes in your prompts.
  * **Prompt versioning:** Like regular code, you’ll amend your prompts over time. Just as with model management, we can turn here to familiar versioning tools to keep track of how our prompts evolve.
  * **Prompt chaining and orchestration:** Just as we break problems down into smaller chunks in traditional software engineering, LLMs are more effective when we break a larger problem into prompts that deal with a specific aspect of that problem. Tools like [LangChain](https://www.langchain.com/) orchestrate the prompting process, simplify the chaining of those smaller prompts together, but also manage contextual data from vector databases.

### Monitoring and logging

Just like regular DevOps, model monitoring and logging enable us to understand
and respond to what is happening in our systems that rely on LLMs.
Standardized metric frameworks, like
[ROUGE](https://huggingface.co/spaces/evaluate-metric/rouge) (Recall-Oriented
Understudy for Gisting Evaluation) and
[BLEU](https://huggingface.co/spaces/evaluate-metric/bleu) (Bilingual
Evaluation Understudy), assess a specific aspect of an LLM’s performance by
comparing it against reference summaries. More generally, tracking the
[accuracy](https://huggingface.co/spaces/evaluate-metric/accuracy) and
[precision](https://huggingface.co/spaces/evaluate-metric/precision) allows
you to understand how reliable your model is.

Some of the tools you might use here include:

  * **Performance monitoring tools:** Familiar tools, such as [Grafana](https://grafana.com/grafana/plugins/grafana-llm-app/), have plugins for ingesting monitoring data from LLMs and help you to track indicators such as response time, accuracy throughput. Specialized tools, such as [Weights and Biases](https://wandb.ai/site), help you evaluate performance through reproducible experimentation.
  * **Logging:** Whether you choose a specialized LLM logging tool, such as [LLM Report](https://llm.report/) and [Helicone](https://www.helicone.ai/), or a general purpose logging system such as the ELK Stack), the data you log in LLMOps isn’t that different from other scenarios. What you’re looking for are insights into the performance, reliability and usage patterns as potential areas for improvement

That’s far from an exhaustive list but gives you a sense of the broad areas
you’ll need to think about as you plan your LLMOps architecture.

## LLMOps best practices

Knowing what tools are at our disposal is a useful step, but understanding how
to integrate LLMs into your application architecture means considering the
end-to-end LLM lifecycle. As we saw above, that includes data preparation and
model training through to deployment, monitoring ongoing updates.

While many organizations were able to gradually embrace DevOps practices,
transitioning to LLMOps could be a different story. That’s because LLMOps is
an all-or-nothing game. Running LLM-based applications relies on adopting new
techniques and tooling, making the shift less flexible than the step-by-step
approach of DevOps adoption.

Before you set out on integrating LLMOps into your process, consider these
LLMOps best practices:

  * Avoid network congestion.
  * Prepare to store large volumes of data at rest.
  * Find the right balance between elasticity and cost of compute resources.
  * Double down on data security and privacy.

Let's dive deeper into these best practices, looking at each one in turn to
understand how they can help you develop a successful LLMOps strategy.

### Avoid network congestion

It could seem that the past two decades have seen software engineering yoyo
between efficient binary protocols, like Protobuf over human readable formats
such as JSON. LLMs swing the pendulum massively in favor of human readable
text and that could be a problem.

The volume of network traffic your application needs to handle will be
significantly greater than the back and forth of JSON between REST APIs in a
more traditional application architecture. There are four tactics you can
implement to avoid network congestion:

  * **Serialization:** The tokenization and embedding we looked at earlier not only strip away unnecessary characters but also enable us to represent  contextual relationships between tokens as numbers. That streamlines both the transmission and storage of data by converting relatively verbose text into more efficient representations. 
  * **Compression:** Methods such as Gzip and Brotli already offer effective compression of text and serialized data, having been tuned for HTTP and HTML workloads. 
  * **Caching:** Using Redis, or similar tools, to**** place commonly used results closer to where they’re used will reduce network congestion and reduce calls to your LLM, whether that’s externally or internally hosted.
  * **Decouple your architecture:** And, as we looked at earlier, establishing  streaming data pipelines with Quix, Apache Kafka, or Amazon Kinesis, between your application’s components reduces the risk that congestion in one part of your application will impact elsewhere.

### Prepare to store large volumes of data at rest

Moving those large volumes of data around your LLMOps architecture is one
thing but, of course, you also need a plan for how to store it. The difference
between how we typically work with data and what we need for an LLM
architecture falls into three areas:

  * **Verbosity:** The sheer volume of text is quite unlike the structured data we typically deal with in software development. LLMs require massive amounts of text data for training and inference, which poses challenges in terms of storage capacity, transfer and retrieval speed.
  * **Latency:** Minimizing the latency in accessing and processing text data is crucial for LLMs, as they often operate in real-time or near real-time.
  * **Connections between data:** LLMs rely on understanding the relationships between words, phrases and concepts within the text. The databases we’d use in non-LLM scenarios aren’t well suited to traversing those relationships.

So, what does that mean in practice?

  * **Adopt a tiered data storage approach:** For raw text data, there’s no one size fits all solution. Instead, you’ll need to manage the tradeoffs between latency, scalability and cost. The choice is similar to what we’d see in traditional architectures: block storage with solid state drives (SSD) such as [Amazon’s EBS](https://aws.amazon.com/ebs/) for low latency, high throughput workloads and object storage, [like S3](https://aws.amazon.com/s3/), where scale is more important than access speed.
  * **Use a vector database:** LLM data relies on multi-dimensional connections between elements of text. That requires a different data model than we’d find in traditional application architectures, meaning you’ll need to put a vector database such as Chroma or Milvus at the heart of your LLMOps architecture. If the option is available for the tool you choose, you’ll also need to consider whether to self-host or deploy a cloud version. Self-hosting can improve response times, with the trade-off of additional management burden to keep it running and highly available, while a cloud option could increase costs and latency but simplifies your ongoing maintenance.

### Find the right balance between elasticity and cost of compute resources

With the processing needs of LLM-based applications, the concerns we already
have about efficient cloud usage are amplified. But this is one area of LLMOps
where we can draw on what works for typical non-LLM applications, such as:

  * Use auto scaling tools.
  * Cache where possible.
  * Optimize instance types, to avoid overpaying for resources you don’t need.
  * Use reserved instances for predictable workloads.

### Double down on data security and privacy

Data security and privacy might seem like an odd one to call out as being
specific to LLMOps. It’s a concern in any application, no matter how the data
is processed. But the ability of LLMs to generate human-like text encourages
people to trust them in a way they might not otherwise. It’s possible that
users of your system will share sensitive data, personal secrets more with
your LLM.

In taking an approach of harm reduction, you should:

  * Encrypt data both at rest and in transit.
  * Filer your inputs to remove harmful and sensitive data before you use them in model training and augmentation.
  * Consider using a tool like [Giskard](https://www.giskard.ai/) to automate model testing and safeguard against risks such as leaking sensitive information and prompt injection.
  * Implement an identity and access management (IAM) system to grant access only to those who need it.
  * Comply with regulations such as GDPR and the CCPA.
  * Audit your system to identify vulnerabilities.
  * Anonymize or mask data wherever possible.

## Build real-time LLM data pipelines with Quix

Pretty much every modern application is driven by multiple sources of data
coming together for processing and delivery to the end user. But LLM-based
applications take that a step further with their reliance on such large
volumes of text based data, intense processing and user expectations of real-
time responses.

Event-driven architectures are a better match than REST API-based
architectures due to the low-latency conversational style demanded by LLMOps
applications. Quix’s event streaming platform offers a fully managed tool that
enables you to build event-driven LLM-based applications powered by Kafka. You
can deploy your models directly to Quix Cloud and create pipelines between
your UI, models, vector database and any other component you need using your
favorite Python libraries with the Quix Streams open source Python library. To
learn more, [take a look at the Quix docs](https://quix.io/docs/platform/what-
is-quix.html) or [see it in action](https://quix.io/templates).




## Check out the repo
Our Python client library is open source, and brings DataFrames and the Python ecosystem to stream processing.

[Star us on GitHub](https://github.com/quixio/quix-streams)


