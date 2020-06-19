import os
from glob import glob
from pymongo import MongoClient

try:
  import localconfig.mongouri as config
  MONGO_URI = config.MONGO_URI
except ModuleNotFoundError:
  MONGO_URI = input("Enter mongo uri: ")

client = MongoClient(MONGO_URI)

db = client.mmdb
count = 0

print("Performing image wipe..", end="")

for product in db.products.find():
  product["images"] = []
  db.products.find_one_and_replace({"_id" : product["_id"]}, product)
  count += 1
  print("..", end="")
print()

for filename in glob("../../server/media/*"):
  os.remove(filename)
