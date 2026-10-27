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
```

### Adding cars and pictures

Add a line to `src/cars.js` (with the number of pictures) and put pictures named `1.jpg`, `2.jpg`, … in `public/cars/<id>/`. A random picture is chosen each round.
The bundled pictures are simple placeholder illustrations; replace them with real photos
(keep the numbered file names and update the count, or edit the extension in `src/cars.js`). All images are local and cached by the service worker for offline play.
