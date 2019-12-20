import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from mpl_toolkits.mplot3d.axes3d import get_test_data
# This import registers the 3D projection, but is otherwise unused.
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401 unused import
import pymongo
from pymongo import MongoClient
import datetime



timeSeriesData = pd.DataFrame(columns=['symbol','date','cur_price','updown_rate'])
timeSeriesCountData = pd.DataFrame(columns=['symbol','date','count'])


client = MongoClient('mongodb://127.0.0.1:27017/')

db = client['mph']

# print(db)

collection_price = db['crypto_prices']

collection_agg = db['token_aggs']

# print(collection)

price_data = collection_price.find({'symbol':'LAT'})

agg_data = collection_agg.find({'symbol':'LAT'})
#data = collection.find()
print(agg_data)

index = 0

for price_detail in price_data:
    timeSeriesData.loc[index, 'symbol'] = price_detail['symbol']
    timeSeriesData.loc[index,'date']= price_detail['date']
    timeSeriesData.loc[index, 'cur_price'] = price_detail['cur_price']
    timeSeriesData.loc[index, 'updown_rate'] = price_detail['updown_rate']
    index+=1

index1 = 0

for agg_detail in agg_data:
    timeSeriesCountData.loc[index1, 'symbol'] = agg_detail['symbol']
    timeSeriesCountData.loc[index1,'date']= datetime.datetime.strptime(str(agg_detail['date']),'%Y%m%d')
    timeSeriesCountData.loc[index1, 'count'] = agg_detail['count']/18 # nomarlization
    index1+=1


timeSeriesData = timeSeriesData.sort_values(['date'])
timeSeriesCountData = timeSeriesCountData.sort_values(['date'])


print(timeSeriesData)
print(timeSeriesCountData)

startDate = timeSeriesData['date'].min()
endDate = timeSeriesData['date'].max()
monthDate = startDate +pd.DateOffset(months=1)


while monthDate < endDate :
    
    timeSeriesData1 = timeSeriesData.loc[(timeSeriesData['date'] >= startDate) & (timeSeriesData['date'] <= monthDate), :]
    timeSeriesCountData1 = timeSeriesCountData.loc[(timeSeriesCountData['date'] >= startDate) & (timeSeriesCountData['date'] <= monthDate), :]

    plt.plot(timeSeriesData1['date'].values, timeSeriesData1['cur_price'].values,'c--')
    plt.plot(timeSeriesCountData1['date'].values, timeSeriesCountData1['count'].values, 'ro')
    plt.title(startDate.strftime('%Y-%m'))
    plt.xlabel('time')
    plt.ylabel('price')
    plt.legend(['price','lift','downhill'])
    plt.show()

    startDate = monthDate
    monthDate = startDate +pd.DateOffset(months=1)



#W = fit_plane(trainData['temperature'], trainData['humidity'], trainData['miwar_index'])

#print("wo={0:.1f}, w1={1:.1f}, w2={2:.1f}".format(W[0], W[1], W[2]))