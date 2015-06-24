import sys
sys.path.append('/usr/local/lib/python2.7/site-packages')

import cv2
import numpy as np
from matplotlib import pyplot as plt

cap = cv2.VideoCapture(0)

print cap.isOpened()
# just to check ok

while(True):
    #frame by frame
    ret, frame = cap.read()
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    
    cv2.imshow('frame',gray)
    print cv2.waitKey(1)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()


# waitKey method returns the value of whatever is pressed during (x) ms
# 0 is indef