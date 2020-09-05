#!/bin/bash

cd migrations
source venv/bin/activate
bash make-migrations.sh
deactivate
cd ../

cd server
npm run build
cd ../
cd client/admin-portal
npm run build:dev
cd ../shopping-cart
npm run build:dev
cd ../shopfront
npm run build:dev
cd ../../
