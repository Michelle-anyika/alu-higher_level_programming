#!/usr/bin/python3


def uppercase(str):
    result = ""
    for char in str:
        if 97 <= ord(char) <= 122:  # Check if the character is lowercase
            result += chr(ord(char) - 32)  # Convert to uppercase
        else:
            result += char
    print("{}".format(result))


# Test cases
if __name__ == "__main__":
    uppercase("best")
    uppercase("Best School 98 Battery street")
