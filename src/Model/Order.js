import { COMMA, DASH, EMPTY_STRING, ONE, ZERO } from '../constants/constants.js';
import { CATEGORIES, FOODS, MAX_MENU_COUNT, MENUS } from '../constants/menus.js';
import { ERROR_MESSEGE } from '../constants/messeges.js';
import MONEY from '../constants/money.js';

class Order {
  #menuList = [];
  #countList = [];
  #totalPrice = MONEY.zero;
  #isPresent = MONEY.zero;

  constructor(orderInput) {
    const orderInputs = orderInput.split(COMMA);
    orderInputs.forEach(order => {
      const menuAndCount = order.split(DASH);
      const menu = menuAndCount[ZERO].trim();
      const count = Number(menuAndCount[ONE]);
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
    if (menu === EMPTY_STRING || !FOODS.includes(menu)) {
      throw new Error(ERROR_MESSEGE.INVALID_ORDER);
    }
  }

  #validateCountNumber(count) {
    if (Number.isNaN(count) || count < ONE) {
      throw new Error(ERROR_MESSEGE.INVALID_ORDER);
    }
   }

  #validateBeverageOnly(menuList) {
    const isBeverageOnly = menuList.every(menu => MENUS[CATEGORIES.drink].hasOwnProperty(menu));
    if (isBeverageOnly) {
      throw new Error(ERROR_MESSEGE.INVALID_ORDER);
    }
  }

  #validateRedundantMenu(menuList, menu) { 
    if (menuList.includes(menu)) { 
      throw new Error(ERROR_MESSEGE.INVALID_ORDER);
    }
  }

  #validateMaxCount(countList, count) {
    let presentMenuCount = countList.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, ZERO);
    presentMenuCount += count;
    if (presentMenuCount >= MAX_MENU_COUNT) {
      throw new Error(ERROR_MESSEGE.INVALID_ORDER);
    }
  }
  

  async #calculatePresent() { 
    if (this.#totalPrice >= MONEY.getPresentPrice) {
      this.#isPresent = ONE;
    }
  }

  async #setTotalPrice(category, menus) {
    for (let j = ZERO; j < menus.length; j++) {
      const menu = menus[j];
      if (this.#menuList.includes(menu)) {
        const price = MENUS[category][menu];
        const index = this.#menuList.indexOf(menu);
        const count = this.#countList[index];
        this.#totalPrice += price * count;
      }
    }
  }

  async #calculatePrice() {
    const categorys = Object.keys(MENUS);
    for (let i = ZERO; i < categorys.length; i++) {
      const category = categorys[i];
      const menus = Object.keys(MENUS[category]);
      this.#setTotalPrice(category,menus);
    }
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