#!/usr/bin/env bash
# Exit script if any command fails
set -o errexit

# Install all dependencies
npm install

# Define cache directories
PUPPETEER_CACHE_DIR=/opt/render/.cache/puppeteer
XDG_CACHE_HOME=/opt/render/.cache

# Store or pull the Puppeteer cache from the build cache
if [[ ! -d $PUPPETEER_CACHE_DIR ]]; then 
  echo "...Copying Puppeteer Cache from Build Cache"
  cp -R $XDG_CACHE_HOME/puppeteer/ $PUPPETEER_CACHE_DIR
else 
  echo "...Storing Puppeteer Cache in Build Cache"
  cp -R $PUPPETEER_CACHE_DIR $XDG_CACHE_HOME
fi
