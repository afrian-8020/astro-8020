# ui — the smallest pieces

Each piece does one job and doesn't use any other component. Change one here and it changes everywhere.

| Piece | What it is |
|---|---|
| `Button` | The rounded button: `variant` primary (coral), secondary (teal) or tertiary (outlined); `size` sm or md. A link when given `href`. |
| `Badge` | A small label: `outline` (with an optional icon), `neutral` or `success` tag |
| `BrandLockup` | The Noom logo with a small line under it (used in the comparison table header) |
| `Container` | Keeps a section's content at the page width (1392px max) with side margins. Wrap section content in it. |
| `IconButton` | A round button with just an icon (the carousel arrows). Needs a `label` for screen readers. |
| `NavLink` | A link in the navigation bar, with an optional dropdown arrow |
| `SanityImage` | Shows a photo from Sanity at the right size for each screen, cropped around the editor's focus point |
| `StatusIcon` | The check / cross in the comparison table |
| `StepNumber` | The numbered circle in "How it works" |
