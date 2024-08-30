from datetime import datetime
def convert_date(date):
    date_string = "%Y-%m-%dT%H:%M:%S.%f%z"
    return datetime.strptime(date, date_string)
def revert_date_to_readable_string(date_input):
    if isinstance(date_input, str):
        try:
            date_obj = datetime.strptime(date_input, "%Y-%m-%dT%H:%M:%S.%f%z")
        except ValueError:
            date_obj = datetime.strptime(date_input, "%Y-%m-%d %H:%M:%S.%f")
    elif isinstance(date_input, datetime):
        date_obj = date_input
    else:
        raise ValueError("Unsupported date format")

    return date_obj.strftime("%a, %b %d, %I:%M %p")


def reverse_array(arr):
    l, r = 0 , len(arr) -1
    while l < r:
        arr[l], arr[r] = arr[r], arr[l]
        l+=1
        r-=1
    return arr