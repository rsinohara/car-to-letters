// Pictures are numbered 1.jpg .. <count>.jpg in public/cars/<id>/
const make = (id, name, count) => ({
  id,
  name,
  images: Array.from({ length: count }, (_, i) => `${import.meta.env.BASE_URL}cars/${id}/${i + 1}.jpg`),
})

// To add a car: add a line here (with its picture count) and put its pictures in public/cars/<id>/
export const CARS = [make('t-cross', 'T-Cross', 4), make('toro', 'Toro', 4)]

export const pickRandom = (list) => list[Math.floor(Math.random() * list.length)]
