<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1N8auJHMjb9ny5bhtGhXvRtHvSpgWDFKS

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deployment to GitHub Pages

This project is configured for static deployment. 

1. **Install gh-pages**:
   \\\ash
   npm install gh-pages --save-dev
   \\\

2. **Deploy**:
   \\\ash
   npm run deploy
   \\\
   This command will build the project and push the \dist\ folder to the \gh-pages\ branch of your repository.

3. **Configure GitHub**:
   - Go to your repository Settings > Pages.
   - Ensure 'Source' is set to 'Deploy from a branch'.
   - Select \gh-pages\ branch and \/ (root)\ folder.

