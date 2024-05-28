---
title: Overview - Vector Databases
description: A summary of what vector databases are.
---

# Overview - Vector Databases

A vector database, in contrast to a relational database, does not store data in tables consisting of columns and rows, it utilises vector embeddings instead. If we visualise one of these databases as a grid, a vector embedding is a number array that gives data points a position within the grid. 

Two data points which are conceptually similar will have similar vector embeddings, placing them closer together in the grid. To retrieve "apples" and "oranges" from a relational database, both must already exist within a column. There is no such structure in a vector database; both "apples" and "oranges" could be retrieved by their vector embeddings, or by searching for a similar concept such as "banana", or "juice". Instead of relying on columns, queries search for data points by comparing distances of the vector embeddings themselves. These distances can be calculated using Euclidean distance, cosine similarity, or other distance metrics. Vector embeddings can have thousands of dimensions, which allows for a wide variety of data, including images, audio and video.

Vector databases are therefore optimised for operations like similarity search, and when combined with natural language processing and machine learning, they have led to the creation of ground-breaking LLM chatbots, search mechanisms, and anomaly detection systems.



