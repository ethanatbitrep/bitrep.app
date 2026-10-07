# bitrep.app

The BitRep website: a short, image-led waitlist page for the iPhone app,
plus the privacy policy and terms. Plain static files, no build step,
served by GitHub Pages from the root of `main`.

## Pages

- `index.html`: the home page. Header with a "Join the waitlist" button,
  hero (headline, waitlist form, three app screens, the fox at five
  stages), what we promise (six panels), the walkthrough film with Ember
  at stage 1 and stage 5 either side on wide screens, five feature cards,
  questions (plain details and summary), the waitlist form again, footer.
- `thanks.html`: the page Kit sends people to after they join the
  waitlist, with "Text a friend" and "Email a friend" share links and the
  Instagram link. Marked `noindex`.
- `privacy.html` and `terms.html`: the legal pages, in the same look as the
  home page (one readable column, same header and footer). Their wording is
  kept exactly as written; change it only on purpose.

- `bitrun/`: BitRun, a one-page browser game (pick a companion, jump gym
  gear, collect water for XP). Self-contained: `index.html` plus
  `sprites/` and `tiles/`. It uses the site's fonts, wordmark and favicons
  through `../` paths, so it must stay one folder below the root. It is
  `noindex` and not in `sitemap.xml`. Since 7 Oct 2026 the home page shows
  it in a frame (the "Play BitRun" section) so it can be played in place;
  the home page script hides the game page's own header, title and intro
  inside the frame and sizes the frame, using the game's `.top`, `h1`,
  `.lede`, `.wrap` and `#joinForm`. If a new game build renames those,
  update that script. Do not resize, recompress or rename the sprite files: the game
  reads their outlines from numbers measured on these exact files.

## Files

- `site.css`: the one stylesheet for every page. Colours,
  radii and type follow design pack 10 (Midnight and Iris, dark theme).
- `fonts/`: Archivo 400 and 700 and Pixelify Sans 700, self-hosted, with
  their OFL licences. Pixelify Sans is for the main headline only.
- `img/bitrep-wordmark-white.svg`: the 2026 wordmark (B-barbell mark plus
  "BitRep") from the design kit's logo folder.
- `img/screens/`: eight app stills (900 x 1790) with 300 and 600 px
  copies for `srcset`. Each is shown clipped to the phone's own outline
  (the clip values are in `site.css`); a still never takes padding.
- `img/fox/` and `img/companions/`: companion art from the app repo, whole
  squares at 146, 292, 438 and (fox) 620 px. Art shown at exactly its file
  size keeps pixelated rendering; anything scaled down is drawn smoothly.
  Nothing is ever enlarged.
- `img/share.png`: the 1200 x 630 link-preview image (`og:image`).
- `video/`: the walkthrough film (`bitrep-film.mp4`, 42 s, H.264 with AAC music,
  faststart) and its poster.
- `favicon.ico`, `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`:
  the white mark on `#0E1020`.
- `email/wordmark.png` and `email/ember.png`: loaded by the Kit email
  template from `https://bitrep.app/email/...`. Keep these names and paths.
- `CNAME`: holds `bitrep.app`. Do not remove it.
- `google4c29a84d4da0eca0.html`: Google Search Console's verification file.
  Keep it, unchanged, for as long as the site is verified.
- `sitemap.xml`: the pages that should appear in search (home, privacy,
  terms). `robots.txt` points to it and keeps `/prototype/` out.
- `404.html`: shown by GitHub Pages for any missing address. It uses
  site-root paths (`/site.css`) so it works at any depth. Marked `noindex`,
  like `thanks.html`.

The shared footer on every page links to Instagram
(`https://www.instagram.com/bitrep.app`) and LinkedIn
(`https://www.linkedin.com/company/bitrepapp`) as plain links.

## Behaviour

- The waitlist form posts straight to Kit
  (`https://app.kit.com/forms/9990510/subscriptions`, field `email_address`).
  That is the only outside address the home page uses.
- One small inline script on `index.html` plays the film (muted) when at
  least half of it is on screen and pauses it when it leaves. The film only
  starts loading once it reaches the screen. A visitor's own pause is
  respected, and nothing autoplays with Reduce Motion or Save Data on.
  Without JavaScript the film plays on tap and the form still works.

## Publishing

Every push to `main` triggers GitHub's "pages build and deployment" run,
which publishes the files to https://bitrep.app within a minute or two.
Settings, Pages: source "Deploy from a branch", branch `main`, folder `/`.

## The prototype at /prototype/

`prototype/` holds the phone prototype, encrypted with StatiCrypt behind a
passcode. Only the encrypted page and its four companion files are in this
repo; the unencrypted prototype, its zip and the passcode are never
committed. It is not linked from any page, and `robots.txt` disallows it.

The unencrypted source, the custom passcode page
(`staticrypt/password_template.html`) and StatiCrypt's config with the fixed
salt (`staticrypt/.staticrypt.json`) live outside this repo, in
`~/Developer/bitrep-prototype-source/`. Keeping the same salt keeps
"Remember me" working across updates.

### Updating the prototype

1. Unpack the new `bitrep-prototype-phone.zip` outside this repo, into
   `~/Developer/bitrep-prototype-source/` (replacing the old files there).
2. From that folder, re-run the same StatiCrypt command with the same
   passcode and the same config, giving the passcode only through the
   `STATICRYPT_PASSWORD` environment variable for that one command:

   ```
   cd ~/Developer/bitrep-prototype-source/bitrep-prototype-phone
   STATICRYPT_PASSWORD='...' npx staticrypt index.html \
     -c ../staticrypt/.staticrypt.json \
     -t ../staticrypt/password_template.html \
     --remember 180 --template-error "That passcode didn't work. Try again." \
     -d ../encrypted
   ```

3. Replace the five files in `prototype/`: `../encrypted/index.html`, and
   `manifest.webmanifest`, `icon-180.png`, `icon-192.png` and `icon-512.png`
   copied unchanged from the new zip.
4. Check `prototype/index.html` is ciphertext, then commit and push `main`.

## Previewing locally

iPhone Safari needs byte-range support to play the film, which
`python3 -m http.server` does not provide. Use a static server that
supports ranges, or open `index.html` directly in Safari on the Mac.

## DNS (already set up)

At the DNS provider (Squarespace: Domains, `bitrep.app`, DNS, DNS Settings)
the apex has four A records pointing at GitHub Pages. Leave MX and email
records alone.

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

Optional IPv6, four AAAA records:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

`www` is a CNAME to `ethanatbitrep.github.io`. Because `CNAME` names the
apex, Pages serves `bitrep.app` and redirects `www.bitrep.app` to it. HTTPS
is enforced in Settings, Pages. Check the apex with
`dig bitrep.app +noall +answer`; the answers should match the IPs above.

## Still to do

- Have the privacy policy and terms reviewed by a lawyer, and name the
  legal entity on them.
- Point Kit's form success redirect at `https://bitrep.app/thanks.html`.
