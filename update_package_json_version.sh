#!/bin/bash
set -e
set -o pipefail

package_json_file=$1
new_ver=$2

# -i modifies the file
# -E enables enhanced regular expressions
# [[:digit:]] is the equivaletnt of \d
# \" is just matching a " character, but it needs to be escaped
# s/text_to_find/replacement/ is the syntaxt to replace text
sed -i -E "s/(version.*)\"[[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+\"/\1\"$new_ver\"/" "$package_json_file"
