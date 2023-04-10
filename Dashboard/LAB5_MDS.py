import pandas as pd
from sklearn.manifold import MDS
from sklearn.metrics.pairwise import euclidean_distances
from sklearn.cluster import KMeans

df = pd.read_csv("Qualityoflife.csv")
data_cy = df.copy()
attributes = ['Housing', 'Cost of Living', 'Commute', 'Business Freedom',
              'Safety', 'Education', 'Environmental Quality', 'Economy']
x = data_cy.loc[:, attributes].values
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
dist_euc = euclidean_distances(x)
mds = MDS(dissimilarity='precomputed', random_state=1)
x_euc = mds.fit_transform(dist_euc)
data_euc = pd.DataFrame({'x': x_euc[:, 0], 'y': x_euc[:, 1]})

list_inertias = []
for i in range(1,40):
    kmeans = KMeans(n_clusters=i)
    kmeans.fit(x)
    list_inertias.append(kmeans.inertia_)

kmeans = KMeans(n_clusters=6,random_state=1)
kmeans.fit(x)
clusters = kmeans.fit_predict(x)+1
K_means_clus = pd.DataFrame(clusters, columns =["Clusters"]  )

data_euc = pd.concat([data_euc , attri_value, K_means_clus],axis =1)
data_euc.to_csv('Lab5_MDS.csv', index=False)

