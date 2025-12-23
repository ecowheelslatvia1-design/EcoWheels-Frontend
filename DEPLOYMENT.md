# Deploying to Vercel

This guide will help you deploy the EcoWheel Frontend application to Vercel.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Node.js installed on your local machine
3. Git repository (GitHub, GitLab, or Bitbucket)

## Method 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to Git Repository

1. Make sure your code is pushed to GitHub, GitLab, or Bitbucket
2. If not already done, initialize git and push:
   ```bash
   cd EcoWheel-Frontend
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

### Step 2: Import Project to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository
4. Select the repository containing your frontend code

### Step 3: Configure Project

1. **Root Directory**: If your frontend is in a subdirectory, set it to `EcoWheel-Frontend`
2. **Framework Preset**: Select "Create React App" (Vercel should auto-detect)
3. **Build Command**: `npm run build` (should be auto-filled)
4. **Output Directory**: `build` (should be auto-filled)

### Step 4: Set Environment Variables

1. In the project settings, go to **"Environment Variables"**
2. Add the following variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: Your backend API URL (e.g., `https://your-backend.vercel.app/api` or your deployed backend URL)
   - **Environment**: Select all (Production, Preview, Development)

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete
3. Your app will be live at `https://your-project.vercel.app`

## Method 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Navigate to Frontend Directory

```bash
cd EcoWheel-Frontend
```

### Step 4: Deploy

```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No** (for first deployment)
- Project name? Enter a name or press Enter for default
- Directory? `./` (current directory)
- Override settings? **No**

### Step 5: Set Environment Variables

```bash
vercel env add REACT_APP_API_URL
```

Enter your backend API URL when prompted.

### Step 6: Deploy to Production

```bash
vercel --prod
```

## Environment Variables

Make sure to set these environment variables in Vercel:

- `REACT_APP_API_URL`: Your backend API URL
  - Example: `https://your-backend-api.herokuapp.com/api`
  - Or: `https://your-backend.vercel.app/api`
  - Or: Your custom domain API URL

## Important Notes

1. **API URL**: Update `REACT_APP_API_URL` to point to your deployed backend
2. **CORS**: Make sure your backend allows requests from your Vercel domain
3. **Build**: The build process will run automatically on each push to your main branch
4. **Custom Domain**: You can add a custom domain in Vercel project settings

## Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Ensure Node.js version is compatible (Vercel uses Node 18.x by default)
- Check build logs in Vercel dashboard

### API Requests Fail

- Verify `REACT_APP_API_URL` is set correctly
- Check CORS settings on your backend
- Ensure backend is deployed and accessible

### Routing Issues

- The `vercel.json` file includes rewrites to handle React Router
- All routes will redirect to `index.html` for client-side routing

## Continuous Deployment

Once connected to Git:
- Every push to `main` branch = Production deployment
- Every push to other branches = Preview deployment
- Pull requests = Preview deployment with unique URL





