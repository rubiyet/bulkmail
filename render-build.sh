#!/usr/bin/env bash
# Exit script if any command fails
set -o errexit

# Install all dependencies
npm install

# Define cache directories
PUPPETEER_CACHE_DIR=/opt/render/.cache/puppeteer
XDG_CACHE_HOME=/opt/render/.cache

# Check if the Puppeteer cache directory exists
if [[ -d $XDG_CACHE_HOME/puppeteer ]]; then
  echo "...Copying Puppeteer Cache from Build Cache"
  cp -R $XDG_CACHE_HOME/puppeteer/ $PUPPETEER_CACHE_DIR
else
  echo "...Puppeteer cache directory does not exist, skipping copy."
fi

# Continue with the build
