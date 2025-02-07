"""
This code is generated by Alimul Haque Khan, with help of chatGPT.

You are free to use, modify, and distribute this code without any obligation to provide credit to the original author.

The author of this code makes no warranties or guarantees regarding its functionality, reliability, or suitability for any purpose. 
Use it at your own risk.

If you find this code helpful, you are encouraged but not required to acknowledge the original author.

For more information, visit https://www.linkedin.com/in/ah-khan/
"""


import os
import numpy as np
import pandas as pd
from PIL import Image
import matplotlib as mpl
from wordcloud import WordCloud, STOPWORDS

# Get the current working directory
current_dir = os.getcwd()


cv_file = os.path.join(current_dir, 'cv.txt')
job_file = os.path.join(current_dir, 'job.txt')

with open(cv_file, 'r') as file:    cv = file.read()
with open(job_file, 'r') as file:    job = file.read()

# Defining stopwords
stopwords = set(STOPWORDS)
print('Stopwords:', stopwords)

# Instantiating the word cloud objects
cv_wc = WordCloud(background_color='white', max_words=100, stopwords=stopwords, scale=1, width=1600, height=800)
job_wc = WordCloud(background_color='white', max_words=100, stopwords=stopwords, scale=1, width=1600, height=800)

# Generating the word clouds
cv_wc.generate(cv)
job_wc.generate(job)

# Saving the word clouds as .png files
cv_output_file = os.path.join(current_dir, 'WordCloud_CV.png')
job_output_file = os.path.join(current_dir, 'WordCloud_Job.png')

cv_wc.to_file(cv_output_file)
job_wc.to_file(job_output_file)
