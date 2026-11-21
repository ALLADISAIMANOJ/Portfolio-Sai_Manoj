---
title: "An answer needs a source"
summary: "Building a document assistant where the quality of the answer starts with the passage it retrieves."
category: "Applied AI"
context: "Smartbridge · Document assistant"
contribution: "Document processing and retrieval"
tags: ["RAG", "Python", "Language models"]
cover: "pages"
order: 2
---

## The gap between fluent and useful

A fluent answer isn't enough when someone asks a question about their own document. They need an answer supported by *that document*, not one that happens to sound right.

## What I worked on

At Smartbridge, I built a retrieval-augmented assistant for uploaded documents. I worked on extracting text from PDFs, word-processing files, and tables, cleaning it up, and dividing it into passages the retrieval step could use.

## The trade-off

Give the model too little context and a relevant sentence loses its meaning. Give it too much and the useful passage disappears into unrelated material. Improving retrieval meant paying attention to what reached the model, not just rewriting the final prompt.

## What I took away

I want to be able to point to the passage behind an answer. If that passage isn't there, declining to answer is more useful than filling the gap.
