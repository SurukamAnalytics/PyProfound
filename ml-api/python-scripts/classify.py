#To ignore warnings
def warn(*args, **kwargs):
    pass
import warnings
warnings.warn = warn

import sys
import pandas as pd
import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.cross_validation import train_test_split
from sklearn.cross_validation import KFold

sep_dict = {"tab":"\t","comma":","}

def getSep(x):
	try:
		return sep_dict[x]
	except:
		return None

def encode_target(df, target_column):
    """Add column to df with integers for the target.

    Args
    ----
    df -- pandas DataFrame.
    target_column -- column to map to int, producing
                     new Target column.

    Returns
    -------
    df_mod -- modified DataFrame.
    targets -- list of target names.
    """
    df_mod = df.copy()
    targets = df_mod[target_column].unique()
    map_to_int = {name: n for n, name in enumerate(targets)}
    df_mod["Target"] = df_mod[target_column].replace(map_to_int)

    return (df_mod, targets)

file_path = sys.argv[1]
separator = sys.argv[2]

df = pd.read_csv(file_path, header=0, sep=getSep(separator))

df2, targets = encode_target(df, df.columns[-1])

features = list(df2.columns[:-2])

y = df2["Target"]
X = df2[features]

dt = DecisionTreeClassifier(min_samples_split=20, random_state=99)

# kfold = KFold(len(X), n_folds=3)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=.4)
# print [dt.fit(X_train, y_train).score(X_test, y_test) for train, test in kfold]


dt.fit(X_train, y_train)
score = dt.score(X_test, y_test)

print score

# with open(file_path,"r") as ip:
# 	lines = ip.readlines()
# 	sep = sep_dict[separator]

# 	for line in lines:
# 		features = line.split(sep)

