#!/bin/bash
aws ecr get-login-password | docker login --username AWS --password-stdin 779965382548.dkr.ecr.us-east-1.amazonaws.com
docker-compose -f docker-compose-prod.yaml pull
docker-compose -f docker-compose-prod.yaml up