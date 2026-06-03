from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
from datetime import datetime
from dateutil.relativedelta import relativedelta
import os

app = Flask(__name__)
CORS(app)

# ==========================================
# LOAD MODEL
# ==========================================

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    'model_data.pkl'
)

with open(MODEL_PATH, 'rb') as f:
    saved_data = pickle.load(f)

model = saved_data['model']
encoders = saved_data['encoders']


# ==========================================
# SEASON DETECTION
# ==========================================

def get_season(date):

    month = date.month

    if month in [12, 1, 2]:
        return 'Winter'

    elif month in [3, 4]:
        return 'Summer'

    elif month in [5, 6, 7, 8]:
        return 'Rainy'

    else:
        return 'Autumn'


# ==========================================
# PRICE PREDICTION ROUTE
# ==========================================

@app.route('/predict', methods=['POST'])
def predict():

    try:

        data = request.get_json()

        product = data['product']
        location = data['location']
        date_string = data['date']

        target_date = datetime.strptime(
            date_string,
            '%Y-%m-%d'
        )

        season = get_season(target_date)

        input_df = pd.DataFrame([{
            'product':
                encoders['product'].transform([product])[0],

            'location':
                encoders['location'].transform([location])[0],

            'season':
                encoders['season'].transform([season])[0],

            'month':
                target_date.month,

            'year':
                target_date.year,

            'day_of_week':
                target_date.weekday()
        }])

        features_order = [
            'product',
            'location',
            'season',
            'month',
            'year',
            'day_of_week'
        ]

        prediction = model.predict(
            input_df[features_order]
        )[0]

        return jsonify({
            "prediction": round(float(prediction), 2),
            "season": season,
            "status": "success"
        })

    except Exception as e:

        return jsonify({
            "status": "error",
            "error": str(e)
        }), 400


# ==========================================
# FORECAST ROUTE
# ==========================================

@app.route('/forecast', methods=['GET'])
def forecast():

    try:

        product = request.args.get('product')
        location = request.args.get('location')

        if not product:
            return jsonify({
                "error": "product is required"
            }), 400

        if not location:
            return jsonify({
                "error": "location is required"
            }), 400

        forecast_data = []

        today = datetime.today()

        for i in range(1, 6):

            future_date = today + relativedelta(
                months=i
            )

            season = get_season(future_date)

            input_df = pd.DataFrame([{
                'product':
                    encoders['product'].transform([product])[0],

                'location':
                    encoders['location'].transform([location])[0],

                'season':
                    encoders['season'].transform([season])[0],

                'month':
                    future_date.month,

                'year':
                    future_date.year,

                'day_of_week':
                    future_date.weekday()
            }])

            features_order = [
                'product',
                'location',
                'season',
                'month',
                'year',
                'day_of_week'
            ]

            predicted_price = model.predict(
                input_df[features_order]
            )[0]

            forecast_data.append({
                "date":
                    future_date.strftime('%Y-%m-%d'),

                "month":
                    future_date.strftime('%b'),

                "season":
                    season,

                "predicted":
                    round(float(predicted_price), 2)
            })

        return jsonify({
            "status": "success",
            "product": product,
            "location": location,
            "forecast": forecast_data
        })

    except Exception as e:

        return jsonify({
            "status": "error",
            "error": str(e)
        }), 400


# ==========================================
# HEALTH CHECK
# ==========================================

@app.route('/')
def home():

    return jsonify({
        "message": "Price Prediction API Running"
    })


# ==========================================
# RUN SERVER
# ==========================================

if __name__ == '__main__':

    app.run(
        host='0.0.0.0',
        port=5001,
        debug=True
    )