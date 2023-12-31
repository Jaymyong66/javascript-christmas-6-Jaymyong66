# 우테코 프리코스 4주차 - FE

## 미션 - 크리스마스 프로모션

### 구현할 기능 순서

1. 유저는 예상 방문 날짜를 입력한다.

   - 안내 문구 : `12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)`

2. 유저는 주문할 메뉴와 개수를 입력한다.

   - 안내 문구 : `주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)`

3. 입력한 날짜와 함께 주문메뉴, 할인 전 총주문 금액, 증정 메뉴를 출력한다.

4. **"혜택 내역"**, **"총혜택 금액"**, **"할인 후 예상 결제 금액"**, **"12월 이벤트 배지"** 를 출력한다.

5. 모두 출력 후, 프로그램을 종료한다. 프로그램 동작 중 사용자가 잘못된 값을 입력한 경우 `[ERROR]` 문이 발생하며, 프로그램을 종료시킨다.

### 구현 기능
  - [x] 유저 방문 날짜 입력 받기
  - [x] 유저 주문 메뉴와 개수 입력 받기
  - [x] 주문메뉴에 혜택 내역 계산하기 
      - 크리스마스 디데이 할인
      - 평일 할인
      - 주말 할인
      - 특별 할인
      - 증정 이벤트
  - [x] 총혜택 금액 계산하기
  - [x] 할인 전 총 주문 금액 계산하기
  - [x] 증정 메뉴 여부 판단하기
  - [x] 할인 후 예상 결제 금액 계산하기
  - [x] 12월 이벤트 배지 판단하기

### 주차별 요구사항

- 4주차 추가 요구 사항

  - [x] InputView, OutputView 객체를 활용해 구현한다.
  - [x] 객체를 객체스럽게, getter 메서드 체크하기.
  - [x] 필드 수를 Map 구조를 통해 줄이기 - Discount 클래스
  - [x] 성공 케이스 뿐만 아니라 예외 케이스도 테스트하기

- 기존 요구 사항

  - [x] indent 3 이상 넘지 않도록 함수, 메서드 분리하기
  - [x] 함수(메서드) 길이가 15라인을 넘어가지 않도록 구현하기
  - [x] ex) 함수에서 안내문구 출력, 사용자 입력, 유효값 검증 등 여러 일을 하면 분리
  - [x] 사용자가 잘못된 값을 입력할 경우 throw문을 사용해 예외를 발생시킨다. 이후 "[ERROR]"로 시작하는 에러 메시지를 출력하고 해당 부분부터 입력을 다시 받는다.
  - [x] else를 지양하기. but, 상황에 따라 잘 판단하기
  - [x] 도메인 로직에 단위 테스트를 구현하기. (단, UI 로직에 대한 단위 테스트는 제외)
  - [x] jest 테스트 코드 작성하기
  - [x] 상수들 변수화 하기
  - [x] 폴더 구조 나눠보기
  - [x] eslint, prettier 세팅 및 적용해보기


### 예외처리

- [x] 입력 날짜가 숫자가 아닐 때
- [x] 입력 날짜가 1일 ~ 31일이 아닐 때

- [x] 입력한 메뉴가 제공하는 메뉴가 아닐 때
- [x] 입력한 메뉴가 중복되었을 때
- [x] 입력한 메뉴의 개수가 유효한 숫자가 아닐 때
- [x] 입력한 메뉴의 개수의 합이 20개가 넘을 때
- [x] 음료만 주문 하였을 때

- [x] 총 주문금액이 10,000원 이상부터 이벤트 적용


### jest 파일 작성해보기

- **DomainTest.js**
  
  - **Order 로직 테스트**
    - [x] 할인 전 총주문 금액 테스트
    - [x] 증정 메뉴 테스트

  - **Discount 로직 테스트**
    - [x] 혜택 내역 테스트
      - 크리스마스 디데이 할인
      - 평일 할인
      - 주말 할인
      - 특별 할인
      - 증정 이벤트
  
    - [x] 총혜택 금액 테스트
      - 할인 혜택 + 증정 이벤트 가격
    - [x] 할인 후 예상 결제 금액 테스트
  
  - **Badge 로직 테스트**
    - [x] 12월 이벤트 배지 테스트
      - 산타 : 2만원 이상
      - 트리 : 1만원 이상
      - 별 : 5천원 이상
      - 없음


- **OutputTest.js**
  
  - **결과 테스트**
    - [x] 할인 o, 증정 o, 배지 o ("티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1")
    - [x] 음료만 주문 시 에러 후 재입력 받기 ("제로콜라-1","타파스-1,제로콜라-1")
    - [x] 중복 메뉴 주문 시 에러 후 재입력 받기 ("해산물파스타-1, 제로콜라-1, 해산물파스타-1","해산물파스타-1,제로콜라-1")
    - [x] 최소 혜택 금액 이하 시 이벤트 혜택 없음 ("타파스-1,제로콜라-1")

- **InputTest.js**

  - **입력 받은 예상 방문 날짜 테스트**
    - [x] 입력 받은 날짜가 숫자가 아닐 때
    - [x] 입력 받은 날짜가 1일 ~ 31일이 아닐 때

  - **입력 받은 주문 테스트**
    - [x] 입력한 메뉴가 제공하는 메뉴가 아닐 때
    - [x] 입력한 메뉴가 중복되었을 때
    - [x] 입력한 메뉴의 개수가 유효한 숫자가 아닐 때
    - [x] 입력한 메뉴의 개수의 합이 20개가 넘을 때
    - [x] 음료만 주문 하였을 때

- **UtilTest.js**

  - **Util 함수 테스트**
    - [x] 할인 후 예상 결제 금액 계산 함수 테스트
    - [x] 카테고리별 할인 금액 계산 함수 테스트
    - [x] 금액 포매팅 함수 테스트


### 폴더 구조

```
 root
 |---📂 __tests__
     |--- 📄 ApplicationTest.js
     |--- 📄 DomainTest.js
     |--- 📄 InputTest.js
     |--- 📄 OutputTest.js
     |--- 📄 UtilTest.js
 |---📂 docs
     |--- 📄 README.md
 |---📂 src
     |--- 📂 constants
          |--- 📄 badges.js
          |--- 📄 constants.js
          |--- 📄 date.js
          |--- 📄 menus.js
          |--- 📄 messeges.js
          |--- 📄 money.js
     |--- 📂 Controller
          |--- 📄 PromotionController.js
     |--- 📂 Model
          |--- 📄 Badge.js
          |--- 📄 Discount.js
          |--- 📄 Oreder.js
     |--- 📂 utils
          |--- 📄 expectedCalculatePayment.js
          |--- 📄 menuDiscountCalculator.js
          |--- 📄 priceFormat.js
     |--- 📂 validator
          |--- 📄 inputValidator.js
     |--- 📂 View
          |--- 📄 InputView.js
          |--- 📄 OutputView.js
     |--- 📄 App.js
     |--- 📄 index.js
```

### eslint 사용해보기

```
module.exports = {
  extends: ["airbnb", "plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "operator-linebreak": ["error", "before"],
    "max-depth": ["error", 2],
    'no-var': 2,
    'prefer-const': 2,
    'no-undef': 2,
    'no-unused-vars': 2,
    'max-lines-per-function': ['error', 15],
  },
  "import/extensions": [
    "error",
    "ignorePackages",
    {
      js: "never",
    },
  ],
};
```

### prettier 사용해보기

```
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: true,
  bracketSpacing: true,
  arrowParens: 'avoid',
  proseWrap: 'never',
  endOfLine: 'auto',
};
```
