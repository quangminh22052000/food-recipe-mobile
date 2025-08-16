# Unit Testing Guide

## 📋 Overview

This project uses Jest and React Native Testing Library for unit testing. The testing setup is configured to work with TypeScript, React Native, and Expo.

## 🏗️ Test Structure

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

## 🚀 Running Tests

### Local Development
```bash
# Run all tests
yarn test

# Run tests in watch mode (re-runs on file changes)
yarn test:watch

# Run tests with coverage report
yarn test:coverage

# Run tests for CI environment
yarn test:ci
```

### Test Results
```
Test Suites: 8 passed, 8 total
Tests:       44 passed, 44 total
Snapshots:   0 total
Time:        10.022 s
Ran all test suites.
```

## 📊 Coverage Reports

### Coverage Folder (`/coverage`)

The `coverage/` folder is automatically generated when running `yarn test:coverage` and contains detailed test coverage reports:

#### 📁 Folder Structure
```
coverage/
├── lcov.info                  # Main coverage report (LCOV format)
├── clover.xml                 # XML coverage report (for CI tools)
├── coverage-final.json        # JSON coverage data
└── lcov-report/              # HTML coverage report
    ├── index.html            # Main coverage dashboard
    ├── currency.ts.html      # Coverage for currency utilities
    ├── datetime.ts.html      # Coverage for datetime utilities
    ├── index.ts.html         # Coverage for format index
    └── [other files]         # Additional coverage files
```

#### 📄 File Descriptions

**`lcov.info`** - Main coverage report in LCOV format:
- Used by CI/CD tools and coverage services
- Contains line-by-line coverage data
- Format: `TN:`, `SF:`, `FN:`, `FNF:`, `FNH:`, `DA:`, `LF:`, `LH:`, `BRF:`, `BRH:`

**`clover.xml`** - XML coverage report:
- Compatible with Jenkins, SonarQube, and other CI tools
- Provides structured coverage data for analysis

**`coverage-final.json`** - JSON coverage data:
- Raw coverage data in JSON format
- Used by coverage visualization tools

**`lcov-report/`** - HTML coverage report:
- Interactive web-based coverage dashboard
- Shows line-by-line coverage with color coding
- Navigate through files to see covered/uncovered lines
- Includes search and filtering capabilities

#### 🎯 Coverage Metrics

Current coverage shows **100%** for tested files:
- **Statements**: 100% (all code statements executed)
- **Branches**: 100% (all conditional branches tested)
- **Functions**: 100% (all functions called)
- **Lines**: 100% (all code lines executed)

#### 🔍 Reading Coverage Reports

1. **HTML Report** (`coverage/lcov-report/index.html`):
   - Open in browser for interactive view
   - Green lines = covered, red lines = uncovered
   - Click on files to see detailed coverage

2. **LCOV Format** (`coverage/lcov.info`):
   - `SF:` = Source file
   - `FN:` = Function name
   - `FNF:` = Functions found
   - `FNH:` = Functions hit
   - `DA:` = Line coverage data
   - `LF:` = Lines found
   - `LH:` = Lines hit

## 🏗️ GitHub Workflows

### Automated Testing

The project includes GitHub Actions workflows for automated testing:

#### 1. **Unit Tests** (`.github/workflows/test.yml`)
- Runs on Node.js 18 & 20
- Executes all unit tests
- Uploads coverage to Codecov
- Saves coverage artifacts

#### 2. **Quality Checks** (`.github/workflows/quality.yml`)
- Comprehensive quality validation
- Linting, formatting, and testing
- Coverage verification
- Multiple Node.js versions

#### 3. **CI Pipeline** (`.github/workflows/ci.yml`)
- Combined lint, format, and test
- Auto-fix capabilities
- Coverage reporting

### Workflow Triggers
- **Push** to `main` or `develop` branches
- **Pull Request** to `main` or `develop` branches
- **Manual** trigger via workflow_dispatch

### Coverage Integration
- **Codecov**: Automatic coverage upload
- **Artifacts**: Coverage reports saved for 30 days
- **Badges**: Coverage status in README

## 🛠️ Configuration Files

### Jest Configuration (`jest.config.cjs`)
```javascript
module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["**/__tests__/**/*.(ts|tsx|js)", "**/*.(test|spec).(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  verbose: true,
}
```

### Jest Setup (`jest.setup.cjs`)
- Mocks for React Native modules
- Expo module mocks
- Third-party library mocks
- Global test utilities

## 📝 Writing Tests

### Test File Structure
```typescript
// Import dependencies
import { functionToTest } from '@/path/to/module'

// Mock dependencies if needed
jest.mock('@/path/to/dependency')

describe('Component/Function Name', () => {
  it('should do something specific', () => {
    // Arrange
    const input = 'test'
    
    // Act
    const result = functionToTest(input)
    
    // Assert
    expect(result).toBe('expected')
  })
})
```

### Best Practices
1. **Descriptive test names** - Use clear, descriptive test names
2. **Arrange-Act-Assert** - Structure tests in three parts
3. **Mock external dependencies** - Don't test third-party code
4. **Test edge cases** - Include boundary conditions
5. **Keep tests simple** - One assertion per test when possible

## 🔧 Troubleshooting

### Common Issues

1. **JSX Transformation Errors**:
   - Ensure `ts-jest` is properly configured
   - Check file extensions in `testMatch`

2. **Module Resolution**:
   - Verify `moduleNameMapper` configuration
   - Check import paths

3. **Mock Issues**:
   - Ensure mocks are defined before imports
   - Check mock function implementations

### Debug Commands
```bash
# Run specific test file
yarn test path/to/test.ts

# Run tests with verbose output
yarn test --verbose

# Run tests with coverage for specific file
yarn test --coverage --collectCoverageFrom="path/to/file.ts"
```

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [TypeScript Jest](https://kulshekhar.github.io/ts-jest/)
- [Codecov Documentation](https://docs.codecov.io/)

## 🤝 Contributing

When adding new features:

1. **Write tests first** (TDD approach)
2. **Ensure coverage** is maintained or improved
3. **Update documentation** if needed
4. **Run all tests** before submitting PR

### Coverage Requirements
- **Minimum**: 80% overall coverage
- **Target**: 90%+ for new code
- **Critical paths**: 100% coverage required
