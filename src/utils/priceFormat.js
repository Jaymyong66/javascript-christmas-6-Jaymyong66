export function addCommasToNumber(price) {
  price = price.toString();
  price = price.split('').reverse().join('');
  
  price = price.replace(/(\d{3})/g, '$1,');
  price = price.split('').reverse().join('');

  if (price.charAt(0) === ',') {
    price = price.slice(1);
  }

  return price;
}

