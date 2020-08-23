#! /bin/bash

python3 add_categories_to_products.py $1
python3 add_level_to_categories.py $1
python3 add_default_shipping_method.py $1