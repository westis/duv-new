#!/bin/bash
# Run with ./gitpush.sh

# Prompt for the commit message
read -p "Enter your commit message: " commit_message

# Add changes
echo "Adding changes..."  # Add these lines for debugging
git add .

# Commit with the provided message
echo "Committing changes..."
git commit -m "$commit_message"

# Push to the 'main' branch of your remote repository
echo "Pushing changes..."
git push origin main
