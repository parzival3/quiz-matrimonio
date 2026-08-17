#!/bin/bash
# ============================================================
# Quiz Matrimonio — Setup GitHub Pages
# ============================================================
# Esegui questo script dalla cartella quiz-matrimonio:
#   cd quiz-matrimonio
#   chmod +x setup-github.sh
#   ./setup-github.sh
# ============================================================

set -e

REPO_NAME="quiz-matrimonio"

echo ""
echo "╔══════════════════════════════════════╗"
echo "║  Quiz Matrimonio - GitHub Setup      ║"
echo "╚══════════════════════════════════════╝"
echo ""

# 1. Init git repo
echo "→ Inizializzazione repository git..."
git init
git add .
git commit -m "🎉 Quiz Matrimonio Luca & Elisa"

# 2. Create GitHub repo
echo ""
echo "→ Creazione repository su GitHub..."
gh repo create "$REPO_NAME" --public --source=. --push

# 3. Enable GitHub Pages via Actions
echo ""
echo "→ Abilitazione GitHub Pages..."
# The API call to enable Pages with Actions as source
gh api \
  --method POST \
  "/repos/$(gh api user --jq .login)/$REPO_NAME/pages" \
  -f "build_type=workflow" 2>/dev/null || \
gh api \
  --method PUT \
  "/repos/$(gh api user --jq .login)/$REPO_NAME/pages" \
  -f "build_type=workflow" 2>/dev/null || \
echo "  ⚠ Configurazione Pages automatica non riuscita."
echo "  Se necessario, vai su Settings → Pages → Source → GitHub Actions"

# 4. Get the URL
USERNAME=$(gh api user --jq .login)
PAGES_URL="https://${USERNAME}.github.io/${REPO_NAME}/"

echo ""
echo "══════════════════════════════════════"
echo "  ✅ Fatto!"
echo ""
echo "  Repository: https://github.com/${USERNAME}/${REPO_NAME}"
echo "  GitHub Pages: ${PAGES_URL}"
echo ""
echo "  📱 Link quiz invitati:"
echo "     ${PAGES_URL}quiz.html"
echo ""
echo "  🖥  Link gioco sposi:"
echo "     ${PAGES_URL}reveal.html"
echo ""
echo "  ⏳ La prima build può richiedere 1-2 minuti."
echo "     Controlla: https://github.com/${USERNAME}/${REPO_NAME}/actions"
echo "══════════════════════════════════════"
echo ""
