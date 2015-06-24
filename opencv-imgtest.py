import sys
sys.path.append('/usr/local/lib/python2.7/site-packages')

import cv2
import numpy as np
from matplotlib import pyplot as plt

img = cv2.imread('road.jpg',1)
# note: _color (-1) _grayscale (0) _unchanged (1)


############## cv2 window ###############

cv2.namedWindow('image', cv2.WINDOW_NORMAL)
cv2.imshow('image',img)
cv2.waitKey(0) # also takes ord value -- 27 is esc, ord('s') etc remember??
cv2.destroyAllWindows()
# this loads a resizeable window -- does not scale img -- that you exit via '0' key

# to save the manipulated file -- you can use: cv2.imwritimage.png',img)


############## Matplotlib window ###############
# use the plt, built in features hella (Y)

plt.imshow(img, cmap = 'gray', interpolation = 'bicubic')
plt.xticks([]), plt.yticks([]) # to hide tick values
plt.show()

