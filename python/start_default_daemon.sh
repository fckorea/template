#!/bin/bash

if [ "$#" -lt 1 ]; then
  echo "$# is Illegal number of argument."
  echo "Usage: $0 [start|stop|restart]"
  exit 1
fi

PROG_NAME="yogi_observer_linux_while.py"
PID_NAME="pid_yogiobserver.pid"
LOG_NAME="logs/yogiobserver.log"

echo "$1"

if [ "stop" == "$1" -o "restart" == "$1" ]; then
  PID=`cat ${PID_NAME}`
  python3 ${PROG_NAME} -v stop
  ps -ef | grep python | grep ${PROG_NAME} | grep -v grep
  if [ `ps -ef | grep python | grep ${PROG_NAME} | grep -v grep | wc -l` == "1" ]; then
    while [ `ps -ef | grep python | grep ${PROG_NAME} | grep -v grep | wc -l` == "1" ]; do
      kill -12 ${PID}
      ps -ef | grep python | grep ${PROG_NAME} | grep -v grep
      sleep 1s
    done
  else
    rm -rf ${PID_NAME}
  fi
fi

if [ "start" == "$1" -o "restart" == "$1" ]; then
  python3 ${PROG_NAME} -v start
  tail -f ${LOG_NAME}
fi