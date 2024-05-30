export const getRandomNumber = () => {
    const values = [100, 200, 300, 400, 500];
    const randomIndex = Math.floor(Math.random() * values.length);
    return values[randomIndex];
};