# Tests

Thư mục này chứa các unit tests cho project Food Recipe Mobile.

## Cấu trúc

- `basic.test.ts` - Test cơ bản cho Jest configuration
- `simple.test.ts` - Test đơn giản cho TypeScript
- `simple.test.js` - Test đơn giản cho JavaScript
- `services/auth.test.ts` - Test cho auth API
- `utils/format.test.ts` - Test cho utility functions
- `screens/` - Test cho các màn hình
  - `Home.test.ts` - Test cho màn hình Home
  - `HomeHeader.test.ts` - Test cho component HomeHeader
  - `HomeIntro.test.ts` - Test cho component HomeIntro
  - `Categories.test.ts` - Test cho component Categories
  - `Recipies.test.ts` - Test cho component Recipies

## Chạy tests

```bash
# Chạy tất cả tests
yarn test

# Chạy test cụ thể
yarn test __tests__/basic.test.ts

# Chạy với coverage
yarn test:coverage
```

## Kết quả hiện tại

- ✅ 8 test suites passed
- ✅ 44 tests passed
- ✅ 100% coverage cho các file được test
