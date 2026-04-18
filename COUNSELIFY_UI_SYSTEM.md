# Counselify UI System

## Overview

Counselify is an AI-powered contract analysis and legal risk platform built with Next.js App Router, TypeScript, Tailwind CSS, ShadCN UI, and Lucide Icons.

The design system is premium, trust-first, minimal, and functional. It supports dark and light modes with glassmorphism accents and a strong visual hierarchy for legal workflows.

---

## Design Tokens

### Colors

- `--background-dark`: `#0f172a`
- `--surface-dark`: `#111827`
- `--surface-soft`: `rgba(255,255,255,0.06)`
- `--text-primary`: `#f8fafc`
- `--text-secondary`: `#cbd5e1`
- `--text-muted`: `#94a3b8`
- `--border`: `rgba(148,163,184,0.2)`
- `--primary-start`: `#3b82f6`
- `--primary-end`: `#a3e635`
- `--accent`: `#22c55e`
- `--success`: `#22c55e`
- `--warning`: `#f59e0b`
- `--danger`: `#ef4444`
- `--critical`: `#dc2626`
- `--surface-light`: `#f8fafc`
- `--text-dark`: `#0f172a`

### Typography

- Font family: `Inter, ui-sans-serif, system-ui`
- Headline: `font-semibold`, `tracking-tight`
- Body: `font-medium`, `leading-7`
- Small: `font-normal`, `leading-6`

### Spacing

- `xs`: `0.5rem` (8px)
- `sm`: `0.75rem` (12px)
- `md`: `1rem` (16px)
- `lg`: `1.5rem` (24px)
- `xl`: `2rem` (32px)
- `2xl`: `2.5rem` (40px)
- `3xl`: `3rem` (48px)

### Border Radius

- `rounded-sm` = `0.375rem`
- `rounded` = `0.75rem`
- `rounded-xl` = `1.25rem`
- `rounded-2xl` = `1.5rem`

---

## Component System

### Core reusable components

- `Button` with `primary`, `outline`, `ghost`
- `Card` with glassmorphism surface and border glow
- `Input` / `Textarea` / `Select`
- `Modal` with centered overlay and action footer
- `Sidebar` navigation for dashboard/admin
- `Topbar` with search, notifications, user menu
- `Table` for lists and admin grids
- `Badge` for risk levels
- `Progress` / `Meter`
- `Upload` drag and drop file input

### Styling rules

- Use Tailwind utilities for layout, spacing, color, typography.
- Use consistent padding: `p-4 md:p-6 xl:p-8`
- Use glassmorphism cards: `bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg`
- Use gradients for primary buttons: `bg-gradient-to-r from-blue-500 to-lime-400`
- Use dark mode classes with `dark:` prefixes.

---

## App Page Structure

### Next.js App Router structure

```
app/
  layout.tsx
  page.tsx                         # Landing
  pricing/page.tsx
  auth/login/page.tsx
  auth/signup/page.tsx
  onboarding/page.tsx
  dashboard/page.tsx
  contracts/upload/page.tsx
  contracts/analysis/page.tsx
  admin/page.tsx
components/
  ui/
    button.tsx
    card.tsx
    input.tsx
    modal.tsx
    badge.tsx
    progress.tsx
    upload.tsx
    table.tsx
  layout/
    sidebar.tsx
    topbar.tsx
    auth-layout.tsx
    dashboard-layout.tsx
  sections/
    hero.tsx
    features.tsx
    pricing-preview.tsx
    contract-preview.tsx
    onboarding-steps.tsx
    risk-summary.tsx
```

---

## Screen Design Summaries

### 1. Landing Page

#### Layout structure

- Hero
- Features grid
- Product preview
- How it works
- Pricing preview
- Footer

#### Tailwind layout

- Mobile-first wrapper: `px-4 py-8 sm:px-6 lg:px-12 max-w-7xl mx-auto`
- Hero card: `bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 md:p-10`
- Feature tiles: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`
- Preview panel: `relative overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl`

#### Component hierarchy

- `LandingPage`
  - `HeroSection`
  - `FeatureGrid`
  - `ProductPreviewCard`
  - `HowItWorksSection`
  - `PricingPreviewCards`
  - `LandingFooter`

#### UI notes

- Hero CTA: primary button + ghost button
- Feature cards: icon, title, short copy
- Preview section: contract scanner mockup + risk cards
- Pricing preview: 3 mini cards showing tier benefits
- Footer: quick links, product trust statements, legal links

---

### 2. Pricing Page

#### Layout structure

- Page header: title, description
- Tier cards: Free / Pro / Business
- Feature comparison matrix
- FAQ / footnotes

#### Tailwind layout

- Page container: `px-4 py-10 sm:px-6 lg:px-12`
- Tier grid: `grid gap-6 lg:grid-cols-3`
- Highlighted plan: `scale-[1.03] border-white/20 bg-slate-900/80`
- Pricing card: `rounded-[1.5rem] p-6 border border-white/10 shadow-xl`

#### Component hierarchy

- `PricingPage`
  - `PageHeader`
  - `PricingTierGrid`
  - `FeatureMatrix`
  - `PricingFaq`

#### UI notes

- Pro plan accent with ribbon or badge
- Price bullets: monthly/yearly toggle optional
- Risk reassurance: secure payments and SOC-2 mention

---

### 3. Authentication

#### Layout structure

- Full-screen split or centered auth card
- Login / Signup tabs
- Social login chips optional
- Password reset CTA

#### Tailwind layout

- Container: `min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8`
- Card: `mx-auto w-full max-w-md rounded-[2rem] bg-slate-950/90 border border-white/10 p-8 shadow-2xl`
- Form controls: `space-y-5`

#### Component hierarchy

- `AuthLayout`
  - `AuthPageShell`
    - `AuthTabs`
    - `AuthForm`
      - `Input`
      - `Button`
      - `Checkbox`
      - `TextLink`

#### Firebase-ready structure

- Create `useAuth` hook
- `auth/login/page.tsx` calls `signInWithEmailAndPassword`
- `auth/signup/page.tsx` calls `createUserWithEmailAndPassword`
- `AuthForm` prop-driven for `mode`.

---

### 4. Onboarding Flow

#### Layout structure

- Multi-step wizard card
- Progress indicator
- Selection cards
- Summary + continue button

#### Tailwind layout

- Stepper wrapper: `space-y-6 max-w-2xl mx-auto`
- Wizard card: `bg-slate-900/80 border border-white/10 rounded-[2rem] p-6 lg:p-8`
- Step cards: `grid gap-4 sm:grid-cols-2`
- Action row: `flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between`

#### Component hierarchy

- `OnboardingPage`
  - `OnboardingHeader`
  - `StepProgress`
  - `SelectionGrid`
    - `SelectionCard`
  - `ActionFooter`

#### UX notes

- Use concise legal persona prompts
- Example cards: `Enterprise Counsel`, `SMB Ops`, `Risk Manager`
- Steps: `Company details`, `Contract type`, `Risk tolerance`, `Upload sample contract`

---

### 5. Dashboard

#### Layout structure

- Sidebar navigation
- Topbar with search and alerts
- KPI cards row
- Contracts table
- Alerts / activity feed

#### Tailwind layout

- Dashboard shell: `min-h-screen flex flex-col lg:flex-row`
- Sidebar: `w-full lg:w-72 xl:w-80 border-r border-white/10 bg-slate-950/80`
- Main content: `flex-1 p-4 sm:p-6 xl:p-8`
- KPI cards: `grid gap-4 sm:grid-cols-2 xl:grid-cols-4`
- Panel cards: `space-y-4`

#### Component hierarchy

- `DashboardPage`
  - `DashboardLayout`
    - `SidebarNav`
    - `Topbar`
    - `DashboardKpis`
      - `KpiCard`
    - `ContractsTable`
    - `AlertsPanel`

#### UX notes

- Load skeletons while fetching contract stats
- Strong empty state when no contracts exist
- Use color-coded risk badges in table
- Quick actions: `Upload contract`, `Run analysis`

---

### 6. Contract Upload

#### Layout structure

- Upload hero panel
- Drag & drop preview
- File list with progress
- Extraction status card

#### Tailwind layout

- Page wrapper: `px-4 py-8 sm:px-6 lg:px-10`
- Upload card: `relative rounded-[2rem] border border-dashed border-white/20 bg-slate-950/70 p-8 text-center`
- Preview panel: `mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]`

#### Component hierarchy

- `ContractUploadPage`
  - `UploadHero`
  - `UploadDropzone`
  - `UploadPreviewList`
  - `ExtractionStatusCard`

#### UI notes

- Drag and drop area uses: `transition duration-300 hover:border-lime-400`
- Progress states: `Uploading`, `Extracting text`, `Ready for review`
- File preview includes name, size, pages, status pill

---

### 7. Analysis Results

#### Layout structure

- Split screen: left viewer, right insights
- Top summary card with risk score
- Clause list and highlight panel

#### Tailwind layout

- Split container: `grid gap-6 lg:grid-cols-[0.72fr_0.28fr]`
- Viewer card: `min-h-[calc(100vh-120px)] rounded-[2rem] border border-white/10 bg-slate-950/80 p-6`
- Insights panel: `space-y-4`
- Clause list: `space-y-3`

#### Component hierarchy

- `AnalysisResultsPage`
  - `AnalysisHeader`
  - `ContractViewer`
  - `InsightPanel`
    - `RiskSummaryCard`
    - `ClauseAnalysisList`
    - `ActionCard`

#### UI notes

- Contract viewer includes search and clause anchor nav
- Insight panel shows risk level, top issues, remediation quick links
- Clause cards show status, score, and suggested language

---

### 8. Risk Scoring UI

#### Layout structure

- Risk badge strip
- Progress meter
- Summary copy
- Score breakdown

#### Tailwind layout

- Status card: `rounded-[1.5rem] bg-slate-900/75 border border-white/10 p-6`
- Meter: `h-3 rounded-full bg-slate-800 overflow-hidden`
- Legend: `grid gap-3 sm:grid-cols-2`

#### Component hierarchy

- `RiskScoringCard`
  - `RiskBadgeRow`
  - `RiskProgressMeter`
  - `ScoreDetailList`
  - `RecommendationFooter`

#### UI notes

- Use explicit text: `Low`, `Medium`, `High`, `Critical`
- Provide summary statements like `Review 4 clauses flagged High`
- Add savings/mitigation guidance

---

### 9. Admin Panel

#### Layout structure

- Stats cards top row
- User / contract / activity tables
- Filter chips and search

#### Tailwind layout

- Admin shell: `grid gap-6 xl:grid-cols-[1.4fr_0.6fr]`
- Stats row: `grid gap-4 sm:grid-cols-3`
- Table wrapper: `rounded-[1.5rem] border border-white/10 bg-slate-950/75 p-6`

#### Component hierarchy

- `AdminPage`
  - `AdminLayout`
    - `AdminStatsCards`
    - `UserTable`
    - `ContractTable`
    - `ActivityFeed`

#### UI notes

- Use compact tables with hover rows
- Admin cards show `Active users`, `Contracts processed`, `Avg. risk score`
- Provide `Invite user`, `Export CSV` actions

---

## Reusable Component System Patterns

### Button

- `primary`: gradient `from-blue-500 to-lime-400`, `text-slate-950`
- `outline`: `border border-white/15 text-slate-100`
- `ghost`: `bg-transparent text-slate-100 hover:bg-white/5`

### Card

- Use `bg-slate-950/70 border border-white/10 backdrop-blur-xl shadow-xl`
- Always `rounded-[1.5rem]`
- Provide `CardHeader`, `CardContent`, `CardFooter`

### Input

- `bg-slate-900/80 border border-white/10 text-slate-100 placeholder:text-slate-500`
- `focus:outline-none focus:ring-2 focus:ring-lime-400/30`
- `rounded-2xl p-4`

### Modal

- Overlay `fixed inset-0 bg-black/50 backdrop-blur-sm`
- Dialog `max-w-xl mx-auto my-16 rounded-[2rem] bg-slate-950/95 border border-white/10 p-6`
- Action row with `Button` variants

### Sidebar

- Vertical nav with `space-y-1`
- Active link style: `bg-slate-900 text-white shadow-inner`
- Section headings: `text-slate-500 uppercase tracking-[0.18em]`

### Table

- `min-w-full divide-y divide-white/10`
- Header: `text-slate-400 uppercase tracking-[0.08em]`
- Rows: `hover:bg-white/5`
- Cells: `py-4 px-4`

### Badge

- Risk variants:
  - low: `bg-emerald-500/15 text-emerald-300`
  - medium: `bg-amber-400/15 text-amber-300`
  - high: `bg-orange-500/15 text-orange-300`
  - critical: `bg-red-500/15 text-red-300`
- `rounded-full px-3 py-1 text-xs font-semibold`

### Progress

- Base: `h-3 rounded-full bg-slate-800`
- Fill: `h-full rounded-full transition-all duration-500`
- Use textual value next to meter

### Upload

- Dropzone: `relative rounded-[1.5rem] border-2 border-dashed border-white/20 bg-slate-950/70 p-8 text-center`
- Drag active: `border-lime-400 bg-lime-400/5`
- File preview row: `flex items-center justify-between gap-4 rounded-2xl bg-white/5 p-4`

---

## Mobile-first Responsiveness

- Base mobile spacing: `p-4`, `space-y-5`
- Use breakpoints:
  - `sm:` for small tablet
  - `md:` for large tablet and compact desktop
  - `lg:` for desktop layout
  - `xl:` for wide screens
- Convert stacked cards to grid at `md` and `lg`
- Sidebar hidden on mobile, accessible through a drawer or top navigation
- Tables become card lists on narrow screens

---

## Example Component File Structure

```
components/
  ui/
    button.tsx
    card.tsx
    input.tsx
    modal.tsx
    badge.tsx
    progress.tsx
    upload.tsx
    table.tsx
  layout/
    sidebar.tsx
    topbar.tsx
    dashboard-layout.tsx
    auth-layout.tsx
  sections/
    hero.tsx
    features.tsx
    risk-summary.tsx
    contract-preview.tsx
```

---

## Implementation Notes

- Use ShadCN UI for low-level primitives where possible.
- Compose ShadCN components with Tailwind utility classes for gradients, glass surfaces, and card spacing.
- Use `lucide-react` icons for consistent visual language.
- Keep pages declarative with `page.tsx` under the App Router.
- Use hooks for client state: `useState`, `useMemo`, `useEffect`, `useCallback`.
- Create hook layer for auth: `useAuth`, `useOnboarding`, `useContractUpload`, `useRiskScoring`.

---

## Landing Page React Hierarchy Example

```
app/page.tsx
components/sections/hero.tsx
components/sections/features.tsx
components/sections/product-preview.tsx
components/sections/how-it-works.tsx
components/sections/pricing-preview.tsx
components/layout/landing-footer.tsx
```

Use this same pattern across pages: separate page shell + reusable sections.

---

## Final Product Design Principles

- Trust-first: low visual noise, legal confidence cues, strong data hierarchy.
- Clear paths: minimal clicks from contract upload to analysis.
- Actionable insight: risk levels and remediation next steps are visible immediately.
- Scalable UI: modular components that work across landing, dashboard, onboarding, and admin.
