export const toRight = (cartas, setAnimatingL, setAnimatingR, setIndex) => {
    if (cartas?.length > 0) {
      setAnimatingL(false);
      setAnimatingR(true);
      setTimeout(
        () =>
          setIndex((prevIndex) =>
            prevIndex === cartas.length - 1 ? 0 : prevIndex + 1
          ),
        500
      );
      setTimeout(() => setAnimatingR(false), 500);
    }
  };