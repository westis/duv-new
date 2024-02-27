#!/bin/bash

# Run with ./deploy.sh
# Temporary comment in case you don't have a build process
# npm run build   

# Clear out old distribution folder, assuming it's called 'dist'
rm -rf dist

# Generate your production website build
npm run build

# Move into the 'dist' directory
cd dist

# Initialize a separate git repository here for deployment
git init
git add .
git commit -m "Deploy updates"

# Push to the GitHub Pages repo (in this case the 'gh-pages' branch)
git push -f https://github.com/westis/westis.github.io gh-pages
