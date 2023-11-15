import { expectedCalculatePayment } from '../src/utils/expectedCalculatePayment';
import { menuDiscountCalculator } from '../src/utils/menuDiscountCalculator';
import { CATEGORIES } from '../src/constants/menus';
import Order from '../src/Model/Order';
import { addCommasToNumber } from '../src/utils/priceFormat';

describe("Util 함수 테스트", () => { 
  
  //given
  const paymentCalculateCases = [{totalPrice:10000,totalDiscount:3000,isPresent:1, expected:32000},{totalPrice:20000,totalDiscount:5000,isPresent:0, expected:15000}];

  test.each(paymentCalculateCases)('할인 후 예상 결제 금액 계산 함수 테스트', async ({ totalPrice,totalDiscount, isPresent,expected }) => {
    //when
    const result = expectedCalculatePayment(totalPrice, totalDiscount, isPresent)
    //then
    expect(result).toEqual(expected);
  })
  
  //given
  const newOrder = new Order('티본스테이크-1,바비큐립-2,초코케이크-2,제로콜라-1');
  const discountCalculateCases = [{key:CATEGORIES.main,order:newOrder, expected:6069},{key:CATEGORIES.dessert,order:newOrder,expected:4046}];

  test.each(discountCalculateCases)('카테고리별 할인 금액 계산 함수 테스트', async ({ key,order,expected }) => {
    //when
    const result = menuDiscountCalculator(key,order)
    //then
    expect(result).toEqual(expected);
  })

  //given
  const priceFormattingCases = [{price:10000, expected:'10,000'},{price:123456,expected:'123,456'}];

  test.each(priceFormattingCases)('금액 포매팅 함수 테스트', async ({ price,expected }) => {
    //when
    const result = addCommasToNumber(price)
    //then
    expect(result).toEqual(expected);
  })

})