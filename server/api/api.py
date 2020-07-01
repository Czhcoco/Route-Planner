import numpy as np
import requests
import json
import sys
import csv
from datetime import datetime
import math
from pathlib import Path
from os import path

file_path = Path(__file__).parent.absolute()

with open(path.join(file_path, 'data', 'data.json'), 'rb') as json_file:
    data = json.load(json_file)

new_data = []
for p in data['data']:
    if p['t_type'] == 1:
        new_data.append(p)

patients = {}
city_raw = []
city = []
transfer_factor = 0.5

def checkIfAny(mainStr, listOfStr):
    for subStr in listOfStr:
        if subStr in mainStr:
            return (True, subStr)
    return (False, "")

def data_analysis():
    for p in new_data:
        start = p['t_pos_start'].replace(" ", "")
        end = p['t_pos_end'].replace(" ", "")
        if start not in city_raw:
            city_raw.append(start)
        if end not in city_raw:
            city_raw.append(end)

    city_raw.sort(key=len)
    city_raw.pop(0)

    for p in city_raw:
        if p not in city:
            result = checkIfAny(p, city)
            if result[0] == False:
                city.append(p)

    for p in new_data:
        start = p['t_pos_start'].replace(" ", "")
        end = p['t_pos_end'].replace(" ", "")
        if start not in city:
            result = checkIfAny(start, city)
            if result[0]:
                start = result[1]

        if end not in city:
            result = checkIfAny(end, city)
            if result[0]:
                end = result[1]

        if start in patients:
            if end in patients[start]:
                patients[start][end] = patients[start][end] + 1
            else:
                patients[start][end] = 1
        else:
            patients[start] = {}
            patients[start][end] = 1


def check_if_contain(city, city_list):
    for c in city_list:
        if city in c:
            return (True, c)
    return (False, "")

def risk_during_flight(start, end):
    start = check_if_contain(start, city)
    end = check_if_contain(end, city)
    if (start[0] == True and end[0] == True and start[1] in patients and end[1] in patients[start[1]]):
        return patients[start[1]][end[1]]
    else:
        return 0

def risk_during_transfer(transfer):
    start = check_if_contain(transfer, city)
    end = check_if_contain(transfer, city)
    res = 0
    if start[0] == True:
        if start[1] in patients:
            res += int(sum(patients[start[1]][d]
                           for d in patients[start[1]]) * transfer_factor)
    if end[0] == True:
        for s in patients:
            if end[1] in patients[s]:
                res += int(patients[s][end[1]] * transfer_factor)
    return res

def calculate_risk(point, time, transfer_factor):
    risk = []
    whole_risk = []
    for i in range(len(point)):
        risk.append([])
        whole_risk.append(0)
        for s in range(len(point[i])-1):
            start = point[i][s]
            end = point[i][s+1]
            risk[i].append(risk_during_flight(start, end))
            if s != 0:
                risk[i].append(risk_during_transfer(start))

        for s in range(len(time[i])):
            whole_risk[i] += risk[i][s] * time[i][s]

    result = []

    for i in range(len(point)):
        element = {
          "stops": [],
          "risk": 0,
        }
        for c in range(len(point[i])):
            element["stops"].append(point[i][c])
        element["risk"] = whole_risk[i]
        result.append(element)

    return result

def get_flights(D, A, Date):

    DCity = name_to_code(D)
    ACity = name_to_code(A)

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
                    "ACityCode": "",
                    "DCityCode": "",
                    "DDate": ""
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

    payload["SearchInfo"]["SearchSegmentList"][0]["DCityCode"] = DCity
    payload["SearchInfo"]["SearchSegmentList"][0]["ACityCode"] = ACity
    payload["SearchInfo"]["SearchSegmentList"][0]["DDate"] = Date

    response = requests.request("POST", url, headers=headers, json=payload)

    flight_data = response.json()

    return flight_data

def name_to_code(city):
    try:
        index = iata[1].index(city)
    except ValueError:
        return False
    return iata[5][index]

def code_to_name(code):
    try:
        index = iata[5].index(code)
    except ValueError:
        return False
    return iata[1][index]

def get_transfer(data):
    routes = []
    time = []
    for route_idx in range(len(data["responseContent"]["productInfoList"])):
        route = data["responseContent"]["productInfoList"][route_idx]
        route_new = []
        time_new = []
        for flight_idx in range(len(route["flightInfoList"])):
            flight = route["flightInfoList"][flight_idx]
            if flight_idx == 0:
                route_new.append(code_to_name(flight["dCityInfo"]["code"]))
            route_new.append(code_to_name(flight["aCityInfo"]["code"]))
            time_new.append(flight["durationInfo"]["hour"])
            if flight_idx != len(route["flightInfoList"]) - 1:
                last = datetime.strptime(
                    route["flightInfoList"][flight_idx+1]["dDateTime"], '%Y-%m-%d %H:%M:%S')
                current = datetime.strptime(
                    flight["aDateTime"], '%Y-%m-%d %H:%M:%S')
                difference = last - current
                transfer_time = difference.days * 24 + \
                    math.floor(difference.seconds / 3600)
                time_new.append(transfer_time)

        if route_new not in routes:
            routes.append(route_new)
            time.append(time_new)

    return routes, time

# init

data_analysis()

with open(path.join(file_path, 'data', 'iata.csv'), 'r', encoding='UTF-8', newline='') as f:
    reader = csv.reader(f)
    next(reader)
    zipped = zip(*reader)
    iata = list(zipped)

# end of init

def query(departure, arrival, date):
    
    flight_data = get_flights(departure, arrival, date)

    routes, times = get_transfer(flight_data)

    return {"result:": calculate_risk(routes, times, transfer_factor)}

print(query("多伦多", "香港", "2020-10-05"))