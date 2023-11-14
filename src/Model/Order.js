import { Console } from '@woowacourse/mission-utils';
import { FOODS, MENUS } from '../constants/menus.js';
import OutputView from '../View/OutputView.js';

class Order {
  #menuList = [];
  #countList = [];
  #totalPrice = 0;
  #isPresent = 0;

  constructor(orderInput) {
    const orderInputs = orderInput.split(',');
    orderInputs.forEach(order => {
      const menuAndCount = order.split('-');
      const menu = menuAndCount[0].trim();
      const count = Number(menuAndCount[1]);
      this.#validateElement(menu, count);
      this.#menuList.push(menu);
      this.#countList.push(count);
    });
    this.#validateBeverageOnly(this.#menuList);
    this.#calculatePrice();
  }

  #validateElement(menu, count) {
    this.#validateMenu(menu);
    this.#validateCountNumber(count);
    this.#validateMaxCount(this.#countList, count);
    this.#validateRedundantMenu(this.#menuList, menu);
  }

  #validateMenu(menu) {
    if (menu === '' || !FOODS.includes(menu)) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  #validateCountNumber(count) {
    if (Number.isNaN(count) || count < 1) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
   }

  #validateBeverageOnly(menuList) {
    const isBeverageOnly = menuList.every(menu => MENUS['음료'].hasOwnProperty(menu));
    if (isBeverageOnly) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  #validateRedundantMenu(menuList, menu) { 
    if (menuList.includes(menu)) { 
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  #validateMaxCount(countList, count) {
    let presentMenuCount = countList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    presentMenuCount += count;
    if (presentMenuCount >= 21) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }
  

  async #calculatePresent() { // todo : 증정 메뉴 모델 분리?
    if (this.#totalPrice >= 120000) {
      this.#isPresent = 1;
    }
    // OutputView.printPresent(this.#isPresent);
  }

  async #calculatePrice() {
    const categorys = Object.keys(MENUS);
    for (let i = 0; i < categorys.length; i++) {
      const category = categorys[i];
      const menus = Object.keys(MENUS[category]);
      for (let j = 0; j < menus.length; j++) {
        const menu = menus[j];
        if (this.#menuList.includes(menu)) {
          const price = MENUS[category][menu];
          const index = this.#menuList.indexOf(menu);
          const count = this.#countList[index];
          this.#totalPrice += price * count;
        }
      }
    }
    // OutputView.printBeforeTotalPrice(this.#totalPrice);
    this.#calculatePresent();
  }

  getMenus() {
    return this.#menuList;
  }

  getCounts() {
    return this.#countList;
  }

  getIsPresent() {
    return this.#isPresent;
  }

  getTotalPrice() {
    return this.#totalPrice;
  }
}

export default Order;