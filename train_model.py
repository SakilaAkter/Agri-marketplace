import pandas as pd
import numpy as np
import xgboost as xgb
import pickle
import os
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from datetime import datetime

# --- STEP 1: LOAD DATA ---
try:
    df = pd.read_csv('product_price_dataset_multiloc.csv')
    print("Dataset loaded successfully.")
except FileNotFoundError:
    print("Error: 'product_price_dataset_multiloc.csv' not found in the root folder.")
    exit()

# --- STEP 2: SEASON DETECTION LOGIC ---
def get_season(date):
    month = date.month
    if month in [12, 1, 2]:
        return 'Winter'
    elif month in [3, 4]:
        return 'Summer'
    elif month in [5, 6, 7, 8]:
        return 'Rainy'
    elif month in [9, 10, 11]:
        return 'Autumn'
    return 'Winter'

# --- STEP 3: PREPROCESSING ---
def preprocess_data(df):
    # Convert date and extract features
    df['date'] = pd.to_datetime(df['date'])
    df['season'] = df['date'].apply(get_season) # Apply season logic to dataset
    df['month'] = df['date'].dt.month
    df['year'] = df['date'].dt.year
    df['day_of_week'] = df['date'].dt.dayofweek

    encoders = {}
    cat_cols = ['product', 'location', 'season']
    
    for col in cat_cols:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        encoders[col] = le
    
    return df, encoders

print("Preprocessing data...")
df_processed, encoders = preprocess_data(df)

# Define features and target
features = ['product', 'location', 'season', 'month', 'year', 'day_of_week']
X = df_processed[features]
y = df_processed['product_price_per_unit']

# --- STEP 4: TRAIN/TEST SPLIT ---
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# --- STEP 5: TRAINING ---
print("Training XGBoost model...")
model = xgb.XGBRegressor(
    n_estimators=1000,
    learning_rate=0.05,
    max_depth=6,
    early_stopping_rounds=50,
    objective='reg:squarederror'
)

model.fit(
    X_train, y_train,
    eval_set=[(X_test, y_test)],
    verbose=False
)

# --- STEP 6: EVALUATION ---
y_pred = model.predict(X_test)
r2 = r2_score(y_test, y_pred)
print("-" * 30)
print(f"R-squared Score: {r2:.4f}")
print("-" * 30)

# --- STEP 7: EXPORTING (THE BRIDGE) ---
# Ensure backend folder exists
if not os.path.exists('backend'):
    os.makedirs('backend')

# Save model and encoders together
model_data = {
    "model": model,
    "encoders": encoders
}

save_path = os.path.join('backend', 'model_data.pkl')
with open(save_path, 'wb') as f:
    pickle.dump(model_data, f)

print(f"DONE! Model and Encoders saved to: {save_path}")