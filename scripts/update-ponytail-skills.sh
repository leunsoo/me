#!/usr/bin/env bash
# ponytail 스킬 재-vendoring: DietrichGebert/ponytail 최신본을 .agents/skills/ponytail*에 반영.
# 수동 vendoring 스킬이라 skills-lock.json / `npx skills update` 대상이 아님 (docs/skills.md 참고).
set -euo pipefail

REPO="https://github.com/DietrichGebert/ponytail.git"
SKILLS=(ponytail ponytail-review ponytail-audit ponytail-debt)
TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

git clone --depth 1 --quiet "$REPO" "$TMP_DIR"
COMMIT="$(git -C "$TMP_DIR" rev-parse --short HEAD)"

ROOT="$(git rev-parse --show-toplevel)"
for s in "${SKILLS[@]}"; do
  rm -rf "$ROOT/.agents/skills/$s"
  cp -R "$TMP_DIR/skills/$s" "$ROOT/.agents/skills/$s"
done

echo "ponytail skills refreshed from $REPO @ $COMMIT"
