from datetime import datetime

date_string = "2024-08-15T18:36:00.000Z"
date_format = "%Y-%m-%dT%H:%M:%S.%fZ"


def check_nearby_dates(target, date_list):
    target = datetime.strptime(target, date_format)
    for date in date_list:
        # date = datetime.strptime(date, date_format)
        res = abs(date.timestamp() - target.timestamp()) < 1800
        if res: return False
    return True

