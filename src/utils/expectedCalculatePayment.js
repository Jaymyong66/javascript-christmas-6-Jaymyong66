export function expectedCalculatePayment(totalPrice, totalDiscount, isPresent) {
  if (isPresent) {
      return totalPrice - totalDiscount + 25000
    }
    else {
      return totalPrice - totalDiscount
    }
}