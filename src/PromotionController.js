import { Console } from '@woowacourse/mission-utils';
import InputView from './View/InputView.js';


class PromotionController {
  #date;


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

  }


  async inputDate() {
    const input = await InputView.readDate();
    this.#date = input;
  }

  
}

export default PromotionController;