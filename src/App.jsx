import { useEffect, useState } from 'react'
import { CARS, pickRandom } from './cars'
import Confetti from './Confetti'

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

const newRound = () => {
  const car = pickRandom(CARS)
  const others = [...new Map(CARS.filter((c) => c.name !== car.name).map((c) => [c.name, c])).values()]
  const choices = shuffle([car, ...shuffle(others).slice(0, 2)])
  return {
    car,
    image: pickRandom(car.images),
    choices,
    pictures: Object.fromEntries(choices.map((c) => [c.id, pickRandom(c.images)])),
  }
}

const NEXT_DELAY_MS = 2500

function Game({ mode, onExit }) {
  const [round, setRound] = useState(newRound)
  const [won, setWon] = useState(false)
  const [wrong, setWrong] = useState(null)
  const { choices, pictures } = round

  useEffect(() => {
    if (!won) return
    const t = setTimeout(() => {
      setRound(newRound())
      setWon(false)
      setWrong(null)
    }, NEXT_DELAY_MS)
    return () => clearTimeout(t)
  }, [won])

  const guess = (id) => {
    if (won) return
    const selectedCar = CARS.find((car) => car.id === id)
    if (selectedCar?.name === round.car.name) {
      setWon(true)
      setWrong(null)
    } else {
      setWrong({ id, n: Date.now() })
    }
  }

  const shake = (id) => (wrong?.id === id ? 'animate-shake bg-red-200' : '')

  return (
    <div className="flex min-h-screen flex-col items-center gap-6 p-4">
      <button onClick={onExit} className="self-start text-lg text-sky-700 underline">← Back</button>
      {won && <Confetti />}
      {mode === 'name' ? (
        <img src={round.image} alt="Which car is this?" className="w-full max-w-md rounded-2xl shadow-lg" />
      ) : (
        <div className="flex flex-wrap justify-center gap-2 text-6xl font-extrabold tracking-widest text-sky-800">
          {[...round.car.name.toUpperCase()].map((ch, i) => (
            <span key={i} className="rounded-xl bg-yellow-200 px-3 py-2 shadow">{ch}</span>
          ))}
        </div>
      )}
      <div className="flex w-full max-w-3xl flex-wrap justify-center gap-4">
        {choices.map((car) => (
          <button
            key={`${car.id}-${wrong?.n ?? 0}`}
            onClick={() => guess(car.id)}
            className={`rounded-2xl border-4 bg-white p-3 text-3xl font-bold shadow transition hover:scale-105 ${
              won && car.name === round.car.name ? 'animate-pop border-green-500 bg-green-200' : 'border-sky-300'
            } ${shake(car.id)}`}
          >
            {mode === 'name' ? car.name : <img src={pictures[car.id]} alt="" className="w-64 rounded-xl" />}
          </button>
        ))}
      </div>
      {wrong && !won && <p className="text-3xl">Try again! 💪</p>}
      {won && (
        <div className="flex flex-col items-center gap-3">
          <p className="animate-pop text-5xl font-extrabold text-green-600">🎉 You win! 🎉</p>
        </div>
      )}
    </div>
  )
}

function Audit({ onExit }) {
  return (
    <div className="flex min-h-screen flex-col gap-6 p-4">
      <button onClick={onExit} className="self-start text-lg text-sky-700 underline">← Back</button>
      {CARS.map((car) => (
        <section key={car.id}>
          <h2 className="text-xl font-bold text-sky-800">{car.name} <span className="font-mono text-sm text-gray-500">({car.id})</span></h2>
          <div className="flex flex-wrap gap-2">
            {car.images.map((src) => (
              <img key={src} src={src} alt={`${car.name} ${src}`} title={src} className="h-40 rounded-lg shadow" />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

export default function App() {
  const [mode, setMode] = useState(() => (new URLSearchParams(location.search).has('audit') ? 'audit' : null))
  const [taps, setTaps] = useState(0)
  if (mode === 'audit') return <Audit onExit={() => setMode(null)} />
  if (mode) return <Game mode={mode} onExit={() => setMode(null)} />
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <h1
        onClick={() => (taps + 1 >= 5 ? (setTaps(0), setMode('audit')) : setTaps(taps + 1))}
        className="text-5xl font-extrabold text-sky-800"
      >🚗 Guess the Car!</h1>
      <button onClick={() => setMode('name')} className="w-72 rounded-2xl bg-sky-500 px-6 py-5 text-2xl font-bold text-white shadow">
        🖼️ See the car → pick the name
      </button>
      <button onClick={() => setMode('picture')} className="w-72 rounded-2xl bg-orange-500 px-6 py-5 text-2xl font-bold text-white shadow">
        🔤 Read the name → pick the car
      </button>
    </div>
  )
}
