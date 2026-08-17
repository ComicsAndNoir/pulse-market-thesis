# 00 · Overview & how to continue this work

This folder captures every decision made while designing the **Pulse First-Market
Thesis** dashboard, so the work can be continued — by you, or by another Claude
instance run from inside this folder — without re-deriving anything.

## What this project is

An interactive board that makes a **market-entry argument** for Napster Pulse: given a
built-but-unlaunched product with no users, *which conversation should it own first?*
The board scores candidate conversations against a weighted rubric, ranks them live as
you adjust the weights, and names an explicit kill list. The seeded recommendation is
**Exit / Churn Interviews**.

It exists because the *Product Lead, Pulse* role is not about the product (which is
built) — it is about **finding the first market**. So the demo *is* the job being done,
not a feature mockup.

## The documents

| File                          | What's in it                                                      |
| ----------------------------- | ----------------------------------------------------------------- |
| `01-product-thesis.md`        | The rubric, the seven weighted metrics, all six segments, scores, verdicts, and the ROI logic. The "what" and "why." |
| `02-engineering-plan.md`      | Architecture, stack decisions, and how the design optimizes for iteration. The "how it's built." |
| `03-brand-and-design.md`      | Napster brand direction, the MD3 mapping, and the one accent value to confirm. |
| `04-deployment-render.md`     | Step-by-step Render deploy + GitHub + VS Code setup.              |
| `05-interview-playbook.md`    | How to actually run the demo live in the room.                    |

## How to continue with another Claude instance

Open this folder in an environment where Claude can read the files (e.g. Claude for VS Code
/ Claude Code), and point it at `docs/`. A good opening prompt:

> "Read everything in `docs/` and `src/model/thesis.ts`. This is a market-thesis dashboard
> for Napster Pulse. I want to [add a segment / re-weight the rubric / change the brand
> accent / adjust the winner]. Make the change in the data/theme layer only, and keep the
> component tree untouched."

The architecture is built so that almost every change you'll want is a data edit in
`src/model/thesis.ts` or a token edit in `src/theme/theme.ts`. See `02-engineering-plan.md`
for why.

## Provenance

This concept was developed across a planning conversation that moved through four lenses:
a product-thinking pass (candidate segments + rubric), an SVP-of-Product pass (weighting
philosophy, dummy-data framing, competency mapping), a FAANG-engineering pass (the
iteration-first architecture), and a deployment pass (public Render URL + local editing).
Each document below reflects the settled output of those passes.
