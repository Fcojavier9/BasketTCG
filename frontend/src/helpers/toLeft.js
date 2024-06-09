export const toLeft = (cartas, setAnimatingL, setAnimatingR, setIndex) => {
  if (cartas?.length > 0) {
    setAnimatingR(false);
    setAnimatingL(true);
    setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === 0 ? cartas.length - 1 : prevIndex - 1
        ),
      500
    );
    setTimeout(() => setAnimatingL(false), 500);
  }
};
