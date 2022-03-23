#!/bin/bash

PWD=$(pwd)
CHROME_DRIVER_DIR=browsers/linux64
CHROME_DRIVER_FILE=$CHROME_DRIVER_DIR/chromedriver

if [ command -v chromedriver > /dev/null 2>&1 ]; then
  echo 'chromedriver already found'
else
  echo 'chromedriver not found in PATH'
  if [ ! -f $CHROME_DRIVER_FILE ]; then
    echo 'local chromedriver not found'
    echo 'Downloading chromedriver'
    mkdir -p $CHROME_DRIVER_DIR
    LATEST_VERSION=$(curl http://chromedriver.storage.googleapis.com/LATEST_RELEASE)
    wget http://chromedriver.storage.googleapis.com/$LATEST_VERSION/chromedriver_linux64.zip
    unzip chromedriver_linux64 -d browsers/linux64
    rm chromedriver_linux64.zip
  else
    echo 'local chromedriver found'
  fi
fi

npm install

if [[ -z "${DISPLAY}" ]]; then
  echo 'Please set a display with Xvfb'
  # Example of setting
  # sudo Xvfb :1 -screen 0 1024x768x24 & export DISPLAY=:1
  exit 1
fi

node src/sample-test.js