import { Console } from "@woowacourse/mission-utils";
import { addCommasToNumber } from '../utils/priceFormat.js';

const OutputView = {
  printdate(date) {
    Console.print(`12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`);
  },

  printMenu(orders) {
    Console.print("<주문 메뉴>");
    const menus = orders.getMenus()
    const counts = orders.getCounts()
    for (let i = 0; i < menus.length; i++) {
      Console.print(`${menus[i]} ${counts[i]}개`);
    }
  },

  printBeforeTotalPrice(totalPrice) {
    Console.print(`\n<할인 전 총주문 금액>`);
    totalPrice = addCommasToNumber(totalPrice);
    Console.print(`${totalPrice}원\n`);
  },

  printPresent(isPresent) {
    Console.print(`\n<증정 메뉴>`);
    if (isPresent) {
      Console.print(`샴페인 1개`);
    }
    else {
      Console.print(`없음`);
    }
  },

  
};

export default OutputView;
