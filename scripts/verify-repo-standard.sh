#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "verify-repo-standard: ERROR: $*" >&2
  exit 1
}

require_file() {
  local path="$1"
  [[ -f "$path" ]] || fail "Missing required file: $path"
}

require_dir() {
  local path="$1"
  [[ -d "$path" ]] || fail "Missing required directory: $path"
}

cd "$(dirname "${BASH_SOURCE[0]}")/.."

echo "verify-repo-standard: checking required root files..."
require_file "README.md"
require_file "LICENSE"
require_file "CHANGELOG.md"
require_file "SECURITY.md"
require_file "CONTRIBUTING.md"
require_file "CODE_OF_CONDUCT.md"
require_file "SUPPORT.md"
require_file "REPO_STANDARD.md"

echo "verify-repo-standard: checking required GitHub UX files..."
require_dir ".github"
require_file ".github/PULL_REQUEST_TEMPLATE.md"
require_dir ".github/ISSUE_TEMPLATE"
require_file ".github/ISSUE_TEMPLATE/bug_report.yml"
require_file ".github/ISSUE_TEMPLATE/feature_request.yml"
require_file ".github/ISSUE_TEMPLATE/config.yml"
require_dir ".github/workflows"
require_file ".github/workflows/lint.yml"
require_file ".github/workflows/tests.yml"
require_file ".github/workflows/security.yml"
require_file ".github/dependabot.yml"

echo "verify-repo-standard: OK"

