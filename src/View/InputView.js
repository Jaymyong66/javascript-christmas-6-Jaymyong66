import { Console } from "@woowacourse/mission-utils";
import { dateValidator } from '../validator/inputValidator.js';
import { INPUT_MESSEGE } from '../constants/messeges.js';

const InputView = {
  async readDate() {
    Console.print(INPUT_MESSEGE.GREETING);
    const input = await Console.readLineAsync(
      INPUT_MESSEGE.DATE
    );
    dateValidator(input);
    return input;
  },

  async readMenu() {
    const input = await Console.readLineAsync(INPUT_MESSEGE.MENU);
    return input;
  },
};

export default InputView;