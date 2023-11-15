import { ONE } from '../constants/constants.js';
import DATE from '../constants/date.js';
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
    if ((this.#date >= DATE.firstDay && this.#date <= DATE.TWO) || (this.#date >= DATE.EIGHT && this.#date <= DATE.NINE) || (this.#date >= DATE.FIFTEEN && this.#date <= DATE.SIXTEEN) || (this.#date >= DATE.TWENTY_TWO && this.#date <= DATE.TWENTY_THREE) || (this.#date >= DATE.TWENTY_NINE && this.#date <= DATE.THIRTY)) {
      const discount = menuDiscountCalculator(CATEGORIES.main, this.#order);
      this.#weekendDiscount += discount;
    }
      
  }

  async #calculateWeekdayDiscount() { 
    if ((this.#date >= DATE.THREE && this.#date <= DATE.SEVEN) || (this.#date >= DATE.TEN && this.#date <= DATE.FOURTEEN) || (this.#date >= DATE.SEVENTEEN && this.#date <= DATE.TWENTY_ONE) || (this.#date >= DATE.TWENTY_FOUR && this.#date <= DATE.TWENTY_EIGHT) || (this.#date >= DATE.lastDay)) {
      const discount = menuDiscountCalculator(CATEGORIES.dessert, this.#order);
      this.#weekdayDiscount += discount;
    }
  }

  async #calculateSpecialDiscount() {
    if ((this.#date == DATE.THREE || this.#date == DATE.TEN || this.#date == DATE.SEVENTEEN || this.#date == DATE.TWENTY_FOUR || this.#date == DATE.TWENTY_FIVE || this.#date == DATE.lastDay)){
      this.#specialDiscount = MONEY.thousand;
    }
  }

  async #calculateChristmasDiscount() {
    if (this.#date <= DATE.TWENTY_FIVE && this.#date >= DATE.firstDay) {
      const discount = (this.#date - ONE) * MONEY.christmasDiscountUnit;
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