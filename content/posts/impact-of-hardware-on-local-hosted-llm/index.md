---
title: Impact of hardware on Local hosted LLM
date: 2026-03-04
thumbnail: pexels-pixabay-256112.jpg
thumbpage: true
summary: Concrete analysis on consumer grade hardware (no GPU & AMD APU)
---

### Hardware

GMK-TEK EVO-X1 AI Mini

AMD Ryzen™ AI 9 HX 370 | Radeon 890M

32GB LPDDR5X 7000Mhz

>Model used Unsloth/Qwen3.5-9B-UD-Q4_K_XL.gguf

##### Maximum token available.

32GB of ram : 4channel of 8GB in 32bits

real bandwidth:

7500 MT/s × 128 bits ÷ 8

= 7500 × 16 bytes

= 120 000 MB/s

= 120 GB/s

\*\*Bandwidth : 120GB/s\*\*

##### \*\*Theoretical Ceiling:\*\*

Weight calculation based on:

- \*\*FP16\*\* ≈ 2.0 bytes/param

- \*\*INT8\*\* ≈ 1.0 byte/param

- \*\*Q4\*\* ≈ 0.5 byte/param

$$

\text{Weight size} ≈ params × bytes/param

$$

>Exemple model is 9B param

$$ Weight Size:9x10⁹x05=4.5GB$$

Then we calculate the maximum token per seconds _Mtok/s_

$$

MTok/s = \frac{\text {bandwidth GB/s} }{ \text{weight size GB}}

$$

>On GMKtek:

$$

Mtok/s = \frac{120}{4.5}= 26\text{ MTok/s}

$$

\*\*Constated Output: 14Tok/s\*\*

There is then a significant discrepency between _Mtoks/s_ and _Real Token/s_

# Possible improvments :

##### Prefill

The prompt is sent in the LLM and the LLM will establish the KV cache (embeding?)

This could be a bottleneck to reactivity when the context  is big (RAG, Code, Embeding)

$$

PrefillDuration ≈ \frac{\text{N of token in prompt}}{ \text{prompt token per second}}

$$

> GmkTek TMSCI = 43 Tok/s prompt_token from llama.cpp

> - 1000 tokens → 1000 / 43 ≈ 23s

> - 2000 tokens → 2000 / 43 ≈ 46 s

> - 3000 tokens → 3000 / 43 ≈ 69 s

##### KV cache

KV cache stored in memory by the LLM during tokenization to assign a Key (K) and a Value (V).

To generate the next token, the model refers back to these stored K/V values instead of recomputing the entire context.

Accessing the cache is significantly faster than recalculating the full attention over all previous tokens.

The cache size is defined at model initialization (boot time).
