"use client";
import { useEffect, useState } from "react";
import { Volume2 } from "lucide-react";

const shuffle = (a) => [...a].sort(() => Math.random() - 0.5);
const rand = (n) => 1 + Math.floor(Math.random() * n);
const speak = (text) => {
  try { const u = new SpeechSynthesisUtterance(text); u.rate = 0.85; window.speechSynthesis.cancel(); window.speechSynthesis.speak(u); } catch {}
};

const ABC = [["A","Apple","🍎"],["B","Ball","⚽"],["C","Cat","🐱"],["D","Dog","🐶"],["E","Elephant","🐘"],["F","Fish","🐟"],["G","Goat","🐐"],["H","Hen","🐔"],["I","Ice cream","🍦"],["J","Jollof rice","🍛"],["K","Kite","🪁"],["L","Lion","🦁"],["M","Mango","🥭"],["N","Nose","👃"],["O","Orange","🍊"],["P","Pineapple","🍍"],["Q","Queen","👑"],["R","Rabbit","🐰"],["S","Sun","☀️"],["T","Tree","🌳"],["U","Umbrella","☂️"],["V","Violin","🎻"],["W","Watch","⌚"],["X","X-ray","🩻"],["Y","Yam","🍠"],["Z","Zebra","🦓"]];

function Flashcards() {
  const [i, setI] = useState(0);
  const [letter, word, icon] = ABC[i];
  return (
    <div className="play-card">
      <p className="eyebrow">Alphabet flashcards · {i + 1} of 26</p>
      <div className="flash-icon" aria-hidden="true">{icon}</div>
      <p className="flash-text serif"><span>{letter}</span> is for {word}</p>
      <div className="actions center-row">
        <button className="btn btn-outline-dark" onClick={() => setI((i + 25) % 26)}>Back</button>
        <button className="btn btn-outline-dark" onClick={() => speak(`${letter} is for ${word}`)}><Volume2 size={18} aria-hidden="true" />&nbsp;Hear it</button>
        <button className="btn btn-navy" onClick={() => setI((i + 1) % 26)}>Next</button>
      </div>
    </div>
  );
}

const ICONS = ["🍎", "⭐", "🐟", "🌳", "🎈", "🐥"];
function Counting() {
  const [round, setRound] = useState(null);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState({ right: 0, total: 0 });
  const next = () => {
    const n = rand(10); const opts = new Set([n]);
    while (opts.size < 4) opts.add(rand(10));
    setRound({ n, icon: ICONS[Math.floor(Math.random() * ICONS.length)], opts: shuffle([...opts]) }); setPicked(null);
  };
  useEffect(next, []);
  if (!round) return <div className="play-card" />;
  const choose = (o) => {
    if (picked) return;
    setPicked(o); setScore((s) => ({ right: s.right + (o === round.n ? 1 : 0), total: s.total + 1 }));
  };
  return (
    <div className="play-card">
      <p className="eyebrow">Counting game · Score {score.right} / {score.total}</p>
      <p className="serif flash-text">How many can you count?</p>
      <div className="count-icons" role="img" aria-label={`${round.n} objects`}>{Array.from({ length: round.n }, (_, k) => <span key={k}>{round.icon}</span>)}</div>
      <div className="choices">
        {round.opts.map((o) => (
          <button key={o} onClick={() => choose(o)} className={`choice serif ${picked ? (o === round.n ? "right" : o === picked ? "wrong" : "") : ""}`}>{o}</button>
        ))}
      </div>
      {picked && <p className="explain" aria-live="polite"><strong>{picked === round.n ? "Well done!" : `Not quite. There are ${round.n}.`}</strong></p>}
      <button className="btn btn-navy" onClick={next} disabled={!picked}>Next</button>
    </div>
  );
}

const PAIRS = ["🍎", "🐶", "🐱", "🐘", "🦁", "🐟", "🌳", "☀️"];
const deck = () => PAIRS.flatMap((icon, i) => [{ k: i * 2, icon }, { k: i * 2 + 1, icon }]);
function Memory() {
  const [cards, setCards] = useState(deck);
  const [open, setOpen] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  useEffect(() => setCards((c) => shuffle(c)), []);
  const reset = () => { setCards(shuffle(deck())); setOpen([]); setMatched([]); setMoves(0); };
  const flip = (k) => {
    if (open.length === 2 || open.includes(k) || matched.includes(k)) return;
    const next = [...open, k]; setOpen(next);
    if (next.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = next.map((x) => cards.find((c) => c.k === x));
      if (a.icon === b.icon) { setMatched((m) => [...m, ...next]); setOpen([]); }
      else setTimeout(() => setOpen([]), 800);
    }
  };
  const won = matched.length === cards.length;
  return (
    <div className="play-card">
      <p className="eyebrow">Memory match · Moves {moves}</p>
      <div className="memory">
        {cards.map((c) => {
          const show = open.includes(c.k) || matched.includes(c.k);
          return <button key={c.k} className={`mem ${show ? "up" : ""}`} onClick={() => flip(c.k)} aria-label={show ? c.icon : "Hidden card"}>{show ? c.icon : "?"}</button>;
        })}
      </div>
      {won && <p className="explain" aria-live="polite"><strong>You found every pair in {moves} moves. Well done!</strong></p>}
      <button className="btn btn-navy" onClick={reset}>New game</button>
    </div>
  );
}

const PLANETS = [
  ["Mercury", "#9a8f86", 22, "Mercury is the closest planet to the Sun and the smallest planet."],
  ["Venus", "#d9b26f", 30, "Venus is the hottest planet in our solar system."],
  ["Earth", "#2f6fb5", 32, "Earth is our home, the only planet known to have life."],
  ["Mars", "#b5513a", 26, "Mars is called the Red Planet."],
  ["Jupiter", "#c9a27a", 64, "Jupiter is the largest planet in our solar system."],
  ["Saturn", "#d8c08a", 56, "Saturn is famous for its bright rings."],
  ["Uranus", "#8fc9cf", 42, "Uranus spins on its side."],
  ["Neptune", "#3d5fb0", 42, "Neptune is the farthest planet from the Sun."],
];
function SolarSystem() {
  const [sel, setSel] = useState(2);
  const [name, , , fact] = PLANETS[sel];
  return (
    <div className="play-card">
      <p className="eyebrow">Explore the solar system · Tap a planet</p>
      <div className="space" role="group" aria-label="Planets in order from the Sun">
        <span className="sun" aria-hidden="true" />
        {PLANETS.map(([n, color, size], i) => (
          <button key={n} aria-label={n} aria-pressed={sel === i} onClick={() => setSel(i)}
            className={`planet ${sel === i ? "on" : ""}`} style={{ background: color, width: size, height: size }} />
        ))}
      </div>
      <p className="serif flash-text">{name} <small>(planet {sel + 1} from the Sun)</small></p>
      <p>{fact}</p>
      <button className="btn btn-outline-dark" onClick={() => speak(`${name}. ${fact}`)}><Volume2 size={18} aria-hidden="true" />&nbsp;Hear it</button>
      <p className="hint">Sizes and distances are not to scale.</p>
    </div>
  );
}

const TABS = [["Alphabet", Flashcards], ["Counting", Counting], ["Memory", Memory], ["Solar System", SolarSystem]];
export default function PlayLearn() {
  const [tab, setTab] = useState(0);
  const Active = TABS[tab][1];
  return (
    <div>
      <div className="tabs" role="group" aria-label="Activities">
        {TABS.map(([label], i) => <button key={label} className={tab === i ? "on" : ""} aria-pressed={tab === i} onClick={() => setTab(i)}>{label}</button>)}
      </div>
      <Active />
    </div>
  );
}
