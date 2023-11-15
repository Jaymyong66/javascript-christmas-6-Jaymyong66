import { Console } from '@woowacourse/mission-utils';
import App from '../src/App';
import Order from '../src/Model/Order';

const mockQuestions = (inputs) => {
  Console.readLineAsync = jest.fn();

  Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(Console, "print");
  logSpy.mockClear();

  return logSpy;
};

describe("입력 테스트", () => {
  describe("입력 받은 예상 방문 날짜 테스트", () => {
    //given
    const notNumberCases = [
    { input: "a" },
    { input: "  " },
    { input: "100f"},
    ];
    test.each(notNumberCases)('입력 받은 날짜가 숫자가 아닐 때', async ({ input }) => {
        const INVALID_DATE_MESSAGE = "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.";
        const INPUTS_TO_END = ["1", "해산물파스타-2"];
        const logSpy = getLogSpy();

        mockQuestions([input, ...INPUTS_TO_END]);

        //when
        const app = new App();
        await app.run();

        //then
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(INVALID_DATE_MESSAGE));
      })

    //given
    const exceedNumberCases = [
      { input: "32" },
      { input: "0" },
      { input: "-1" },
      { input: "100" },
    ];
    test.each(exceedNumberCases)('입력 받은 날짜가 1일 ~ 31일이 아닐 때', async ({ input }) => {
        const INVALID_DATE_MESSAGE = "[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.";
        const INPUTS_TO_END = ["1", "해산물파스타-2"];
        const logSpy = getLogSpy();

        mockQuestions([input, ...INPUTS_TO_END]);

        //when
        const app = new App();
        await app.run();

        //then
        expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(INVALID_DATE_MESSAGE));
      })
  });

  describe("입력 받은 주문 테스트", () => {
    //given
    const invalidMenuCases = [
      { input: "해산물파스-2" },
      { input: "-2" },
      { input: "2" },
      { input: "  " },
      { input: "해산물파스타-2, 레드와-1"},
    ];
    test.each(invalidMenuCases)('입력한 메뉴가 제공하는 메뉴가 아닐 때', async ({ input }) => {
      const INVALID_ORDER_MESSAGE = "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.";
      //when
      const newOrder = () => new Order(input);
      //then
      expect(newOrder).toThrow(INVALID_ORDER_MESSAGE);
    })

    //given
    const redundantMenuCases = [
      { input: "해산물파스타-1, 레드와인-1, 해산물파스타-3" },
      { input: " 레드와인-1, 해산물파스타-3, 레드와인-2" },
      { input: "양송이수프-1, 레드와인-1, 양송이수프-3" },
      { input: "초코케이크-1, 레드와인-1, 초코케이크-2" },
    ];
    test.each(redundantMenuCases)('입력한 메뉴가 중복되었을 때', async ({ input }) => {
      const INVALID_ORDER_MESSAGE = "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.";
      //when
      const newOrder = () => new Order(input);
      //then
      expect(newOrder).toThrow(INVALID_ORDER_MESSAGE);
    })
    
    //given
    const invalidMenuCountCases = [
      { input: "해산물파스타-f" },
      { input: "해산물파스타-2, 레드와인-" },
      { input: "해산물파스타-2, 레드와인-  " },
      { input: "해산물파스타-2f" },
      { input: "해산물파스타-0" },
      { input: "해산물파스타-$" },
      { input: "해산물파스타-2, 레드와인--1" },
    ];
    test.each(invalidMenuCountCases)('입력한 메뉴의 개수가 유효한 숫자가 아닐 때', async ({ input }) => {
      const INVALID_ORDER_MESSAGE = "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.";
      //when
      const newOrder = () => new Order(input);
      //then
      expect(newOrder).toThrow(INVALID_ORDER_MESSAGE);
    })

    //given
    const maxCountCases = [
      { input: "해산물파스타-21" },
      { input: "해산물파스타-1,레드와인-20" },
      { input: "해산물파스타-1,레드와인-2,양송이수프-20" },
    ];
    test.each(maxCountCases)('입력한 메뉴의 개수의 합이 20개가 넘을 때', async ({ input }) => {
      const INVALID_ORDER_MESSAGE = "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.";
      //when
      const newOrder = () => new Order(input);
      //then
      expect(newOrder).toThrow(INVALID_ORDER_MESSAGE);
    })

    //given
    const onlyBeverageCases = [
      { input: "레드와인-1" },
      { input: "레드와인-1,제로콜라-1" },
      { input: "샴페인-1" },
      { input: "레드와인-1,제로콜라-1,샴페인-1" },
    ];
    test.each(onlyBeverageCases)('음료만 주문 하였을 때', async ({ input }) => {
      const INVALID_ORDER_MESSAGE = "[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.";
      //when
      const newOrder = () => new Order(input);
      //then
      expect(newOrder).toThrow(INVALID_ORDER_MESSAGE);
    })

    
  });
    
  
})