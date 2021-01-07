#-*- coding: utf-8 -*-
#-------------------------------------------------------------------------------
# Name:        <PROGRAM_NAME>
# Purpose:
# Python version: 3.7.3
#
# Author:    fckorea
#
# Created:    2019-07-27
# (c) fckorea 2019
#-------------------------------------------------------------------------------

import os
import sys
from optparse import OptionParser
import logging
import logging.handlers
import json
import traceback
import daemon
from daemon import pidfile
import time

PROG_NAME = '<PROGRAM_NAME>' ### CHANGE!!!
PROG_VER = '1.0'
LOGGER = None
LOG_DIR = './logs'
LOG_FILENAME = os.path.abspath('%s/%s.log' % (LOG_DIR, PROG_NAME.replace(' ', '-').lower()))
LOG_FILE_NO = None
PID_FILENAME = os.path.abspath('pid_%s.pid' % (PROG_NAME.replace(' ', '-').lower()))
CONFIG = {}

#=============================== Daemon Functions ===============================#
def fnDo():
  global LOGGER

  try:
    time.sleep(3)
    LOGGER.info('running...')
  except SystemExit:
    LOGGER.info(' * Signal Exit...')
  except:
    LOGGER.error(' *** Daemon error!')
    LOGGER.debug(traceback.format_exc())
  finally:
    LOGGER.info(' * Terminate function...')
  return True

def fnStartDaemon():
  global LOGGER
  global LOG_FILE_NO
  global PID_FILENAME

  try:
    context = daemon.DaemonContext(
      working_directory='./',
      umask=0o002,
      pidfile=pidfile.TimeoutPIDLockFile(PID_FILENAME)
    )
    context.files_preserve = LOG_FILE_NO
    with context:
      LOGGER.info(' * START Daemon!')
      fnDo()
  except:
    LOGGER.error(' *** Error Start Daemon!!!')
    LOGGER.debug(traceback.format_exc())

  return True

def fnStopDaemon():
  global LOGGER
  global PID_FILENAME

  try:
    LOGGER.info(' * STOP Daemon!')
    if os.path.isfile(PID_FILENAME):
      pid = None
      f = open(PID_FILENAME, 'r')

      for line in f:
        pid = line.strip()
      
      f.close()

      if pid is not None:
        LOGGER.info(' * Kill Daemon PID(%s)' % (pid))
        os.system(('kill %s' % (pid)))
      else:
        LOGGER.info(' * Daemon PID is None')
    else:
      LOGGER.info(' * Daemon is not running...')
  except Exception as e:
    LOGGER.error(' *** Error Stop Daemon!!!')
    LOGGER.error(e)
    LOGGER.debug(traceback.format_exc())

  return True

def fnStatusDaemon():
  global LOGGER
  global PID_FILENAME

  try:
    LOGGER.info(' * CHECK STATUS Daemon!')
    if os.path.isfile(PID_FILENAME):
      pid = None
      f = open(PID_FILENAME, 'r')

      for line in f:
        pid = line.strip()
      
      f.close()

      if pid is not None:
        LOGGER.info(' * Daemon PID(%s)' % (pid))
      else:
        LOGGER.info(' * Daemon PID is None')
    else:
      LOGGER.info(' * Daemon is not running...')
  except Exception as e:
    LOGGER.error(' *** Error Status Daemon!!!')
    LOGGER.error(e)
    LOGGER.debug(traceback.format_exc())

  return True

#=============================== Main Functions ===============================#
def fnMain(argOptions, argArgs):
  global LOGGER

  cmd = argArgs[0].lower()

  try:
    if cmd == 'start':
      if fnGetConfig(parsed_options.o_sConfigFilePath):
        LOGGER.info('Config file("%s")' % (parsed_options.o_sConfigFilePath))
        fnStartDaemon()
    elif cmd == 'stop':
      fnStopDaemon()
    elif cmd == 'restart':
      fnStopDaemon()
      fnStartDaemon()
    elif cmd == 'status':
      fnStatusDaemon()

    return True
  except:
      raise

#=============================== Config & Init Function ===============================#
def fnGetConfig(argConfigFilePath):
  global LOGGER
  global CONFIG

  CONFIG = fnReadJsonFile(argConfigFilePath)
  
  if len(CONFIG) is not 0:
    return True
  
  return False

def fnReadJsonFile(argJsonFilePath):
  global LOGGER

  res = {}

  try:
    if os.path.isfile(argJsonFilePath):
      res = json.loads(open(argJsonFilePath, encoding='UTF8').read())
      LOGGER.info(' * Read json data')
    else:
      LOGGER.error(' * json file not found.')
  except:
    LOGGER.error(' *** Error read json file.')
    LOGGER.debug(traceback.format_exc())
  finally:
    return res

def fnInit(argOptions):
  global PROG_NAME
  global LOGGER
  global LOG_DIR
  global LOG_FILENAME
  global LOG_FILE_NO

  if os.path.isdir(os.path.abspath(LOG_DIR)) is False:
    os.mkdir(os.path.abspath(LOG_DIR))

  LOGGER = logging.getLogger(PROG_NAME.replace(' ', ''))

  if argOptions.o_bVerbose is True:
    LOGGER.setLevel(logging.DEBUG)
  else:
    LOGGER.setLevel(logging.INFO)

  formatter = logging.Formatter('[%(levelname)s] - %(filename)s:%(lineno)s\t- %(asctime)s - %(message)s')
  
  file_handler = logging.handlers.TimedRotatingFileHandler(LOG_FILENAME, when='midnight', backupCount=7, encoding='UTF-8')
  file_handler.suffix = '%Y%m%d'
  file_handler.setFormatter(formatter)

  stream_handler = logging.StreamHandler()
  stream_handler.setFormatter(formatter)

  LOGGER.addHandler(file_handler)
  LOGGER.addHandler(stream_handler)

  LOG_FILE_NO = [ file_handler.stream.fileno() ]

  if argOptions.o_sConfigFilePath is not None:
    LOGGER.info('Config file("%s")' % (parsed_options.o_sConfigFilePath))
    fnGetConfig(parsed_options.o_sConfigFilePath)

  return True

#=============================== OptionParser Functions ===============================#
def fnSetOptions():
  global PROG_VER

  parser = None

  # Ref. https://docs.python.org/2/library/optparse.html#optparse-reference-guide
  options = [
    { 'Param': ('-c', '--config'), 'action': 'store', 'type': 'string', 'dest': 'o_sConfigFilePath', 'default': 'config.conf', 'metavar': '<Config file path>', 'help': 'Set config file path.\t\tdefault) config.conf (contents type is JSON)' },
    { 'Param': ('-v', '--verbose'), 'action': 'store_true', 'dest': 'o_bVerbose', 'default': False, 'metavar': '<Verbose Mode>', 'help': 'Set verbose mode.\t\tdefault) False' },
    { 'Param': ('-t', '--true'), 'action': 'store_true', 'dest': 'o_bTrue', 'default': False, 'metavar': '<Bool>', 'help': 'Set bool.\t\tdefault) False' },
    { 'Param': ('-f', '--false'), 'action': 'store_false', 'dest': 'o_bFalse', 'default': True, 'metavar': '<Bool>', 'help': 'Set bool.\t\tdefault) True' },
    { 'Param': ('-s', '--string'), 'action': 'store', 'type': 'string', 'dest': 'o_sString', 'metavar': '<String>', 'help': 'Set string.' },
    { 'Param': ('-i', '--int'), 'action': 'store', 'type': 'int', 'dest': 'o_iInt', 'metavar': '<Int>', 'help': 'Set int.' },
  ]
  usage = '%prog [options] (start|stop|status|restart)\n\tex) %prog start'

  parser = OptionParser(usage = usage, version = '%prog ' + PROG_VER)

  for option in options:
    param = option['Param']
    del option['Param']
    parser.add_option(*param, **option)

  return parser

def fnGetOptions(argParser):
  # NECESSARY OPTIONS
  if len(sys.argv) == 1:
    return argParser.parse_args(['--help'])

  # NECESSARY ARGV
  if len(argParser.parse_args()[1]) == 0:
    return argParser.parse_args(['--help'])

  return argParser.parse_args()

if __name__ == '__main__':
  ### REMOVE
  if PROG_NAME == '<PROGRAM_NAME>':
    print('*** PROGRAM NAME IS DEFAULT. CHANGE THE PROGRAM NAME!!! ***')
    exit()
  ### REMOVE
  (parsed_options, argvs) = fnGetOptions(fnSetOptions())
  if fnInit(parsed_options):
    LOGGER.info('Start %s...' % (PROG_NAME))
    fnMain(parsed_options, argvs)
    LOGGER.info('Terminate %s...' % (PROG_NAME))
