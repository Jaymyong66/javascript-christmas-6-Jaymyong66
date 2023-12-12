import { COMMA, EMPTY_STRING, ONE, ZERO } from '../constants/constants.js';

export function addCommasToNumber(price) {
  price = price.toString();
  price = price.split(EMPTY_STRING).reverse().join('');
  
  price = price.replace(/(\d{3})/g, '$1,');
  price = price.split(EMPTY_STRING).reverse().join('');

  if (price.charAt(ZERO) === COMMA) {
    price = price.slice(ONE);
  }

  return price;
}

