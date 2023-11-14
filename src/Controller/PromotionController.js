import { Console } from '@woowacourse/mission-utils';
import InputView from '../View/InputView.js';
import Order from '../Model/Order.js';
import OutputView from '../View/OutputView.js';
import { MENUS } from '../constants/menus.js';
import Discount from '../Model/Discount.js';
import Badge from '../Model/Badge.js';

class PromotionController {
  #date;
  #order;
  #discount;
  #badge;

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
    OutputView.printBeforeTotalPrice(this.#order.getTotalPrice());
    OutputView.printPresent(this.#order.getIsPresent());
    await this.judgeDiscount();
    await this.calculatePayment();
    await this.calculateBadge();
  }


  async inputDate() {
    const input = await InputView.readDate();
    this.#date = input;
  }

  async inputOrder() {
    const orederInput = await InputView.readMenu();
    this.#order = new Order(orederInput);
  }


  async calculateDiscount() {
    this.#discount = new Discount(this.#order, this.#date);
    await this.#discount.calculateDiscount();
    OutputView.printBenefit(this.#discount.getDiscount());
    OutputView.printTotalBenefit(this.#discount.getTotalDiscount());
  }

  async notDiscount() {
    this.#discount = new Discount(this.#order, '0');
    await this.#discount.calculateDiscount();
    OutputView.printBenefit(this.#discount.getDiscount());
    OutputView.printTotalBenefit(this.#discount.getTotalDiscount());
  }

  async judgeDiscount() {
    const totalPrice = this.#order.getTotalPrice();
    if ((totalPrice < 10000)) { 
      await this.notDiscount();
    }
    else {
      await this.calculateDiscount();
    }
   }

  async calculatePayment() {
    const totalPrice = this.#order.getTotalPrice();
    const totalDiscount = this.#discount.getTotalDiscount();
    const isPresent = this.#order.getIsPresent();
    OutputView.printPayment(totalPrice,totalDiscount,isPresent);
  }

  async calculateBadge() {
    const totalDiscount = this.#discount.getTotalDiscount();
    this.#badge = new Badge(totalDiscount);
    OutputView.printBadge(this.#badge.getBadge());
  }

  getOrders() {
    return this.#order;
  }
}

export default PromotionController;