# GitHub Workflows

Thư mục này chứa các GitHub Actions workflows cho project Food Recipe Mobile.

## 📁 Các Workflows

### 1. **test.yml** - Unit Tests
- **Mục đích**: Chạy unit tests
- **Trigger**: Push/PR vào main/develop
- **Node.js**: 18, 20
- **Actions**:
  - Install dependencies
  - Run tests (`yarn test:ci`)
  - Upload coverage lên Codecov
  - Lưu coverage artifacts

### 2. **quality.yml** - Quality Checks
- **Mục đích**: Kiểm tra chất lượng code
- **Trigger**: Push/PR vào main/develop
- **Node.js**: 20
- **Actions**:
  - Linting (ESLint)
  - Formatting check (Prettier)
  - Unit tests
  - Coverage reports
  - Upload artifacts

### 3. **ci.yml** - Lint & Format Auto Fix
- **Mục đích**: Tự động fix lint và format
- **Trigger**: Push/PR vào main/develop
- **Actions**:
  - ESLint auto-fix
  - Prettier auto-format
  - Commit changes nếu cần

## 🚀 Cách sử dụng

### Chạy thủ công
```bash
# Trong GitHub repository
Actions > Unit Tests > Run workflow
```

### Xem kết quả
- **Actions tab**: Xem logs và kết quả
- **Codecov**: Xem coverage reports
- **Artifacts**: Tải coverage reports

## 📊 Coverage Reports

Workflows sẽ tạo:
- `lcov.info` - Coverage data
- `clover.xml` - XML format
- `coverage-final.json` - JSON format
- `lcov-report/` - HTML reports

## 🔧 Cấu hình

### Environment Variables
- Không cần environment variables đặc biệt
- Sử dụng `yarn install --frozen-lockfile` để đảm bảo consistency

### Cache
- Node.js modules được cache
- Yarn cache được enable

### Matrix Strategy
- Test trên nhiều phiên bản Node.js
- Đảm bảo compatibility

## 🐛 Troubleshooting

### Lỗi thường gặp:
1. **Duplicate job names**: Đảm bảo mỗi job có tên duy nhất
2. **Deprecated actions**: Sử dụng `actions/upload-artifact@v4` thay vì v3
3. **Lockfile mismatch**: Chạy `yarn install` để cập nhật lockfile

### Scripts cần thiết:
- `test:ci`: Chạy tests trong CI environment
- `test:coverage`: Tạo coverage reports
