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

  
};

export default OutputView;
