# CARER Website Project Context & Workflow

## 1. Project Identity
* **Organization:** Nasir Uddin Centre for Applied Research & Educational Resources (CARER)
* **Abbreviation:** CARER
* **Tagline:** Integrity. Innovation. Impact.
* **Primary Goal:** Bridge academia and industry through applied research.
* **Design Inspiration:** Perimeter Institute (Dark, content-heavy, premium), ICTP (Logo style).
* **Deadline:** Working Local Demo by Friday (Dec 26th target).

## 2. Tech Stack & Architecture
* **Framework:** Next.js 14 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS + Shadcn/UI (New York Style, Slate Base)
* **Package Manager:** pnpm
* **Deployment:** Localhost (for Friday demo), Vercel (planned)

### Directory Structure Rules
* `src/app/` -> Routes (Pages & Layouts).
* `src/components/shared/` -> Global items (Navbar, Footer).
* `src/components/home/` -> Homepage specific blocks (Hero, Features).
* `src/lib/data.ts` -> **The Mock Database.** All text content must be stored here, NOT hardcoded in components.
* `src/types/` -> TypeScript interfaces to ensure data consistency.

## 3. Current Progress (Checklist)
- [x] **Initialization:** Project setup with `pnpm`, clean up of default Next.js boilerplate.
- [x] **Design System:** Shadcn/UI installed and configured.
- [x] **Layout:** Global `layout.tsx` configured.
- [x] **Navbar:** Responsive sticky header implemented with "Contact" button.
- [x] **Data Layer:** `src/lib/data.ts` created with content extracted from `PREAMBLE.docx`.
- [x] **Hero Section:** Implemented with background gradient and text from `data.ts`.
    - [x] *Bugfix:* Solved "White-on-White" hover issue for the Secondary Button.

## 4. Immediate Workflow (The "Friday Demo" Sprint)

### Phase 1: The Homepage (Current Focus)
1.  **Research Areas Grid:**
    * *Concept:* A 4-column grid displaying the sectors (Energy, Health, etc.).
    * *Data Source:* `RESEARCH_AREAS` array in `data.ts`.
    * *Tech:* Tailwind Grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`) + Lucide Icons.
2.  **Objectives List:**
    * *Concept:* A clean text section listing the bullet points from the Preamble.
    * *Data Source:* `OBJECTIVES` array in `data.ts`.

### Phase 2: Essential Pages
1.  **About Page:**
    * *Content:* The "Mission" and "Vision" paragraphs from `PREAMBLE.docx`.
2.  **Contact Page:**
    * *Content:* Simple form (visual only) + Address/Phone details.

### Phase 3: Polish
1.  **Mobile Check:** Ensure the Navbar "Menu" icon works (requires a Sheet component).
2.  **Images:** Replace any placeholder colors with relevant stock images if provided, or help create optimized ones.

## 5. Future Scope (Post-Demo)
* **Database:** Migrate `data.ts` to PostgreSQL.
* **CMS:** Connect a Headless CMS (Strapi/Sanity) so the client can edit "News" and "Events".
* **Auth:** Add login for Researchers/Staff.

## 6. Project Rules
1.  **Create Placeholders:** Use real data from `data.ts`, create placeholders (optimized for project), ask user questions that should be referred to client for project.
2.  **Verify Docs:** Always search for the latest version of libraries (e.g., Shadcn CLI updates) before implementation.
3.  **Concept -> Code:** Understand the *why* before writing the *how*.