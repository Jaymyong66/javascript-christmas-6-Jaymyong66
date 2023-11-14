import { Console } from '@woowacourse/mission-utils';
import InputView from './View/InputView.js';
import Order from './Model/Order.js';
import OutputView from './View/OutputView.js';
import { MENUS } from './constants/menus.js';
import Discount from './Model/Discount.js';
import Badge from './Model/Badge.js';

class PromotionController {
  #date;
  #order;

  constructor() {
    
  }

  async reInput(func) {
    try {
      return await func();
    } catch (err) {
      Console.print(err.message)
      return await this.reInput(func);
    }
  }

  async run() {
    await this.reInput(() => this.inputDate());
    await this.reInput(() => this.inputOrder());
    OutputView.printdate(this.#date);
    OutputView.printMenu(this.#order);
    //await this.#order.calculatePrice();
    OutputView.printBeforeTotalPrice(this.#order.getTotalPrice());
    OutputView.printPresent(this.#order.getIsPresent());
    
  }


  async inputDate() {
    const input = await InputView.readDate();
    this.#date = input;
  }

  async inputOrder() {
    const orederInput = await InputView.readMenu();
    this.#order = new Order(orederInput);
  }



  getOrders() {
    return this.#order;
  }
}

export default PromotionController;