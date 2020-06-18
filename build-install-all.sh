#!/bin/bash

cd migrations
source venv/bin/activate
bash make-migrations.sh
deactivate
cd ../

cd server
npm i
npm run build
cd ../
cd client/admin-portal
npm i
npm run build
cd ../shopping-cart
npm i
npm run build
cd ../../