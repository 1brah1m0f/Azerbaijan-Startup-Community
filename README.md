# Azerbaijan Startup Community — website

Single-page site for ASC. Two conversion goals: **join as a startup** and
**join as a mentor**. Everything else on the page supports one of those two.

Built with Next.js (App Router), TypeScript and Tailwind CSS. Deploys to
Vercel with no configuration.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

| Command | What it does |
| --- | --- |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run check:copy` | Fails if banned marketing phrases reappear in the copy |

---

## Editing the content

### Text — `/locales`

All visible text lives in two files:

- `locales/az.ts` — Azerbaijani, the default language and the source of truth
- `locales/en.ts` — English

They must have exactly the same keys. `az.ts` defines the shape, so if you add
a string to one file and forget the other, `npm run build` fails and names the
missing key. To change a heading, find it in `az.ts`, edit it, then edit the
matching line in `en.ts`.

### Data — `/data`

Lists that grow over time are plain TypeScript arrays. Copy an existing entry
and edit it; no other file needs to change.

| File | Holds |
| --- | --- |
| `data/startups.ts` | The ASC Startup Network cards |
| `data/mentors.ts` | The ASC Mentor Network cards |
| `data/partners.ts` | The partner logos |
| `data/team.ts` | The ASC team, and the community photo |

**Startups.** New entries start with `sector`, `stage` and `lookingFor` set to
`TODO`, which means "not confirmed yet". A card with everything still `TODO`
shows one quiet dashed marker instead of empty rows, and the filter chips above
the grid only appear once real values exist. Replace `TODO` with a value from
`lib/options.ts`:

- `sector` — FinTech, AI, EdTech, SaaS, E-commerce, HealthTech, Marketplace, Logistics, GreenTech, Media, Other
- `stage` — Idea, Pre-seed, Seed, Growth
- `lookingFor` — an array of: Mentor, Co-founder, Technical Talent, Customer, Pilot, Investment, Networking

```ts
{
  name: "Vexxon",
  logo: "/logos/vexxon.png",
  logoHeight: "h-10",
  website: "https://www.vexonsolution.com/",
  sector: "SaaS",
  stage: "Seed",
  lookingFor: ["Investment", "Pilot"],
}
```

**Mentors.** The four entries shipped are placeholders. Set `photo` to a file
you added under `/public`, or leave it `null` to show the mentor's initials in
a brand gradient avatar.

**Images.** Put new logos and photos in `/public/logos/` and reference them by
the path after `public`, e.g. `/logos/vexxon.png`. Nothing is loaded from an
external domain.

---

## Where form submissions go

The three forms post to route handlers under `app/api/`:

| Form | Endpoint |
| --- | --- |
| Startup registration | `/api/join-startup` |
| Mentor registration | `/api/join-mentor` |
| Business inquiries | `/api/business` |

Each one validates the body against the same schema the browser used
(`lib/schemas.ts`), then calls `saveSubmission` in `lib/submissions.ts`.

`saveSubmission` inserts the payload into Supabase Postgres, one table per
form: `startup_submissions`, `mentor_submissions`, `business_inquiries` and
`login_attempts`. Read them in the Supabase dashboard's table editor. If the
insert fails the payload is written to the server log so it can be recovered,
and the form tells the visitor to try again rather than claiming success.

The tables have row level security on with an insert-only policy, so the key
the site uses can add rows but cannot read anyone's details back. Option
columns are plain text on purpose: adding a sector to `lib/options.ts` must
never make the database reject a submission.

Submissions are structured for matchmaking, not just an email capture. Stage,
sector, needs, expertise and availability arrive as real enum values, so they
can be filtered and matched without parsing free text.

### Log in

`/api/auth/login` is a placeholder. There is no account system yet, so it
validates the shape of the credentials, records the attempt without the
password, and the modal tells the visitor that log in is not enabled and points
them at the registration form. Replace the body of that route when
authentication is added.

---

## Project structure

```
app/
  layout.tsx          fonts, metadata, providers
  page.tsx            section order for the whole page
  globals.css         design-system CSS (surfaces, reveals, orbs, chips)
  api/                route handlers for the forms and the login stub
components/
  layout/             header, footer, background effects
  sections/           one file per section of the page
  ui/                 buttons, fields, chips, headings, icons
  modal/              the log in modal
  providers/          language and modal context
data/                 editable content lists
locales/              az.ts and en.ts
hooks/                scroll reveal, tilt, particles, form submission
lib/                  options (enums), schemas, submissions, helpers
public/logos/         every image the site uses
scripts/              check-forbidden.mjs
```

The page order is set in one place, `app/page.tsx`:

Hero → Stage → Startup Value → Startup Network → Mentor → Opportunities →
Partners → Team → Final CTA → Startup form → Mentor form → Business inquiries

---

## Language switching

AZ is the default. The `AZ / EN` control in the header swaps the dictionary and
stores the choice in `localStorage` under `asc-lang`, so it survives a reload.
The `<html lang>` attribute follows the active language.

---

## Copy guard

ASC creates access to an ecosystem. It does not fund startups, run an
accelerator, or build startups itself. `npm run check:copy` fails the build if
phrases implying otherwise reappear in the copy or the data files. The list is
at the top of `scripts/check-forbidden.mjs`.

---

## Deploying

The repository is linked to Vercel, so every push to `main` deploys.

Two environment variables are required, both from the Supabase project's API
settings — see `.env.example`:

| Variable | Holds |
| --- | --- |
| `SUPABASE_URL` | The project URL |
| `SUPABASE_PUBLISHABLE_KEY` | The publishable key |

Neither is prefixed with `NEXT_PUBLIC_`, so they stay on the server.
