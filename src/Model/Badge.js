import BADGE from '../constants/badges.js';
import MONEY from '../constants/money.js';

class Badge {
  #totalDiscount = MONEY.zero;
  #badge = BADGE.noBadge;

  constructor(totalDiscount) { 
    this.#totalDiscount = totalDiscount;
    this.judgeBadge();
  }

  judgeBadge() {
    if (this.#totalDiscount >= BADGE.starPrice) {
      this.#badge = BADGE.starBadge;
    }
    if (this.#totalDiscount >= BADGE.treePrice) {
      this.#badge = BADGE.treeBadge;
    }
    if (this.#totalDiscount >= BADGE.santaPrice) {
      this.#badge = BADGE.santaBadge;
    }
  }

  getBadge() {
    return this.#badge;
  }

}

export default Badge;