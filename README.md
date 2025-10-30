# Spotify Playlist Exporter

A modern web application that allows you to export your Spotify playlists to CSV format with comprehensive track metadata. Built with Next.js 16, React 19, and NextAuth.js.

## Features

- 🎵 **Complete Playlist Access** - Export all your private and collaborative playlists
- 📊 **Rich Track Metadata** - Artists, albums, release dates, duration, popularity, and more
- ✅ **Selective Export** - Choose specific playlists or export them all at once
- 🔍 **Search & Sort** - Find and organize playlists easily
- 🎨 **Modern UI** - Beautiful, responsive design with automatic dark/light theme detection
- 🔒 **Secure Authentication** - OAuth 2.0 with automatic token refresh
- ⚡ **Fast & Reliable** - Handles large playlists with retry logic and rate limiting

## CSV Output Format

The exported CSV includes the following columns:

| Column | Description |
|--------|-------------|
| `playlist_id` | Spotify playlist ID |
| `playlist_name` | Name of the playlist |
| `playlist_owner` | Owner's display name |
| `playlist_public` | Public/private status |
| `track_name` | Song title |
| `artists` | Artists (joined by ";") |
| `album_name` | Album title |
| `album_release_date` | Release date |
| `duration_ms` | Duration in milliseconds |
| `duration_min` | Duration in MM:SS format |
| `explicit` | Explicit content flag |
| `popularity` | Spotify popularity score (0-100) |
| `added_at` | Date track was added to playlist |
| `track_uri` | Spotify track URI |

## Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Spotify Developer Account

## Setup Instructions

### 1. Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click "Create App"
3. Fill in the details:
   - **App name**: Spotify Playlist Exporter
   - **App description**: Export playlists to CSV
   - **Redirect URI**: 
     - For local: `http://localhost:3000/api/auth/callback/spotify`
     - For production: `https://your-app.vercel.app/api/auth/callback/spotify`
   - **API/SDKs**: Web API
4. Save your app
5. Copy your **Client ID** and **Client Secret**

### 2. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd spotify-playlist-export

# Install dependencies
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

```env
# Spotify API Credentials
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here

# NextAuth Configuration
# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET=your_generated_secret_here

# NextAuth URL
NEXTAUTH_URL=http://localhost:3000
```

To generate a secure `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### 1. Deploy to Vercel

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### 2. Configure Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (set to your production URL, e.g., `https://your-app.vercel.app`)

### 3. Update Spotify Redirect URI

1. Go back to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Edit your app
3. Add your production redirect URI: `https://your-app.vercel.app/api/auth/callback/spotify`
4. Save changes

## Usage

1. **Sign In**: Click "Connect to Spotify" and authorize the app
2. **Browse Playlists**: View all your playlists with cover art and metadata
3. **Search & Sort**: Find playlists by name or sort by track count
4. **Select Playlists**: Click on playlists to select them for export
5. **Export**: Click "Export to CSV" to download your data

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: 19.2.0
- **Authentication**: NextAuth.js 5.0 (beta)
- **Styling**: Tailwind CSS 4
- **CSV Generation**: PapaParse
- **API**: Spotify Web API
- **Deployment**: Vercel

## API Routes

- `GET /api/playlists` - Fetch all user playlists
- `GET /api/playlists/[id]/tracks` - Fetch tracks for a specific playlist
- `POST /api/export` - Export selected playlists to CSV

## Required Spotify Scopes

- `playlist-read-private` - Read private playlists
- `playlist-read-collaborative` - Read collaborative playlists
- `user-read-private` - Access user profile
- `user-read-email` - Access user email

## Features in Detail

### Automatic Token Refresh

The app automatically refreshes your Spotify access token when it expires, ensuring uninterrupted access.

### Rate Limiting & Retry Logic

Built-in exponential backoff retry logic handles Spotify's rate limits and temporary failures gracefully.

### Large Playlist Support

The app handles playlists with thousands of tracks through efficient pagination and streaming.

### Accessibility

- WCAG 2.1 AA compliant
- Full keyboard navigation support
- ARIA labels for screen readers
- Responsive design for all devices

## Troubleshooting

### "Invalid redirect URI" error

- Ensure the redirect URI in your Spotify app matches exactly with your `NEXTAUTH_URL`
- Check that you've added `/api/auth/callback/spotify` to the end

### Authentication fails

- Verify your `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` are correct
- Ensure `NEXTAUTH_SECRET` is set and properly generated
- Check that your Spotify app has the correct redirect URIs

### No playlists showing

- Verify you've granted all required permissions during sign-in
- Try signing out and signing in again
- Check browser console for error messages

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please open an issue on GitHub.

---

Made with ❤️ using Spotify Web API
