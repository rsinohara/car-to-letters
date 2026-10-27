// Pictures are numbered 1.jpg .. <count>.jpg in public/cars/<id>/
const make = (id, name, count) => ({
  id,
  name,
  images: Array.from({ length: count }, (_, i) => `${import.meta.env.BASE_URL}cars/${id}/${i + 1}.jpg`),
})

// To add a car: add a line here and put numbered photos in public/cars/<id>/.
export const CARS = [
  make('t-cross', 'T-Cross', 5),
  make('toro', 'Toro', 6),
  make('citroen-jumpy', 'Jumpy', 5),
  make('fiat-doblo', 'Doblò', 5),
  make('renault-captur', 'Captur', 5),
  make('honda-hr-v', 'HR-V', 5),
  make('honda-wr-v', 'WR-V', 5),
  make('nissan-kicks', 'Kicks', 5),
  make('fiat-strada', 'Strada', 5),
  make('byd-dolphin', 'BYD', 5),
  make('byd-song-plus', 'BYD', 5),
  make('byd-atto-3', 'BYD', 5),
  make('fusca', 'Fusca', 5),
  make('suzuki-grand-vitara', 'Grand Vitara', 5),
]

export const pickRandom = (list) => list[Math.floor(Math.random() * list.length)]
