#!/bin/bash

cd server
npm i
npm run build
cd ../
cd client/admin-portal
npm i
npm run build
cd ../../