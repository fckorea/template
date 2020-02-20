#!/bin/bash

yarn build
rm -rf ../server/public
mv build ../server/public
echo "DonE!!!"
