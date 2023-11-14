export const dateValidator = (date) => { 
  if (Number.isNaN(Number(date)) || Number(date) < 1 || Number(date) > 31 ) {
    throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.')
  }
}