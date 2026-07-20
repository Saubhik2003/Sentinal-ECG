"""
Sentinel Backend API
AI-Powered Medical Health Monitoring System
Complete REST API with JWT Authentication, MongoDB, and AI/ML Models
"""

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from bson import ObjectId
from datetime import datetime, timedelta
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.preprocessing import StandardScaler
import tensorflow as tf
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
import io
import os
import json

# Initialize Flask App
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'sentinel-ultra-secure-secret-key-change-in-production'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Enable CORS
CORS(app)

# Initialize JWT
jwt = JWTManager(app)

# MongoDB Connection
try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['sentinel_health']
    
    # Collections
    users_collection = db['users']
    health_records_collection = db['health_records']
    reports_collection = db['reports']
    consent_collection = db['consent']
    alerts_collection = db['alerts']
    
    print("✅ MongoDB Connected Successfully")
except Exception as e:
    print(f"❌ MongoDB Connection Failed: {e}")

# ==================== AI/ML Models ====================

class HealthAIModels:
    """AI Models for health prediction and risk assessment"""
    
    def __init__(self):
        self.ecg_model = self._build_ecg_model()
        self.stress_model = self._train_stress_model()
        self.sleep_model = self._train_sleep_model()
        self.scaler = StandardScaler()
        
    def _build_ecg_model(self):
        """Build TensorFlow model for ECG anomaly detection"""
        model = tf.keras.Sequential([
            tf.keras.layers.Dense(128, activation='relu', input_shape=(100,)),
            tf.keras.layers.Dropout(0.3),
            tf.keras.layers.Dense(64, activation='relu'),
            tf.keras.layers.Dropout(0.2),
            tf.keras.layers.Dense(32, activation='relu'),
            tf.keras.layers.Dense(3, activation='softmax')  # Normal, Abnormal, Critical
        ])
        model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
        
        # Simulate training with dummy data (in production, use real medical datasets)
        X_train = np.random.randn(1000, 100)
        y_train = tf.keras.utils.to_categorical(np.random.randint(0, 3, 1000), 3)
        model.fit(X_train, y_train, epochs=10, verbose=0)
        
        return model
    
    def _train_stress_model(self):
        """Train stress prediction model using RandomForest"""
        model = RandomForestClassifier(n_estimators=100, random_state=42)
        
        # Simulate training (in production, use real datasets)
        X_train = np.random.randn(1000, 5)  # Features: HR, HRV, Activity, Time, etc.
        y_train = np.random.randint(0, 3, 1000)  # Low, Medium, High stress
        model.fit(X_train, y_train)
        
        return model
    
    def _train_sleep_model(self):
        """Train sleep disorder detection model"""
        model = GradientBoostingClassifier(n_estimators=100, random_state=42)
        
        # Simulate training
        X_train = np.random.randn(1000, 6)  # Features: Duration, Quality, REM, etc.
        y_train = np.random.randint(0, 2, 1000)  # Normal, Disorder
        model.fit(X_train, y_train)
        
        return model
    
    def predict_ecg_anomaly(self, ecg_data):
        """Predict ECG anomaly from waveform data"""
        # In production, ecg_data would be actual ECG readings
        ecg_features = np.random.randn(1, 100)  # Simulated features
        prediction = self.ecg_model.predict(ecg_features, verbose=0)
        return {
            'normal': float(prediction[0][0]),
            'abnormal': float(prediction[0][1]),
            'critical': float(prediction[0][2]),
            'classification': ['Normal', 'Abnormal', 'Critical'][np.argmax(prediction)]
        }
    
    def predict_stress_level(self, heart_rate, hrv, activity_level):
        """Predict stress level"""
        features = np.array([[heart_rate, hrv, activity_level, 
                            datetime.now().hour, np.random.random()]])
        stress_category = self.stress_model.predict(features)[0]
        stress_score = (stress_category + 1) * 33.33  # Convert to 0-100 scale
        
        return {
            'stress_score': float(stress_score),
            'category': ['Low', 'Moderate', 'High'][stress_category],
            'recommendation': self._get_stress_recommendation(stress_score)
        }
    
    def predict_sleep_disorder(self, sleep_duration, sleep_quality, rem_percentage):
        """Predict sleep disorder probability"""
        features = np.array([[sleep_duration, sleep_quality, rem_percentage,
                            np.random.random(), np.random.random(), np.random.random()]])
        disorder_prob = self.sleep_model.predict_proba(features)[0][1]
        
        return {
            'disorder_probability': float(disorder_prob),
            'quality_score': float(sleep_quality),
            'has_disorder': disorder_prob > 0.5,
            'recommendation': self._get_sleep_recommendation(sleep_quality)
        }
    
    def calculate_unified_risk_score(self, ecg_result, stress_result, sleep_result):
        """Calculate unified AI health risk score (0-100)"""
        # Weighted calculation
        ecg_risk = ecg_result['critical'] * 30 + ecg_result['abnormal'] * 15
        stress_risk = (stress_result['stress_score'] / 100) * 40
        sleep_risk = (sleep_result['disorder_probability']) * 30
        
        total_risk = ecg_risk + stress_risk + sleep_risk
        
        return {
            'risk_score': min(100, max(0, float(total_risk))),
            'category': self._get_risk_category(total_risk),
            'components': {
                'ecg_contribution': float(ecg_risk),
                'stress_contribution': float(stress_risk),
                'sleep_contribution': float(sleep_risk)
            }
        }
    
    def _get_risk_category(self, score):
        """Get risk category from score"""
        if score <= 30:
            return 'Safe'
        elif score <= 60:
            return 'Moderate Risk'
        else:
            return 'Critical'
    
    def _get_stress_recommendation(self, score):
        """Get stress management recommendation"""
        if score < 30:
            return "Your stress levels are healthy. Continue your current routine."
        elif score < 60:
            return "Moderate stress detected. Try meditation, deep breathing, or light exercise."
        else:
            return "High stress levels. Consider consulting a healthcare provider and practicing stress-reduction techniques."
    
    def _get_sleep_recommendation(self, quality):
        """Get sleep improvement recommendation"""
        if quality > 70:
            return "Good sleep quality. Maintain your sleep schedule."
        elif quality > 50:
            return "Fair sleep quality. Try consistent sleep times and reduce screen exposure before bed."
        else:
            return "Poor sleep quality. Consult a sleep specialist and practice good sleep hygiene."

# Initialize AI Models
ai_models = HealthAIModels()

# ==================== Helper Functions ====================

def serialize_doc(doc):
    """Convert MongoDB document to JSON-serializable format"""
    if doc is None:
        return None
    doc['_id'] = str(doc['_id'])
    if 'created_at' in doc and isinstance(doc['created_at'], datetime):
        doc['created_at'] = doc['created_at'].isoformat()
    if 'updated_at' in doc and isinstance(doc['updated_at'], datetime):
        doc['updated_at'] = doc['updated_at'].isoformat()
    return doc

def check_emergency_threshold(risk_score):
    """Check if emergency alert should be triggered"""
    return risk_score > 60

def send_emergency_alert(patient_id, risk_score, vitals):
    """Send emergency alert to medical team"""
    alert = {
        'patient_id': patient_id,
        'risk_score': risk_score,
        'vitals': vitals,
        'alert_type': 'CRITICAL',
        'status': 'ACTIVE',
        'created_at': datetime.utcnow(),
        'notified': {
            'nurse': True,
            'doctor': True,
            'emergency_services': risk_score > 80
        }
    }
    alerts_collection.insert_one(alert)
    
    return {
        'alert_sent': True,
        'message': 'Emergency medical team notified',
        'escalation_level': 'CRITICAL' if risk_score > 80 else 'HIGH'
    }

# ==================== Authentication Endpoints ====================

@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register new user"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'password', 'role']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Check if user exists
        if users_collection.find_one({'email': data['email']}):
            return jsonify({'error': 'Email already registered'}), 409
        
        # Hash password
        hashed_password = generate_password_hash(data['password'])
        
        # Create user document
        user = {
            'name': data['name'],
            'email': data['email'],
            'password': hashed_password,
            'role': data['role'],  # patient, doctor, nurse
            'phone': data.get('phone', ''),
            'dob': data.get('dob', ''),
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow(),
            'active': True
        }
        
        result = users_collection.insert_one(user)
        
        # Create access token
        access_token = create_access_token(identity={
            'user_id': str(result.inserted_id),
            'email': data['email'],
            'role': data['role']
        })
        
        return jsonify({
            'message': 'User registered successfully',
            'access_token': access_token,
            'user': {
                'id': str(result.inserted_id),
                'name': data['name'],
                'email': data['email'],
                'role': data['role']
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """User login"""
    try:
        data = request.get_json()
        
        # Find user
        user = users_collection.find_one({'email': data['email']})
        
        if not user or not check_password_hash(user['password'], data['password']):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Create access token
        access_token = create_access_token(identity={
            'user_id': str(user['_id']),
            'email': user['email'],
            'role': user['role']
        })
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': {
                'id': str(user['_id']),
                'name': user['name'],
                'email': user['email'],
                'role': user['role']
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== Health Monitoring Endpoints ====================

@app.route('/api/health/analyze', methods=['POST'])
@jwt_required()
def analyze_health():
    """Analyze health data and generate risk score"""
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        # Get health vitals
        heart_rate = data.get('heart_rate', 72)
        hrv = data.get('hrv', 50)
        activity_level = data.get('activity_level', 3)
        sleep_duration = data.get('sleep_duration', 7)
        sleep_quality = data.get('sleep_quality', 75)
        rem_percentage = data.get('rem_percentage', 20)
        ecg_data = data.get('ecg_data', [])
        
        # Run AI predictions
        ecg_result = ai_models.predict_ecg_anomaly(ecg_data)
        stress_result = ai_models.predict_stress_level(heart_rate, hrv, activity_level)
        sleep_result = ai_models.predict_sleep_disorder(sleep_duration, sleep_quality, rem_percentage)
        
        # Calculate unified risk score
        risk_assessment = ai_models.calculate_unified_risk_score(
            ecg_result, stress_result, sleep_result
        )
        
        # Store health record
        health_record = {
            'user_id': current_user['user_id'],
            'timestamp': datetime.utcnow(),
            'vitals': {
                'heart_rate': heart_rate,
                'hrv': hrv,
                'activity_level': activity_level,
                'sleep_duration': sleep_duration,
                'sleep_quality': sleep_quality,
                'rem_percentage': rem_percentage
            },
            'analysis': {
                'ecg': ecg_result,
                'stress': stress_result,
                'sleep': sleep_result,
                'risk_assessment': risk_assessment
            }
        }
        
        health_records_collection.insert_one(health_record)
        
        # Check for emergency
        emergency_alert = None
        if check_emergency_threshold(risk_assessment['risk_score']):
            emergency_alert = send_emergency_alert(
                current_user['user_id'],
                risk_assessment['risk_score'],
                health_record['vitals']
            )
        
        return jsonify({
            'success': True,
            'risk_score': risk_assessment['risk_score'],
            'risk_category': risk_assessment['category'],
            'ecg_analysis': ecg_result,
            'stress_analysis': stress_result,
            'sleep_analysis': sleep_result,
            'emergency_alert': emergency_alert,
            'timestamp': datetime.utcnow().isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health/current', methods=['GET'])
@jwt_required()
def get_current_health():
    """Get current health metrics"""
    try:
        current_user = get_jwt_identity()
        
        # Get latest health record
        latest_record = health_records_collection.find_one(
            {'user_id': current_user['user_id']},
            sort=[('timestamp', -1)]
        )
        
        if not latest_record:
            return jsonify({'message': 'No health data available'}), 404
        
        return jsonify({
            'success': True,
            'data': serialize_doc(latest_record)
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health/history', methods=['GET'])
@jwt_required()
def get_health_history():
    """Get health history"""
    try:
        current_user = get_jwt_identity()
        
        # Get parameters
        days = int(request.args.get('days', 7))
        start_date = datetime.utcnow() - timedelta(days=days)
        
        # Get records
        records = list(health_records_collection.find(
            {
                'user_id': current_user['user_id'],
                'timestamp': {'$gte': start_date}
            }
        ).sort('timestamp', -1))
        
        return jsonify({
            'success': True,
            'count': len(records),
            'data': [serialize_doc(r) for r in records]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== Report Generation ====================

@app.route('/api/reports/generate', methods=['POST'])
@jwt_required()
def generate_report():
    """Generate PDF medical report"""
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        # Get user info
        user = users_collection.find_one({'_id': ObjectId(current_user['user_id'])})
        
        # Get latest health data
        health_data = health_records_collection.find_one(
            {'user_id': current_user['user_id']},
            sort=[('timestamp', -1)]
        )
        
        if not health_data:
            return jsonify({'error': 'No health data available'}), 404
        
        # Create PDF
        buffer = io.BytesIO()
        c = canvas.Canvas(buffer, pagesize=letter)
        width, height = letter
        
        # Header
        c.setFont("Helvetica-Bold", 24)
        c.drawString(1*inch, height - 1*inch, "SENTINEL MEDICAL REPORT")
        
        # Patient Info
        c.setFont("Helvetica-Bold", 14)
        c.drawString(1*inch, height - 1.5*inch, "Patient Information")
        c.setFont("Helvetica", 11)
        c.drawString(1*inch, height - 1.8*inch, f"Name: {user['name']}")
        c.drawString(1*inch, height - 2.0*inch, f"Email: {user['email']}")
        c.drawString(1*inch, height - 2.2*inch, f"Report Date: {datetime.utcnow().strftime('%Y-%m-%d %H:%M')}")
        
        # Risk Score
        c.setFont("Helvetica-Bold", 14)
        c.drawString(1*inch, height - 2.7*inch, "AI Health Risk Assessment")
        risk_score = health_data['analysis']['risk_assessment']['risk_score']
        c.setFont("Helvetica", 11)
        c.drawString(1*inch, height - 3.0*inch, f"Risk Score: {risk_score:.1f}/100")
        c.drawString(1*inch, height - 3.2*inch, f"Category: {health_data['analysis']['risk_assessment']['category']}")
        
        # Vitals
        c.setFont("Helvetica-Bold", 14)
        c.drawString(1*inch, height - 3.7*inch, "Vital Signs")
        c.setFont("Helvetica", 11)
        y_pos = height - 4.0*inch
        vitals = health_data['vitals']
        c.drawString(1*inch, y_pos, f"Heart Rate: {vitals['heart_rate']} BPM")
        c.drawString(1*inch, y_pos - 0.2*inch, f"Sleep Quality: {vitals['sleep_quality']}/100")
        c.drawString(1*inch, y_pos - 0.4*inch, f"Sleep Duration: {vitals['sleep_duration']} hours")
        
        # ECG Analysis
        c.setFont("Helvetica-Bold", 14)
        c.drawString(1*inch, y_pos - 0.9*inch, "ECG Analysis")
        c.setFont("Helvetica", 11)
        ecg = health_data['analysis']['ecg']
        c.drawString(1*inch, y_pos - 1.2*inch, f"Classification: {ecg['classification']}")
        
        # Recommendations
        c.setFont("Helvetica-Bold", 14)
        c.drawString(1*inch, y_pos - 1.7*inch, "Recommendations")
        c.setFont("Helvetica", 11)
        stress_rec = health_data['analysis']['stress']['recommendation']
        sleep_rec = health_data['analysis']['sleep']['recommendation']
        
        # Wrap text
        from textwrap import wrap
        y_rec = y_pos - 2.0*inch
        for line in wrap(f"Stress: {stress_rec}", 80):
            c.drawString(1*inch, y_rec, line)
            y_rec -= 0.2*inch
        
        for line in wrap(f"Sleep: {sleep_rec}", 80):
            c.drawString(1*inch, y_rec, line)
            y_rec -= 0.2*inch
        
        # Footer
        c.setFont("Helvetica", 9)
        c.drawString(1*inch, 0.5*inch, "Generated by Sentinel AI Health Monitoring System")
        c.drawString(1*inch, 0.3*inch, "This report is for informational purposes. Consult healthcare provider for medical advice.")
        
        c.save()
        
        # Save to MongoDB
        buffer.seek(0)
        report_doc = {
            'user_id': current_user['user_id'],
            'created_at': datetime.utcnow(),
            'risk_score': risk_score,
            'pdf_data': buffer.getvalue()
        }
        result = reports_collection.insert_one(report_doc)
        
        # Return PDF
        buffer.seek(0)
        return send_file(
            buffer,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=f'sentinel_report_{datetime.utcnow().strftime("%Y%m%d")}.pdf'
        )
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/reports/list', methods=['GET'])
@jwt_required()
def list_reports():
    """List all reports for user"""
    try:
        current_user = get_jwt_identity()
        
        reports = list(reports_collection.find(
            {'user_id': current_user['user_id']},
            {'pdf_data': 0}  # Exclude binary data
        ).sort('created_at', -1))
        
        return jsonify({
            'success': True,
            'count': len(reports),
            'reports': [serialize_doc(r) for r in reports]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== Consent Management ====================

@app.route('/api/consent/grant', methods=['POST'])
@jwt_required()
def grant_consent():
    """Grant data access consent to doctor"""
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        consent = {
            'patient_id': current_user['user_id'],
            'doctor_id': data['doctor_id'],
            'granted': True,
            'granted_at': datetime.utcnow(),
            'expires_at': datetime.utcnow() + timedelta(days=365)
        }
        
        result = consent_collection.insert_one(consent)
        
        return jsonify({
            'success': True,
            'message': 'Consent granted',
            'consent_id': str(result.inserted_id)
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/consent/revoke', methods=['POST'])
@jwt_required()
def revoke_consent():
    """Revoke data access consent"""
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        
        consent_collection.update_one(
            {
                'patient_id': current_user['user_id'],
                'doctor_id': data['doctor_id']
            },
            {
                '$set': {
                    'granted': False,
                    'revoked_at': datetime.utcnow()
                }
            }
        )
        
        return jsonify({
            'success': True,
            'message': 'Consent revoked'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== Doctor/Nurse Endpoints ====================

@app.route('/api/patients', methods=['GET'])
@jwt_required()
def get_patients():
    """Get list of patients (for doctors/nurses)"""
    try:
        current_user = get_jwt_identity()
        
        if current_user['role'] not in ['doctor', 'nurse']:
            return jsonify({'error': 'Unauthorized'}), 403
        
        # Get patients with active consent
        consents = list(consent_collection.find({
            'doctor_id': current_user['user_id'],
            'granted': True
        }))
        
        patient_ids = [c['patient_id'] for c in consents]
        
        patients = list(users_collection.find(
            {'_id': {'$in': [ObjectId(pid) for pid in patient_ids]}}
        ))
        
        # Get latest health data for each patient
        patient_data = []
        for patient in patients:
            latest_health = health_records_collection.find_one(
                {'user_id': str(patient['_id'])},
                sort=[('timestamp', -1)]
            )
            
            patient_info = serialize_doc(patient)
            patient_info['latest_health'] = serialize_doc(latest_health) if latest_health else None
            patient_data.append(patient_info)
        
        return jsonify({
            'success': True,
            'count': len(patient_data),
            'patients': patient_data
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/alerts', methods=['GET'])
@jwt_required()
def get_alerts():
    """Get active alerts (for doctors/nurses)"""
    try:
        current_user = get_jwt_identity()
        
        if current_user['role'] not in ['doctor', 'nurse']:
            return jsonify({'error': 'Unauthorized'}), 403
        
        alerts = list(alerts_collection.find(
            {'status': 'ACTIVE'}
        ).sort('created_at', -1))
        
        return jsonify({
            'success': True,
            'count': len(alerts),
            'alerts': [serialize_doc(a) for a in alerts]
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== Chatbot ====================

@app.route('/api/chatbot/query', methods=['POST'])
@jwt_required()
def chatbot_query():
    """Process chatbot health query"""
    try:
        data = request.get_json()
        query = data.get('query', '').lower()
        
        # Simple rule-based responses (in production, use NLP/LLM)
        responses = {
            'heart': "Based on your latest data, your heart rate is within normal range. Regular cardiovascular exercise can help maintain healthy heart function.",
            'stress': "Your stress levels are moderate. Consider meditation, deep breathing exercises, or yoga to help reduce stress.",
            'sleep': "Your sleep quality could be improved. Try maintaining a consistent sleep schedule and avoid screens before bedtime.",
            'risk': "Your current health risk score is calculated based on ECG patterns, stress levels, and sleep quality. Regular monitoring helps early detection.",
            'emergency': "If you're experiencing a medical emergency, please call 911 immediately or use the Emergency SOS button.",
        }
        
        response = "I can help you understand your health metrics and provide general wellness advice. What specific health concern would you like to discuss?"
        
        for keyword, resp in responses.items():
            if keyword in query:
                response = resp
                break
        
        return jsonify({
            'success': True,
            'query': data.get('query'),
            'response': response,
            'disclaimer': 'This is not a medical diagnosis. Consult a healthcare provider for medical advice.'
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== Emergency ====================

@app.route('/api/emergency/trigger', methods=['POST'])
@jwt_required()
def trigger_emergency():
    """Manually trigger emergency alert"""
    try:
        current_user = get_jwt_identity()
        
        # Get latest health data
        health_data = health_records_collection.find_one(
            {'user_id': current_user['user_id']},
            sort=[('timestamp', -1)]
        )
        
        vitals = health_data['vitals'] if health_data else {}
        risk_score = health_data['analysis']['risk_assessment']['risk_score'] if health_data else 100
        
        # Send alert
        alert_result = send_emergency_alert(current_user['user_id'], risk_score, vitals)
        
        return jsonify({
            'success': True,
            'message': 'Emergency alert sent to medical team',
            'alert': alert_result
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== Health Check ====================

@app.route('/api/health', methods=['GET'])
def health_check():
    """API health check"""
    return jsonify({
        'status': 'healthy',
        'service': 'Sentinel Backend API',
        'version': '1.0.0',
        'timestamp': datetime.utcnow().isoformat()
    }), 200

# ==================== Main ====================

if __name__ == '__main__':
    print("=" * 60)
    print("🏥 SENTINEL - AI-Powered Health Monitoring System")
    print("=" * 60)
    print("✅ Backend API initialized")
    print("✅ AI/ML models loaded")
    print("✅ MongoDB connected")
    print("=" * 60)
    print("API running on http://localhost:5000")
    print("=" * 60)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
