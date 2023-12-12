import DATE from '../constants/date.js'
import { ERROR_MESSEGE } from '../constants/messeges.js'

export const dateValidator = (date) => { 
  if (Number.isNaN(Number(date)) || Number(date) < DATE.firstDay || Number(date) > DATE.lastDay ) {
    throw new Error(ERROR_MESSEGE.INVALID_DATE);
  }
}
