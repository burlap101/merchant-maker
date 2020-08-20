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

if (u'shippingMethods' not in db.list_collection_names()) or (db.shippingMethods.count_documents({}) == 0):
  if (u'shippingTypes' not in db.list_collection_names()) or (db.shippingTyps.count_documents({}) == 0):
    db.shippingTypes.insert_one({
      'name': 'free',
      'description': 'no shipping cost to customer either included in price of product or otherwise.',
      'perProduct': True
    })
    print("Default shipping type created.")
  
  db.shippingMethods.insert_one({
    'description': 'free shipping per product',
    'type': db.shippingTypes.find_one(),
    'cost': 0
  })

  print("Default shipping method created.")


result = db.products.update_many({'shippingMethod': None}, {'$set': {'shippingMethod': db.shippingMethods.find_one()}})

print("Products updated:", result.modified_count)


