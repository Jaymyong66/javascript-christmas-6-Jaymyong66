import { ZERO } from '../constants/constants.js';
import { MENUS } from '../constants/menus.js';
import MONEY from '../constants/money.js';

export function menuDiscountCalculator(key, order) {
  let discount = ZERO;
  const category = MENUS[key];
  const menus = Object.keys(category);
  for (let i = ZERO; i < menus.length; i++) {
    const menu = menus[i];
    if (order.getMenus().includes(menu)) {
      const index = order.getMenus().indexOf(menu);
      const count = order.getCounts()[index];
      discount += count * MONEY.discountPrice;
    }
  }
  return discount;
}

