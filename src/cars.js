const angles = ['side', 'front', 'rear', 'three-quarter']

const make = (id, name) => ({
  id,
  name,
  images: angles.map((a) => `${import.meta.env.BASE_URL}cars/${id}/${a}.svg`),
})

// To add a car: add a line here and put its pictures in public/cars/<id>/
export const CARS = [make('t-cross', 'T-Cross'), make('toro', 'Toro')]

export const pickRandom = (list) => list[Math.floor(Math.random() * list.length)]
