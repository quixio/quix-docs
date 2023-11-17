# Clickstream producer

Clickstream data is read from a CSV file. This data represents fifteen days of shopping data gathered from a real online store. A subset of this data is then published to the `click-data` topic:

* `ip` - the IP address of the customer
* `original_timestamp` - the Unix timestamp for the interaction
* `productId` - product ID (the product ID is embedded in the URL for the product viewed)
* `userAgent` - browser details for the client
* `userId` - UUID for the user

If you look at messages on the `click-data` topic, you'll see data in the followong format:

``` json
{
  "Epoch": 0,
  "Timestamps": [
    1699973201619326000
  ],
  "NumericValues": {
    "original_timestamp": [
      1331802578
    ]
  },
  "StringValues": {
    "userId": [
      "F6F8B460-4204-4C26-A32C-B93826EDCB99"
    ],
    "ip": [
      "75.85.165.38"
    ],
    "userAgent": [
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.52.7 (KHTML, like Gecko) Version/5.1.2 Safari/534.52.7"
    ],
    "productId": [
      "VD55179433"
    ]
  },
  "BinaryValues": {},
  "TagValues": {}
}
```

