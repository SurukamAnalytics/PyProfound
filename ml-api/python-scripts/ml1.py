import numpy as np
import pandas as pd

import sys

from sklearn.preprocessing import LabelEncoder
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
                print("Column %s has zero variance and is removed from data" % (colname))

        
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
                print("Categorical Variable: %s, No. Categories: %d" % (colname, len(np.unique(self.train[colname].values.astype("str")))))

        if len(categorical_variables) > 0:
            print("1: Label encode categorical variables\n2: Onehot encode categorical variables\n3: Remove categorical variables\n4: Do nothing")
            
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
                print("Label encoded the categorical variables")
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


file_path = raw_input("Please enter the file path of train file: ")
df = pd.read_csv(file_path)
cleaned_data = Data(df)
df3 = cleaned_data.clean_data()
#df3 = df3.fillna(method = 'bfill').fillna(method = 'ffill')
#/home/rishi/PyProfound/ml-api/input/sample.csv
df3 = df3.dropna(axis=0,how='any')
print(df3)
df3.to_csv('out23.csv', sep=',', encoding='utf-8')