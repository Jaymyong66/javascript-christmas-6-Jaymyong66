import { ONE } from '../constants/constants.js';
import DATE from '../constants/date.js';
import { CATEGORIES } from '../constants/menus.js';
import MONEY from '../constants/money.js';
import { menuDiscountCalculator } from '../utils/menuDiscountCalculator.js';

class Discount {
  #order;
  #date;
  #discounts = new Map();

  constructor(order, date) {
    this.#order = order;
    this.#date = date;
    this.#discounts.set('weekendDiscount', 0);
    this.#discounts.set('weekdayDiscount', 0);
    this.#discounts.set('specialDiscount', 0);
    this.#discounts.set('christmasDiscount', 0);
    this.#discounts.set('totalDiscount', 0);
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
      const currentweekendDiscount = this.#discounts.get('weekendDiscount');
      this.#discounts.set('weekendDiscount', currentweekendDiscount + discount);
    }
      
  }

  async #calculateWeekdayDiscount() { 
    if ((this.#date >= DATE.THREE && this.#date <= DATE.SEVEN) || (this.#date >= DATE.TEN && this.#date <= DATE.FOURTEEN) || (this.#date >= DATE.SEVENTEEN && this.#date <= DATE.TWENTY_ONE) || (this.#date >= DATE.TWENTY_FOUR && this.#date <= DATE.TWENTY_EIGHT) || (this.#date >= DATE.lastDay)) {
      const discount = menuDiscountCalculator(CATEGORIES.dessert, this.#order);
      const currentweekdayDiscount = this.#discounts.get('weekdayDiscount');
      this.#discounts.set('weekdayDiscount', currentweekdayDiscount + discount);
    }
  }

  async #calculateSpecialDiscount() {
    if ((this.#date == DATE.THREE || this.#date == DATE.TEN || this.#date == DATE.SEVENTEEN || this.#date == DATE.TWENTY_FOUR || this.#date == DATE.TWENTY_FIVE || this.#date == DATE.lastDay)) {
      this.#discounts.set('specialDiscount', MONEY.thousand);
    }
  }

  async #calculateChristmasDiscount() {
    if (this.#date <= DATE.TWENTY_FIVE && this.#date >= DATE.firstDay) {
      const discount = (this.#date - ONE) * MONEY.christmasDiscountUnit;
      this.#discounts.set('christmasDiscount', discount + MONEY.thousand);
      
    }
  }
  
  async #calculateTotalDiscount() { 
    const totalDiscount = this.#discounts.get('weekendDiscount') + this.#discounts.get('weekdayDiscount') + this.#discounts.get('specialDiscount') + this.#discounts.get('christmasDiscount');
    this.#discounts.set('totalDiscount', totalDiscount);
    if (this.#order.getIsPresent()) {
      const presentTotalDiscount = this.#discounts.get('totalDiscount');
      this.#discounts.set('totalDiscount', presentTotalDiscount + MONEY.presentPrice);
    }
  }

  getDiscount() {
    const discount = {
      '크리스마스 디데이 할인': this.#discounts.get('christmasDiscount'),
      '평일 할인': this.#discounts.get('weekdayDiscount'),
      '주말 할인': this.#discounts.get('weekendDiscount'),
      '특별 할인': this.#discounts.get('specialDiscount'),
      '증정 이벤트': this.#order.getIsPresent() ? MONEY.presentPrice : MONEY.zero,
    }
    return discount;
  }

  getTotalDiscount() {
    return this.#discounts.get('totalDiscount')
  }
}



export default Discount;