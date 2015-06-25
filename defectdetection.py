import sys
sys.path.append('/usr/local/lib/python2.7/site-packages')

import cv2
import numpy as np
import math

cap = cv2.VideoCapture(0)


print cap.isOpened()
# just to check ok

while(True):
    #frame by frame
    ret, capture = cap.read()

    cv2.rectangle(capture,(500,500),(100,100),(0,255,0),0)
    crop_cap = capture[100:400, 100:400]
    grey = cv2.cvtColor(crop_cap, cv2.COLOR_BGR2GRAY)
    value = (35, 35)
    ### blurs to take out little details
    blurred = cv2.GaussianBlur(grey, value, 0)
    _, thresh1 = cv2.threshold(blurred, 127, 255,
                               cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)
    cv2.imshow('threshold', thresh1)

    contours, hierarchy = cv2.findContours(thresh1.copy(),cv2.RETR_TREE, \
        cv2.CHAIN_APPROX_NONE)

    max_area = -1
    # contours = coordinate of the contour
    for i in range(len(contours)):
        cnt=contours[i]
        # print contours[i]
        area = cv2.contourArea(cnt)
        if(area>max_area):
            max_area=area
            ci=i
    cnt=contours[ci]
    x,y,w,h = cv2.boundingRect(cnt)
    cv2.rectangle(crop_cap,(x,y),(x+w,y+h),(0,0,255),0)
    hull = cv2.convexHull(cnt)
    drawing = np.zeros(crop_cap.shape,np.uint8)
    cv2.drawContours(drawing,[cnt],0,(0,255,0),0)
    cv2.drawContours(drawing,[hull],0,(0,0,255),0)
    hull = cv2.convexHull(cnt,returnPoints = False)
    defects = cv2.convexityDefects(cnt,hull)
    count_defects = 0
    cv2.drawContours(thresh1, contours, -1, (0,255,0), 3)
    print defects.shape
    for i in range(defects.shape[0]):
        s,e,f,d = defects[i,0]
        start = tuple(cnt[s][0])
        end = tuple(cnt[e][0])
        far = tuple(cnt[f][0])
        a = math.sqrt((end[0] - start[0])**2 + (end[1] - start[1])**2)
        b = math.sqrt((far[0] - start[0])**2 + (far[1] - start[1])**2)
        c = math.sqrt((end[0] - far[0])**2 + (end[1] - far[1])**2)
        angle = math.acos((b**2 + c**2 - a**2)/(2*b*c)) * 57
        if angle <= 90:
            count_defects += 1
            cv2.circle(crop_cap,far,1,[0,0,255],-1)
        #dist = cv2.pointPolygonTest(cnt,far,True)
        cv2.line(crop_cap,start,end,[0,255,0],2)
        #cv2.circle(crop_cap,far,5,[0,0,255],-1)
    if count_defects == 1:
    	cv2.putText(capture,"2", (50,50), cv2.FONT_HERSHEY_SIMPLEX, 2, 2)
    elif count_defects == 2:
        str = "3"
        print str
        cv2.putText(capture, str, (5,50), cv2.FONT_HERSHEY_SIMPLEX, 1, 2)
    elif count_defects == 3:
        cv2.putText(capture,"4", (50,50), cv2.FONT_HERSHEY_SIMPLEX, 2, 2)
    elif count_defects == 4:
        cv2.putText(capture,"5", (50,50), cv2.FONT_HERSHEY_SIMPLEX, 2, 2)
    else:
        cv2.putText(capture,"?????", (50,50),\
                    cv2.FONT_HERSHEY_SIMPLEX, 2, 2)
    cv2.imshow('Gesture', capture)
    # all_img = np.hstack((drawing, crop_cap))
    # cv2.imshow('Contours', all_img)

	#### quit with 27
    if cv2.waitKey(1) == 27:
        break

cap.release()
cv2.destroyAllWindows()


# waitKey method returns the value of whatever is pressed during (x) ms
# 0 is indef