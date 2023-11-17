# Data ingestion

This job loads product and user data and writes the information to Redis Cloud. The product data is used to populate the online store. User data is used later to trigger special offers targeting a specific demographic.

The product and user data is loaded from JSON files. 

Each product data item has the following format:

``` json
{
        "id": "VD55181667",
        "category": "books",
        "title": "Chronicles of the Ancient Forest by John Smith",
        "description": "Immerse yourself in the captivating world created by John Smith. Chronicles of the Ancient Forest takes you on a journey through an ancient forest filled with mystery and wonder. A must-read for fans of fantasy and adventure.",
        "image": "VD55181667.png",
        "price": 92.04
    }
```

Each user data item has the following format:

``` json
{
    "userId":"0001BDD9-EABF-4D0D-81BD-D9EABFCD0D7D",
    "gender":"F",
    "birthDate":"1984-04-08"
}
```

The additional user data of gender and birthday is used later to trigger a special offer tailored to a specific demographic.

Users are identified by a UUID.
