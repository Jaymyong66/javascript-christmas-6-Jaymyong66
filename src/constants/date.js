const DATE = Object.freeze({
  weekendCondition: `(this.#date >= 1 && this.#date <= 2) || (this.#date >= 8 && this.#date <= 9) || (this.#date >= 15 && this.#date <= 16) || (this.#date >= 22 && this.#date <= 23) || (this.#date >= 29 && this.#date <= 30)`,
  firstDay: 1,
  lastDay : 31,
})

export default DATE;