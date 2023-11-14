import { Console } from '@woowacourse/mission-utils';
import App from '../src/App';

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
    const notNumberCases = [
    { input: "a" },
    { input: "  " },
    { input: "100f"},
    ];

    test.each(notNumberCases)('입력 받은 날짜가 숫자가 아닐 때', async ({ input }) => {
        //given
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

    const exceedNumberCases = [
      { input: "32" },
      { input: "0" },
      { input: "-1" },
      { input: "100" },
    ];
    test.each(exceedNumberCases)('입력 받은 날짜가 1일 ~ 31일이 아닐 때', async ({ input }) => {
        //given
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
    
  
})