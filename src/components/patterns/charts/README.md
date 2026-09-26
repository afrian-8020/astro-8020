# charts — the animated stat graphics

The graphics inside the Science section's stat cards. Each is a drawing (SVG) with its own animation script:
it plays once when the card scrolls into view and replays when the mouse enters the card
(timing shared in [`src/scripts/chart-motion.ts`](../../../scripts/chart-motion.ts)).

| Chart | Shows | Settings |
|---|---|---|
| `DonutChart` | A ring with a highlighted part and a big figure in the middle | `value` ("-20%"), `label` |
| `CurveChart` | Two falling curves; the highlighted one drops further | `topLabel`, `bottomLabel` |
| `BarChart` | A bar that fills while its figure counts up | `value` ("97%") |

The figures and labels come from Sanity (Home Page → Science). The shapes follow the Figma design and are
illustrations, not drawn from the data. Animations run on desktop only; elsewhere the chart shows its final state.
