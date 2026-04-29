#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR"

fail() {
  echo "dev-verify: ERROR: $*" >&2
  exit 1
}

require_file() {
  local path="$1"
  [[ -f "$path" ]] || fail "Missing file: $path"
}

echo "dev-verify: checking required root files..."
require_file "README.md"
require_file "LICENSE"
require_file "CHANGELOG.md"
require_file "SECURITY.md"
require_file "CONTRIBUTING.md"
require_file "CODE_OF_CONDUCT.md"
require_file "SUPPORT.md"
require_file "REPO_STANDARD.md"
require_file "VERSION_STACK.md"
require_file "TECHNICAL_GUIDE.md"
require_file "index.html"
require_file "assets/site.webmanifest"
require_file "assets/css/style.css"
require_file "assets/js/main.js"

echo "dev-verify: checking favicon references in index.html..."
while IFS= read -r ref; do
  [[ -n "$ref" ]] || continue
  require_file "$ref"
done < <(grep -Eo 'assets/img/[^"]+\.(png|svg|ico)' index.html | sort -u)

echo "dev-verify: checking manifest icon references..."
while IFS= read -r ref; do
  [[ -n "$ref" ]] || continue
  require_file "assets/$ref"
done < <(grep -Eo '"src"\s*:\s*"img/[^"]+"' assets/site.webmanifest | sed -E 's/.*"img\/([^"]+)".*/img\/\1/' | sort -u)

echo "dev-verify: checking local model (primary) exists..."
PRIMARY_MODEL="$(grep -Eo '"assets/models/[^"]+\.glb"' assets/js/main.js | head -n 1 | tr -d '"')"
require_file "$PRIMARY_MODEL"

echo "dev-verify: checking importmap exists in index.html..."
grep -q 'type="importmap"' index.html || fail "Missing <script type=\"importmap\"> in index.html"
grep -q '"three"' index.html || fail "Importmap missing \"three\" mapping"

echo "dev-verify: OK"

