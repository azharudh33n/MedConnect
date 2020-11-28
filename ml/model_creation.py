# -*- coding: utf-8 -*-
"""
Created on Wed Nov 25 22:34:18 2020

@author: Rahul
"""

import pandas as pd
from sklearn import preprocessing 
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
label_encoder = preprocessing.LabelEncoder() 
stopword = nltk.corpus.stopwords.words('english')

medical_dataset=pd.read_csv(r"C:\Users\Rahul\Downloads\Reactjs\dataSet.csv")

def lower_con(strings):
    return strings.lower()

def clean(text):
    wn = nltk.WordNetLemmatizer()   
    tokens = nltk.word_tokenize(text)
    lower = [word.lower() for word in tokens]
    no_stopwords = [word for word in lower if word not in stopword]
    no_alpha = [word for word in no_stopwords if word.isalpha()]
    lemm_text = [wn.lemmatize(word) for word in no_alpha]
    return lemm_text




def vectorize(data,tfidf_vect_fit):
    X_tfidf = tfidf_vect_fit.transform(data)
    words = tfidf_vect_fit.get_feature_names()
    X_tfidf_df = pd.DataFrame(X_tfidf.toarray())        
    X_tfidf_df.columns = words
    return(X_tfidf_df)




medical_dataset['symptoms']=medical_dataset['symptoms'].apply(clean)
medical_dataset['clean_text']=medical_dataset['symptoms'].apply(lambda x: " ".join([str(word) for word in x]))

tfidf_vect = TfidfVectorizer(analyzer=clean)
tfidf_vect_fit=tfidf_vect.fit(medical_dataset['clean_text'])
X_train=vectorize(medical_dataset['clean_text'],tfidf_vect_fit)

with open('vector.pickle', 'wb') as vcmodel:
    pickle.dump(tfidf_vect_fit, vcmodel, protocol=pickle.HIGHEST_PROTOCOL)


label_encoder = preprocessing.LabelEncoder() 
target_label_model=label_encoder.fit(medical_dataset['Disease'])

y_train=target_label_model.transform(medical_dataset['Disease'])
result_dict={}
for uni in pd.Series(y_train).unique():
    result_dict[uni]=target_label_model.inverse_transform([uni])[0]


X_train, X_test, y_train, y_test = train_test_split(X_train, y_train, test_size=0.2, random_state=0)


text_classifier = RandomForestClassifier(n_estimators=200, random_state=0)
model=text_classifier.fit(X_train, y_train)



with open('model.pickle', 'wb') as mlmodel:
    pickle.dump(model, mlmodel, protocol=pickle.HIGHEST_PROTOCOL)

# Load data (deserialize)
with open('model.pickle', 'rb') as mlmodel:
    model1 = pickle.load(mlmodel)


model1.predict(X_test)
