export function randomInteger(min: number, max: number) {
    const randomInt = Math.floor((Math.random() * (max - min)) + min)
    return randomInt
  }
  