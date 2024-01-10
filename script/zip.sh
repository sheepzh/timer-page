#!/bin/bash

FOLDER=$(
    cd "$(dirname "$0")/.."
    pwd
)
TARGET_PATH="${FOLDER}/ppp"

tar -zcvf ${TARGET_PATH} \
    --exclude=dist/ \
    --exclude=.git/objects \
    --exclude=node_modules \
    --exclude=*.tsbuildinfo/ \
    --exclude=ppp \
    ./
