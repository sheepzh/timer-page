#!/bin/bash

FOLDER=$(
    cd "$(dirname "$0")/.."
    pwd
)
TARGET_PATH="${FOLDER}/ppp"

COPYFILE_DISABLE=1 tar -zcvf ${TARGET_PATH} \
    --exclude=dist/ \
    --exclude=.git/ \
    --exclude=node_modules \
    --exclude=.vitepress/cache/ \
    --exclude=*.tsbuildinfo/ \
    --exclude=package-lock.json \
    --exclude=ppp \
    ./
