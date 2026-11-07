import { useEffect, useState } from 'react'
import { CARS, pickRandom } from './cars'
import Confetti from './Confetti'

const PAIRS = 18
const isMatch = (a, b) => a.kind !== b.kind && a.car.name === b.car.name
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

// Every car appears at least once; extra slots repeat random cars.
// Each picture card gets exactly one matching name card.
const newDeck = () => {
  const cars = [...CARS, ...Array.from({ length: PAIRS - CARS.length }, () => pickRandom(CARS))]
  const cards = cars.flatMap((car, i) => [
    { key: `p${i}`, kind: 'picture', car, src: pickRandom(car.images) },
    { key: `n${i}`, kind: 'name', car },
  ])
  return shuffle(cards)
}

export default function Memory({ onExit }) {
  const [deck, setDeck] = useState(newDeck)
  const [open, setOpen] = useState([])
  const [matched, setMatched] = useState([])
  const [mistakes, setMistakes] = useState(0)

  const done = matched.length === PAIRS
  const isGone = (card) => matched.some((m) => m.keys.includes(card.key))

  useEffect(() => {
    if (open.length !== 2) return
    const [a, b] = open
    const ok = isMatch(a, b)
    const t = setTimeout(() => {
      if (ok) setMatched((m) => [...m, { keys: [a.key, b.key], car: a.car, src: (a.kind === 'picture' ? a : b).src }])
      else setMistakes((n) => n + 1)
      setOpen([])
    }, ok ? 700 : 1000)
    return () => clearTimeout(t)
  }, [open])

  const flip = (card) => {
    if (open.length >= 2 || open.some((c) => c.key === card.key) || isGone(card)) return
    setOpen([...open, card])
  }

  const restart = () => {
    setDeck(newDeck())
    setOpen([])
    setMatched([])
    setMistakes(0)
  }

  const pairOk = open.length === 2 && isMatch(open[0], open[1])
  const bad = open.length === 2 && !pairOk

  return (
    <div className="flex min-h-screen flex-col items-center gap-3 p-3">
      <div className="flex w-full max-w-2xl items-center justify-between">
        <button onClick={onExit} className="text-lg text-sky-700 underline">← Back</button>
        <span className="text-xl font-bold text-red-600">❌ {mistakes}</span>
        <span className="text-xl font-bold text-green-600">✅ {matched.length}/{PAIRS}</span>
      </div>
      {done && <Confetti />}
      {done && (
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="animate-pop text-3xl font-extrabold text-green-600 sm:text-4xl">🎉 You win! 🎉</p>
          <p className="text-xl font-bold sm:text-2xl">{mistakes === 0 ? 'Perfect, no mistakes! 🌟' : `Mistakes: ${mistakes}`}</p>
          <button onClick={restart} className="rounded-2xl bg-emerald-500 px-5 py-3 text-xl font-bold text-white shadow">Play again</button>
        </div>
      )}
      <div className="grid w-full max-w-2xl grid-cols-4 gap-1.5 sm:grid-cols-6 sm:gap-2">
        {deck.map((card) => {
          const gone = isGone(card)
          const up = open.some((c) => c.key === card.key)
          const state = gone ? 'invisible' : up && pairOk ? 'animate-match border-green-500 bg-green-200' : up && bad ? 'animate-shake border-red-500 bg-red-200' : up ? 'border-sky-400 bg-white' : 'border-sky-600 bg-sky-500'
          return (
            <button
              key={card.key}
              onClick={() => flip(card)}
              className={`flex aspect-square items-center justify-center overflow-hidden rounded-lg border-2 p-0.5 text-center text-[10px] font-bold leading-tight shadow sm:text-lg ${state}`}
            >
              {up ? (
                <span key="up" className="animate-flip flex h-full w-full items-center justify-center">
                  {card.kind === 'picture' ? <img src={card.src} alt="" className="h-full w-full rounded object-cover" /> : card.car.name}
                </span>
              ) : (
                <span className="text-xl text-white sm:text-3xl">?</span>
              )}
            </button>
          )
        })}
      </div>
      <p className="text-sm font-bold text-gray-500">Matched cars</p>
      <div className="grid w-full max-w-2xl grid-cols-6 gap-1 sm:grid-cols-9">
        {Array.from({ length: PAIRS }, (_, i) => {
          const m = matched[i]
          return (
            <div key={i} className="aspect-square overflow-hidden rounded-md border-2 border-dashed border-gray-300 bg-gray-100">
              {m && <img src={m.src} alt={m.car.name} className="animate-land h-full w-full object-cover" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
