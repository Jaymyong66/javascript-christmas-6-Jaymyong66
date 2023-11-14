import { Console } from "@woowacourse/mission-utils";
import { dateValidator } from '../validator/inputValidator.js';

const InputView = {
  async readDate() {
    Console.print("안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.");
    const input = await Console.readLineAsync(
      "12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n"
    );
    dateValidator(input);
    return input;
  },

};

export default InputView;