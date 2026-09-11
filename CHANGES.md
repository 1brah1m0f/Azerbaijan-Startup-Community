# What changed from the previous site

The design system is unchanged: same palette, fonts, glass cards, gradients,
scroll reveals, tilt effect, background orbs, header, footer and log in modal.
What changed is the **message and the page structure**.

Old site: "we build great startups — we provide capital, mentorship and
network." New site: if you are building a startup, join ASC; if you can help
people who are building, join as a mentor. ASC creates access to an ecosystem
rather than providing money itself.

---

## Removed

| What | Why |
| --- | --- |
| **Programs section** in full — Incubation, Acceleration, the 3-month and 6-month programs, seed funding for an MVP, follow-on investment, Resident Entrepreneur, global market tours | ASC does not run these. Replaced by *Opportunities*. |
| **"Smart Capital"** card from the Vision section | Implies ASC funds startups. |
| **Vision section** ("Fuelling innovation", Rapid Growth / Global Network / Smart Capital) | Replaced by *Why join?*, written from the founder's point of view. |
| **Startup logo marquee** | Became a real product: the ASC Startup Network, a filterable database. |
| **"Sign Up" as a generic call to action**, in the header, hero, and final CTA | Every call to action now names one of the two paths. |
| **Sign-up mode of the log in modal** | Registration happens in the two forms on the page, so the modal only logs in. Its "Sign up" link scrolls to the matching form. |
| **Dark mode toggle** | Dropped by agreement; the site is light-theme only. |
| **"Learn more", "Apply now", "Start your journey", "Explore programs"** | Vague calls to action, replaced by specific ones. |

A guard script (`npm run check:copy`) fails the build if any of the removed
phrases reappear in the copy.

---

## Added

| Section | What it does |
| --- | --- |
| **Stage — "What stage are you at?"** (`#stage`) | Sits directly under the hero. Three cards — I have an idea / I am building / I am growing — each ending in "You can join." Removes the "I don't have a startup yet" barrier before anything else on the page. |
| **Why join?** (`#why`) | Four cards on what a founder gets: the right people, experience, access to opportunities, visibility. |
| **ASC Startup Network** (`#startups`) | A card grid driven by `data/startups.ts`, with sector, stage, what each startup is looking for, and a link. Filter chips appear above the grid once real values are filled in. |
| **Mentor section** (`#mentors`) | A large two-column block reachable in two scrolls from the hero, plus the ASC Mentor Network grid. Carries the "no ongoing commitment" line, which is what makes people say yes. |
| **Opportunities** (`#opportunities`) | Six cards replacing Programs: Mentorship, Founder Community, Startup × Corporate, Investor Access, Events & Meetups, Global Opportunities. |
| **Startup registration form** (`#join-startup`) | Name, email, startup name, stage, sector, a two-sentence description, and multi-select chips for what the founder needs. Posts to `/api/join-startup`. |
| **Mentor registration form** (`#join-mentor`) | Name, email, role, expertise chips, industries, the stages they can support, LinkedIn and monthly availability. Posts to `/api/join-mentor`. |
| **AZ / EN dictionary** | All copy moved into `locales/az.ts` and `locales/en.ts` with the switch in the header. |

Both forms collect structured data: stage, sector, needs, expertise and
availability arrive as enum values that can be matched against each other, not
as free text.

---

## Reordered

Old order:

```
Hero → Startup logos + Partners → Vision → Programs → Team → Join CTA → Business form
```

New order:

```
Hero → Stage → Why join → Startup Network → Mentor → Opportunities →
Partners → Team → Final CTA → Startup form → Mentor form → Business inquiries
```

The changes that matter:

- **Partners and startup logos no longer follow the hero.** A visitor now sees
  "you can join at your stage" first. Partners moved far down the page.
- **The mentor section is high up**, not an afterthought, since mentors are one
  of the two conversion goals.
- **The team section moved low** and is visually more compact than before:
  smaller photos, smaller type, less vertical space.

---

## Changed in place

- **Header nav** is now `Startups | Mentors | Opportunities | About | Log in`,
  with two calls to action on the right: "Join as a startup" (primary) and
  "Become a mentor" (secondary).
- **Final CTA band** keeps the full-width photo and gradient treatment, but is
  split into two halves, one per audience, instead of one generic button.
- **Business inquiries form** is unchanged, and moved to the bottom as a
  secondary path.
- **Footer** keeps its layout; links now point at the new sections.
- **Log in modal** keeps its design. The "Log in" button validates, records the
  attempt and shows a notice that log in is not enabled yet, because there is
  no account system behind it.

---

## Technical notes

- All images are downloaded into `/public/logos/`. Nothing is loaded from the
  old deployment's domain.
- A 30px horizontal scroll on phones, present on the old site, is fixed.
- The reveal, tilt, particle and orb animations all respect
  `prefers-reduced-motion`.
- Every form field now has a real label. The old site's business form had
  three unlabelled inputs and an unlabelled select, which screen readers could
  not announce.

### One thing worth a decision

An automated accessibility scan flags the brand teal (`#00c9a7`) used for
eyebrow labels and small accents. On a white background it sits at roughly
2:1 contrast, below the 4.5:1 that WCAG AA asks for on small text. The same
applies to the muted `slate-400` captions under the partner logos and to the
outlined secondary button.

This is inherited from the existing design, not introduced here, and it was
kept deliberately so the look matches the previous site. Darkening the teal
for small text only would fix it without changing the overall feel. Worth
deciding before launch.
