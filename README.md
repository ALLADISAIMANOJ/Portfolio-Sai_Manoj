# Aurora · Alladi Sai Manoj

A dark-first, static portfolio built with Astro, TypeScript and CSS. The fonts are self-hosted. The animated investigation card uses a completely fictional example; it does not connect to an employer, read logs, call an AI service, or perform a payment action.

## Unzip, build, preview

1. Install **Node.js 24 LTS, version 24.19.0 or a newer 24.x release**, with npm.
2. Unzip the archive. Open a terminal **in the extracted folder containing `package.json`**.
3. Run:

   ```sh
   npm ci
   npm run build
   npm test
   npm run preview
   ```

Open the local address printed in the terminal. The install downloads public packages from your machine’s configured npm registry. No private feed, token, environment file, database, API key, or paid service is required. For editing with live reload, run `npm run dev`. For type checking, run `npm run check`.

## Deploy free on GitHub Pages

1. Create an **empty public repository** in your personal GitHub account. Name it `YOUR-USERNAME.github.io` for a personal site, or choose another name for a project site.
2. From the extracted project folder, commit and push the **contents**, including `.github/workflows/deploy.yml` and `package-lock.json`, to the repository root. Do not upload the ZIP itself. For example, using Git:

   ```sh
   git init -b main
   git add .
   git status --short
   git commit -m "Add Aurora portfolio"
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

3. In **Settings → Pages → Build and deployment**, choose **GitHub Actions**. If the first push ran before Pages was enabled, open **Actions → Deploy to GitHub Pages → Run workflow** on `main`.
4. Open the deployed URL from the successful `deploy` job. Future pushes to `main` rebuild, test and redeploy. Both `https://YOUR-USERNAME.github.io/` and `https://YOUR-USERNAME.github.io/YOUR-REPO/` are supported. No custom domain or repository secrets are needed.

For another static host, the build command is `npm run build` and the upload directory is `dist/`. Set `SITE_URL` to the actual HTTPS origin, and `BASE_PATH` only for a subdirectory; the GitHub workflow supplies both automatically.

## Make it yours

- Edit [the profile](src/data/profile.ts) for the biography, roles, public professional links, skills and education. The résumé is generated from this file; **Print / Save PDF** uses the visitor’s browser.
- Copy a Markdown file in [src/content/work](src/content/work) to add a case study. `order` controls its position; `cover` can be `flow` or `pages`. Use a stable lowercase filename for a stable link.
- Add a `.md` file to [src/content/blog](src/content/blog) to publish writing. Use `title`, `description`, `date` and `tags` as in the included post. Set `draft: true` to preview without publishing. For something already published elsewhere, use an HTTPS `externalUrl` and optional `publication` instead of a body; a draft example is included. The index, home-page excerpt and RSS feed update at build time.

The intended public information is your display name, city, professional profiles, employers, high-level work descriptions, education and achievements. Review these before publishing. Keep private documents out of this project, especially `public/`, whose contents are copied into the site.
