#!/bin/sh

# --batch to prevent interactive command
# --yes to assume "yes" for questions
gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASS" \
--output ../testfile2.json ../testfile.json.gpg
