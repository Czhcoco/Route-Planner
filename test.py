import requests

url = "https://us.trip.com/m/flights/api/oversea/secondListData/"

headers = {
    "Content-Type": "application/json"
}

payload = {
    "Mode": 1,
    "SearchInfo": {
        "TripType": "OW",
        "CabinClass": "YSGroup",
        "TravelerNum": {
            "Adult": 1,
            "Child": 0,
            "Infant": 0
        },
        "SearchSegmentList": [
            {
                "ACityCode": "BJS",
                "DCityCode": "YTO",
                "DDate": "2020-10-05"
            }
        ]
    },
    "FilterInfo": {
        "DPortCode": "",
        "APortCode": "",
        "AirlineCode": ""
    },
    "SegmentNo": 1,
    "requestHead": {
        "transactionID": "20200616210123259"
    }
}

response = requests.request("POST", url, headers=headers, json=payload)

data_json = response.json()

print(data_json)