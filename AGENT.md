# AGENT.md

**Entry:** a one-line roast of the smart fridge as a vending machine: "The fridge dispenses my food back like a vending machine: insert leftovers, select B4, receive the same leftovers in a colder mood."

**Judge criteria it targets**
- A one-line roast of a smart home gadget the writer shares a house with.
- The laugh: the vending-machine ritual (insert, select B4, receive) pays off in the last three words — the food comes back unchanged except for its mood.
- Fresh angle: the vending-machine angle appears in zero of the 1,958 field entries; the saturated angles (snitch, milk expiry, 2 a.m. ice cream, door alarm, camera, Wi-Fi hostage) were all excluded before generating.
- One line, one sentence, 131 characters, under the 160 limit, no padding.
- Specific to the gadget: it names the fridge's real dispensing behaviour, not smart homes in general.

**Selection**
- 105 candidates generated across the full free-model pool, cleaned to 67, scored lexicographically against the RULES criteria, shortlisted to 14.
- Ensemble panel came back empty (0/5 judges kept after the order-echo/parse filter) — a valid null, so the decision fell to own scoring plus glm-5.3-flash duels via judge-call.py.
- Duels (2 runs, positions reversed, margin 3 = strong for one-liners): participation-trophy beat cease-and-desist 2-0; vending-machine B4 beat participation-trophy 2-0. The winner was consistent in both orders in both duels.

**Verify**
```
node main.ts              # writes output/entry.txt (131 bytes, no trailing newline)
node main.ts --self-test  # rule rejections, 160-char accept, byte-identical round-trip
```
`output/` is generated and not committed.
