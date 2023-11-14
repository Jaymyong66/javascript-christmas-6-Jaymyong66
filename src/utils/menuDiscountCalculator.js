import { MENUS } from '../constants/menus.js';

export function menuDiscountCalculator(key, order) {
  let discount = 0;
  const category = MENUS[key];
  const menus = Object.keys(category);
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i];
    if (order.getMenus().includes(menu)) {
      const index = order.getMenus().indexOf(menu);
      const count = order.getCounts()[index];
      discount += count * 2023;
    }
  }
  return discount;
}

