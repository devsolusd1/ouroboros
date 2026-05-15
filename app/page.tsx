"use client";

import { useEffect, useRef, useState } from "react";

const CONTRACT = "6WR7Nm2Sa7boAyqERbTT6Cyk6UbVLJNTXrTetZDouro";
const TOTAL_SUPPLY = 1_000_000_000;
const RATE = 8_432_109; // $OURO per 1 SOL (cosmetic only)

type SwapPhase = "idle" | "connecting" | "ready" | "swapping" | "consumed";

export default function Page() {
  const [modalOpen, setModalOpen] = useState(false);
  const [phase, setPhase] = useState<SwapPhase>("idle");
  const [solAmount, setSolAmount] = useState("1.0");
  const [copied, setCopied] = useState(false);
  const [wallet, setWallet] = useState<string | null>(null);

  const ouroAmount = (() => {
    const n = parseFloat(solAmount);
    if (!isFinite(n) || n <= 0) return 0;
    return Math.floor(n * RATE);
  })();

  function openModal() {
    setModalOpen(true);
    setPhase("idle");
  }

  function closeModal() {
    setModalOpen(false);
    setTimeout(() => {
      setPhase("idle");
      setWallet(null);
    }, 250);
  }

  async function fakeConnect() {
    setPhase("connecting");
    await wait(900);
    const fake = randomWallet();
    setWallet(fake);
    setPhase("ready");
  }

  async function fakeSwap() {
    setPhase("swapping");
    await wait(1800);
    setPhase("consumed");
  }

  function copyContract() {
    navigator.clipboard?.writeText(CONTRACT).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Nav onAcquire={openModal} />

      <Hero onAcquire={openModal} contract={CONTRACT} copied={copied} onCopy={copyContract} />

      <Concept />

      <Feeding />

      <Tokenomics />

      <Roadmap />

      <Footer />

      {modalOpen && (
        <AcquireModal
          phase={phase}
          solAmount={solAmount}
          setSolAmount={setSolAmount}
          ouroAmount={ouroAmount}
          wallet={wallet}
          onClose={closeModal}
          onConnect={fakeConnect}
          onSwap={fakeSwap}
        />
      )}
    </main>
  );
}

/* ──────────────────────────────────────────────────────── components */

function Nav({ onAcquire }: { onAcquire: () => void }) {
  return (
    <nav className="sticky top-0 z-40 backdrop-blur-md bg-ink/70 border-b border-gold/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <img
            src="/ouroboros.svg"
            alt=""
            className="w-9 h-9 ouroboros-spin opacity-90 group-hover:opacity-100 transition"
          />
          <span className="font-display tracking-widest text-gold-bright text-lg">$OURO</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-mono uppercase tracking-widest text-parchment-dim">
          <a href="#concept" className="hover:text-gold-bright transition">Concept</a>
          <a href="#feeding" className="hover:text-gold-bright transition">Feeding</a>
          <a href="#tokenomics" className="hover:text-gold-bright transition">Tokenomics</a>
          <a href="#roadmap" className="hover:text-gold-bright transition">Roadmap</a>
        </div>
        <button
          onClick={onAcquire}
          className="font-mono text-xs uppercase tracking-widest px-4 py-2 border border-gold/40 text-gold-bright hover:bg-gold/10 hover:border-gold transition"
        >
          Acquire
        </button>
      </div>
    </nav>
  );
}

function Hero({
  onAcquire,
  contract,
  copied,
  onCopy,
}: {
  onAcquire: () => void;
  contract: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <section id="top" className="relative pt-24 pb-32 px-6">
      <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="relative gold-glow mb-12">
          <img
            src="/ouroboros.svg"
            alt="Ouroboros — the snake that eats its tail"
            className="ouroboros-spin w-[320px] h-[320px] md:w-[440px] md:h-[440px]"
          />
        </div>

        <div className="font-mono text-xs uppercase tracking-[0.4em] text-blood-bright mb-4">
          Solana · Genesis 0
        </div>

        <h1 className="font-display text-6xl md:text-8xl mb-6">$OURO</h1>

        <p className="font-display italic text-2xl md:text-3xl text-parchment max-w-2xl mb-3">
          The serpent that consumes itself.
        </p>
        <p className="text-parchment-dim max-w-xl mb-10">
          Ouroboros — eternal return on the Solana chain. The token whose only function is to
          remind you of its own function.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
          <button
            onClick={onAcquire}
            className="font-display tracking-widest uppercase text-sm px-8 py-4 bg-gold text-ink hover:bg-gold-bright transition shadow-[0_0_30px_rgba(201,169,97,0.3)]"
          >
            Acquire $OURO
          </button>
          <a
            href="#concept"
            className="font-mono uppercase tracking-widest text-xs text-parchment-dim hover:text-gold-bright transition"
          >
            Read the cycle ↓
          </a>
        </div>

        <button
          onClick={onCopy}
          className="font-mono text-xs text-parchment-dim hover:text-gold-bright transition flex items-center gap-2 border border-gold/20 px-4 py-2 max-w-full"
          title="Copy contract address"
        >
          <span className="text-blood-bright">CA:</span>
          <span className="truncate max-w-[300px] md:max-w-none">{contract}</span>
          <span className="text-gold">{copied ? "✓ copied" : "copy"}</span>
        </button>
      </div>
    </section>
  );
}

function Concept() {
  return (
    <section id="concept" className="py-24 px-6 border-t border-gold/10">
      <div className="max-w-3xl mx-auto">
        <div className="divider mb-12 font-mono text-xs uppercase tracking-[0.4em]">
          The Concept
        </div>
        <blockquote className="font-display italic text-3xl md:text-4xl text-gold-bright leading-snug mb-8">
          “Eat thyself.<br />Be reborn.<br />Repeat until enlightenment.”
        </blockquote>
        <div className="space-y-5 text-parchment text-lg">
          <p>
            The ouroboros is older than money. Older than language. A snake biting its own tail,
            etched into the walls of tombs and the margins of alchemical manuscripts. It says one
            thing: <em>the end is the beginning</em>.
          </p>
          <p>
            $OURO is the asset that proves you understood the cycle. It does not go anywhere. It
            returns. Every transaction feeds the tail. Every holder is a vertebra in the ring.
          </p>
          <p className="text-parchment-dim">
            There is no whitepaper. There is only the loop.
          </p>
        </div>
      </div>
    </section>
  );
}

function Feeding() {
  const meals = [
    { ticker: "$BONK", amount: "1,247,891,231", when: "2h ago" },
    { ticker: "$WIF", amount: "18,432", when: "5h ago" },
    { ticker: "$POPCAT", amount: "84,123", when: "11h ago" },
    { ticker: "$MEW", amount: "2,847,123", when: "1d ago" },
    { ticker: "$FARTCOIN", amount: "412,847", when: "1d ago" },
    { ticker: "$PNUT", amount: "91,234", when: "2d ago" },
  ];

  return (
    <section id="feeding" className="py-24 px-6 border-t border-gold/10">
      <div className="max-w-5xl mx-auto">
        <div className="divider mb-12 font-mono text-xs uppercase tracking-[0.4em]">
          The Feeding
        </div>

        <blockquote className="font-display italic text-2xl md:text-3xl text-gold-bright leading-snug mb-10 max-w-3xl">
          “The serpent does not feed alone. It hunts its kin. Every tax becomes another
          memecoin — bought from the market, dragged into the ring, and burned. The ouroboros
          consumes the herd.”
        </blockquote>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <Box label="Memecoins consumed" value="47" suffix="and counting" />
          <Box label="Burned (USD eq.)" value="$12,847" suffix="returned to ash" />
          <Box label="Last meal" value="$BONK" suffix="2h ago · 1.2B tokens" />
        </div>

        <div className="border border-gold/15">
          <div className="px-5 py-3 border-b border-gold/15 flex items-center justify-between bg-ink/40">
            <span className="font-mono text-[10px] uppercase tracking-widest text-parchment-dim">
              Recent meals
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-blood-bright">
              ◉ live (simulated)
            </span>
          </div>
          <div>
            {meals.map((m, i) => (
              <div
                key={m.ticker + i}
                className="px-5 py-3 grid grid-cols-[1fr_auto_auto] gap-4 items-baseline border-b border-gold/5 last:border-b-0 hover:bg-gold/5 transition"
              >
                <span className="font-display text-gold-bright tracking-wider">{m.ticker}</span>
                <span className="font-mono text-sm text-parchment">{m.amount}</span>
                <span className="font-mono text-xs text-parchment-dim uppercase tracking-widest">
                  {m.when}
                </span>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-gold/15 bg-ink/40 text-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-parchment-dim">
              All burned to 1nc1nerator11111111111111111111111111111111 · forever
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Box({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="border border-gold/20 p-5 bg-ink/30">
      <div className="font-mono text-[10px] uppercase tracking-widest text-parchment-dim mb-2">
        {label}
      </div>
      <div className="font-display text-3xl text-gold-bright mb-1">{value}</div>
      {suffix && <div className="font-mono text-[10px] text-parchment-dim uppercase tracking-widest">{suffix}</div>}
    </div>
  );
}

function Tokenomics() {
  const allocations = [
    { label: "Liquidity (locked)", pct: 92, color: "var(--color-gold)" },
    { label: "Treasury", pct: 5, color: "var(--color-blood-bright)" },
    { label: "Mythology / Sigils", pct: 3, color: "var(--color-parchment-dim)" },
  ];

  return (
    <section id="tokenomics" className="py-24 px-6 border-t border-gold/10 bg-smoke/30">
      <div className="max-w-5xl mx-auto">
        <div className="divider mb-12 font-mono text-xs uppercase tracking-[0.4em]">
          Tokenomics
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Stat label="Total Supply" value={TOTAL_SUPPLY.toLocaleString()} suffix="$OURO" />
            <Stat label="Tax (buy / sell)" value="10% / 10%" suffix="buys & burns other memecoins" />
            <Stat label="LP" value="Locked forever" suffix="renounced ownership" />
            <Stat label="Team allocation" value="0%" suffix="no presale, no team wallet" />
          </div>

          <div className="flex flex-col items-center">
            <div className="relative w-64 h-64 mb-6">
              <RingChart allocations={allocations} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="font-mono text-xs uppercase tracking-widest text-parchment-dim">
                  Supply
                </div>
                <div className="font-display text-2xl text-gold-bright">1B</div>
                <div className="font-mono text-xs text-parchment-dim">$OURO</div>
              </div>
            </div>
            <div className="space-y-2 w-full max-w-xs">
              {allocations.map((a) => (
                <div key={a.label} className="flex items-center gap-3 text-sm">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ background: a.color }}
                  />
                  <span className="flex-1 text-parchment">{a.label}</span>
                  <span className="font-mono text-gold-bright">{a.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-parchment-dim italic font-display text-xl max-w-2xl mx-auto">
          “10% of every transaction hunts. The serpent buys the meat of other memecoins from the
          market — and burns it. The ring grows by what it devours.”
        </p>
      </div>
    </section>
  );
}

function Stat({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div className="border-l-2 border-gold/30 pl-5 mb-7">
      <div className="font-mono text-xs uppercase tracking-widest text-parchment-dim mb-1">
        {label}
      </div>
      <div className="font-display text-3xl text-gold-bright">{value}</div>
      {suffix && <div className="text-sm text-parchment-dim mt-1">{suffix}</div>}
    </div>
  );
}

function RingChart({
  allocations,
}: {
  allocations: { label: string; pct: number; color: string }[];
}) {
  const C = 2 * Math.PI * 80;
  let offset = 0;
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
      <circle cx="100" cy="100" r="80" stroke="rgba(232,217,176,0.06)" strokeWidth="22" fill="none" />
      {allocations.map((a, i) => {
        const len = (a.pct / 100) * C;
        const el = (
          <circle
            key={i}
            cx="100"
            cy="100"
            r="80"
            stroke={a.color}
            strokeWidth="22"
            fill="none"
            strokeDasharray={`${len} ${C - len}`}
            strokeDashoffset={-offset}
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

function Roadmap() {
  const phases = [
    {
      roman: "I",
      name: "Nigredo",
      sub: "Putrefaction",
      color: "text-parchment-dim",
      body:
        "Genesis. Contract deployed. Liquidity seeded. The shadow phase. The work begins in darkness.",
      done: true,
    },
    {
      roman: "II",
      name: "Albedo",
      sub: "Purification",
      color: "text-parchment",
      body:
        "LP renounced and locked forever. Audit signed by independent oracles. The white work. Pure form revealed.",
      done: true,
    },
    {
      roman: "III",
      name: "Citrinitas",
      sub: "Awakening",
      color: "text-gold",
      body:
        "Listings on CoinGecko and CoinMarketCap. Community sigils distributed. The yellow light. The dawn.",
      done: false,
    },
    {
      roman: "IV",
      name: "Rubedo",
      sub: "Completion",
      color: "text-blood-bright",
      body:
        "CEX listings. Mythology realized. The red work. Stone of the philosophers. The ring closes.",
      done: false,
    },
  ];

  return (
    <section id="roadmap" className="py-24 px-6 border-t border-gold/10">
      <div className="max-w-4xl mx-auto">
        <div className="divider mb-12 font-mono text-xs uppercase tracking-[0.4em]">
          The Alchemical Work
        </div>

        <div className="space-y-2">
          {phases.map((p, i) => (
            <div
              key={p.roman}
              className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_180px_1fr] gap-4 md:gap-8 items-baseline py-6 border-b border-gold/10"
            >
              <div className={`font-display text-5xl md:text-6xl ${p.color} opacity-80`}>
                {p.roman}
              </div>
              <div>
                <div className={`font-display text-2xl ${p.color} uppercase tracking-wider`}>
                  {p.name}
                </div>
                <div className="font-mono text-xs uppercase tracking-widest text-parchment-dim mt-1">
                  {p.sub}
                </div>
                <div className="font-mono text-xs mt-2">
                  {p.done ? (
                    <span className="text-gold">◆ complete</span>
                  ) : (
                    <span className="text-blood-bright">○ in progress</span>
                  )}
                </div>
              </div>
              <p className="col-span-2 md:col-span-1 text-parchment-dim leading-relaxed">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-gold/10">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-8">
        <img src="/ouroboros.svg" alt="" className="w-20 h-20 ouroboros-spin opacity-60" />
        <p className="font-display italic text-center text-parchment-dim max-w-xl text-sm">
          $OURO is a simulation. Nothing here is financial advice. No tokens are bought, sold, or
          transferred. The cycle is the message.
        </p>
        <div className="font-mono text-[10px] uppercase tracking-widest text-parchment-dim/60">
          Anno {new Date().getFullYear()} · Solanvm · The work continues
        </div>
      </div>
    </footer>
  );
}

/* ──────────────────────────────────────────────────────── modal */

function AcquireModal({
  phase,
  solAmount,
  setSolAmount,
  ouroAmount,
  wallet,
  onClose,
  onConnect,
  onSwap,
}: {
  phase: SwapPhase;
  solAmount: string;
  setSolAmount: (v: string) => void;
  ouroAmount: number;
  wallet: string | null;
  onClose: () => void;
  onConnect: () => void;
  onSwap: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-ink/80 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-md bg-smoke border border-gold/30 shadow-[0_0_60px_rgba(201,169,97,0.15)] p-8"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-4 text-parchment-dim hover:text-gold-bright text-2xl leading-none"
        >
          ×
        </button>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gold/15">
          <img src="/ouroboros.svg" alt="" className="w-10 h-10 ouroboros-spin" />
          <div>
            <div className="font-display text-xl text-gold-bright tracking-widest">
              Acquire $OURO
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-parchment-dim">
              Solana · simulation
            </div>
          </div>
        </div>

        {phase === "idle" && (
          <div className="text-center py-4">
            <p className="text-parchment mb-6 font-display italic text-lg">
              To enter the ring, the wallet must first be known.
            </p>
            <button
              onClick={onConnect}
              className="w-full font-display tracking-widest uppercase text-sm px-6 py-4 bg-gold text-ink hover:bg-gold-bright transition"
            >
              Connect Wallet
            </button>
            <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] font-mono uppercase tracking-widest text-parchment-dim">
              <div className="border border-gold/15 py-2">Phantom</div>
              <div className="border border-gold/15 py-2">Solflare</div>
              <div className="border border-gold/15 py-2">Backpack</div>
            </div>
          </div>
        )}

        {phase === "connecting" && <Spinner label="Summoning wallet" />}

        {(phase === "ready" || phase === "swapping") && (
          <div className="space-y-4">
            <WalletPill wallet={wallet} />

            <div className="border border-gold/20 p-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-parchment-dim mb-2">
                You give
              </div>
              <div className="flex items-baseline gap-3">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  value={solAmount}
                  onChange={(e) => setSolAmount(e.target.value)}
                  disabled={phase === "swapping"}
                  className="bg-transparent flex-1 outline-none font-display text-3xl text-parchment focus:text-gold-bright disabled:opacity-50"
                />
                <span className="font-mono text-sm text-gold">SOL</span>
              </div>
            </div>

            <div className="text-center text-gold/60 text-xl">⇂</div>

            <div className="border border-gold/20 p-4">
              <div className="font-mono text-[10px] uppercase tracking-widest text-parchment-dim mb-2">
                You receive (est.)
              </div>
              <div className="flex items-baseline gap-3">
                <div className="flex-1 font-display text-3xl text-gold-bright truncate">
                  {ouroAmount.toLocaleString()}
                </div>
                <span className="font-mono text-sm text-gold">$OURO</span>
              </div>
            </div>

            <button
              onClick={onSwap}
              disabled={phase === "swapping" || ouroAmount <= 0}
              className="w-full font-display tracking-widest uppercase text-sm px-6 py-4 bg-blood text-parchment hover:bg-blood-bright transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {phase === "swapping" ? "Consuming…" : "Feed the Snake"}
            </button>

            <div className="font-mono text-[10px] text-center text-parchment-dim/60 uppercase tracking-widest">
              Slippage 1% · Route: SOL → $OURO via the eternal pool
            </div>
          </div>
        )}

        {phase === "consumed" && <Consumed ouroAmount={ouroAmount} onClose={onClose} />}
      </div>
    </div>
  );
}

function Spinner({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center py-10 gap-4">
      <img src="/ouroboros.svg" alt="" className="w-20 h-20 ouroboros-spin gold-glow" style={{ animationDuration: "3s" } as React.CSSProperties} />
      <div className="font-mono text-xs uppercase tracking-widest text-parchment-dim">
        {label}…
      </div>
    </div>
  );
}

function WalletPill({ wallet }: { wallet: string | null }) {
  if (!wallet) return null;
  return (
    <div className="flex items-center justify-between border border-gold/20 px-3 py-2 font-mono text-xs">
      <span className="text-parchment-dim uppercase tracking-widest">Wallet</span>
      <span className="text-gold-bright">{wallet}</span>
    </div>
  );
}

function Consumed({ ouroAmount, onClose }: { ouroAmount: number; onClose: () => void }) {
  return (
    <div className="text-center py-6">
      <img
        src="/ouroboros.svg"
        alt=""
        className="w-28 h-28 mx-auto gold-glow"
        style={{ animationDuration: "2s" } as React.CSSProperties}
      />
      <div className="font-mono text-[10px] uppercase tracking-widest text-gold mt-6 mb-2">
        Transaction confirmed
      </div>
      <div className="font-display text-2xl text-gold-bright mb-2">
        You have consumed
      </div>
      <div className="font-display text-4xl text-parchment mb-4">
        {ouroAmount.toLocaleString()} <span className="text-gold">$OURO</span>
      </div>
      <p className="font-display italic text-parchment-dim mb-6 max-w-xs mx-auto">
        The cycle continues. The tail is fed. You are now a vertebra in the ring.
      </p>
      <div className="font-mono text-[10px] text-parchment-dim/60 mb-6">
        tx: 5{randomHex(86)}
      </div>
      <button
        onClick={onClose}
        className="font-display tracking-widest uppercase text-sm px-8 py-3 border border-gold/40 text-gold-bright hover:bg-gold/10 transition"
      >
        Return to the ring
      </button>
    </div>
  );
}

/* ──────────────────────────────────────────────────────── helpers */

function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

function randomWallet() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789";
  let s = "";
  for (let i = 0; i < 4; i++) s += chars[Math.floor(Math.random() * chars.length)];
  let t = "";
  for (let i = 0; i < 4; i++) t += chars[Math.floor(Math.random() * chars.length)];
  return `${s}…${t}`;
}

function randomHex(n: number) {
  const chars = "0123456789abcdef";
  let s = "";
  for (let i = 0; i < n; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return s;
}
