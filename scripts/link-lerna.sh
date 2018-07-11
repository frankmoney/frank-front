#!/usr/bin/env bash

set -x

lib_repo_path=$1

cur_dir=`pwd`
modules=$(ls -1 )

for module_dir in $lib_repo_path/packages/*; do
  cd $module_dir
  pkg_name=$(node -p 'require("./package.json").name')
  yarn link
  cd $cur_dir
  yarn link $pkg_name
done
