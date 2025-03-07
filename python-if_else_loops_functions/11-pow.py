#!/usr/bin/python3


def pow(a, b):
    return a ** b


# Test cases
if __name__ == "__main__":
    print(pow(2, 2))  # Should print 4
    print(pow(98, 2))  # Should print 9604
    print(pow(98, 0))  # Should print 1
    print(pow(100, -2))  # Should print 0.0001
    print(pow(-4, 5))  # Should print -1024
