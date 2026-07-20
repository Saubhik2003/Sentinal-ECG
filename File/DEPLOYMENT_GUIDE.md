# 🚀 Sentinel - Complete Setup & Deployment Guide

This guide provides step-by-step instructions for setting up and deploying the Sentinel AI-Powered Medical Health Monitoring System.

## 📋 Table of Contents

1. [System Requirements](#system-requirements)
2. [Quick Start](#quick-start)
3. [Development Setup](#development-setup)
4. [Production Deployment](#production-deployment)
5. [Database Configuration](#database-configuration)
6. [Security Setup](#security-setup)
7. [Testing](#testing)
8. [Monitoring & Maintenance](#monitoring--maintenance)
9. [Troubleshooting](#troubleshooting)

---

## System Requirements

### Minimum Requirements
- **CPU**: 2 cores
- **RAM**: 4GB
- **Storage**: 20GB SSD
- **OS**: Ubuntu 20.04+, macOS 12+, or Windows 10+

### Recommended for Production
- **CPU**: 4+ cores
- **RAM**: 8GB+
- **Storage**: 50GB+ SSD
- **OS**: Ubuntu 22.04 LTS

### Software Dependencies
- Python 3.11+
- MongoDB 6.0+
- Node.js 18+ (optional)
- Docker 24+ & Docker Compose 2+ (for containerized deployment)

---

## Quick Start

### Option 1: Local Development (5 minutes)

```bash
# 1. Clone repository
git clone https://github.com/your-org/sentinel.git
cd sentinel

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Start MongoDB (if not already running)
# On Ubuntu/Debian:
sudo systemctl start mongod

# On macOS with Homebrew:
brew services start mongodb-community

# On Windows:
net start MongoDB

# 4. Start backend
python backend_api.py

# 5. Open frontend (in another terminal)
python -m http.server 8000
# Then visit: http://localhost:8000/sentinel.html
```

### Option 2: Docker (2 minutes)

```bash
# 1. Clone repository
git clone https://github.com/your-org/sentinel.git
cd sentinel

# 2. Start all services
docker-compose up -d

# 3. Access application
# Frontend: http://localhost
# Backend API: http://localhost:5000
# MongoDB: localhost:27017
```

---

## Development Setup

### 1. Environment Setup

#### Create Virtual Environment
```bash
# Create venv
python -m venv venv

# Activate
# On Linux/macOS:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

#### Install Dependencies
```bash
pip install -r requirements.txt
```

#### Create Environment File
```bash
# Copy example
cp .env.example .env

# Edit .env with your settings
nano .env  # or use your preferred editor
```

### 2. Database Setup

#### Install MongoDB

**Ubuntu/Debian:**
```bash
# Import MongoDB public GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Create list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

**macOS:**
```bash
# Install via Homebrew
brew tap mongodb/brew
brew install mongodb-community@6.0

# Start MongoDB
brew services start mongodb-community@6.0
```

**Windows:**
```bash
# Download from: https://www.mongodb.com/try/download/community
# Run installer and follow wizard
# Start MongoDB as a service
```

#### Initialize Database
```bash
# Connect to MongoDB
mongosh

# Run initialization script
use sentinel_health;

# Create indexes
db.users.createIndex({ "email": 1 }, { unique: true });
db.health_records.createIndex({ "user_id": 1, "timestamp": -1 });
db.reports.createIndex({ "user_id": 1, "created_at": -1 });
db.consent.createIndex({ "patient_id": 1, "doctor_id": 1 }, { unique: true });
db.alerts.createIndex({ "patient_id": 1, "created_at": -1 });

exit;
```

### 3. Run Development Server

```bash
# Terminal 1: Backend
python backend_api.py

# Terminal 2: Frontend (optional - for development)
python -m http.server 8000
```

#### Verify Installation
```bash
# Test backend health
curl http://localhost:5000/api/health

# Expected response:
# {
#   "status": "healthy",
#   "service": "Sentinel Backend API",
#   "version": "1.0.0"
# }
```

---

## Production Deployment

### Option 1: Docker Deployment (Recommended)

#### 1. Prepare Environment
```bash
# Create production env file
cp .env.example .env.production

# Edit production settings
nano .env.production
```

Important production settings:
```env
FLASK_ENV=production
JWT_SECRET_KEY=<generate-secure-random-key>
MONGODB_URI=mongodb://sentinel:strong_password@mongodb:27017/sentinel_health?authSource=admin
```

#### 2. Deploy with Docker Compose
```bash
# Build and start
docker-compose -f docker-compose.yml up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend
```

#### 3. Set Up SSL/TLS (Let's Encrypt)
```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d sentinel-health.com -d www.sentinel-health.com

# Auto-renewal (cron)
echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo tee -a /etc/crontab
```

### Option 2: Traditional Server Deployment

#### 1. Server Setup (Ubuntu 22.04)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Python
sudo apt install python3.11 python3.11-venv python3-pip -y

# Install MongoDB
# (follow MongoDB installation from Development Setup)

# Install Nginx
sudo apt install nginx -y

# Install Supervisor (for process management)
sudo apt install supervisor -y
```

#### 2. Application Setup
```bash
# Create application user
sudo useradd -m -s /bin/bash sentinel
sudo su - sentinel

# Clone repository
git clone https://github.com/your-org/sentinel.git
cd sentinel

# Create virtual environment
python3.11 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install gunicorn  # Production WSGI server
```

#### 3. Gunicorn Configuration
Create `/home/sentinel/sentinel/gunicorn_config.py`:
```python
bind = "127.0.0.1:5000"
workers = 4
worker_class = "sync"
timeout = 120
keepalive = 5
accesslog = "/home/sentinel/sentinel/logs/gunicorn_access.log"
errorlog = "/home/sentinel/sentinel/logs/gunicorn_error.log"
loglevel = "info"
```

#### 4. Supervisor Configuration
Create `/etc/supervisor/conf.d/sentinel.conf`:
```ini
[program:sentinel]
command=/home/sentinel/sentinel/venv/bin/gunicorn -c /home/sentinel/sentinel/gunicorn_config.py backend_api:app
directory=/home/sentinel/sentinel
user=sentinel
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/home/sentinel/sentinel/logs/supervisor.log
environment=PATH="/home/sentinel/sentinel/venv/bin"
```

Start Supervisor:
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start sentinel
sudo supervisorctl status sentinel
```

#### 5. Nginx Configuration
Create `/etc/nginx/sites-available/sentinel`:
```nginx
server {
    listen 80;
    server_name sentinel-health.com www.sentinel-health.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name sentinel-health.com www.sentinel-health.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/sentinel-health.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/sentinel-health.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Frontend
    location / {
        root /home/sentinel/sentinel;
        index sentinel.html;
        try_files $uri $uri/ /sentinel.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/sentinel /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### Option 3: Cloud Deployment

#### AWS Elastic Beanstalk
```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p python-3.11 sentinel-health

# Create environment
eb create sentinel-production --database --database.engine postgres

# Deploy
eb deploy

# Open application
eb open
```

#### Heroku
```bash
# Login
heroku login

# Create app
heroku create sentinel-health

# Add MongoDB addon
heroku addons:create mongolab:sandbox

# Deploy
git push heroku main

# Open app
heroku open
```

#### Google Cloud Platform
```bash
# Initialize
gcloud init

# Create App Engine app
gcloud app create

# Deploy
gcloud app deploy app.yaml

# View app
gcloud app browse
```

---

## Database Configuration

### Production MongoDB Setup

#### 1. Enable Authentication
```bash
# Connect to MongoDB
mongosh

use admin;

# Create admin user
db.createUser({
  user: "admin",
  pwd: "secure_admin_password",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
});

# Create application user
use sentinel_health;
db.createUser({
  user: "sentinel",
  pwd: "secure_app_password",
  roles: [
    { role: "readWrite", db: "sentinel_health" }
  ]
});

exit;
```

#### 2. Enable Authentication in Config
Edit `/etc/mongod.conf`:
```yaml
security:
  authorization: enabled
```

Restart MongoDB:
```bash
sudo systemctl restart mongod
```

#### 3. Update Connection String
In `.env`:
```env
MONGODB_URI=mongodb://sentinel:secure_app_password@localhost:27017/sentinel_health?authSource=sentinel_health
```

### Backup Configuration

#### Automated Backup Script
Create `/home/sentinel/scripts/backup_mongodb.sh`:
```bash
#!/bin/bash

BACKUP_DIR="/backups/mongodb"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_NAME="sentinel_backup_$TIMESTAMP"

# Create backup
mongodump --uri="mongodb://sentinel:password@localhost:27017/sentinel_health" --out="$BACKUP_DIR/$BACKUP_NAME"

# Compress
tar -czf "$BACKUP_DIR/$BACKUP_NAME.tar.gz" -C "$BACKUP_DIR" "$BACKUP_NAME"
rm -rf "$BACKUP_DIR/$BACKUP_NAME"

# Keep only last 30 days
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +30 -delete

echo "Backup completed: $BACKUP_NAME.tar.gz"
```

Add to crontab:
```bash
# Run daily at 2 AM
0 2 * * * /home/sentinel/scripts/backup_mongodb.sh
```

---

## Security Setup

### 1. Firewall Configuration
```bash
# UFW (Ubuntu)
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable
```

### 2. Fail2Ban (Brute Force Protection)
```bash
# Install
sudo apt install fail2ban -y

# Configure
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
sudo nano /etc/fail2ban/jail.local
```

Add custom jail:
```ini
[sentinel-auth]
enabled = true
port = http,https
filter = sentinel-auth
logpath = /home/sentinel/sentinel/logs/gunicorn_access.log
maxretry = 5
bantime = 3600
```

### 3. Rate Limiting
Already implemented in backend with Flask-Limiter.

### 4. Security Headers
Configured in Nginx (see above).

---

## Testing

### Run Unit Tests
```bash
# Install test dependencies
pip install pytest pytest-flask pytest-cov

# Run tests
pytest tests/ -v

# With coverage
pytest --cov=. tests/
```

### API Testing with curl

#### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPass123!",
    "role": "patient"
  }'
```

#### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

#### Health Analysis (with token)
```bash
TOKEN="your_jwt_token_here"

curl -X POST http://localhost:5000/api/health/analyze \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "heart_rate": 75,
    "hrv": 55,
    "activity_level": 4,
    "sleep_duration": 7.5,
    "sleep_quality": 80,
    "rem_percentage": 22
  }'
```

---

## Monitoring & Maintenance

### Application Monitoring

#### 1. Logging
```bash
# View backend logs
tail -f logs/gunicorn_access.log
tail -f logs/gunicorn_error.log

# View supervisor logs
sudo tail -f /var/log/supervisor/sentinel.log
```

#### 2. Health Checks
```bash
# Backend health
curl http://localhost:5000/api/health

# Database health
mongosh --eval "db.adminCommand('ping')"
```

### System Monitoring

#### Install monitoring tools
```bash
# Install htop
sudo apt install htop -y

# Install MongoDB monitoring
sudo apt install mongodb-org-tools -y
```

#### Monitor MongoDB
```bash
# Connect
mongosh

# Show stats
use sentinel_health;
db.stats();

# Show collection stats
db.health_records.stats();

# Monitor operations
db.currentOp();
```

---

## Troubleshooting

### Common Issues

#### 1. MongoDB Connection Failed
```bash
# Check MongoDB status
sudo systemctl status mongod

# Check MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log

# Restart MongoDB
sudo systemctl restart mongod
```

#### 2. Backend Not Starting
```bash
# Check Python version
python --version  # Should be 3.11+

# Verify dependencies
pip list

# Check logs
cat logs/gunicorn_error.log
```

#### 3. Port Already in Use
```bash
# Find process using port 5000
sudo lsof -i :5000

# Kill process
sudo kill -9 <PID>
```

#### 4. Permission Denied Errors
```bash
# Fix ownership
sudo chown -R sentinel:sentinel /home/sentinel/sentinel

# Fix permissions
sudo chmod -R 755 /home/sentinel/sentinel
```

### Getting Help

- **Documentation**: https://docs.sentinel-health.com
- **GitHub Issues**: https://github.com/your-org/sentinel/issues
- **Email Support**: support@sentinel-health.com
- **Community**: https://community.sentinel-health.com

---

## Maintenance Checklist

### Daily
- [ ] Check application logs for errors
- [ ] Monitor system resources (CPU, RAM, Disk)
- [ ] Verify automated backups completed

### Weekly
- [ ] Review security logs
- [ ] Check database performance
- [ ] Test emergency alert system
- [ ] Review user feedback

### Monthly
- [ ] Update dependencies
- [ ] Review and rotate logs
- [ ] Test disaster recovery
- [ ] Performance optimization review

### Quarterly
- [ ] Security audit
- [ ] Update SSL certificates
- [ ] Capacity planning review
- [ ] User training sessions

---

**Congratulations!** 🎉 Your Sentinel installation is complete and ready for production use.

For more information, visit: https://sentinel-health.com
