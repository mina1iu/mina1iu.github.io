# Figma website implementation

## Design source
Figma URL: https://www.figma.com/design/0DFSMOaG6IQJsYoIMo5ioh/portfolio?node-id=19-2&p=f&t=vowuH1XoRlpLqjtk-0
Frames to implement: all frames on Mina / Full website page

Build a functional, responsive website that closely matches
the provided Figma design.

## Before coding
- Use the Figma MCP to inspect the relevant frames.
- Read layout information and capture screenshots for reference.
- Inspect typography, spacing, colors, borders, shadows,
  image crops, and component states.
- Inspect existing project code and reuse its conventions.
- If the design cannot be accessed, explain the blocker.
  Do not invent a replacement design.

## Design fidelity
- Treat Figma as the visual source of truth.
- Preserve the layout, hierarchy, content, and visual style.
- Do not redesign, simplify, or add decorative elements.
- Match font families, weights, sizes, and line heights.
- Match spacing, alignment, widths, and section heights.
- Preserve image aspect ratios, cropping, and positioning.
- Use the actual design assets whenever available.
- Use SVG exports for vector artwork when appropriate.
- Do not substitute emojis or unrelated icons for design assets.
- Load the correct fonts. Flag unavailable fonts or assets.

## Responsive behavior
- Follow the provided desktop, tablet, and mobile frames.
- If a breakpoint is missing, adapt the existing design
  using its visual rules and content hierarchy.
- Use flexible layouts rather than scaling the entire page.
- Avoid horizontal overflow and overlapping content.
- Preserve readable text and comfortable touch targets.
- Use absolute positioning only where the design requires
  overlapping or decorative elements.

## Code structure
- Follow the project's existing framework and routing.
- Build reusable components for repeated design patterns.
- Extract shared colors, typography, spacing, and radii
  into design tokens.
- Keep components focused and clearly named.
- Keep content separate from presentation where useful.
- Avoid unnecessary dependencies.
- Use semantic HTML and accessible controls.

## Functionality
- Implement navigation, links, buttons, and interactions.
- Follow Figma prototype behavior when provided.
- Include hover, focus, active, and disabled states as needed.
- Do not invent destinations or show fake success messages.
- Clearly identify features that require missing backend services.

## Visual verification
- Run the website locally.
- Capture browser screenshots at the same viewport sizes
  as the Figma reference frames.
- Compare the implementation against the reference screenshots.
- Correct differences in layout, typography, spacing,
  colors, and assets before finishing.
- Check mobile and desktop layouts.
- Run available build, lint, and type checks.
- Report any remaining differences or missing assets.
