#To eliminate warnings from being printed - messes up the python-shell output
def warn(*args, **kwargs):
    pass
import warnings
warnings.warn = warn

import sys,os
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.cross_validation import train_test_split
from sklearn.cross_validation import KFold
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis
from sklearn.externals import joblib
from sklearn import datasets

sep_dict = {"tab":"\t","comma":","}

def getSep(x):
	try:
		return sep_dict[x]
	except:
		return None # if separator None is passed to pd.read_csv, it will try to figure out the separator automatically

file_path = sys.argv[1]
if file_path == "undefined":
    print "Error : Please pass the file_path at which the csv has been uploaded"
    exit()

separator = sys.argv[2]
if separator == "undefined":
    separator = None
else:
    separator = getSep(separator)
model_name = sys.argv[3]

df = pd.read_csv(file_path, header=0, sep=separator)

clf = joblib.load(os.path.join(os.path.dirname(os.path.dirname(file_path)),'model',model_name+'.pkl'))
#print df.shape
#print df.iloc[:,:4]
#print clf
#print model_name
print clf.predict(df.iloc[:,:4])
