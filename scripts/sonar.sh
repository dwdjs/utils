#!/bin/bash

sonar-scanner \
  -Dsonar.projectKey=utils \
  -Dsonar.sources=./src \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=831b75be843ab10a0c00be22528f097655808c81
