import { CATEGORIES } from '../constants/menus.js';
import MONEY from '../constants/money.js';
import { menuDiscountCalculator } from '../utils/menuDiscountCalculator.js';

class Discount {
  #order;
  #date;
  #weekendDiscount = MONEY.zero;
  #weekdayDiscount = MONEY.zero;
  #specialDiscount = MONEY.zero;
  #christmasDiscount = MONEY.zero;
  #totalDiscount = MONEY.zero;

  constructor(order, date) {
    this.#order = order;
    this.#date = date;
  }

  async calculateDiscount() {
    const isDiscount = this.#order.getTotalPrice() >= MONEY.minimunBenefitPrice;
    if (isDiscount) {
      await this.#calculateWeekendDiscount();
      await this.#calculateWeekdayDiscount();
      await this.#calculateSpecialDiscount();
      await this.#calculateChristmasDiscount();
      await this.#calculateTotalDiscount();
    }
  }


  async #calculateWeekendDiscount() {
    if ((this.#date >= 1 && this.#date <= 2) || (this.#date >= 8 && this.#date <= 9) || (this.#date >= 15 && this.#date <= 16) || (this.#date >= 22 && this.#date <= 23) || (this.#date >= 29 && this.#date <= 30)) {
      const discount = menuDiscountCalculator(CATEGORIES.main, this.#order);
      this.#weekendDiscount += discount;
    }
      
  }

  async #calculateWeekdayDiscount() { 
    if ((this.#date >= 3 && this.#date <= 7) || (this.#date >= 10 && this.#date <= 14) || (this.#date >= 17 && this.#date <= 21) || (this.#date >= 24 && this.#date <= 28) || (this.#date >= 31)) {
      const discount = menuDiscountCalculator(CATEGORIES.dessert, this.#order);
      this.#weekdayDiscount += discount;
    }
  }

  async #calculateSpecialDiscount() {
    if ((this.#date == 3 || this.#date == 10 || this.#date == 17 || this.#date == 24 || this.#date == 25 || this.#date == 31)){
      this.#specialDiscount = MONEY.thousand;
    }
  }

  async #calculateChristmasDiscount() {
    if (this.#date <= 25 && this.#date >= 1) {
      const discount = (this.#date - 1) * MONEY.christmasDiscountUnit;
      this.#christmasDiscount = discount + MONEY.thousand;
    }
  }
  
  async #calculateTotalDiscount() { 
    this.#totalDiscount = this.#weekendDiscount + this.#weekdayDiscount + this.#specialDiscount + this.#christmasDiscount;
    if (this.#order.getIsPresent()) {
      this.#totalDiscount += MONEY.presentPrice;
    }
  }

  getDiscount() {
    const discount = {
      '크리스마스 디데이 할인': this.#christmasDiscount,
      '평일 할인': this.#weekdayDiscount,
      '주말 할인': this.#weekendDiscount,
      '특별 할인': this.#specialDiscount,
      '증정 이벤트': this.#order.getIsPresent() ? MONEY.presentPrice : MONEY.zero,
    }
    return discount;
  }

  getTotalDiscount() {
    return this.#totalDiscount;
  }
}


export default Discount;