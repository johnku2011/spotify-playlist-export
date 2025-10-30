# Quick Start Guide

Get your Spotify Playlist Exporter up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- pnpm package manager (`npm install -g pnpm`)
- A Spotify account

## Step 1: Get Spotify Credentials

1. Go to https://developer.spotify.com/dashboard
2. Log in with your Spotify account
3. Click "Create App"
4. Fill in the form:
   - **App Name**: Spotify Playlist Exporter
   - **App Description**: Export my playlists to CSV
   - **Redirect URI**: `http://localhost:3000/api/auth/callback/spotify`
   - Check "Web API"
5. Click "Save"
6. Click "Settings" and copy your **Client ID** and **Client Secret**

## Step 2: Install Dependencies

```bash
pnpm install
```

## Step 3: Configure Environment

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and fill in your credentials:
```env
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_SECRET=generate_with_command_below
NEXTAUTH_URL=http://localhost:3000
```

3. Generate a secure `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

## Step 4: Run the App

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Use the App

1. Click "Connect to Spotify"
2. Authorize the app
3. Browse your playlists
4. Select the ones you want to export
5. Click "Export to CSV"
6. Done! Your CSV file will download automatically

## Troubleshooting

### "Invalid redirect URI" error
- Make sure you added `http://localhost:3000/api/auth/callback/spotify` to your Spotify app's redirect URIs
- The URL must match exactly (including the port)

### No playlists showing
- Check the browser console for errors
- Try signing out and signing in again
- Verify your Spotify app has been activated (not in development mode with no users)

### Build fails
- Make sure you're using Node.js 18 or higher: `node --version`
- Clear the cache: `rm -rf .next node_modules` and reinstall: `pnpm install`

## Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Update Spotify redirect URI to `https://your-app.vercel.app/api/auth/callback/spotify`
6. Deploy!

## Support

For issues or questions, check the main [README.md](README.md) for detailed documentation.

---

Happy exporting! 🎵

