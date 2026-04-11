# Rajkiran Jaiswar - Angular Portfolio

## Project Overview
Personal portfolio website for **Rajkiran Jaiswar**, a Full-Stack Software Engineer from Mumbai.
Built with **Angular 15**, **Angular Material**, **SCSS**, and **AOS** (Animate On Scroll).

## Tech Stack
- **Framework**: Angular 15 (NgModules, not standalone)
- **UI Library**: Angular Material (deeppurple-amber theme)
- **Styling**: SCSS with CSS custom properties (`:root` variables in `src/styles.scss`)
- **Animations**: AOS library for scroll-triggered animations
- **Backend**: Node.js API with MSSQL stored procedures
- **Auth**: Firebase/AngularFire for authentication
- **Email**: EmailJS for contact form notifications
- **Hosting**: Firebase Hosting + Netlify (_redirects file)

## Project Structure
```
src/app/
├── components/
│   ├── home/          — Hero section (name, intro, social links, resume/projects buttons)
│   ├── about/         — Bio + skill icons grid (grayscale → color on hover)
│   ├── resume/        — Resume download link with hover animation
│   ├── projects/      — Project showcase cards
│   │   └── project-items/  — Reusable project card (content projection)
│   ├── contact/       — Contact form (reactive forms + EmailJS)
│   ├── login/         — Login/Signup/Verification flow
│   ├── dashboard/     — Admin panel (contact submissions table, auth-protected)
│   ├── confirmation/  — Post-submission confirmation
│   └── footer/        — Footer
├── layout/
│   ├── sidenavbar/    — Main page wrapper (mat-drawer with all sections)
│   └── topbar/        — Responsive navbar (desktop nav + hamburger menu)
├── directives/
│   └── responsive.directive.ts  — Adds "pc" class on desktop (BreakpointObserver)
├── services/
│   ├── api.service.ts           — HTTP calls to Node.js backend
│   ├── auth.service.ts          — Authentication logic
│   ├── snackbar.service.ts      — Notification toasts
│   ├── login.guard.ts           — Route guard for login
│   └── dashboard.guard.ts       — Route guard for dashboard
├── shared/
│   ├── material-module.ts       — Central Angular Material imports
│   ├── global-constant.ts       — Regex patterns for validation
│   └── loader/                  — Loading spinner component
└── models/                      — Contact, Tools interfaces
```

## Page Flow (Single Page App)
The main layout is in `sidenavbar.component.html` which stacks sections:
`Home → About → Resume → Projects → Contact → Footer`

Each section is an anchor-linked `<div id="sectionName">` wrapping its component.
Navigation uses `href="#sectionName"` for smooth scrolling.

Routed pages (outside the single-page flow): `/login`, `/dashboard`, `/confirm`

## Design System & Theming

### CSS Variables (defined in `src/styles.scss`)
| Variable | Value | Usage |
|---|---|---|
| `--navy` | `#0a192f` | Primary dark background, text on light sections |
| `--dark-navy` | `#020c1b` | Body background |
| `--light-navy` | `#112240` | Card/section backgrounds |
| `--yello-neon` | `#FCE700` | Primary accent (About section bg, highlights) |
| `--blue-neon` | `#00F5FF` | Secondary accent |
| `--mroon-neon` | `#FF6D28` | Tertiary accent |
| `--red-neon` | `#F21A1D` | Alert accent |
| `--slate` | `#8892b0` | Muted text |
| `--lightest-slate` | `#ccd6f6` | Light text on dark bg |
| `--white` | `#fff` | White text |
| `--green` | `#FF6347` | CTA color |
| `--font-mono` | SF Mono, Fira Code... | Code/mono text |
| `--transition` | `all 0.3s ease-in-out` | Standard hover transition |
| `--btnShadow` | `4px 4px, 8px 8px` | Button hover shadow |

### Neon Color Palette
The portfolio uses a **neon color palette** — bright yellows, cyans, and dark navy backgrounds.

### Responsive Approach
- **Mobile**: `< 800px` (default styles in `:host {}`)
- **Desktop**: `≥ 800px` (styles in `:host.pc {}`)
- The `Responsive` directive (`[Responsive]`) auto-adds `pc` class on desktop viewports
- Every component uses `Responsive` directive on its host element

### Animation Patterns
- AOS attributes on elements: `data-aos="fade-up"`, `data-aos-delay`, `data-aos-duration`, `data-aos-once="true"`
- CSS keyframes in `styles.scss`: `slideTop`, `slideBottom`, `slideRight`, `slideLeft`, `zoomIn`
- Hover transitions use `var(--transition)`

### Component Styling Conventions
- Each component has its own `.scss` file using `:host {}` for mobile and `:host.pc {}` for desktop
- Section headings follow the pattern: `.headingMain` (large uppercase) + `.headingMain::after` (underline bar) + `.headingSub` (muted description)
- Buttons: `mat-raised-button` with navy bg, uppercase text, letter-spacing, hover shadow effect
- Skill icons use `grayscale(100%)` filter, transitioning to `grayscale(0)` on hover

## Commands
- **Dev server**: `ng serve` or `npm start` (default port 4200)
- **Build**: `ng build` (output: `dist/Rajkiran-Portfolio`)
- **Generate component**: `ng generate component components/<name>`

## Rules for UI Changes
- Always use existing CSS variables from `styles.scss` — never hardcode colors
- Follow the `:host {}` / `:host.pc {}` responsive pattern
- Add `Responsive` directive to new components in the sidenavbar layout
- Use AOS attributes for scroll animations (always set `data-aos-once="true"`)
- Keep the neon dark theme consistent — dark backgrounds with bright accents
- New sections go into `sidenavbar.component.html` as `<div id="name"><app-name Responsive></app-name></div>`
- Register new components in `app.module.ts` declarations array
- Asset images go in `src/assets/` under appropriate subdirectory
- Max container width is `1500px` (`.container` class in `styles.scss`)
