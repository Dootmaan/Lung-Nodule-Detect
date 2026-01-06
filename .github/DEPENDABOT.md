# Dependabot Configuration

This repository is configured with Dependabot to automatically scan and update dependencies.

## Overview

Dependabot is enabled to:
- Scan npm dependencies weekly (every Monday at 09:00 UTC)
- Create pull requests for dependency updates
- Automatically merge safe updates (patch and minor versions)

## Configuration Files

### `.github/dependabot.yml`

The Dependabot configuration file defines:
- **Package Ecosystem**: npm (for Node.js dependencies)
- **Update Schedule**: Weekly on Mondays at 09:00 UTC
- **Open PR Limit**: Maximum of 5 open pull requests at a time
- **Grouping**: Dependencies are grouped by type (development vs production)
- **Reviewers**: Automatically assigns @Dootmaan as reviewer

### `.github/workflows/dependabot-auto-merge.yml`

The auto-merge workflow automatically:
- **Auto-approves** patch and minor version updates
- **Auto-merges** approved updates using squash merge strategy
- **Flags** major version updates for manual review
- Only runs on pull requests created by Dependabot

## Update Types

| Update Type | Action | Description |
|------------|--------|-------------|
| Patch (e.g., 1.0.0 → 1.0.1) | Auto-merge | Bug fixes and security patches |
| Minor (e.g., 1.0.0 → 1.1.0) | Auto-merge | New features, backward compatible |
| Major (e.g., 1.0.0 → 2.0.0) | Manual review | Breaking changes, requires review |

## Security

- Dependabot runs security scans automatically
- Security updates are prioritized
- All updates go through CI/CD checks before merging
- Major version updates require manual approval for safety

## How It Works

1. **Weekly Scan**: Every Monday, Dependabot checks for outdated dependencies
2. **PR Creation**: Creates pull requests for available updates
3. **Auto-approval**: Workflow automatically approves safe updates (patch/minor)
4. **Auto-merge**: Approved PRs are automatically merged if CI passes
5. **Manual Review**: Major updates are flagged with a comment for manual review

## Disabling Auto-merge

To disable auto-merge for specific updates:
1. Go to Settings → Actions → General
2. Disable "Allow GitHub Actions to create and approve pull requests"

Or modify `.github/workflows/dependabot-auto-merge.yml` to adjust the merge criteria.

## Repository Settings

For auto-merge to work, ensure:
1. Branch protection rules allow Dependabot to merge
2. "Allow auto-merge" is enabled in repository settings
3. GitHub Actions have the necessary permissions

## Monitoring

You can monitor Dependabot activity:
- **Pull Requests**: Check the "Dependabot" label
- **Insights**: Go to Insights → Dependency graph → Dependabot
- **Security**: Check Security → Dependabot alerts for vulnerabilities
