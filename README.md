# on-record-api

Currently under construction, this will be the repository for the back end of OnRecord

[Trello Board](https://trello.com/b/9bs0gD9A/on-record)

## Setup

To set up this Node.js API project (which appears to be an Express.js backend for "OnRecord" with Spotify integration), you'll need to follow these steps. This assumes you have Node.js (version 14+ recommended) and npm installed. If not, install them via your system's package manager or from the official website.

### Prerequisites
- **Node.js**: Version 14 or higher. Check with `node --version`.
- **npm**: Comes with Node.js. Check with `npm --version`.
- **Docker** (optional, for containerized setup): Install Docker for your OS.
- **Spotify Developer Account**: You'll need API credentials (client ID and secret) from the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard). Create an app there to get these.

### Setup Steps
1. **Install dependencies**:
   - Run `npm install` to install all packages listed in `package.json` (e.g., Express, CORS, dotenv, Jest, Nodemon).

2. **Set up environment variables**:
   - Create a `.env` file in the root directory (same level as `package.json`).
   - Add the following content (replace with your actual Spotify credentials):
     ```
     SPOTIFY_CLIENT_ID=your_spotify_client_id_here
     SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
     ```
   - This file is used by the Spotify handler for API authentication and is copied into the Docker container if using that method.

3. **Run the application** (choose one method):
   - **Local development**:
     - Run `npm start` to start the server with Nodemon (auto-restarts on changes). It will listen on `http://localhost:3000`.
     - The API has endpoints like `/searchAlbums/:searchText` and `/album/:albumID` for Spotify album searches and details.
   - **Using Docker** (recommended for isolation):
     - Run `docker-compose up --build` to build and start the container. It maps port 9000 on your host to 3000 inside the container, so access at `http://localhost:9000`.
     - The Dockerfile installs dependencies and copies your `.env` file.

4. **Run tests** (optional, to verify setup):
   - Run `npm test` to execute Jest tests (there's a test file for the Spotify handler).

5. **Additional notes**:
   - The project uses Express.js for the server, with CORS enabled.
   - If you encounter issues (e.g., Spotify API errors), ensure your credentials are correct and your Spotify app is configured properly (e.g., redirect URIs if needed, though this code seems to use client credentials flow).
   - No database is visible in the code, so it might be a stateless API relying on Spotify's API.
   - Check the [Trello board](https://trello.com/b/9bs0gD9A/on-record) mentioned in the README for project status or tasks.
