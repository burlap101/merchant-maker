#!/bin/bash

cd server
npm run build
cd ../
cd client/admin-portal
npm run build