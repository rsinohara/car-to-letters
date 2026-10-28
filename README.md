# car-to-letters
A game to help my kid learn about letters through cars that he knows.

## Guess the Car

A small React + Tailwind game where a kid guesses which car it is.

- **See the car → pick the name**: a picture is shown, choose the written name.
- **Read the name → pick the car**: the name is spelled out in big letters, choose the picture.

Correct guesses trigger a celebration; wrong ones can be retried.

```
npm install
npm run dev     # development
npm run build   # production build (registers an offline service worker)
npm run preview # serve the built app on your local network
```

While your phone and computer are on the same Wi-Fi network, open the network URL
printed by Vite (or `http://<computer-local-IP>:4173`) on your phone.

### Adding cars and pictures

Add a line to `src/cars.js` (with the number of pictures) and put pictures named `1.jpg`, `2.jpg`, … in `public/cars/<id>/`. A random picture is chosen each round.
All car photos are bundled locally and cached by the service worker for offline play. See `public/cars/ATTRIBUTION.md` for photo credits and licenses.
