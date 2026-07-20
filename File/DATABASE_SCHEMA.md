# Sentinel Database Schema
MongoDB Collections and Document Structure

## Collections Overview

1. **users** - User accounts (patients, doctors, nurses)
2. **health_records** - Patient health data and vitals
3. **reports** - Generated medical reports
4. **consent** - Data access consent management
5. **alerts** - Emergency alerts and notifications

---

## 1. Users Collection

```javascript
{
  "_id": ObjectId("..."),
  "name": "John Doe",
  "email": "john@example.com",
  "password": "hashed_password_bcrypt",
  "role": "patient",  // patient | doctor | nurse
  "phone": "+1234567890",
  "dob": "1990-01-01",
  
  // Additional fields for doctors/nurses
  "specialty": "Cardiology",  // For doctors
  "license_number": "MD12345",
  "hospital_id": "hospital_123",
  
  // Profile information
  "profile": {
    "avatar_url": "https://...",
    "address": {
      "street": "123 Main St",
      "city": "Medical City",
      "state": "CA",
      "zip": "94000",
      "country": "USA"
    },
    "emergency_contact": {
      "name": "Jane Doe",
      "phone": "+1234567891",
      "relationship": "Spouse"
    }
  },
  
  // Medical history (for patients)
  "medical_history": {
    "blood_type": "O+",
    "allergies": ["Penicillin", "Pollen"],
    "chronic_conditions": ["Hypertension"],
    "medications": [
      {
        "name": "Lisinopril",
        "dosage": "10mg",
        "frequency": "Daily"
      }
    ],
    "surgeries": [
      {
        "procedure": "Appendectomy",
        "date": "2015-06-15",
        "hospital": "General Hospital"
      }
    ]
  },
  
  // Account metadata
  "created_at": ISODate("2026-01-01T00:00:00Z"),
  "updated_at": ISODate("2026-01-31T12:00:00Z"),
  "last_login": ISODate("2026-01-31T10:00:00Z"),
  "active": true,
  "verified": true,
  "two_factor_enabled": false
}
```

**Indexes:**
```javascript
db.users.createIndex({ "email": 1 }, { unique: true })
db.users.createIndex({ "role": 1 })
db.users.createIndex({ "created_at": -1 })
```

---

## 2. Health Records Collection

```javascript
{
  "_id": ObjectId("..."),
  "user_id": "user_object_id_string",
  "timestamp": ISODate("2026-01-31T12:00:00Z"),
  
  // Vital signs
  "vitals": {
    "heart_rate": 72,  // BPM
    "blood_pressure": {
      "systolic": 120,
      "diastolic": 80
    },
    "oxygen_saturation": 98,  // %
    "temperature": 98.6,  // Fahrenheit
    "respiratory_rate": 16,  // breaths per minute
    "hrv": 50,  // Heart rate variability
    "activity_level": 3,  // 1-10 scale
    "sleep_duration": 7.5,  // hours
    "sleep_quality": 75,  // 0-100 score
    "rem_percentage": 22  // %
  },
  
  // ECG data
  "ecg": {
    "raw_data": [/* 100-1000 data points */],
    "duration": 60,  // seconds
    "sampling_rate": 100,  // Hz
    "quality_score": 95  // 0-100
  },
  
  // AI Analysis results
  "analysis": {
    "ecg": {
      "classification": "Normal",  // Normal | Abnormal | Critical
      "normal": 0.89,
      "abnormal": 0.10,
      "critical": 0.01,
      "detected_conditions": [],
      "confidence": 0.89
    },
    "stress": {
      "stress_score": 45,  // 0-100
      "category": "Moderate",  // Low | Moderate | High
      "recommendation": "Try meditation or deep breathing exercises"
    },
    "sleep": {
      "quality_score": 75,
      "disorder_probability": 0.15,
      "has_disorder": false,
      "recommendation": "Maintain consistent sleep schedule"
    },
    "risk_assessment": {
      "risk_score": 28,  // 0-100
      "category": "Safe",  // Safe | Moderate Risk | Critical
      "components": {
        "ecg_contribution": 3,
        "stress_contribution": 18,
        "sleep_contribution": 7
      }
    }
  },
  
  // Device information
  "device": {
    "type": "wearable",  // wearable | manual | clinical
    "model": "Apple Watch Series 9",
    "firmware_version": "10.0.1"
  },
  
  // Metadata
  "created_at": ISODate("2026-01-31T12:00:00Z"),
  "processed": true,
  "notes": "Patient reported feeling tired during reading"
}
```

**Indexes:**
```javascript
db.health_records.createIndex({ "user_id": 1, "timestamp": -1 })
db.health_records.createIndex({ "analysis.risk_assessment.risk_score": -1 })
db.health_records.createIndex({ "timestamp": -1 })
```

---

## 3. Reports Collection

```javascript
{
  "_id": ObjectId("..."),
  "user_id": "user_object_id_string",
  "report_type": "comprehensive",  // comprehensive | ecg | stress | sleep
  "created_at": ISODate("2026-01-31T12:00:00Z"),
  
  // Report metadata
  "period": {
    "start_date": ISODate("2026-01-24T00:00:00Z"),
    "end_date": ISODate("2026-01-31T23:59:59Z"),
    "duration_days": 7
  },
  
  // Summary data
  "summary": {
    "risk_score": 28,
    "average_heart_rate": 73,
    "average_stress": 42,
    "average_sleep_quality": 76,
    "total_readings": 168,
    "alerts_triggered": 0
  },
  
  // Doctor remarks
  "doctor_remarks": {
    "doctor_id": "doctor_user_id",
    "doctor_name": "Dr. Sarah Johnson",
    "remarks": "Patient shows healthy vital signs. Continue monitoring.",
    "added_at": ISODate("2026-01-31T14:00:00Z")
  },
  
  // PDF data
  "pdf_data": BinData(0, "..."),  // Binary PDF data
  "pdf_size": 524288,  // bytes
  "pdf_url": "https://storage.sentinel.com/reports/...",
  
  // Access log
  "accessed_by": [
    {
      "user_id": "doctor_user_id",
      "accessed_at": ISODate("2026-01-31T14:00:00Z"),
      "ip_address": "192.168.1.100"
    }
  ],
  
  "status": "completed",  // pending | processing | completed | failed
  "shared_with": ["doctor_user_id_1", "doctor_user_id_2"]
}
```

**Indexes:**
```javascript
db.reports.createIndex({ "user_id": 1, "created_at": -1 })
db.reports.createIndex({ "status": 1 })
db.reports.createIndex({ "created_at": -1 })
```

---

## 4. Consent Collection

```javascript
{
  "_id": ObjectId("..."),
  "patient_id": "patient_user_id",
  "doctor_id": "doctor_user_id",
  
  // Consent status
  "granted": true,
  "granted_at": ISODate("2026-01-15T10:00:00Z"),
  "revoked_at": null,
  
  // Consent scope
  "permissions": {
    "view_health_records": true,
    "view_reports": true,
    "add_remarks": true,
    "receive_alerts": true,
    "generate_reports": true
  },
  
  // Expiration
  "expires_at": ISODate("2027-01-15T10:00:00Z"),
  "auto_renew": false,
  
  // Audit trail
  "history": [
    {
      "action": "granted",
      "timestamp": ISODate("2026-01-15T10:00:00Z"),
      "ip_address": "192.168.1.100",
      "reason": "Regular checkup"
    }
  ],
  
  "created_at": ISODate("2026-01-15T10:00:00Z"),
  "updated_at": ISODate("2026-01-15T10:00:00Z")
}
```

**Indexes:**
```javascript
db.consent.createIndex({ "patient_id": 1, "doctor_id": 1 }, { unique: true })
db.consent.createIndex({ "granted": 1 })
db.consent.createIndex({ "expires_at": 1 })
```

---

## 5. Alerts Collection

```javascript
{
  "_id": ObjectId("..."),
  "patient_id": "patient_user_id",
  "alert_type": "CRITICAL",  // INFO | WARNING | CRITICAL | EMERGENCY
  "risk_score": 75,
  
  // Trigger information
  "trigger": {
    "type": "automatic",  // automatic | manual
    "reason": "Risk score exceeded critical threshold (60)",
    "vitals_snapshot": {
      "heart_rate": 145,
      "blood_pressure": {
        "systolic": 180,
        "diastolic": 110
      }
    }
  },
  
  // Notification status
  "notified": {
    "nurse": {
      "sent": true,
      "sent_at": ISODate("2026-01-31T12:00:00Z"),
      "acknowledged": true,
      "acknowledged_at": ISODate("2026-01-31T12:01:00Z"),
      "acknowledged_by": "nurse_user_id"
    },
    "doctor": {
      "sent": true,
      "sent_at": ISODate("2026-01-31T12:00:30Z"),
      "acknowledged": true,
      "acknowledged_at": ISODate("2026-01-31T12:02:00Z"),
      "acknowledged_by": "doctor_user_id"
    },
    "emergency_services": {
      "sent": true,
      "sent_at": ISODate("2026-01-31T12:01:00Z"),
      "ambulance_dispatched": true,
      "eta": "8 minutes"
    },
    "family": {
      "sent": true,
      "sent_at": ISODate("2026-01-31T12:00:45Z"),
      "contacts_notified": ["emergency_contact_1"]
    }
  },
  
  // Response tracking
  "response": {
    "responded_by": "nurse_user_id",
    "response_time": 60,  // seconds
    "action_taken": "Patient assessed, doctor consulted, vitals stable",
    "escalated": true,
    "escalated_to": "doctor_user_id"
  },
  
  // Location data
  "location": {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "address": "123 Main St, San Francisco, CA 94102",
    "accuracy": "high"
  },
  
  // Status
  "status": "RESOLVED",  // ACTIVE | ACKNOWLEDGED | IN_PROGRESS | RESOLVED | CANCELLED
  "priority": "HIGH",  // LOW | MEDIUM | HIGH | CRITICAL
  
  // Timestamps
  "created_at": ISODate("2026-01-31T12:00:00Z"),
  "acknowledged_at": ISODate("2026-01-31T12:01:00Z"),
  "resolved_at": ISODate("2026-01-31T12:15:00Z"),
  "updated_at": ISODate("2026-01-31T12:15:00Z"),
  
  // Resolution notes
  "resolution_notes": "Patient vitals returned to normal. False alarm due to intense exercise."
}
```

**Indexes:**
```javascript
db.alerts.createIndex({ "patient_id": 1, "created_at": -1 })
db.alerts.createIndex({ "status": 1 })
db.alerts.createIndex({ "alert_type": 1 })
db.alerts.createIndex({ "priority": 1 })
db.alerts.createIndex({ "created_at": -1 })
```

---

## Database Initialization Script

```javascript
// Run this in MongoDB shell to initialize the database

use sentinel_health;

// Create collections with validators
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      required: ["name", "email", "password", "role"],
      properties: {
        role: {
          enum: ["patient", "doctor", "nurse"]
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
        }
      }
    }
  }
});

// Create indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.health_records.createIndex({ "user_id": 1, "timestamp": -1 });
db.reports.createIndex({ "user_id": 1, "created_at": -1 });
db.consent.createIndex({ "patient_id": 1, "doctor_id": 1 }, { unique: true });
db.alerts.createIndex({ "patient_id": 1, "created_at": -1 });

print("✅ Database initialized successfully");
```

---

## Data Retention Policy

- **Health Records**: Keep for 7 years (regulatory requirement)
- **Reports**: Keep indefinitely
- **Alerts**: Archive after 1 year
- **Consent Logs**: Keep for audit trail (indefinite)
- **User Accounts**: Soft delete, retain for 30 days before permanent deletion

## Backup Strategy

- **Full Backup**: Daily at 2:00 AM UTC
- **Incremental Backup**: Every 6 hours
- **Retention**: 30 days for daily backups, 1 year for monthly backups
- **Storage**: Encrypted cloud storage with geographic redundancy
