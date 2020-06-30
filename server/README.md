### Backend of Flight Risk Explorer

## Usage

1. Install python dependencies

```
pip install -r requirements.txt
```

2. Run server

```
python server.py
```

## Query

Query risks of routes from 多伦多 to 北京 on 2020-12-05

```
http://127.0.0.1:5000/query/多伦多/北京/2020-10-25
```

and we will get the result in JSON format

```
{
    "result:": [
        {
            "risk": 0,
            "stops": [
                "多伦多",
                "北京"
            ]
        },
        {
            "risk": 159,
            "stops": [
                "多伦多",
                "纽约",
                "北京"
            ]
        },
        {
            "risk": 0,
            "stops": [
                "多伦多",
                "华盛顿",
                "北京"
            ]
        },
        {
            "risk": 0,
            "stops": [
                "多伦多",
                "底特律",
                "北京"
            ]
        },
        {
            "risk": 0,
            "stops": [
                "多伦多",
                "芝加哥",
                "北京"
            ]
        },
        {
            "risk": 0,
            "stops": [
                "多伦多",
                "漢城",
                "北京"
            ]
        },
        {
            "risk": 34,
            "stops": [
                "多伦多",
                "温哥华",
                "北京"
            ]
        },
        {
            "risk": 48,
            "stops": [
                "多伦多",
                "东京",
                "北京"
            ]
        }
    ]
}
```
