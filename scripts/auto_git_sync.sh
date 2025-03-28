#!/bin/bash

# Set working directory
cd ~/artempiremj-ai-platform/artempiremj-ai-platform

# Add all changes
git add .

# Commit with a timestamp
git commit -m "Auto-sync: $(date '+%Y-%m-%d %H:%M:%S')"

# Push to GitHub
git push origin main

echo "Git sync completed at $(date)"
