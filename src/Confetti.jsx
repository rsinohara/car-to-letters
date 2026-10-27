const EMOJI = ['🎉', '⭐', '🚗', '🎈', '✨', '🏆']

export default function Confetti() {
  return Array.from({ length: 30 }, (_, i) => (
    <span
      key={i}
      className="confetti text-3xl"
      style={{ left: `${(i * 37) % 100}%`, animationDelay: `${(i % 10) * 0.1}s` }}
    >
      {EMOJI[i % EMOJI.length]}
    </span>
  ))
}
