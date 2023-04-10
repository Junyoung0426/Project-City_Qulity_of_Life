
import pandas as pd
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler
import numpy as np

df = pd.read_csv("Qualityoflife.csv")
attributes = ['Housing', 'Cost of Living', 'Commute', 'Business Freedom',
              'Safety', 'Education', 'Environmental Quality', 'Economy']
pca_df = df.copy()
x = pca_df.loc[:, attributes].values
y = pca_df.loc[:, ['Name']].values
x = StandardScaler().fit_transform(x)

pca = PCA(n_components=8)

principalComponents = pca.fit_transform(x)
principalComponents = principalComponents[:,0:2]

principalDf = pd.DataFrame(data=principalComponents, columns=[
                           'Principal_Component_1', 'Principal_Component_2'])
list_attr = []

for j in range (len(df.Housing)):
    list_each_attr =[]
    for i in range (1,9):
        if df.iat[j,i] <2:
            list_each_attr.append(2)
        elif df.iat[j,i] <4:
            list_each_attr.append(4)
        elif df.iat[j,i] <6:
            list_each_attr.append(6)
        elif df.iat[j,i] <8:
            list_each_attr.append(8)
        else:
            list_each_attr.append(10)
    list_attr.append(list_each_attr)

attri_value = pd.DataFrame(list_attr, columns=attributes)

finalDf = pd.concat([df[['Name']], principalDf, attri_value], axis=1)
finalDf.to_csv('Lab3_pcaplot.csv', index=False)

scaled_df = df.copy()
x1 = scaled_df.loc[:, attributes].values
y1 = scaled_df.loc[:, ['Name']].values

x1 = StandardScaler().fit_transform(x1)

scree = PCA(n_components=8)

scree_principalComponents = scree.fit_transform(x1)
result = scree.explained_variance_ratio_
scree1_plot = pd.DataFrame(result, columns=["value"])
PC_values = pd.DataFrame(
    np.arange(scree.n_components_) + 1, columns=["number"])

scree2_plot = pd.concat([PC_values, scree1_plot], axis=1)

scree2_plot.to_csv('Lab3_screeplot.csv', index=False)

def myplot(coeff):
    n = coeff.shape[0]
    df = pd.DataFrame()
    for i in range(n):
        x1 = coeff[i,0]*6
        y1 = coeff[i,1]*6
        dict = pd.DataFrame({'x': [0], 'y':[0] })
        df =pd.concat([df,dict])
        dict1 = pd.DataFrame({'x':[x1], 'y':[y1], 'attribute' : [attributes[i]]})
        df = pd.concat([df,dict1])
    df.to_csv('Lab3_biplot.csv' , index = False)

myplot(np.transpose(pca.components_[0:2, :]))