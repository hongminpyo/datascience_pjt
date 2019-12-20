import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from mpl_toolkits.mplot3d.axes3d import get_test_data
# This import registers the 3D projection, but is otherwise unused.
from mpl_toolkits.mplot3d import Axes3D  # noqa: F401 unused import
import pymongo
from pymongo import MongoClient
import datetime
import warnings
import itertools
import statsmodels.api as sm
from statsmodels.tsa.seasonal import seasonal_decompose


timeSeriesData = pd.DataFrame(columns=['symbol','date','cur_price','trade_quantity','updown_rate'])
timeSeriesCountData = pd.DataFrame(columns=['symbol','date','count'])


client = MongoClient('mongodb://127.0.0.1:27017/')

db = client['mph']

# print(db)

collection_price = db['crypto_prices']
collection_agg = db['token_aggs']

# print(collection)

price_data = collection_price.find({'symbol':'OMG'})
agg_data = collection_agg.find({'symbol':'OMG'})
#data = collection.find()
print(agg_data)

index = 0

for price_detail in price_data:
    timeSeriesData.loc[index, 'symbol'] = price_detail['symbol']
    timeSeriesData.loc[index,'date']= price_detail['date']
    timeSeriesData.loc[index, 'cur_price'] = price_detail['cur_price']
    timeSeriesData.loc[index, 'trade_quantity'] = price_detail['trade_quantity']/1000000 # OMG Normalization
    timeSeriesData.loc[index, 'updown_rate'] = price_detail['updown_rate']
    index+=1

index1 = 0

for agg_detail in agg_data:
    timeSeriesCountData.loc[index1, 'symbol'] = agg_detail['symbol']
    timeSeriesCountData.loc[index1,'date']= datetime.datetime.strptime(str(agg_detail['date']),'%Y%m%d')
    timeSeriesCountData.loc[index1, 'count'] = agg_detail['count'] # nomarlization
    index1+=1


timeSeriesData = timeSeriesData.sort_values(['date'])
timeSeriesCountData = timeSeriesCountData.sort_values(['date'])


print(timeSeriesData)
print(timeSeriesCountData)

#startDate = timeSeriesData['date'].min()
#endDate = timeSeriesData['date'].max()

startDate1 = "2018-03-02"
endDate1 = "2019-12-04"

startDate = datetime.datetime.strptime(startDate1,"%Y-%m-%d")
endDate = datetime.datetime.strptime(endDate1,"%Y-%m-%d")

monthDate = startDate +pd.DateOffset(months=3)

###########################################################
# train을 위한 시계열 범위를 19년 4월 부터 6월 31일까지 1개 분기로 정함
###########################################################

#while monthDate <= endDate :
"""
timeSeriesData1 = timeSeriesData.loc[(timeSeriesData['date'] >= startDate) & (timeSeriesData['date'] <= monthDate), :]
timeSeriesCountData1 = timeSeriesCountData.loc[(timeSeriesCountData['date'] >= startDate) & (timeSeriesCountData['date'] <= monthDate), :]
"""
timeSeriesData1 = timeSeriesData.loc[(timeSeriesData['date'] >= startDate) & (timeSeriesData['date'] <= endDate), :]
timeSeriesCountData1 = timeSeriesCountData.loc[(timeSeriesCountData['date'] >= startDate) & (timeSeriesCountData['date'] <= endDate), :]

#plt.plot(timeSeriesData1['date'].values, timeSeriesData1['cur_price'].values,'b--')
plt.plot(timeSeriesCountData1['date'].values, timeSeriesCountData1['count'].values, 'c--')
#plt.plot(timeSeriesData1['date'].values, timeSeriesData1['trade_quantity'].values, 'r--')
plt.title("Omisego")
plt.xlabel('time')
#plt.ylabel('price')
#plt.legend(['price','trade','downhill'])
plt.ylabel('trxcount')
plt.show()
"""
timeSeriesData1['log_price'] = np.log(np.array(timeSeriesData1['cur_price'],dtype=np.float32))

plt.plot(timeSeriesData1['date'].values, timeSeriesData1['log_price'].values, 'r--')
plt.title('log scale graph')
plt.show()
"""

timeSeriesCountData1['log_count'] = np.log(np.array(timeSeriesCountData1['count'],dtype=np.float32))

plt.plot(timeSeriesCountData1['date'].values, timeSeriesCountData1['log_count'].values, 'r--')
plt.title('Omisego log scale graph')
plt.show()

    #startDate = monthDate
    #monthDate = startDate +pd.DateOffset(months=3)

