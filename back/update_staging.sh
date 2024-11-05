#!/bin/bash

# Оновлення тестового середовища 
sudo systemctl stop my-app-dev
git pull origin development
pip install -r requirements.txt
sudo systemctl start my-app-dev
echo "Тестове середовище успішно оновлено!"