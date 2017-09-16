#!/bin/bash

# Unpack encrypted ssh key
openssl aes-256-cbc -K $encrypted_e99421f60ac1_key -iv $encrypted_e99421f60ac1_iv -in travis_deploy_rsa.enc -out /tmp/deploy_rsa -d
chmod 600 /tmp/deploy_rsa

# Setup ssh agents and add the key
eval "$(ssh-agent -s)"
ssh-add /tmp/deploy_rsa

# rsync over dist/
rsync -r --delete-after --quiet $TRAVIS_BUILD_DIR/dist/* ngetahun@jacobshack.com:/home/ngetahun/www/2017f.jacobshack.com