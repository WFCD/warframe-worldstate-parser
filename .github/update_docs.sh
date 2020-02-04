#!/bin/bash
setup_git() {
  git config --global user.email "travis@travis-ci.com"
  git config --global user.name "Travis CI"
  git remote set-url origin https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git
  git checkout master
}

publish_docs() {
  git add docs/.
  git commit --message "chore(automated): Docs Update ${TRAVIS_BUILD_NUMBER} [ci skip]"
  git push origin master
}

setup_git
npm run build-docs
publish_docs
