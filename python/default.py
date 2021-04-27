#-*- coding: utf-8 -*-
#-------------------------------------------------------------------------------
# Name:        <PROGRAM_NAME>
# Purpose:
# Python version: 3.7.3
#
# Author:    fckorea
#
# Created:    YYYY-MM-DD
# (c) fckorea YYYY
#-------------------------------------------------------------------------------

import os
import sys
from optparse import OptionParser
import logging
import logging.handlers
import json
import traceback

PROG_NAME = '<PROGRAM_NAME>' ### CHANGE!!!
PROG_VER = '1.0'
LOGGER = None
LOG_DIR = './logs'
LOG_FILENAME = os.path.abspath('%s/%s.log' % (LOG_DIR, PROG_NAME.replace(' ', '-').lower()))
CONFIG = {}

#=============================== Main Functions ===============================#
def fnMain(argOptions, argArgs):
  global LOGGER

  try:
    return True
  except:
    LOGGER.error(' *** Error in Main.')
    LOGGER.error(traceback.format_exc())
  finally:
    return True

#=============================== Config & Init Function ===============================#
def fnGetConfig(argConfigFilePath):
  global LOGGER
  global CONFIG

  CONFIG = fnReadJsonFile(argConfigFilePath)
  
  if len(CONFIG) != 0:
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
    LOGGER.error(traceback.format_exc())
  finally:
    return res

def fnWriteJsonFile(argJsonFilePath, argData):
  global LOGGER

  res = True
  
  try:
    with open(argJsonFilePath, 'w', encoding='UTF8') as outfile:
      json.dumps(argData, outfile, indent=2)
  except:
    LOGGER.error(' *** Error write json file.')
    LOGGER.error(traceback.format_exc())
    res = False
  finally:
    return res

def fnCreateLogger(argLogDir, argLoggername, argLogLevel, argLogFormat='%(asctime)s [%(levelname)s] %(message)s - %(filename)s:%(lineno)s'):
  if os.path.isdir(os.path.abspath(argLogDir)) is False:
    os.mkdir(os.path.abspath(argLogDir))

  logger = logging.getLogger(argLoggername)

  logger.setLevel(argLogLevel)

  formatter = logging.Formatter(argLogFormat)
  
  file_handler = logging.handlers.TimedRotatingFileHandler(LOG_FILENAME, when='midnight', interval=1, backupCount=7, encoding='UTF-8')
  file_handler.suffix = '%Y%m%d'
  file_handler.setFormatter(formatter)

  stream_handler = logging.StreamHandler()
  stream_handler.setFormatter(formatter)

  logger.addHandler(file_handler)
  logger.addHandler(stream_handler)

  return logger

def fnInit(argOptions):
  global PROG_NAME
  global LOGGER
  global LOG_DIR
  global LOG_FILENAME

  LOGGER = fnCreateLogger(LOG_DIR, PROG_NAME.replace(' ', ''), logging.DEBUG if argOptions.o_bVerbose is True else logging.INFO)

  if argOptions.o_sConfigFilePath != None:
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
  usage = '%prog [options] <File or Dir path>\n\tex) %prog test\\'

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
