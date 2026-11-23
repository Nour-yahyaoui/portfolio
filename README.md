# Nour Yahyaoui — Personal Showroom

A Next.js portfolio arranged as a small set of rooms rather than one long résumé page. The front door stays deliberately brief; visitors choose where to go next.

## Rooms

- **The Workshop** (`/work`) — a concise wall of 24 projects. Each project opens a case file with its goal, description, how it works, engineering decisions, facts, and skills/tools.
- **History** (`/history`) — 24 historical images and short, first-person retellings. The retellings are not presented as authentic quotations.
- **Art & Archive** (`/art`) — the same supplied historical image collection in a parchment-and-ink gallery.
- **Listening Room** (`/listening`) — eight favorite tracks transcribed from screenshots. No audio or MP3 files are hosted; track links open YouTube Music search.
- **Ideas** (`/ideas`) — a short list of philosophy and science interests, without an invented personal manifesto.

Old portfolio URLs redirect to the new showroom or its work room. Project descriptions and case-study data remain in `lib/projects.ts` and `lib/projectDetails.ts`.

## Development

```bash
npm ci
npm run dev
```

The development server can be exposed on all interfaces with:

```bash
npm run dev -- --hostname 0.0.0.0
```

## Validation

```bash
npm run lint
npm run build
```
