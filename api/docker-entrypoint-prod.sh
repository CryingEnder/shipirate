#!/bin/sh

echo "Reinstalling Bcrypt..."
npm uninstall bcrypt
npm install bcrypt

echo "Starting the server..."
npm start 