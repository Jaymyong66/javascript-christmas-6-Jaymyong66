import Discount from '../src/Model/Discount';
import Order from '../src/Model/Order';

describe("도메인 테스트", () => { 
  describe("Order 로직 테스트", () => { 
    //given
    const totalPriceCases = [
      { input: "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", expected: 142000 },
      {input: "양송이수프-1", expected: 6000},
    ];
    test.each(totalPriceCases)('할인 전 총주문 금액 테스트', async ({ input,expected }) => {
      //when
      const order = new Order(input);
      const totalPrice = order.getTotalPrice();
      //then
      expect(totalPrice).toEqual(expected);
    })

    //given
    const presentCases = [
      { input: "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", expected: 1 },
      {input: "양송이수프-1", expected: 0},
    ];
    test.each(presentCases)('증정 메뉴 테스트', async ({ input,expected }) => {
      //when
      const order = new Order(input);
      const isPresent = order.getIsPresent();
      //then
      expect(isPresent).toEqual(expected);
    })
  })

  describe("Discount 로직 테스트", () => { 
    //given
    const discountCases = [
      {input: "양송이수프-1", expected: {
          '크리스마스 디데이 할인': 0,
          '평일 할인': 0,
          '주말 할인': 0,
          '특별 할인': 0,
          '증정 이벤트': 0,
        }},
    ];
    test.each(discountCases)('혜택 내역 테스트', async ({ input,expected }) => {
      //when
      const order = new Order(input);
      const date = '3';
      const discount = new Discount(order, date);
      const totalDiscount = discount.getDiscount();
      //then
      expect(totalDiscount).toEqual(expected);
    })
  })

})