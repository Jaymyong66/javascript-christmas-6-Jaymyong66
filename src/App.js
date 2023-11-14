import PromotionController from './PromotionController.js';

class App {
  #promotionController;

  constructor() {
    this.#promotionController = new PromotionController();
  }

  async run() {
      await this.#promotionController.run();
  }
}

export default App;
