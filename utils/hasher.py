#! venv/bin/python3

import bcrypt

password = input("Enter password: ")
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt(10))
print(hashed)

password2 = input("Enter password again: ")
print(bcrypt.checkpw(password2.encode(), hashed))