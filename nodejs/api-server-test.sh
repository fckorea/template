#!/bin/bash

arr_test_string=(1 2 3 4 5 6 7 8 9 10 11 12 13 14 15)

for i in ${arr_test_string[@]}; do
  echo $i A
  curl -I http://localhost:3000/api/v1/admin/logout?key=a
  echo $i B
  curl -I http://localhost:3000/api/v1/admin/logout?key=b
done