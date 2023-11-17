# Data enrichment

This service is used to enrich the click data with the product category, and the visitor's gender, birthday, and age. This data is obtained from Redis Cloud, which is populated by the ingest data service.

Input topic: `click-data`
Output topic: `enriched-click-data`

Enriched data format:

``` json
{
  "Epoch": 0,
  "Timestamps": [
    1700147866722586000
  ],
  "NumericValues": {
    "original_timestamp": [
      1331800486
    ],
    "age": [
      42
    ]
  },
  "StringValues": {
    "userId": [
      "8D0E437E-9249-4DDA-BC4F-C1E5409E3A3B"
    ],
    "ip": [
      "69.76.12.213"
    ],
    "userAgent": [
      "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:10.0.2) Gecko/20100101 Firefox/10.0.2"
    ],
    "productId": [
      "VD55177927"
    ],
    "category": [
      "clothing"
    ],
    "title": [
      "Deluxe Cashmere Sweater"
    ],
    "birthdate": [
      "1981-11-14"
    ],
    "country": [
      "United States"
    ],
    "deviceType": [
      "Desktop"
    ],
    "gender": [
      "F"
    ]
  },
  "BinaryValues": {},
  "TagValues": {}
}
```

You can see that the data format from `click-data` has been enriched with the following additional items read from Redis Cloud:

* `category`
* `gender`
* `birthday`
* `age`

