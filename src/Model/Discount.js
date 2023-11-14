import { Console } from '@woowacourse/mission-utils';
import { MENUS } from '../constants/menus.js';
import { menuDiscountCalculator } from '../utils/menuDiscountCalculator.js';

class Discount {
  #order;
  #date;
  #weekendDiscount = 0;
  #weekdayDiscount = 0;
  #specialDiscount = 0;
  #christmasDiscount = 0;
  #totalDiscount = 0;

  constructor(order, date) {
    this.#order = order;
    this.#date = date;
  }

  async calculateDiscount() {
    await this.#calculateWeekendDiscount();
    await this.#calculateWeekdayDiscount();
    await this.#calculateSpecialDiscount();
    await this.#calculateChristmasDiscount();
    await this.#calculateTotalDiscount();
  }


  async #calculateWeekendDiscount() {
    if ((this.#date >= 1 && this.#date <= 2) || (this.#date >= 8 && this.#date <= 9) || (this.#date >= 15 && this.#date <= 16) || (this.#date >= 22 && this.#date <= 23) || (this.#date >= 29 && this.#date <= 30)) {
      const discount = menuDiscountCalculator('메인', this.#order);
      this.#weekendDiscount += discount;
      Console.print('주말 할인 금액 : ' + this.#weekendDiscount);
    }
      
  }

  async #calculateWeekdayDiscount() { 
    if ((this.#date >= 3 && this.#date <= 7) || (this.#date >= 10 && this.#date <= 14) || (this.#date >= 17 && this.#date <= 21) || (this.#date >= 24 && this.#date <= 28) || (this.#date >= 31)) {
      const discount = menuDiscountCalculator('디저트', this.#order);
      this.#weekdayDiscount += discount;
      //Console.print('평일 할인 금액 : ' + this.#weekdayDiscount);
    }
  }

  async #calculateSpecialDiscount() {
    if ((this.#date == 3 || this.#date == 10 || this.#date == 17 || this.#date == 24 || this.#date == 25 || this.#date == 31)){
      this.#specialDiscount = 1000;
      //Console.print('특별 할인 금액 : ' + this.#specialDiscount);
    }
  }

  async #calculateChristmasDiscount() {
    if (this.#date <= 25 && this.#date >= 1) {
      const discount = (this.#date - 1) * 100;
      this.#christmasDiscount = discount + 1000;
      //Console.print('크리스마스 할인 금액 : ' + this.#christmasDiscount);
    }
  }
  
  async #calculateTotalDiscount() { 
    this.#totalDiscount = this.#weekendDiscount + this.#weekdayDiscount + this.#specialDiscount + this.#christmasDiscount;
    if (this.#order.getIsPresent()) {
      this.#totalDiscount += 25000;
    }
    //Console.print('총 할인 금액 : ' + this.#totalDiscount);
  }

  getDiscount() {
    const discount = {
      '크리스마스 디데이 할인': this.#christmasDiscount,
      '평일 할인': this.#weekdayDiscount,
      '주말 할인': this.#weekendDiscount,
      '특별 할인': this.#specialDiscount,
      '증정 이벤트': this.#order.getIsPresent() ? 25000 : 0,
    }
    return discount;
  }

  getTotalDiscount() {
    return this.#totalDiscount;
  }
}


export default Discount;