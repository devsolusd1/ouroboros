# $OURO — Ouroboros

Simulated meme-coin landing page on Solana. **No real transactions.** The "Acquire" flow is a UI simulation only — it does not connect to wallets, does not call any chain, and does not move any value.

## Concept

A site themed after the ouroboros — the snake that consumes itself. Visual language is alchemical / vintage engraving. The roadmap is presented as the four phases of the magnum opus (Nigredo, Albedo, Citrinitas, Rubedo).

## Run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- TypeScript

## Replace the artwork

`public/ouroboros.svg` is a stylized placeholder. To use a different image (e.g. a real engraving), drop it into `public/` and update the `src` references in `app/page.tsx` and `app/layout.tsx`.
