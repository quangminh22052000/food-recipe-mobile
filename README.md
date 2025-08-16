# Food Recipe Mobile

A React Native mobile application for food recipes built with Expo.

## 🚀 Features

- Browse food recipes
- Search and filter recipes
- Recipe details with ingredients and instructions
- Favorites management
- Multi-language support (English/Vietnamese)
- Modern UI with React Native Paper

## 🧪 Testing

This project includes comprehensive unit testing setup:

### Test Coverage
- **44 tests** across **8 test suites**
- **100% coverage** for tested files
- Tests for utilities, components, and screens

### Running Tests
```bash
# Run all tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage

# Run tests for CI
yarn test:ci
```

### Coverage Reports
The `coverage/` folder contains detailed test coverage reports:

```
coverage/
├── lcov.info                  # Main coverage report (LCOV format)
├── clover.xml                 # XML coverage report (for CI tools)
├── coverage-final.json        # JSON coverage data
└── lcov-report/              # HTML coverage report
    ├── index.html            # Main coverage dashboard
    ├── currency.ts.html      # Coverage for currency utilities
    ├── datetime.ts.html      # Coverage for datetime utilities
    └── index.ts.html         # Coverage for format index
```

**Current Coverage: 100%** (Statements, Branches, Functions, Lines)

### Test Structure
```
__tests__/
├── basic.test.ts              # Basic Jest configuration tests
├── simple.test.ts             # Simple TypeScript tests
├── simple.test.js             # Simple JavaScript tests
├── services/
│   └── auth.test.ts          # API service tests
├── utils/
│   └── format.test.ts        # Utility function tests
└── screens/                   # Screen component tests
    ├── Home.test.ts           # Home screen tests
    ├── HomeHeader.test.ts     # HomeHeader component tests
    ├── HomeIntro.test.ts      # HomeIntro component tests
    ├── Categories.test.ts     # Categories component tests
    └── Recipies.test.ts       # Recipies component tests
```

## 🏗️ CI/CD

GitHub Actions workflows for automated testing and quality checks:

- **Unit Tests**: Runs tests on Node.js 18 & 20
- **Quality Checks**: Linting, formatting, and coverage
- **Auto-fix**: Automatic lint and format fixes
- **Coverage Upload**: Automatic coverage reports to Codecov

## 🐛 Troubleshooting

### Common Issues

**@babel/runtime Error**: If you encounter `@babel/runtime/helpers/interopRequireDefault` errors:
```bash
# Install missing dependencies
yarn add @babel/runtime @babel/core @babel/helpers

# Clear cache and restart
npx expo start --clear
```

## 📱 Getting Started

### Prerequisites
- Node.js 18 or higher
- Yarn package manager
- Expo CLI

### Installation
```bash
# Install dependencies
yarn install

# Start development server
yarn start

# Run on iOS
yarn ios

# Run on Android
yarn android
```

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **UI Library**: React Native Paper
- **State Management**: Zustand
- **Navigation**: Expo Router
- **Testing**: Jest + React Native Testing Library
- **Linting**: ESLint + Prettier

## 📊 Project Structure

```
food-recipe-mobile/
├── app/                      # Expo Router pages
├── assets/                   # Static assets
├── libs/                     # Shared libraries
│   ├── auth/                # Authentication
│   └── common/              # Common utilities
├── screens/                  # Screen components
├── __tests__/               # Unit tests
├── coverage/                # Test coverage reports
└── .github/workflows/       # CI/CD workflows
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
