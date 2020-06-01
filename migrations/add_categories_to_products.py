from pymongo import MongoClient

class Categories():
  def __init__(self):
    self.categories_array = []

  def array_categories(self, category):
    if (category["parent"]) and (category["parent"] != {}):
      self.array_categories(category["parent"])
    del category["parent"]
    self.categories_array.append(category)
    return self.categories_array
    
    
mongo_uri = input("Enter mongo URI: ")
print(mongo_uri)
client = MongoClient(mongo_uri)

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