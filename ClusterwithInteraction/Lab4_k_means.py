import pandas as pd
from sklearn.cluster import KMeans

df = pd.read_csv("Qualityoflife.csv")
data_cy = df.copy()
attributes = ['Housing', 'Cost of Living', 'Commute', 'Business Freedom',
              'Safety', 'Education', 'Environmental Quality', 'Economy']
x = data_cy.loc[:, attributes].values

list_inertias = []
for i in range(1, 40):
    kmeans = KMeans(n_clusters=i)
    kmeans.fit(x)
    list_inertias.append(kmeans.inertia_)
cluster_number = pd.DataFrame(range(1, 40), columns=["cluster_number"])
elbow = pd.DataFrame(list_inertias, columns=["inertia"])
elbow = pd.concat([cluster_number, elbow], axis=1)
elbow.to_csv("Lab4_elbow.csv", index=False)

kmeans = KMeans(n_clusters=6, random_state=1)
kmeans.fit(x)
clusters = kmeans.fit_predict(x)
K_means_clus = pd.DataFrame(clusters, columns=["Clusters"])
K_means_clus.to_csv("Lab4_clusters.csv", index=False)

clusters = kmeans.fit_predict(x)+1
K_means_clus = pd.DataFrame(clusters, columns=["Clusters"])
data_euc = pd.concat([df, K_means_clus], axis=1)
data_euc.to_csv('Lab4_parallel.csv', index=False)
