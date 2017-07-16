#!/bin/bash

# Create a tarball
cd ./build
tar -zcvf ../dist.tar.gz ./**
cd ..
# Copy it to the server.
scp -r -i ~/.ssh/amazon.pem ./dist.tar.gz ubuntu@potsides.com:~
# Clear current files.
ssh -i ~/.ssh/amazon.pem ubuntu@potsides.com "rm -r ~/www/html/wordgame/** || true"
# Extract the new ones.
ssh -i ~/.ssh/amazon.pem ubuntu@potsides.com "tar -xf ~/dist.tar.gz -C ~/www/html/wordgame"
#Clean up zip.
rm dist.tar.gz
