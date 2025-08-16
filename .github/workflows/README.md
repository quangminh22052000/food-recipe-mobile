# GitHub Workflows

This repository contains GitHub Actions workflows for automated code quality checks and CI/CD processes.

## 📋 Available Workflows

### 1. **Lint & Format** (`.github/workflows/ci.yml`)

**Purpose**: Automated linting and formatting with auto-fix capabilities.

**Triggers**:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches

**Features**:
- ✅ **ESLint auto-fix**: Automatically fixes linting errors
- ✅ **Prettier auto-format**: Automatically formats code
- ✅ **Auto-commit**: Commits fixes if any changes are made
- ✅ **Lockfile management**: Updates yarn.lock if needed
- ✅ **Pull request integration**: Can fix PRs automatically

**Jobs**:
- `lint-fix`: Runs ESLint and Prettier fixes, commits changes

---

### 2. **Quality Checks** (`.github/workflows/quality.yml`)

**Purpose**: Comprehensive quality validation without auto-fix.

**Triggers**:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches
- Manual trigger (`workflow_dispatch`)

**Features**:
- ✅ **Lint check**: Verifies code follows ESLint rules
- ✅ **Format check**: Verifies code follows Prettier formatting
- ✅ **Quality gates**: Ensures code quality standards
- ✅ **Manual execution**: Can be triggered manually

**Jobs**:
- `quality`: Runs lint and format checks (read-only)

---

## 🚀 Workflow Execution

### Automatic Execution
When you push code or create a pull request:
1. **Lint & Format** workflow runs automatically
2. **Quality Checks** workflow runs automatically
3. Any linting/formatting issues are automatically fixed and committed

### Manual Execution
You can manually trigger the Quality Checks workflow:
1. Go to the "Actions" tab in GitHub
2. Select "Quality Checks" workflow
3. Click "Run workflow"

## 📊 Workflow Comparison

| Feature | Lint & Format | Quality Checks |
|---------|---------------|----------------|
| **Purpose** | Auto-fix | Quality validation |
| **Auto-fix** | ✅ | ❌ |
| **Auto-commit** | ✅ | ❌ |
| **Manual trigger** | ❌ | ✅ |
| **Node versions** | 20 | 20 |
| **Lockfile management** | ✅ | ❌ |

## 🔧 Configuration

### ESLint Configuration
- Uses project's `.eslintrc.js` configuration
- Automatically fixes fixable issues
- Reports non-fixable issues

### Prettier Configuration
- Uses project's `.prettierrc` configuration
- Automatically formats code
- Ensures consistent code style

### Node.js Setup
- Uses Node.js 20 for all workflows
- Caches yarn dependencies for faster execution
- Uses `--frozen-lockfile` for consistent installations

## 📝 Best Practices

### For Developers
1. **Run locally first**: Always run `yarn lint` and `yarn format:check` locally before pushing
2. **Review auto-fixes**: Check what the workflow auto-fixed
3. **Follow standards**: Adhere to ESLint and Prettier rules

### For Maintainers
1. **Monitor workflow runs**: Check Actions tab regularly
2. **Review auto-commits**: Ensure auto-fixes are appropriate
3. **Update configurations**: Keep ESLint and Prettier configs up to date

## 🐛 Troubleshooting

### Common Issues

**Workflow fails on linting**:
- Check ESLint configuration
- Run `yarn lint:fix` locally
- Review error messages in workflow logs

**Workflow fails on formatting**:
- Check Prettier configuration
- Run `yarn format` locally
- Review formatting differences

**Auto-commit not working**:
- Check repository permissions
- Ensure workflow has write access
- Review commit message format

## 📚 Related Documentation

- [ESLint Documentation](https://eslint.org/)
- [Prettier Documentation](https://prettier.io/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Project Testing Guide](../TESTING.md)

## 🤝 Contributing

When contributing to this project:
1. Ensure your code passes linting and formatting checks
2. The workflows will automatically fix minor issues
3. Review any auto-fixes before merging
4. Follow the established code quality standards
