---
title: "Why my AI assistant is allowed to say “I don’t know”"
description: "A grounded assistant is judged as much by the questions it declines as by the ones it answers. Notes from building retrieval-augmented systems."
date: 2026-11-21
tags: ["ai", "rag", "reliability"]
featured: true
---

Imagine a handbook that says, “The reading room closes at 18:00.” Ask a document assistant when the room closes and it has a source for its answer. Ask when the room opens and it doesn’t. The passage hasn’t changed; the evidence needed to answer the question has.

## Fluent is not the same as grounded

A language model will happily fill a gap with something plausible. In a chat toy that’s charming; in a tool people use for real decisions it’s a bug. So the question I now ask of every assistant is simple:

> Can it point to the passage behind its answer?

If it can’t, the most useful thing it can do is say so.

## Most of the work happens before the model

What surprised me is how little of the fix lived in the prompt. The bigger wins came from:

- **Extraction and cleanup.** PDFs, Word files and spreadsheets all break text in different ways. Garbage in the context means garbage in the answer.
- **Chunking with intent.** Too small and a sentence loses its meaning; too large and the one relevant line is buried in noise.
- **Retrieval you can inspect.** If I can see which passages were retrieved, I can tell whether a bad answer was a retrieval problem or a generation problem.

## Declining is a feature

The rule I find useful is simple: *answer only from retrieved evidence; otherwise, decline and say what’s missing.* In the handbook example, “the document gives a closing time but no opening time” tells the reader exactly what to check next.

## The same idea, at a larger scale

Today I work on agents that use real tools over production data. The stakes are higher, but the principle is the same: evidence first, verification loops, and a human in the loop when the system isn’t sure. I’ll write more about that in future posts.
