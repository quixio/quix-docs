# Event detection

This service detects user behavior in real time.

If, in the last 5 minutes, a female between 25 and 35, or a male between 36 and 45:

1. Views any item in the clothing category and then,
2. Views any item in the shoes category and then,
3. Views a different item in the clothing category then
4. Show a special offer for that demographic

The logic is implemented in the `process_dataframe` method, and first of all cleans data to avoid storing unnecessary data in memory (cleans page refreshes and ignores all actions that are not considered for the offers). Then, it checks if the click is eligible for an offer, and if we detect that the user clicked 3 times on this kind of product, we launch an offer.


Input topic : enriched-click-data
Output topic: special-offers

Also connects to Redis Cloud

Window is 30 minutes

For the male demographic offer1 is generated:

``` json
[
  {
    "Timestamp": 1700221907989992000,
    "Tags": {},
    "Id": "offer",
    "Value": "offer1"
  }
]
```

For the female demographic offer2 is generated:

``` json
[
  {
    "Timestamp": 1700222075422209000,
    "Tags": {},
    "Id": "offer",
    "Value": "offer2"
  }
]
```

These can then be used by the UI to display the correct offer popup.

The code in the service implements a state machine, where the user transitions between states based on what product category they have viewed. The state machine code logs out state to Redis Cloud. From there the log messages can also be displayed in the UI, for example:

```
2023-11-17 11:54:35: [User sad-music-boxing triggered offer offer2]
2023-11-17 11:54:35: [User sad-music-boxing entered state offer][Event: clicked VD55177927][Category: clothing]
2023-11-17 11:54:32: [User sad-music-boxing entered state shoes_visited][Event: clicked VD55147564][Category: shoes]
2023-11-17 11:54:29: [User sad-music-boxing entered state clothes_visited][Event: clicked VD55129406][Category: clothing]
```

If the user falls within the age range for each gender, and transitions through the states clothes_visited -> shoes_visited -> clothing_visited, then the tailored offer is triggered.

