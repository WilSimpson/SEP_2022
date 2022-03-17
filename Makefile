#
#  ______ _   _     _                      _                 _                  
# |  ____| | | |   (_)            /\      | |               | |                 
# | |__  | |_| |__  _  ___ ___   /  \   __| |_   _____ _ __ | |_ _   _ _ __ ___ 
# |  __| | __| '_ \| |/ __/ __| / /\ \ / _` \ \ / / _ \ '_ \| __| | | | '__/ _ \
# | |____| |_| | | | | (__\__ \/ ____ \ (_| |\ V /  __/ | | | |_| |_| | | |  __/
# |______|\__|_| |_|_|\___|___/_/    \_\__,_| \_/ \___|_| |_|\__|\__,_|_|  \___|                                                                         

#
# ---------------
# Software Engineering Project - Spring22 - Team2
# ---------------
# Makefile for building, running, and testing the frontend and backend services

# Import dotenv files
ifneq (,$(wildcard ./backend/.env))
	include ./backend/.env
	export
endif
ifneq (,$(wildcard ./frontend/.env))
	include ./frontend/.env
	export
endif
ifneq (,$(wildcard ./.env))
	include .env
	export
endif

# Capitalize the $* variable
UC = $(shell echo '$*' | tr '[:lower:]' '[:upper:]')

# __      __            
# \ \    / /            
#  \ \  / /_ _ _ __ ___ 
#   \ \/ / _` | '__/ __|
#    \  / (_| | |  \__ \
#     \/ \__,_|_|  |___/

# Base version of the frontend
BASE_VERSION_FRONTEND ?= 0.1.0

# Base version of the backend
BASE_VERSION_BACKEND ?= 0.1.0

# Root directory
ROOT_DIR := $(shell dirname $(realpath $(firstword $(MAKEFILE_LIST))))

# Backend base directory
BASE_DIR_BE := $(realpath $(ROOT_DIR)/backend)

# Frontend base directory
BASE_DIR_FE := $(realpath $(ROOT_DIR)/frontend)

# Bash command
BASH = bash -c

# Current time for versioning
time := $(shell date +%s)

#  _______                   _       
# |__   __|                 | |      
#    | | __ _ _ __ __ _  ___| |_ ___ 
#    | |/ _` | '__/ _` |/ _ \ __/ __|
#    | | (_| | | | (_| |  __/ |_\__ \
#    |_|\__,_|_|  \__, |\___|\__|___/
#                  __/ |             
#                 |___/              

#
# Setup Targets
#

install: install-frontend install-backend

install-frontend:
	@echo Installing frontend libraries
	cd $(BASE_DIR_FE) && npm install

install-backend:
	@echo Installing backend libraries
	pip install -r $(BASE_DIR_BE)/requirements.txt

	@echo Migrating backend database
	python $(BASE_DIR_BE)/manage.py migrate

#
# Docker Targets
#

build: build-frontend build-backend

build-%:
	@echo Building $*
	docker build -t ea-$* -f $(ROOT_DIR)/$*.Dockerfile $(ROOT_DIR)/.

push: push-frontend push-backend

push-%: build-%
	@echo Pushing $*
	docker tag ea-$* $(EA_REGISTRY)/$*:latest
	docker tag ea-$* $(EA_REGISTRY)/$*:$(BASE_VERSION_$(UC))
	docker tag ea-$* $(EA_REGISTRY)/$*:$(BASE_VERSION_$(UC))-$(time)
	docker push $(EA_REGISTRY)/$*:$(BASE_VERSION_$(UC))-$(time)
	docker push $(EA_REGISTRY)/$*:latest
	docker push $(EA_REGISTRY)/$*:$(BASE_VERSION_$(UC))

#
# Testing Targets
#

test: test-frontend test-backend

test-frontend: install-frontend
	cd $(BASE_DIR_FE) && npm test -- --watchAll=false

test-backend: install-backend
	python $(BASE_DIR_BE)/manage.py test
	python $(BASE_DIR_BE)/manage.py test backend


#
# AWS Targets
#
aws-setup: aws-login aws-docker-login

aws-login:
ifndef GITPOD_AWS_CONFIGURED
	@aws configure sso --profile team2
	@export GITPOD_AWS_CONFIGURED=true
else
	@echo "Already logged in"
endif

aws-docker-login:
ifndef GITPOD_AWS_CONFIGURED
	@echo "Not signed in"
else
	@aws ecr get-login-password --profile team2 | docker login --username AWS --password-stdin $(EA_BASE_REGISTRY)
endif