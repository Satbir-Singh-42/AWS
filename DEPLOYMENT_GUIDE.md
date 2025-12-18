# WebShield Scanner - Deployment Guide

## Free Deployment Options & Selection Choices

### Option 1: Replit Publishing (RECOMMENDED - FREE TIER AVAILABLE)
**Best for:** Quick deployment with minimal configuration

**Cost:** Free with Replit account (paid options available for premium)

**Pros:**
- Easiest setup - click "Publish" button
- No complex configuration needed
- Automatic HTTPS certificates
- Live URL immediately (e.g., `https://webshield-scanner.replit.dev`)
- Integrated with Replit ecosystem

**Steps:**
1. Click "Publish" button in Replit
2. Select "Autoscale" deployment type
3. Configure startup command: `gunicorn --bind=0.0.0.0:5000 --workers=2 app:app`
4. Click "Deploy"
5. Share your live URL

---

### Option 2: Azure App Service (FREE TIER)
**Best for:** Production-grade deployment with scalability

**Cost:** Free tier: 60 min/day compute, then paid (~$10-20/month for pay-as-you-go)

**Requirements BEFORE deployment:**
- Azure account with regional access (NOT South India - use East US, West US, West Europe, or Southeast Asia)
- No development/API keys exposed in code

**Critical Fixes for Azure (COMPLETED):**
✅ Removed hardcoded paths (`/home/priyanshu/project/`)
✅ Made file paths dynamic and cross-platform compatible
✅ App.py corrected for proper initialization

**Steps:**
1. Create Azure App Service
2. Select **allowed region** during creation (NOT South India)
3. Choose Python 3.11 runtime
4. Set startup command: `gunicorn --bind=0.0.0.0 --port=%PORT% app:app`
5. Add app settings:
   ```
   WEBSITES_PORT=5000
   SCM_DO_BUILD_DURING_DEPLOYMENT=true
   ```
6. Deploy via GitHub, zip upload, or Azure CLI

---

### Option 3: Heroku (PAID - No Free Tier Anymore)
**Cost:** Starting at $7/month

**Not recommended** - Heroku removed free tier in 2022

---

### Option 4: Railway (PAID - Free Trial)
**Cost:** Free $5/month credit, then pay-as-you-go (~$5-10/month typical)

**Pros:**
- Simple deployment
- Good for testing
- Automatic scaling

**Steps:**
1. Connect GitHub repo to Railway
2. Set build command: `pip install -r requirements.txt`
3. Set start command: `gunicorn --bind=0.0.0.0:5000 --workers=2 app:app`
4. Deploy

---

### Option 5: PythonAnywhere (FREE TIER LIMITED)
**Cost:** Free tier: 100 MB disk, 512 MB RAM; Paid: $5+/month

**Pros:**
- Easy web form setup
- Good documentation

**Cons:**
- Limited resources on free tier
- Tool dependencies (nmap, nikto) may not be available

---

### Option 6: Fly.io (FREE TIER)
**Cost:** Free tier: 3 shared-cpu-1x 256MB VMs

**Pros:**
- Global deployment
- Good documentation
- Docker-friendly

**Steps:**
1. Install Fly CLI
2. Run: `flyctl launch`
3. Configure `fly.toml`
4. Deploy: `flyctl deploy`

---

## Recommended Deployment Path

### For Testing/Development:
**→ Use Replit Publishing (FREE)**
- No setup needed
- Live URL in 2 minutes
- Perfect for demos

### For Production:
**→ Use Azure App Service**
- More control
- Better scalability
- Enterprise-ready
- **IMPORTANT:** Choose correct region (East US, West US, West Europe, Southeast Asia)

---

## Required System Dependencies for All Deployments

The app requires these security scanning tools:

```bash
# Linux (Ubuntu/Debian)
sudo apt-get install -y nmap nikto wkhtmltopdf

# For wapiti (web app vulnerability scanner)
pip install wapiti3

# For ffuf (hidden directory discovery)
sudo apt-get install -y ffuf
```

**Azure App Service:** These may not be pre-installed. Use Dockerfile for guaranteed dependencies.

---

## Pre-Deployment Checklist

Before deploying to ANY platform, verify:

- [ ] All hardcoded paths removed (**✅ DONE**)
- [ ] Requirements.txt complete and up-to-date
- [ ] Environment variables set (if needed)
- [ ] No API keys/secrets in code (**ALWAYS USE ENV VARS**)
- [ ] Dockerfile works locally (`docker-compose up`)
- [ ] Security tools (nmap, nikto) installed on target platform
- [ ] Startup command correct for target platform

---

## Azure Deployment - Regional Selection Guide

**⚠️ CRITICAL:** Choose from ALLOWED REGIONS ONLY

**Available Regions (typically):**
- East US ✅
- West US ✅
- West Europe ✅
- Southeast Asia ✅
- Australia East ✅
- Canada Central ✅

**NOT Available (restricted):**
- South India ❌
- Central India ❌
- (Check your subscription for full list)

**How to Check Your Allowed Regions:**
1. Go to Azure Portal
2. → Subscriptions → Your Subscription
3. → Policies → Check deployment restrictions

**If restricted:**
1. Contact Azure Support
2. Request access to additional regions
3. Or use different deployment option

---

## Docker Deployment (All Platforms)

Your project includes Dockerfile - use for consistent deployment:

```bash
# Build
docker build -t webshield-scanner .

# Run
docker run -p 5000:5000 webshield-scanner
```

**Deploy with Docker to:**
- Azure Container Instances
- AWS ECS
- Google Cloud Run
- Fly.io
- Railway

---

## Environment Variables (If Needed)

Create `.env` file locally (NEVER commit):

```
FLASK_ENV=production
LOG_LEVEL=INFO
MAX_SCAN_TIMEOUT=300
```

For deployment, set via platform's secrets manager.

---

## Performance Tuning by Platform

### Replit:
- Works out of the box
- Limited resources but good for demos

### Azure:
- Use App Service Plan B1 or higher
- Enable always-on for consistent availability
- Use slots for zero-downtime deployments

### Railway/Fly.io:
- Auto-scaling based on traffic
- Good for variable load

---

## Troubleshooting

**"Port already in use"**
- Kill existing process: `pkill -f gunicorn`
- Or use different port: change 5000 to 8000

**"Nmap/Nikto not found"**
- Install on target platform
- Use Dockerfile for guaranteed setup
- Check PATH environment variable

**"Region not allowed in Azure"**
- Select different region from dropdown
- Contact Azure Support for region access

**"Flask import error"**
- Ensure `pip install -r requirements.txt` runs
- Check Python version (3.7+)

---

## Quick Start Summary

### Fastest (Replit):
```
Click Publish → Select Autoscale → Done ✨
```

### Production (Azure):
```
1. Create App Service (allowed region)
2. Set runtime: Python 3.11
3. Startup: gunicorn --bind=0.0.0.0:5000 --workers=2 app:app
4. Deploy and enjoy
```

### Docker (Any Platform):
```
docker build -t app .
docker run -p 5000:5000 app
```

---

## Support & Documentation

- **Replit Publishing:** [Replit Docs](https://docs.replit.com)
- **Azure App Service:** [Azure Python Guide](https://docs.microsoft.com/en-us/azure/app-service/quickstart-python)
- **Docker:** [Docker Docs](https://docs.docker.com)
- **This App:** See README.md for local testing

---

**Last Updated:** December 18, 2025
**App Status:** ✅ Ready for deployment
