import MONEY from '../constants/money.js'

export function expectedCalculatePayment(totalPrice, totalDiscount, isPresent) {
  if (isPresent) {
      return totalPrice - totalDiscount + MONEY.presentPrice
    }
  else {
    return totalPrice - totalDiscount
  }
}