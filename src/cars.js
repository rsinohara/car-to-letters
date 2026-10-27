// Pictures are numbered 1.jpg .. <count>.jpg in public/cars/<id>/
const make = (id, name, count) => ({
  id,
  name,
  images: Array.from({ length: count }, (_, i) => `${import.meta.env.BASE_URL}cars/${id}/${i + 1}.jpg`),
})

// To add a car: add a line here and put numbered photos in public/cars/<id>/.
export const CARS = [
  make('t-cross', 'T-Cross', 4),
  make('toro', 'Toro', 4),
  make('citroen-jumpy', 'Jumpy', 1),
  make('fiat-doblo', 'Doblò', 1),
  make('renault-captur', 'Captur', 1),
  make('honda-hr-v', 'HR-V', 1),
  make('honda-wr-v', 'WR-V', 1),
  make('nissan-kicks', 'Kicks', 1),
  make('fiat-strada', 'Strada', 1),
  make('byd-dolphin', 'BYD', 1),
  make('byd-song-plus', 'BYD', 1),
  make('byd-atto-3', 'BYD', 1),
  make('fusca', 'Fusca', 1),
  make('suzuki-grand-vitara', 'Grand Vitara', 1),
]

export const pickRandom = (list) => list[Math.floor(Math.random() * list.length)]
