# Spotify Playlist Exporter

> English | **[繁體中文](README.md)** ⭐

A modern, secure web application to export your Spotify playlists (including Liked Songs) to CSV format with comprehensive track metadata.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## ✨ Features

- 🎵 **Export All Playlists** - Including private, collaborative playlists, and Liked Songs
- 📊 **Rich Metadata** - Track name, artists, album, duration, popularity, release date, and more
- ✅ **Selective Export** - Choose specific playlists or export everything at once
- 🔍 **Search & Filter** - Quickly find playlists with search and sort functionality
- 🎨 **Modern UI** - Beautiful, responsive design with dark/light mode support
- 🔒 **Secure** - OAuth 2.0 authentication with automatic token refresh
- ⚡ **Reliable** - Built-in retry logic and rate limit handling

## 📋 CSV Output Format

Each exported CSV includes these columns:

| Column | Description |
|--------|-------------|
| `playlist_id` | Spotify playlist ID |
| `playlist_name` | Playlist name |
| `playlist_owner` | Owner's display name |
| `playlist_public` | Public/private status |
| `track_name` | Song title |
| `artists` | Artists (semicolon-separated) |
| `album_name` | Album title |
| `album_release_date` | Release date |
| `duration_ms` | Duration in milliseconds |
| `duration_min` | Duration in MM:SS format |
| `explicit` | Explicit content flag |
| `popularity` | Spotify popularity score (0-100) |
| `added_at` | Date added to playlist |
| `track_uri` | Spotify track URI |

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- pnpm (or npm/yarn)
- Spotify Developer Account

### 1. Create a Spotify App

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click **"Create App"**
3. Fill in the details:
   - **App name**: Spotify Playlist Exporter (or your preferred name)
   - **App description**: Export playlists to CSV
   - **Redirect URIs**: 
     - For local development: `http://localhost:3000/api/auth/callback/spotify`
     - For production: `https://your-domain.com/api/auth/callback/spotify`
4. Save and copy your **Client ID** and **Client Secret**

### 2. Install Dependencies

```bash
git clone https://github.com/yourusername/spotify-playlist-export.git
cd spotify-playlist-export
pnpm install
```

### 3. Configure Environment

Create `.env.local` in the project root:

```env
# Spotify API Credentials (from Developer Dashboard)
SPOTIFY_CLIENT_ID=your_client_id_here
SPOTIFY_CLIENT_SECRET=your_client_secret_here

# NextAuth Configuration
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000
```

Generate a secure `NEXTAUTH_SECRET`:

```bash
openssl rand -base64 32
```

### 4. Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (your Vercel app URL)
4. Update Spotify redirect URI with your Vercel URL

### Other Platforms

This app works on any platform that supports Next.js:
- Netlify
- Railway
- Render
- Self-hosted with Docker

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19
- **Language**: TypeScript 5
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS 4
- **Data Export**: PapaParse

## 📁 Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # NextAuth endpoints
│   │   ├── playlists/         # Playlist fetching
│   │   └── export/            # CSV export
│   ├── components/            # React components
│   └── page.tsx              # Main app page
├── lib/
│   ├── auth.ts               # Authentication config
│   ├── spotify.ts            # Spotify API wrapper
│   └── csv.ts                # CSV generation
└── types/
    └── spotify.ts            # TypeScript types
```

## 🔐 Security Features

- ✅ **No data storage** - All exports generated on-demand
- ✅ **Secure tokens** - Access tokens never exposed to client
- ✅ **OAuth 2.0** - Standard authentication flow
- ✅ **HTTPS only** - Secure connections in production
- ✅ **Environment variables** - Secrets stored securely

## 🎯 Use Cases

- **Backup** - Keep a backup of your Spotify playlists
- **Analytics** - Analyze your music taste and patterns
- **Migration** - Move playlists between platforms
- **Documentation** - Create records of playlist contents
- **Sharing** - Share playlist data in spreadsheet format

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Spotify Web API](https://developer.spotify.com/documentation/web-api)
- [NextAuth.js](https://next-auth.js.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## ⚠️ Disclaimer

This application is not affiliated with, endorsed by, or sponsored by Spotify. It uses the official Spotify Web API for all data access.

## 📧 Support

If you have any questions or issues, please open an issue on GitHub.

---

Made with ❤️ by the community
