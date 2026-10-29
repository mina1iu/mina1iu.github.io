# Website specification

## Purpose

Build Mina Liu’s personal portfolio for software engineering recruiting, with a clear focus on product thinking, frontend development, design, and technical research.

The site should help recruiters and engineers understand what Mina built, what she personally contributed, and how she works across design and implementation.

**Design source of truth:** [Portfolio Figma file, approved website page](https://www.figma.com/design/0DFSMOaG6IQJsYoIMo5ioh/portfolio?node-id=19-2).

Read the live file before implementation. Use page `19:2`, “Mina / Full website · Seashell studio.” Desktop is the authority for content and visual choices; mobile frames define the intended responsive adaptations. Do not substitute the separate homepage explorations or older concepts.

## Main visitor goal

Within a quick scan, visitors should understand that Mina designs and builds software, find her four main projects, open a case study, and reach her résumé or contact links.

Prioritize project identification, ownership, screenshots, and concrete technical detail. Keep the homepage concise. Case studies should be easy to skim without hiding meaningful details.

## Pages and sections

The following routes are proposed implementation routes. Keep them consistent throughout the site.

| Page | Route | Desktop Figma frame | Mobile Figma frame |
| --- | --- | --- | --- |
| Home | `/` | `21:2` | `21:239` |
| Roomie | `/work/roomie` | `22:33` | `22:177` |
| AlloyDB | `/work/alloydb` | `22:320` | `22:426` |
| Robotics | `/work/robotic-knitting` | `22:531` | `22:662` |
| Human–AI research | `/work/human-ai` | `22:792` | `22:915` |
| About | `/about` | `23:348` | `23:479` |
| Résumé | `/resume` | `23:609` | `23:682` |

### Home

- Shared navigation.
- Hero with clearly readable **MINA LIU**, textured letters, and the original Central Park portrait.
- Preserve the current name size, placement, pink surname, photo overlap, and textured torn-paper edge. Follow the current approved frame rather than recreating an earlier layout.
- Heading: **Software + Product.**
- Introduction: “I’m Mina. I design and build software, from native iOS experiences to the systems behind them.”
- Small secondary detail: “Computer Science · Cornell ’29”.
- “Explore my work” anchor to the project collection.
- **MY WORK** with four cards: Roomie · Roommate App; Google · AlloyDB ML Pipeline; Robotic 3D Knitting; Human–AI Well-being Research.
- Match the staggered desktop arrangement and mobile stacking.
- Each entire card opens its case study. Do not add “View project” links.
- Shared contact footer.

Do not restore Camera Roll, Between the Screens, Behind the Work, or removed generic builder sections.

### Roomie

Present Mina as the **0-to-1 product designer and iOS frontend developer**.

Include the household communication problem, personal ownership, design from scratch in Figma, Swift/Xcode frontend implementation, collaboration on backend integration, and experimentation with AI tools such as Cursor to accelerate iteration.

Show the current Home, Noteboard, and Chores screens in the user-supplied iPhone frame. Include the shared noteboard, due dates, pinned updates, clear chore ownership, and weekly rotations. Keep screenshots large enough to read.

Describe the MVP as in development. Shopping and shared-item lists are future work, not shipped functionality. Do not invent user counts, adoption, launch results, or time savings.

### Google / AlloyDB

Clearly identify the **Google Software Engineering Student Program** and the AlloyDB ML pipeline project.

Explain the engineering problem: ML failures leave evidence across training logs, infrastructure metrics, and database state. Show the Python workload, AlloyDB Omni persistence, and telemetry integration in the current editable system visual.

Separate Mina’s application/database contributions from the wider team roadmap. Retain the details that matter: dedicated application database, endpoint-based connectivity, OpenTelemetry/OTLP integration, shared run identifiers, Prometheus, Loki, and Grafana.

The team roadmap includes time-window correlation, failure triage, unified views, and stretch hybrid retrieval with pgvector and PostgreSQL full-text search. Label planned work clearly. Do not imply that all components are shipped, that Mina built every workstream, or that participation is Google employment.

### Robotic 3D knitting

Explain solid knitting briefly: interlocking yarn through the interior of a volume, rather than producing only a sheet or shell.

Distinguish the lab’s published prior iteration from the current three-arm redesign for active stitch-tension control. Include the 6×6 needle bed, FAIRINO Python SDK, coordinate mapping, safe-hover offsets, gripper/distributor sequence, servo-driven tooling, and Fusion 360 iteration.

Use the real lab setup and close-up photos. Keep the editorial cover treatment restrained. Do not replace actual hardware with generated robots.

Report the single actively tensioned stitch demonstration separately from the résumé’s 20% mechanical-failure reduction. Full-bed operation and volumetric knitting remain next steps. Camera integration for observing and diagnosing errors is ongoing, not a completed automatic vision system.

Retain the prior-paper link: https://doi.org/10.1145/3746059.3747759

### Human–AI research

Explain Mina’s Python/Colab analysis of longitudinal user–ChatGPT logs, manual annotation comparison, method evaluation, and trajectory visualization.

Use the actual poster graph, retaining its curves, axes, dates, and legend. The “Fear of Being Known” annotation belongs to the research context; avoid presenting it as a clinical diagnosis.

The featured graph is a single-participant case study, P5, with 6,286 messages. Keep pilot findings separate from general or causal claims. Preserve method distinctions from the current case study and source poster.

### About

Use the current “Hello, I’m Mina” introduction, personal photographs, and concise bio. On desktop, preserve the photo’s position behind the navigation. Adapt the arrangement for mobile without covering text.

Include volleyball and practicing the overhand serve, café favorites, cooking, friends, AppDev, photobooth memories, and appreciating everyday moments using the current Figma copy and captions.

Retain generous photo space. Do not restore removed mobile-only skills, work-history, or Pac-Man sections that are absent from the desktop About page.

### Résumé

A page for an embedded résumé PDF. Use the current PDF placeholder until Mina supplies the final file. Do not recreate the résumé as website sections.

When the PDF is available, add a working embed and an accessible open/download link. Keep a useful fallback on devices that cannot display embedded PDFs.

### Shared footer

Reproduce the scattered, textured **SAY HELLO** lettering and restrained pink links.

- Email: `mailto:mtl79@cornell.edu`
- LinkedIn: https://www.linkedin.com/in/minatliu
- Keep the current small credit text.

Do not restore “LET’S WORK TOGETHER” or “WHAT’S UP”.

## Visual direction

A photo-led, editorial portfolio with photobooth prints, torn paper, large type, and precise square layouts. The overall background should remain quiet so the photographs provide most of the color.

| Role | Value |
| --- | --- |
| Paper background | `#FAFAF7` |
| Primary text | `#23292B` |
| Muted text | `#697375` |
| Teal | `#63E6E6` |
| Hot pink accent | `#EC368D` |

Use the Figma variables for all additional neutral and surface colors.

- **Inter Bold:** large names, headings, and project titles.
- **Roboto Mono:** body copy, metadata, captions, and links.
- Current desktop homepage name is 160px; treat the live frame as authoritative if resized later.
- Use solid pink for the navbar MINA wordmark, with subtle texture. No gradient.
- Keep pink sparing: active navigation, important words, small labels, and contact links.
- Preserve the actual paper/grain treatment. The left fade blends the paper texture into the background; it must not replace the torn edge with a smooth photo fade.
- Clip letter texture precisely inside the letterforms. It must track text size responsively.
- Avoid brown as a site-wide theme, excessive rounded cards, generic gradients, decorative clutter, and invented slogans. Preserve the authentic Roomie app colors inside screenshots.
- Rounded corners on the physical iPhone mockups are intentional.

## Features

### Navigation

- Navbar: **MINA**, **Work**, **About**, **Résumé**.
- MINA links to `/` and returns to the top when already home.
- Work links to `/#work`, including from a case study.
- About and Résumé use their routes.
- Indicate the active destination with the pink treatment shown in Figma. Project pages belong to Work.
- Contact remains in the footer; no separate contact route or form.
- Use the same navigation labels and behavior across desktop and mobile.
- Only show a next-project link where it exists in the approved design.

### Cards and interactions

- Use real semantic links for whole-card navigation, with keyboard focus and a clear hover state.
- Avoid nested interactive links inside a whole-card link.
- “Explore my work” scrolls to `#work`.
- Preserve normal browser back behavior and allow direct links to every route.

### Motion and media

- Preserve the requested scroll-driven paper movement across the hero as progressive enhancement: the textured edge moves over the portrait as the visitor scrolls past the hero and reverses on upward scroll. Keep text readable and avoid a jump when the motion starts. Figma’s static frame defines the initial composition.
- For About video content, map section scroll progress to video time rather than simply triggering autoplay. Pause on a held scroll position and rewind when scrolling backward.
- Figma handoff notes describe intended behavior; they are not evidence that these effects already work.
- Use muted, inline video and a poster image. If seeking or media loading fails, keep the poster visible.
- Respect `prefers-reduced-motion`: use the static paper composition and a static poster or user-controlled video.
- Do not add filters, search, authentication, CMS, analytics, or forms unless separately requested.

## Assets

Use assets from the approved Figma page and export originals wherever possible.

- Original personal photos: the file’s `photos` page, `41:251`. Preserve identities and source originals.
- Hero photo and torn-paper treatment: `57:251` and its layers.
- Roomie source screens: https://www.figma.com/design/MixBrFpwBtU7ZR649q564D/Roomie-FA26?node-id=320-2218
- Current Roomie screens include Home `361:8985`, Noteboard `320:2221`, and Chores `361:6629`. Recheck the live source before exporting.
- User-supplied iPhone frame: `130:1624` in the portfolio file. Reuse the actual frame rather than approximating the hardware.
- Current embedded Roomie screenshots are 780×1688 lossless PNGs. Export at least 2× from the live designs if refreshing them. Do not upscale an old thumbnail.
- Roomie slides provide presentation context, but some screenshots are outdated: https://www.figma.com/slides/qZR4t0NFcqALzZOTZ3RqJj/Roomie-FA26---Tech-Talk?node-id=1-990
- Real robotics uploads: `IMG_7115.jpeg` and `IMG_7093.jpeg`; additional supplied clips are `IMG_7103.mp4`, `IMG_6414.mp4`, and `IMG_6990.mp4`. Use clips only where they add explanatory value.
- Research sources: `BURE Poster - Fabrication Lab.pdf`, `BURE_Chatbot_Project.pdf`, and `Google AlloyDB Project Planning - Cornell.pdf`.
- Human–AI graph: use the 2048px source figure embedded in the portfolio, not a screenshot of the whole cover.
- Export the existing halftone and paper textures. Never redraw real research data using image generation.
- The final résumé PDF is pending.

Keep content text, labels, links, and system visuals as HTML/SVG where practical. Project app screenshots and photographic assets may be raster images; do not flatten the entire website into screenshots.

## Requirements

- No framework or hosting platform has been mandated. Use the existing project stack if one exists. Otherwise choose a lightweight implementation suited to static portfolio pages and state the choice before building.
- Treat this as a responsive website, not a fixed 1440px canvas scaled down.
- Match the supplied 1440px desktop and 390px mobile designs, then adapt fluidly between them and at smaller widths.
- Use reusable navigation, footer, project-card, media, and layout components. Keep project content organized separately from layout logic.
- Share one content source between desktop and mobile. Do not maintain two divergent copies.
- Keep meaningful differences between project pages instead of forcing a rigid case-study template.
- Use real headings, landmarks, alt text, visible keyboard focus, and adequately sized touch targets. Mark decorative textures as decorative.
- Preserve image aspect ratios and intentional crops. Reserve media dimensions to avoid layout shifts.
- Use responsive image sources, lazy-load below-the-fold media, and retain sufficient resolution for large screens. Do not preload every project image or video.
- Load the actual fonts and weights. Avoid substituting system fonts without a documented blocker.
- Use relative/local production assets rather than expiring Figma asset URLs.
- Do not invent outcomes, implementation status, personal details, or backend functionality. Follow the current approved copy, and flag contradictions rather than silently rewriting them.
- The résumé placeholder is the only intentionally pending document. Other visible image placeholders should be replaced using supplied assets where available.

## Done when

- [ ] All seven routes open directly and after refresh.
- [ ] Navigation, active states, home links, and `/#work` behave consistently from every page.
- [ ] Every homepage card opens the correct project by mouse, keyboard, and touch.
- [ ] No “View project” text or removed website sections have returned.
- [ ] Desktop and mobile match the approved Figma content and imagery.
- [ ] Layouts are checked at 1440px, 1024px, 768px, 390px, and 360px with no unintended horizontal overflow.
- [ ] The name is readable, its texture aligns at every size, and the portrait/paper overlap remains intentional.
- [ ] Roomie screens are sharp at their rendered sizes and fit the supplied iPhone frames with even spacing.
- [ ] Research graphs remain sharp, correctly labeled, and faithful to the originals.
- [ ] Project pages remain concise while preserving ownership, technical details, results, and ongoing-work distinctions.
- [ ] Email and LinkedIn links work.
- [ ] The résumé page has its honest placeholder, or the actual PDF with working fallback/open/download links.
- [ ] Scroll-linked effects work without blocking reading; reduced-motion and media-failure fallbacks work.
- [ ] No broken assets, distorted images, clipped text, unexpected layout shifts, dead controls, or console errors remain.
- [ ] Keyboard navigation, focus visibility, heading structure, and image alternatives have been reviewed.
- [ ] The production build succeeds, and a brief handoff lists anything still waiting on Mina.

