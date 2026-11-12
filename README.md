# UTA Formula SAE Racing

A static site built with HTML, CSS, and JavaScript. The `public/` folder is the website and already includes its media, logos, and Satoshi font. No npm install or build step is needed.

## Preview on your computer

From the project folder, run:

```sh
python -m http.server 8080 --directory public
```

Open http://localhost:8080. Use a local server so the site's root-relative links and the Templates page work.

## Put it on GitHub

Unzip the archive and upload the **contents** of the `uta-formula-sae-racing` folder to the root of a new GitHub repository. Keep `Staticfile`, `wasmer.toml`, `settings/`, and `public/` at the same level.

## Host on Wasmer Edge

**From GitHub:** In Wasmer, import the repository and select its production branch (usually `main`). Use the repository root as the project directory. If asked for the static files directory, use `public`. Deploy, then open the URL Wasmer gives you.

**From your computer:** Install the Wasmer CLI, then run these commands from the project folder:

```sh
wasmer login
wasmer deploy
```

On the first CLI deployment, choose the account or namespace and app name when prompted. Wasmer creates the app configuration for that account. To test the Wasmer server locally before deploying, run `wasmer run . --net` and open http://localhost:8080.

- [Wasmer static-site guide](https://docs.wasmer.io/edge/guides/static-site/)
- [Wasmer Git deployment guide](https://docs.wasmer.io/edge/git/)

## Where to edit

| What to change | Where to look |
| --- | --- |
| Homepage sections | `public/index.html` |
| About, gallery, and roster | `public/about.html`, `public/gallery.html`, `public/team.html` |
| Copyable layouts for Sama and the team | Open `/templates.html` in the running site |
| Colors and fonts | `public/styles/theme.css` |
| Navigation, footer, and wordmark | `public/styles/layout.css` and the footer markup in each page |
| Hero, homepage sections, and roster styling | `public/styles/hero.css`, `public/styles/sections.css`, `public/styles/team.css` |
| Video, hotspots, counters, and timeline behavior | `public/scripts/hero.js`, `public/scripts/sections.js` |

The font license is included in `public/fonts/Satoshi-FFL.txt`. Team footage and logos are included as used on the site.
