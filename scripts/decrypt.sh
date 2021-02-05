#!/bin/sh

# --batch to prevent interactive command
# --yes to assume "yes" for questions
cat $HOME/uwind/testfile.json
gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASS" \
--output $HOME/uwind/testfile2.json $HOME/uwind/testfile.json.gpg
