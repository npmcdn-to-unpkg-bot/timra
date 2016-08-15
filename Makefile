
# Common Variables
#

MAKEFILE_DIR := $(dir $(lastword $(MAKEFILE_LIST)))
BASE_DIR := $(realpath $(CURDIR)/$(MAKEFILE_DIR))
SRC_DIR := $(BASE_DIR)/src

include local.mk

.PHONY: run


all: build

run:
	npm run clean && nodemon server -e js,jade

build:

