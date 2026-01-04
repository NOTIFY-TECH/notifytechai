# Vercel Deployment Guide for Textora Tech AI

This document provides step-by-step instructions for deploying the Textora Tech AI project on Vercel without affecting your ongoing work. The process uses a staging branch to ensure your main development branch remains untouched.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com) if you don't have one)
- Git repository connected to Vercel
- Supabase project set up with URL and publishable key

## Deployment Strategy (No Impact on Work)

To avoid affecting your work, we'll deploy from a dedicated staging branch:

1. Create a staging branch from your current main branch
2. Deploy the staging branch to Vercel
3. Test the deployment
4. Merge changes back to main when ready

## Step-by-Step Deployment

### 1. Create a Staging Branch

```bash
# From your project root (d:/textora-tech-ai-main)
git checkout -b staging-deployment
git push origin staging-deployment
```

### 2. Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your Git repository (textora-tech-ai-main)
4. Configure the project:
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: Leave as `./` (or `textora-tech-ai-main` if needed)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default for Vite)

### 3. Set Environment Variables

In the Vercel dashboard, go to your project settings and add these environment variables:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY`: Your Supabase publishable key

### 4. Deploy

1. In Vercel, select the `staging-deployment` branch for deployment
2. Click "Deploy"
3. Wait for the build to complete (usually 2-5 minutes)

### 5. Test the Deployment

1. Once deployed, Vercel will provide a preview URL
2. Test your application thoroughly:
   - Check all pages load correctly
   - Test Supabase integration
   - Verify chatbot functionality
   - Ensure responsive design works

### 6. Production Deployment (Optional)

When ready to go live:

1. Merge staging branch to main:
   ```bash
   git checkout main
   git merge staging-deployment
   git push origin main
   ```

2. In Vercel, switch the production branch to `main` in project settings

## Vercel Configuration (Optional)

If you need custom configuration, create a `vercel.json` file in your project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## Troubleshooting

### Build Fails
- Check Vercel build logs for errors
- Ensure all dependencies are listed in `package.json`
- Verify environment variables are set correctly

### Supabase Connection Issues
- Confirm environment variables are prefixed with `VITE_` for client-side access
- Check Supabase project settings and keys

### Performance Issues
- The Vite config already includes optimizations (code splitting, minification)
- Monitor Vercel analytics for performance metrics

## Cleanup

After successful deployment:

```bash
# Delete staging branch if no longer needed
git branch -d staging-deployment
git push origin --delete staging-deployment
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Supabase Environment Variables](https://supabase.com/docs/guides/getting-started/quickstarts/reactjs)

This deployment maintains your workflow by using a separate branch, ensuring no disruption to ongoing development.
