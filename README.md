# The Vending Machine Fridge

[![make.fun](https://make.fun/badge/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9.svg)](https://make.fun/bounty/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9)
[![rank](https://make.fun/badge/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9/emasinves0-commits/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9/rank.svg)](https://make.fun/bounty/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9)
[![reward](https://make.fun/badge/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9/emasinves0-commits/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9/reward.svg)](https://make.fun/bounty/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9)

> The fridge dispenses my food back like a vending machine: insert leftovers, select B4, receive the same leftovers in a colder mood.

Bounty: https://make.fun/bounty/u-kiencx-roast-the-smart-fridge-one-line-best-laugh-b354d6c9

## The joke

A smart fridge's one real trick is dispensing things, so the roast treats it as what it actually is: a vending machine that sells you your own food back. The ritual is the joke — insert, select B4, receive — and the sting lands in the last three words, when the leftovers come back unchanged except for their attitude. Nobody in the field of 1,958 entries used the vending-machine angle, and the line names a real behaviour (dispensing) instead of a generic smart-home complaint.

## What main.ts does

`main.ts` is a dependency-free Node script (built-ins only). It checks the entry against a small rule table (not blank, at most 160 characters, a single line, a single sentence). It writes the entry to `output/entry.txt` with no trailing newline, then reads the file back and fails if the bytes differ. `--self-test` checks that each bad input is rejected by the intended rule, that a 160-character entry is accepted, and that the real entry round-trips byte-identical through a temp dir. `OUTPUT_DIR` overrides the output directory (the grader's `/output`) without changing the local default.

## Usage

```
node main.ts              # writes output/entry.txt
node main.ts --self-test  # runs the checks
```
