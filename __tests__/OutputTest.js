import App from "../src/App.js";
import { Console } from "@woowacourse/mission-utils";
import { EOL as LINE_SEPARATOR } from "os";
import { ERROR_MESSEGE } from '../src/constants/messeges.js';

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

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

describe("결과 테스트", () => {

  const expected = [{
    input:
      ["3", "티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1"],
    output: [
      "12월 3일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!",
      "<주문 메뉴>",
      "티본스테이크 1개\n바비큐립 1개\n초코케이크 2개\n제로콜라 1개",
      "<할인 전 총주문 금액>",
      "142,000원",
      "<증정 메뉴>",
      "샴페인 1개",
      "<혜택 내역>",
      "크리스마스 디데이 할인 : -1,200원\n평일 할인 : -4,046원\n특별 할인 : -1,000원\n증정 이벤트 : -25,000원",
      "<총혜택 금액>",
      "-31,246원",
      "<할인 후 예상 결제 금액>",
      "135,754원",
      "<12월 이벤트 배지>",
      "산타",
    ]},{
    input: ["3", "제로콜라-1","타파스-1,제로콜라-1"],
    output: [
      ERROR_MESSEGE.INVALID_ORDER
    ]},{
    input: ["3", "해산물파스타-1, 제로콜라-1, 해산물파스타-1","해산물파스타-1,제로콜라-1"],
    output: [
      ERROR_MESSEGE.INVALID_ORDER
    ]},{
    input: ["26", "타파스-1,제로콜라-1"],
    output: [
      "12월 26일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!",
      "<주문 메뉴>",
      "타파스 1개\n제로콜라 1개",
      "<할인 전 총주문 금액>",
      "8,500원",
      "<증정 메뉴>",
      "없음",
      "<혜택 내역>",
      "없음",
      "<총혜택 금액>",
      "0원",
      "<할인 후 예상 결제 금액>",
      "8,500원",
      "<12월 이벤트 배지>",
      "없음",
    ]}];

  test.each(expected)('전체 결과 테스트', async ({ input, output }) => {
    const logSpy = getLogSpy();
    mockQuestions(input);

    // when
    const app = new App();
    await app.run();

    expectLogContains(getOutput(logSpy), output);
  })
});

