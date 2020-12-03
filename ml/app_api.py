from sklearn import preprocessing
import pickle
import joblib
import nltk
import pandas as pd
from flask import Flask,request
"""
string = "infection including flu pneumonia immunization diphtheria tetanus child teething \
    infant inflammatory disease including rheumatoid arthritis ra crohn disease blood \
        clot extreme sunburn food poisoning medication including antibiotic"
        """



label_encoder = preprocessing.LabelEncoder()
stopword = nltk.corpus.stopwords.words('english')


def clean(text):
    wn = nltk.WordNetLemmatizer()
    tokens = nltk.word_tokenize(text)
    lower = [word.lower() for word in tokens]
    no_stopwords = [word for word in lower if word not in stopword]
    no_alpha = [word for word in no_stopwords if word.isalpha()]
    lemm_text = [wn.lemmatize(word) for word in no_alpha]
    return lemm_text


def vectorize(data, tfidf_vect_fit):
    X_tfidf = tfidf_vect_fit.transform(data)
    words = tfidf_vect_fit.get_feature_names()
    X_tfidf_df = pd.DataFrame(X_tfidf.toarray())
    X_tfidf_df.columns = words
    return(X_tfidf_df)


def predictions(string):

    strngs = clean(string)
    x_string = ""

    for stng in strngs:
        x_string = x_string+" "+stng

    with open('vector.pkl', 'rb') as vector:
        model_vector = pickle.load(vector)
        vector.close()

    with open('model.pickle', 'rb') as mlmodel:
        model1 = pickle.load(mlmodel)
        mlmodel.close()

    with open('labels.txt', 'rb') as resltdict:
        labels = dict(pickle.load(resltdict))

    pred = model1.predict(model_vector.transform([x_string]))

    return labels[int(pred)]


app = Flask(__name__)



@app.route('/predict', methods=['GET', 'POST'])
def model_code(): 
    if request.method=="POST": 
        strings=request.form['str']
        return predictions(strings)

if __name__=='__main__':
    app.run()



























