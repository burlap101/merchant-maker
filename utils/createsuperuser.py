#! venv/bin/python3

from pymongo import MongoClient
import bcrypt
from getpass import getpass
welcome_msg = """ 
This script creates a superuser within your site's database before any other users exist.
After creation of at least one user with this utility, additional users can be created through the admin portal using the created logon.
"""
print(welcome_msg, '\n')
mongo_uri = input("Enter the MongoDB client URI: ")

client = MongoClient(mongo_uri)

db = client.mmdb

username = input("Enter username: ")
password = getpass()
if (password == getpass("Confirm password: ")):
  salt = bcrypt.gensalt(rounds=10)
  hashed = bcrypt.hashpw(password.encode(), salt)
  userid = db.users.insert_one({
    "username": username,
    "password": hashed.decode(),
    "group": "superuser"
  }).inserted_id
else:
  raise ValueError("Passwords did not match")
