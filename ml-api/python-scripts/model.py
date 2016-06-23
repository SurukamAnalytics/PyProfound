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

class Data:

    ## initialization function
    def __init__(self, train):

        self.train_raw = train
        self.train = pd.DataFrame.copy(train)
        
    ## function for removing constant columns
    def remove_constant_variables(self):
        """Removes all columns with constant value.
        """

        # removing constant columns
        for colname in self.train.columns:
            if len(np.unique(self.train[colname].values.astype("str"))) == 1:
                del self.train[colname]
                #print("Column %s has zero variance and is removed from data" % (colname))

        
    ## function for converting two-element columns to binary
    def convert_columns_to_binary(self):
        """Converts all columns with two elements into a binary column.
        """

        change = False

        # converting two-element columns to binary column
        for colname in self.train.columns:
            if len(np.unique(self.train[colname].values.astype("str"))) == 2:
                if not all(np.unique(self.train[colname].values.astype("str")) == ["0","1"]):
                    label = LabelEncoder()
                    label.fit(list(self.train[colname].values.astype("str")))
                    self.train[colname] = label.transform(list(self.train[colname].values.astype("str")))

                    change = True
                    #print("Column %s converted to binary" % (colname))

       
    ## function for encoding categorical variables
    def encode_categories(self):
        """Encodes categorical variables into one-hot or label.
        """
     
        # extracting categorical variables
        categorical_variables = []

        for colname in self.train.columns:
            if self.train[colname].dtype == "object":
                categorical_variables.append(colname)
                #print("Categorical Variable: %s, No. Categories: %d" % (colname, len(np.unique(self.train[colname].values.astype("str")))))

        if len(categorical_variables) > 0:
            #print("1: Label encode categorical variables\n2: Onehot encode categorical variables\n3: Remove categorical variables\n4: Do nothing")
            
            #while True:
                #encoding = str(input("Choose any one: "))
                #if encoding.lower() not in ["1", "2", "3", "4"]:
                 #   print("Please choose one of the above: ")
                #else:
                 #   print("")
                  #  break
                   # break

            #if encoding == "1":
                label = LabelEncoder()
                for colname in categorical_variables:
                    label.fit(list(self.train[colname].values.astype("str")))
                    self.train[colname] = label.transform(list(self.train[colname].values.astype("str")))
             #   print("Label encoded the categorical variables")
            #elif encoding == "2":
             #   self.train = pd.get_dummies(self.train, columns=categorical_variables)
              #  panel = pd.get_dummies(panel, columns=categorical_variables)
               # panel = panel[self.train.columns]
                #print("Onehot encoded the categorical variables")
            #elif encoding == "3":
             #   panel.drop(categorical_variables, axis=1, inplace=True)
              #  print("Categorical variables removed from data")

    ## function for cleaning data
    def clean_data(self):
        """Performs standard data cleaning functions
        """

                
        self.remove_constant_variables()
        self.convert_columns_to_binary()
        self.encode_categories()

        #print("Data is clean and ready!\n")
        return (self.train)

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
    map_to_int = {name: n for n, name in enumerate(targets)}
    df_mod["Target"] = df_mod[target_column].replace(map_to_int)

    return (df_mod, targets)

file_path = sys.argv[2]
if file_path == "undefined":
    print "Error : Please pass the file_path at which the csv has been uploaded"
    exit()

separator = sys.argv[4]
if separator == "undefined":
    separator = None
else:
    separator = getSep(separator)
    
df = pd.read_csv(file_path, header=0, sep=separator)
cleaned_data = Data(df)
df3 = cleaned_data.clean_data()
df4 = df3.dropna(axis=0,how='any')
df2, targets = encode_target(df4, df4.columns[-1])

features = list(df2.columns[:-2])

y = df2["Target"]
X = df2[features]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=.4)
names1 = sys.argv[3]

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

for name, clf in zip(names, classifiers):
	if names == names1 :
		clf1 = clf


clf1.fit(X_train, y_train)
