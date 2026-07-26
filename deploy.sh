#!/bin/bash
# ============================================================
# GitHub Deployment Script for Rahul Rathore Portfolio
# ============================================================
# Run this script from your local machine after downloading
# the portfolio folder. It will create a GitHub repo and push.
# ============================================================

set -e

echo "🚀 Portfolio GitHub Deployment"
echo "================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   https://git-scm.com/downloads"
    exit 1
fi

# Check if gh CLI is installed
if ! command -v gh &> /dev/null; then
    echo "⚠️  GitHub CLI (gh) not found. Install it for easier repo creation:"
    echo "   https://cli.github.com/"
    echo ""
    echo "   OR create the repo manually at https://github.com/new"
    echo "   Then come back and run this script again."
    exit 1
fi

# Check if logged in to GitHub
if ! gh auth status &> /dev/null; then
    echo "🔐 Please login to GitHub first:"
    gh auth login
fi

# Get GitHub username
GITHUB_USER=$(gh api user -q .login)
echo "✅ Logged in as: $GITHUB_USER"
echo ""

# Ask for repo name
read -p "📦 Enter repository name [rahulrathore-portfolio]: " REPO_NAME
REPO_NAME=${REPO_NAME:-rahulrathore-portfolio}

# Ask if public or private
read -p "🔒 Make repo public? [Y/n]: " IS_PUBLIC
IS_PUBLIC=${IS_PUBLIC:-Y}

if [[ $IS_PUBLIC =~ ^[Yy]$ ]]; then
    VISIBILITY="--public"
else
    VISIBILITY="--private"
fi

# Create repo on GitHub
echo ""
echo "📡 Creating GitHub repository: $GITHUB_USER/$REPO_NAME ..."
gh repo create "$REPO_NAME" $VISIBILITY --source=. --remote=origin --push

echo ""
echo "✅ Repository created and code pushed!"
echo ""
echo "🔗 Repository URL: https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""

# Ask about GitHub Pages
read -p "🌐 Enable GitHub Pages? [Y/n]: " ENABLE_PAGES
ENABLE_PAGES=${ENABLE_PAGES:-Y}

if [[ $ENABLE_PAGES =~ ^[Yy]$ ]]; then
    echo ""
    echo "📄 Enabling GitHub Pages..."
    gh api         --method POST         -H "Accept: application/vnd.github+json"         -H "X-GitHub-Api-Version: 2022-11-28"         "/repos/$GITHUB_USER/$REPO_NAME/pages"         -f "source=branch"         -f "branch=main"         -f "path=/"         2>/dev/null || echo "⚠️  Could not auto-enable Pages. Enable manually in Settings > Pages"

    echo ""
    echo "🌍 Your site will be live at:"
    echo "   https://$GITHUB_USER.github.io/$REPO_NAME"
    echo ""
    echo "   (It may take 2-5 minutes to deploy)"
fi

echo ""
echo "🎉 All done! Your portfolio is on GitHub."
echo ""
