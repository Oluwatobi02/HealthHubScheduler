from datetime import datetime
def convert_date(date):
    date_string = "%Y-%m-%dT%H:%M:%S.%f%z"
    return datetime.strptime(date, date_string)


def reverse_array(arr):
    l, r = 0 , len(arr) -1
    while l < r:
        arr[l], arr[r] = arr[r], arr[l]
        l+=1
        r-=1
    return arr