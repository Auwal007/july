#!/bin/bash
echo "Starting deployment from backend folder..."
cd /home/site/wwwroot/backend
pip install -r requirements.txt
echo "Dependencies installed successfully"
