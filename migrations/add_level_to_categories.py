from pymongo import MongoClient

try: 
  import localconfig.mongouri as config
  
  MONGO_URI = config.MONGO_URI
except ModuleNotFoundError:
  MONGO_URI = input("Enter mongo uri: ")


client = MongoClient(MONGO_URI)
db = client.mmdb
count = 0

def update_children(cat, lvl=0):
  global count
  if "_id" in cat.keys():
    db.categories.find_one_and_update({ "_id": cat["_id"] }, { "$set": { "level": lvl }})
    count += 1
    print("Documents updated:", count, end='\r')
  else:
    db.categories.find_one_and_update({
      "name": cat["name"],
      "description": cat["description"]
    },
    {
      "$set": {
        "level": lvl
      }
    })
    count += 1
    print("Documents updated:", count, end='\r')
  
  for child in cat["children"]:
    update_children(child, lvl+1)
    


print("Performing migration 'Add Level to Categories'...")

for top_cat in db.categories.find({"hasParent": False}):
  update_children(top_cat)

print("Documents updated:", count)
