---
title: "When a payment gets stuck"
summary: "Making recovery repeatable without turning a delayed payment into a duplicate one."
category: "Payment reliability"
context: "Amazon Pay · Production engineering"
contribution: "Recovery workflows and on-call engineering"
tags: ["Distributed systems", "Idempotency", "AWS"]
cover: "flow"
order: 1
---

## An unanswered question is not a failed payment

A customer sees a payment that hasn't finished. An engineer sees a more awkward question: did the operation fail, or did the confirmation simply arrive late? Sending the same instruction again is only safe if it won't repeat a step that already succeeded.

## What I worked on

At Amazon Pay, I built a recovery workflow for stuck orders. It replaced a manual sequence with a repeatable process and gave operators a way to preview the work before taking action. I also worked on how the system handled retries and preserved successful payment states.

In a separate hackathon, I co-built a prototype that investigated customer requests and drafted replies. Drafting a reply and changing a payment are different kinds of action; that prototype was not the production recovery system.

## The trade-off

Automation makes a routine recovery easier, but it can repeat a mistake just as efficiently. The important design choice was to separate **deciding what needs recovery** from **performing that recovery**. A preview is useful precisely because no payment has been changed yet.

## What I took away

“Try again” is not a recovery strategy on its own. The better question is: *what do we know has already happened, and which step is still safe to take?* That question now shapes how I think about AI tools that can take actions, too.
