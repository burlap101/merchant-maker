from pymongo import MongoClient

class Categories():
  def __init__(self):
    self.categories_array = []

  def array_categories(self, category):
    if ("parent" in category.keys()) and (category["parent"] != {}):
      self.array_categories(category["parent"])
    if ("parent" in category.keys()):
      del category["parent"]
    self.categories_array.append(category)
    return self.categories_array


try:
  import localconfig.mongouri as config
  MONGO_URI = config.MONGO_URI
except ModuleNotFoundError:
  MONGO_URI = input("Enter mongo uri: ")

    
client = MongoClient(MONGO_URI)

db = client.mmdb
count = 0

print("Performing migration 'Add categories to products'...")

for product in db.products.find():
  if not ("categories" in product.keys()):
    product["categories"] = Categories().array_categories(product["category"])
    db.products.find_one_and_replace({"_id" : product['_id']}, product)
    count += 1
    print("Documents updated:", count, end='\r')

print("Documents updated:", count)
