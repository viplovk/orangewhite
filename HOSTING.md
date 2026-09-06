# Hosting on cli.rs (viplov.cli.rs)

This project is configured to be hosted under the free community subdomain **`viplov.cli.rs`** via [zackify/cli.rs](https://github.com/zackify/cli.rs).

---

## Architecture Overview

```
Visitor -> viplov.cli.rs (DNS managed by cli.rs)
              |
              v (CNAME alias)
        viplovk.github.io (GitHub Pages hosting)
              |
              v
        Static build files from /dist
```

---

## Step 1: Submit Subdomain Request to `zackify/cli.rs`

1. Fork the [zackify/cli.rs](https://github.com/zackify/cli.rs) repository on GitHub.
2. In your fork, create or update the file `domains/viplov` with your GitHub Pages domain:
   ```text
   viplovk.github.io
   ```
   *(Note: The file `domains/viplov` has already been generated in this workspace with that exact content).*
3. Commit the change and open a **Pull Request** to `zackify/cli.rs` (`master` branch).
4. Once merged by the maintainer, the DNS record for `viplov.cli.rs` will point to `viplovk.github.io`.

---

## Step 2: Configure Your Portfolio Repository on GitHub

1. Push this portfolio repository to GitHub under your account (e.g., `https://github.com/viplovk/repos` or `viplovk.github.io`).
2. The project already includes:
   - **`public/CNAME`**: Contains `viplov.cli.rs` (automatically copied to `dist/CNAME` during build).
   - **`.github/workflows/deploy.yml`**: Automatically builds with Vite and deploys to GitHub Pages on every push to `main` or `master`.
3. In your repository on GitHub:
   - Go to **Settings** -> **Pages**.
   - Under **Build and deployment**, select **GitHub Actions** as the source.
   - Under **Custom domain**, enter: `viplov.cli.rs`
   - Check **Enforce HTTPS** (available once the DNS record propagates).

---

## Step 3: Verification

Once the PR on `zackify/cli.rs` is merged:
```bash
dig viplov.cli.rs CNAME +short
# Should return: viplovk.github.io.
```
Your portfolio will now be accessible live at `https://viplov.cli.rs`!
