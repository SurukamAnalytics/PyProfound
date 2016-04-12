#To eliminate warnings from being printed - messes up the python-shell output
def warn(*args, **kwargs):
    pass
import warnings
warnings.warn = warn

import sys
import traceback
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.cross_validation import train_test_split
from sklearn.cross_validation import KFold
from sklearn.metrics import precision_recall_curve
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.discriminant_analysis import QuadraticDiscriminantAnalysis

names = ["Nearest-Neighbors", "Linear-SVM", "RBF-SVM", "Decision-Tree",
         "Random-Forest", "AdaBoost", "Naive-Bayes", "Linear-Discriminant-Analysis",
         "Quadratic-Discriminant-Analysis"]

classifiers = [
    KNeighborsClassifier(3),
    SVC(kernel="linear", C=0.025),
    SVC(gamma=2, C=1),
    DecisionTreeClassifier(max_depth=5),
    RandomForestClassifier(max_depth=5, n_estimators=10, max_features=1),
    AdaBoostClassifier(),
    GaussianNB(),
    LinearDiscriminantAnalysis(),
    QuadraticDiscriminantAnalysis()]

sep_dict = {"tab":"\t","comma":","}

def getSep(x):
	try:
		return sep_dict[x]
	except:
		return None # if separator None is passed to pd.read_csv, it will try to figure out the separator automatically

#Add column to df with integers for the target.
def encode_target(df, target_column):
    df_mod = df.copy()
    targets = df_mod[target_column].unique()
    is_target_text_type = True
    for target in targets:
        # print type(target)
        if 'int' in str(type(target)):
            is_target_text_type = False
            break
    if is_target_text_type == True:
        map_to_int = {name: n for n, name in enumerate(targets)}
        df_mod["Target"] = df_mod[target_column].replace(map_to_int)
    else:
        df_mod["Target"] = df_mod[target_column]

    return (df_mod, targets)

file_path = sys.argv[1]
if file_path == "undefined":
    print "Error : Please pass the file_path at which the csv has been uploaded"
    exit()

separator = sys.argv[2]
if separator == "undefined":
    separator = None
else:
    separator = getSep(separator)
    
first_column_index = sys.argv[3]
if first_column_index == "1":
    first_column_index = 0
else:
    first_column_index = None

first_row_header = sys.argv[4]
if first_row_header == "1":
    first_row_header = 0
else:
    first_row_header = 'infer'

df = pd.read_csv(file_path, sep=separator,index_col=first_column_index, header=first_row_header)

df2, targets = encode_target(df, df.columns[-1])

features = list(df2.columns[:-2])

y = df2["Target"]
X = df2[features]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=.4)
# print [dt.fit(X_train, y_train).score(X_test, y_test) for train, test in kfold]

for name, clf in zip(names, classifiers):
    try:
        clf.fit(X_train, y_train)
        # score = clf.score(X_test, y_test)
        y_score = clf.fit(X_train, y_train).decision_function(X_test)
        # Compute Precision-Recall and plot curve
        precision = dict()
        recall = dict()
        average_precision = dict()
        for i in range(targets):
            precision[i], recall[i], _ = precision_recall_curve(y_test[:, i],
                                                                y_score[:, i])
            print name, score, precision[i], recall[i]
    except:
        print name,traceback.print_exc()
        continue
    
