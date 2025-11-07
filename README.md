# Adios — Video Conferencing (WebRTC)

Simple WebRTC-based video conferencing demo using PeerJS and Socket.IO.

## Summary
A minimal demo that creates rooms (UUID-based) and connects peers for audio/video using PeerJS with Socket.IO for signaling/chat and an Express server that also hosts the Peer server.

## Features
- Create / join rooms by UUID
- Peer-to-peer audio & video via PeerJS
- Text chat powered by Socket.IO
- Mute / stop video controls
- EJS room template for simple UI

## Requirements
- Node.js (recommended 16+)
- npm
- Browser with WebRTC support (Chrome, Firefox, Edge)
- Camera / microphone permissions

## Quick start (local)
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```
   By default the app listens on port 3030 (see package.json / server.js). Open the app:
   ```sh
   "$BROWSER" http://localhost:3030
   ```
   Visiting the root generates and redirects to a room URL.

## Development notes
- PeerJS on the client connects to the server's Peer endpoint (path `/peerjs`). If you run HTTP on a non-standard port, ensure the Peer config in `public/script.js` uses the correct host/port (it may default to port 443).
- If camera/mic aren't visible, verify browser permissions and console logs.
- In a dev container, use the provided "$BROWSER" command to open the host's browser from the container environment.

## Configuration
- PORT: Express server port (default 3030 in server.js)
- Peer path: `/peerjs` (configured in server and client)
No other configuration is required for local testing.

## Project structure
- server.js — Express + Socket.IO + Peer server
- public/
  - script.js — client WebRTC + UI logic
  - style.css — styles
- views/
  - room.ejs — room template (injects ROOM_ID)
- package.json — scripts & dependencies
- .github/workflows/ — CI workflow
- plan.md — project plan

## Troubleshooting
- Blank video elements: check getUserMedia errors and permissions.
- Peer connection issues: confirm client peer config (host/port/path) matches server Peer server.
- If running behind HTTPS or a proxy, adjust PeerJS and Socket.IO client options accordingly.

## Contributing
Simple demo — open an issue or PR with improvements, bug fixes, or tests.

## License
See package.json for license details (MIT-style in this repository).