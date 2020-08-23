from pymongo import MongoClient

try:
  import localconfig.mongouri as config
  MONGO_URI = config.MONGO_URI
except ModuleNotFoundError:
  MONGO_URI = input("Enter mongo uri: ")


client = MongoClient(MONGO_URI)
db = client.mmdb
count = 0

print("Performing migration 'add default shipping method'...")

if (u'shippingmethods' not in db.list_collection_names()) or (db.shippingmethods.count_documents({}) == 0):
  
  db.shippingmethods.insert_one({
    'name': 'Free',
    'description': 'free shipping per product',
    'perProduct': True,
    'cost': 0
  })

  print("Default shipping method created.")


result = db.products.update_many({'shippingmethod': None}, {'$set': {'shippingMethod': db.shippingmethods.find_one()}})

print("Documents updated:", result.modified_count)


