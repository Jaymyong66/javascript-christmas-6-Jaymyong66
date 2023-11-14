import { Console } from '@woowacourse/mission-utils';


class PromotionController {


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
    
  }


  
}

export default PromotionController;