#!/bin/bash
set -e
set -o pipefail

function update_package_json_version() {
  # -i modifies the file
  # -E enables enhanced regular expressions
  # [[:digit:]] is the equivaletnt of \d
  # \" is just matching a " character, but it needs to be escaped
  # s/text_to_find/replacement/ is the syntaxt to replace text
  sed -i -E "s/(version.*)\"[[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+\"/\1\"$new_ver\"/" package.json
}

new_ver=$1
echo "Releasing ner version $new_ver"

npm set "//registry.npmjs.org/:_authToken=$NPM_TOKEN"

npm run update-docs $new_ver

update_package_json_version

cd generate_results
npm audit
npm run test-ci
npm run functional-test-ci
update_package_json_version
cd ..

cd frontend
npm audit
npm run build
npm run test-ci
update_package_json_version
cd ..

cd generate_results
npm publish
cd ..

cd frontend
npm publish
cd ..

