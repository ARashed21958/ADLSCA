# ADLSCA website

This is a static site for GitHub Pages, made of plain HTML, CSS and JavaScript with no build step.

## Files

| File | What it is |
|---|---|
| `index.html` | The page: your story, the featured report, the timeline and the code section |
| `style.css` | The look |
| `script.js` | The chart and timeline data, and the code that makes them interactive |
| `reports/ADLSCA_v4.9.3_Report.pdf` | The featured report |
| `.nojekyll` | Tells GitHub to serve the files as they are |

## Before you publish

1. **Write your story.** In `index.html`, replace the three grey placeholder paragraphs under "Why I started", "What I found" and "What comes next".
2. **Write the timeline summaries.** In `script.js`, replace each `[Placeholder: ...]` in the `TIMELINE` list.
3. **Add older reports as you rewrite them.** Put the PDF in `reports/`, then change that entry's `pdf: null` to the path, for example `pdf: "reports/ADLSCA_v4.6_Report.pdf"`.
4. **Add the code link** when your repository is public. In `index.html`, find `id="code-link"`, set `href` to the link, remove `disabled` from its class, and change the button text.
5. **The v4.8 to v4.9.2 report** has the Oracle and v4.6 snapshots columns swapped in three rows. Use these values in your rewrite (seeds 6000-6015):
   - Oracle: 0.337 after return, 1.717 novel D, 0.450 D on return
   - Snapshots: 0.373 after return, 1.516 novel D, 0.480 D on return
6. **Do not upload the old PDFs** that carry the AI-assisted note. Upload only the versions you rewrote.

## Publishing on GitHub Pages (in the browser, no Git needed)

1. Sign in at github.com and click **+ → New repository** at the top right.
2. Name it. If you name it `yourusername.github.io`, the site address is `https://yourusername.github.io`. Any other name, such as `adlsca`, gives `https://yourusername.github.io/adlsca`.
3. Set it to **Public**, then click **Create repository**.
4. On the new repository page, click **uploading an existing file**.
5. Drag in `index.html`, `style.css`, `script.js`, `README.md` and the whole `reports` folder. Then click **Commit changes**.
6. Add `.nojekyll`: click **Add file → Create new file**, name it `.nojekyll`, leave it empty, and click **Commit changes**. (Windows hides files that start with a dot, so this route is the easiest.)
7. Go to **Settings → Pages**. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main**, and folder to **/ (root)**. Click **Save**.
8. Wait one or two minutes, then refresh the Pages settings. A link to your live site appears at the top.

**To update the site later:** open the file on GitHub, click the pencil icon, edit it and commit. Or upload a new file with the same name to replace the old one. The live site updates within a minute or two.

## Preview on your laptop first

Double-click `index.html` to open it in your browser. Everything works this way except that some browsers block the embedded PDF from a local file. The Download and Open buttons still work, and the PDF shows on the live site.
