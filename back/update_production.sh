#!/bin/bash

# Оновлення продакшн середовища
sudo systemctl stop my-app
git pull origin master
pip install -r requirements.txt
sudo systemctl start my-app
echo "Продакшн середовище успішно оновлено!"