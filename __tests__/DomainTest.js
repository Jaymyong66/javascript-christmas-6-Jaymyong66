import Discount from '../src/Model/Discount.js';
import Order from '../src/Model/Order.js';
import { expectedCalculatePayment } from '../src/utils/expectedCalculatePayment.js';
import Badge from '../src/Model/Badge.js';

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
      {input: "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", expected: {
          '크리스마스 디데이 할인': 1200,
          '평일 할인': 4046,
          '주말 할인': 0,
          '특별 할인': 1000,
          '증정 이벤트': 25000,
        }, date:"3"
      },
      {input: "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", expected: {
          '크리스마스 디데이 할인': 1100,
          '평일 할인': 0,
          '주말 할인': 4046,
          '특별 할인': 0,
          '증정 이벤트': 25000,
        }, date:"2"
      },
      {input: "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", expected: {
          '크리스마스 디데이 할인': 0,
          '평일 할인': 4046,
          '주말 할인': 0,
          '특별 할인': 0,
          '증정 이벤트': 25000,
        }, date:"26"
      },
      {input: "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", expected: {
          '크리스마스 디데이 할인': 3400,
          '평일 할인': 4046,
          '주말 할인': 0,
          '특별 할인': 1000,
          '증정 이벤트': 25000,
        }, date:"25"
      },
      {input: "양송이수프-2", expected: {
          '크리스마스 디데이 할인': 1200,
          '평일 할인': 0,
          '주말 할인': 0,
          '특별 할인': 1000,
          '증정 이벤트': 0,
        }, date: "3"
      },
      {input: "초코케이크-1", expected: {
          '크리스마스 디데이 할인': 1200,
          '평일 할인': 2023,
          '주말 할인': 0,
          '특별 할인': 1000,
          '증정 이벤트': 0,
        }, date: "3"
      },
      {input: "양송이수프-1", expected: {
          '크리스마스 디데이 할인': 0,
          '평일 할인': 0,
          '주말 할인': 0,
          '특별 할인': 0,
          '증정 이벤트': 0,
        }, date: "3"
      },
    ];
    test.each(discountCases)('혜택 내역 테스트', async ({ input,expected,date }) => {
      //when
      const order = new Order(input);
      const discount = new Discount(order, date);
      await discount.calculateDiscount();
      const totalDiscount = discount.getDiscount();
      //then
      expect(totalDiscount).toEqual(expected);
    })

    //given
    const totalBenefitCases = [
      {input: "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", expected: 31246, date:"3"
      },
      {input: "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", expected: 30146, date:"2"
      },
      {input: "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", expected: 29046, date:"26"
      },
      {input: "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", expected: 33446, date:"25"
      },
      {input: "양송이수프-2", expected: 2200, date: "3"
      },
      {input: "초코케이크-1", expected: 4223, date: "3"
      },
      {input: "양송이수프-1", expected: 0, date: "3"
      },
    ];
    test.each(totalBenefitCases)('총혜택 금액 테스트', async ({ input,expected,date }) => {
      //when
      const order = new Order(input);
      const discount = new Discount(order, date);
      await discount.calculateDiscount();
      const totalBenefit = discount.getTotalDiscount();
      //then
      expect(totalBenefit).toEqual(expected);
    })

    //given
    const totalPaymentCases = [
      {input: "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", expected: 135754, date:"3"
      },
      {input: "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", expected: 136854, date:"2"
      },
      {input: "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", expected: 137954, date:"26"
      },
      {input: "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", expected: 133554, date:"25"
      },
      {input: "양송이수프-2", expected: 9800, date: "3"
      },
      {input: "초코케이크-1", expected: 10777, date: "3"
      },
      {input: "양송이수프-1", expected: 6000, date: "3"
      },
    ];
    test.each(totalPaymentCases)('할인 후 예상 결제 금액 테스트', async ({ input,expected,date }) => {
      //when
      const order = new Order(input);
      const discount = new Discount(order, date);
      await discount.calculateDiscount();
      const isPresent = order.getIsPresent();
      const totalPayment = expectedCalculatePayment(order.getTotalPrice(), discount.getTotalDiscount(), isPresent);
      //then
      expect(totalPayment).toEqual(expected);
    })
  })
  describe("Badge 로직 테스트", () => { 
    //given
    const badgeCases = [
      {input: "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", expected: '산타', date:"3"
      },
      {input: "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", expected: '산타', date:"2"
      },
      {input: "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", expected: '산타', date:"26"
      },
      {input: "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1", expected: '산타', date:"25"
      },
      {input: "양송이수프-2", expected: '없음', date: "3"
      },
      {input: "초코케이크-1", expected: '없음', date: "3"
      },
      {input: "초코케이크-2", expected: '별', date: "10"
      },
      {input: "아이스크림-2", expected: '별', date: "10"
      },
      {input: "크리스마스파스타-3,해산물파스타-1", expected: '트리', date: "15"
      },
      {input: "초코케이크-2,아이스크림-2", expected: '트리', date: "24"
      }
    ];
    test.each(badgeCases)('12월 이벤트 배지 테스트', async ({ input,expected,date }) => {
      //when
      const order = new Order(input);
      const discount = new Discount(order, date);
      await discount.calculateDiscount();
      const totalDiscount = discount.getTotalDiscount();
      const badge = new Badge(totalDiscount);
      //then
      expect(badge.getBadge()).toEqual(expected);
    })
  })

})