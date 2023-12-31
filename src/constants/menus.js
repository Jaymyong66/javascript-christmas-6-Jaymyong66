const MENUS = {
  '에피타이저': {
    '양송이수프': 6000,
    '타파스': 5500,
    '시저샐러드': 8000,
  },
  '메인': {
    '티본스테이크': 55000,
    '바비큐립': 54000,
    '해산물파스타': 35000,
    '크리스마스파스타': 25000,
  },
  '디저트': {
    '초코케이크': 15000,
    '아이스크림': 5000,
  },
  '음료': {
    '제로콜라': 3000,
    '레드와인': 60000,
    '샴페인': 25000,
  },
};

const FOODS = [];
for (const category in MENUS) {
  for (const food in MENUS[category]) {
    FOODS.push(food);
  }
}

const CATEGORIES = Object.freeze({
  appetizer: '에피타이저',
  main: '메인',
  dessert: '디저트',
  drink: '음료',
})

const MAX_MENU_COUNT = 21;

export { MENUS, FOODS, CATEGORIES,MAX_MENU_COUNT };
