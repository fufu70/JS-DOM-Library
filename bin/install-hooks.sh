#!/bin/bash
cp bin/pre-commit.sh .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo "\033[42mHOOKS INSTALLED\033[0m\n"