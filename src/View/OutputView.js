import { Console } from "@woowacourse/mission-utils";
import { addCommasToNumber } from '../utils/priceFormat.js';
import { expectedCalculatePayment } from '../utils/expectedCalculatePayment.js';

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

  printBenefit(discounts) {
    const discountKeys = Object.keys(discounts);
    Console.print(`\n<혜택 내역>`);
    if (Object.values(discounts).every(value => value === 0)) { 
      Console.print(`없음`);
      return;
    }
    discountKeys.forEach(key => {
      if (discounts[key] !== 0) {
        Console.print(`${key} : -${addCommasToNumber(discounts[key])}원`);
      }
    });
  },

  printTotalBenefit(totalDiscount) {
    Console.print(`\n<총혜택 금액>`);
    if (totalDiscount === 0) {
      Console.print(`0원`);
      return;
    }
    Console.print(`-${addCommasToNumber(totalDiscount)}원`);
  },

  printPayment(totalPrice, totalDiscount, isPresent) {
    Console.print(`\n<할인 후 예상 결제 금액>`);
    const payment = expectedCalculatePayment(totalPrice, totalDiscount, isPresent);
    Console.print(`${addCommasToNumber(payment)}원`);
    
  },
  
  printBadge(badge) {
    Console.print(`\n<12월 이벤트 배지>`);
    Console.print(`${badge}`);
  }
};

export default OutputView;
