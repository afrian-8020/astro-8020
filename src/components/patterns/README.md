# patterns — pieces made from pieces

Built from `ui/` pieces (and sometimes other patterns), used inside sections. They show whatever content they're
given and don't decide animation timing: those that can fade in have a `reveal` setting the section switches on.

| Piece | What it is | Used in |
|---|---|---|
| `SectionHeader` | A section's title block: optional eyebrow, title, description, then anything extra (a link, a button). Left or centered; `size="display"` for the biggest title. | Most sections |
| `ProductCard` | A medication card: tags, name, disclosure link, two buttons, photo. Photo zooms on hover. | Products |
| `Carousel` + `CarouselItem` | A horizontal, swipeable row with previous / next arrows | Products |
| `ComparisonTable` + `ComparisonRow` | The two-column table of checks and crosses | Comparison |
| `InlineCta` | A line of text with a button next to it | Comparison |
| `StepList` + `StepItem` | The numbered accordion that moves to the next step every few seconds | How it works |
| `StatCard` | A white card with a chart and a caption; hovering one dims the others | Science |
| [`charts/`](charts/) | The three animated graphics inside the stat cards (`DonutChart`, `CurveChart`, `BarChart`) | Science |
| `TestimonialCard` | Portrait, quote, author and a highlighted result that counts up | Testimonial |
| `ArticleCard` | A thumbnail, title and date; the whole card is clickable | Articles |
| `FaqItem` | One question that opens to show its answer (one open at a time) | FAQ |
| `FeatureItem` | A short title with a description under it | Hero |
| `ButtonGroup` | Lines up buttons side by side | Product card |
| `FooterColumn` | A titled list of links | Footer |
