# bitrep.app

The BitRep marketing site. Three static pages, no build step.

- `index.html` — home
- `privacy.html` — privacy policy
- `terms.html` — terms of use

Assets that must stay alongside the pages: `br-mark.png`,
`icon-1024.png`, `bitrep-avatars.png`, `ds/`.

These are plain static HTML with inline styles and **no JavaScript** — nothing to
build, nothing to hydrate. Do not add `support.js`; it is a React runtime that
throws on a static host and leaves the page blank.

The design-system folder is named `ds/` (no leading underscore) so GitHub Pages
publishes it without needing a `.nojekyll` file.

## Deploy to GitHub Pages on bitrep.app

1. Push every file in this folder to the **root** of `main`.
2. Repo → **Settings → Pages** → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. Under **Custom domain** enter `bitrep.app` and save. The `CNAME` file already holds it.
4. At your DNS provider add four **A** records on the apex (host blank or `@`).
   **Squarespace:** Domains dashboard → `bitrep.app` → DNS → DNS Settings. First
   delete the records under **Squarespace Defaults** (red trashcan) — custom
   records pointing elsewhere are rejected while they exist — then add these
   under **Custom Records**. Leave MX/email records untouched.

   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

   Optional IPv6 — four **AAAA** records:

   ```
   2606:50c0:8000::153
   2606:50c0:8001::153
   2606:50c0:8002::153
   2606:50c0:8003::153
   ```

5. **www → apex redirect:** add a **CNAME** record, host `www`, value
   `ethanatbitrep.github.io`. Because `CNAME` names the apex, Pages serves
   `bitrep.app` as primary and 301-redirects `www.bitrep.app` to it.
6. Delete any default/parked A record the provider added, wait for propagation
   (up to 24h), then tick **Enforce HTTPS** in Settings → Pages.

Check the apex with `dig bitrep.app +noall +answer` — the answers should match
the IPs above.

## Before launch

1. Replace the `#` CTA links with the TestFlight URL.
2. Set the effective date, contact addresses, legal entity and jurisdiction on the two legal pages.
3. Have the privacy policy and terms reviewed by a lawyer.
4. `bitrep-avatars.png` is a large sprite sheet — export trimmed sprites to cut page weight.
