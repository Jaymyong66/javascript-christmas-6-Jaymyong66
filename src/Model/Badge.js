class Badge {
  #totalDiscount = 0;
  #badge = '';

  constructor(totalDiscount) { 
    this.#totalDiscount = totalDiscount;
    this.judgeBadge();
  }

  judgeBadge() {
    if (this.#totalDiscount >= 5000) {
      this.#badge = '별';
    }
    if (this.#totalDiscount >= 10000) {
      this.#badge = '트리';
    }
    if (this.#totalDiscount >= 20000) {
      this.#badge = '산타';
    }
  }

  getBadge() {
    return this.#badge;
  }

}

export default Badge;