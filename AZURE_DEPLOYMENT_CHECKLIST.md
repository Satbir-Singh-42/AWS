# Azure Deployment Checklist - WebShield Scanner

## ✅ Pre-Deployment Verification (COMPLETED)

### Code Issues Fixed
- ✅ Removed all hardcoded paths (`/home/priyanshu/project/`)
- ✅ Made file paths dynamic and cross-platform compatible
- ✅ Fixed app.py initialization order
- ✅ Removed duplicate dependencies in requirements.txt

### Files Ready for Deployment
- ✅ `requirements.txt` - Clean, production-ready
- ✅ `Dockerfile` - Updated with Python 3.11 and all system dependencies
- ✅ `app.py` - Fixed startup sequence
- ✅ `utils/scan_utils.py` - All paths dynamically generated
- ✅ `azure-deployment.json` - Azure configuration reference

---

## 🔴 CRITICAL: Azure Region Selection

**Your Previous Error:** "South India" region is NOT available in your subscription

### Allowed Regions (Choose ONE):
- ✅ **East US** (Recommended)
- ✅ **West US** (Recommended)
- ✅ **West Europe** (Recommended)
- ✅ **Southeast Asia** (Recommended)
- ✅ **Australia East**
- ✅ **Canada Central**

### NOT Allowed:
- ❌ South India
- ❌ Central India

---

## 📋 Step-by-Step Azure Deployment

### 1. Create Resource Group
```
Region: Choose from allowed list above
Name: WebShield-Scanner-RG
```

### 2. Create App Service
```
Name: webshield-scanner-[yourname]
Runtime: Python 3.11
Region: Choose from allowed list
App Service Plan: B1 (Basic) minimum
```

### 3. Configure Deployment
```
Method: GitHub, Zip upload, or Azure DevOps
Branch: main (or your branch)
```

### 4. Set App Settings
In Azure Portal → App Service → Configuration → Application settings:

| Key | Value |
|-----|-------|
| `SCM_DO_BUILD_DURING_DEPLOYMENT` | `true` |
| `WEBSITES_PORT` | `5000` |
| `ENABLE_ORYX_BUILD` | `true` |

### 5. Set Startup Command
App Service → Configuration → General settings:

```
gunicorn --bind=0.0.0.0:5000 --workers=2 --timeout=120 app:app
```

### 6. Deploy
```
Upload/Connect repository
Azure will:
  - Detect Python
  - Run: pip install -r requirements.txt
  - Run startup command
```

---

## ⚠️ System Dependencies on Azure

Azure App Service may NOT have pre-installed:
- nmap
- nikto
- wapiti
- ffuf
- wkhtmltopdf

### Solution 1: Use Dockerfile (RECOMMENDED)
```
# Azure Container Registry → Azure App Service
docker build -t webshield .
docker push [registry].azurecr.io/webshield
# Then deploy from registry
```

### Solution 2: Use Buildpack Extensions
Add `.deployment` file:
```
[config]
command = scripts/build.sh
```

### Solution 3: Cloud Init
Use startup scripts to install tools on App Service startup

---

## 🧪 Testing Before Azure Deployment

### Local Testing
```bash
# 1. Start the app
python app.py
# OR
gunicorn --bind=0.0.0.0:5000 app:app

# 2. Visit http://localhost:5000
# 3. Try each scan type:
#    - Nmap
#    - Nikto  
#    - Wapiti
#    - Ffuf
```

### Docker Testing
```bash
# 1. Build
docker build -t webshield .

# 2. Run
docker run -p 5000:5000 webshield

# 3. Visit http://localhost:5000
```

---

## 🚀 Deployment Options Comparison

| Feature | Replit | Azure App Service | Docker | Railway |
|---------|--------|-------------------|--------|---------|
| Cost | Free | Free tier 60min/day | Pay-as-you-go | Free $5/mo |
| Setup Time | 2 min | 15 min | 10 min | 5 min |
| Scalability | Limited | Excellent | Good | Good |
| Live URL | Instant | 5 min | Varies | 5 min |
| Region Choice | Fixed | Your choice ⚠️ | Your choice | Your choice |
| Support | Replit | Microsoft | Community | Railway |
| Best For | Testing | Production | Flexibility | Testing |

---

## 🎯 Quick Decision Tree

```
Need to deploy NOW?
├─ YES, for testing? → Use Replit Publishing (FREE, 2 min)
│
├─ YES, production? 
│  ├─ Using Azure specifically? → Use Docker + Azure Container Registry
│  │  (Avoids dependency issues)
│  │
│  └─ Open to other platforms? → Use Railway/Fly.io
│     (Simpler than Azure)
│
└─ No, need time to prepare? → Fix issues locally first
   ├─ Test with Docker locally
   └─ Then pick deployment platform
```

---

## 📊 Monitoring After Deployment

### Azure Portal
- Go to App Service → Overview → Deployment
- Check status and logs in "Deployment Center"
- View real-time logs: "Log Stream"

### Common Issues
| Error | Solution |
|-------|----------|
| nmap: command not found | Use Dockerfile deployment |
| Port 5000 already in use | Check `WEBSITES_PORT` setting |
| Region not allowed | Choose different region |
| Timeout during build | Increase timeout in startup command |

---

## 📝 Environment Variables (If Needed)

For production, set via Azure Portal:
- Configuration → Application settings

Never hardcode in app.py:
```python
# ❌ WRONG
API_KEY = "my-secret-key"

# ✅ RIGHT
API_KEY = os.environ.get("API_KEY")
```

---

## 🔗 Useful Links

- **Azure Python Quickstart:** https://docs.microsoft.com/azure/app-service/quickstart-python
- **Gunicorn Deployment:** https://gunicorn.org/
- **Docker Official:** https://docs.docker.com/
- **This Project:** See README.md

---

## ✨ Final Checklist Before Clicking Deploy

- [ ] Region is from the **allowed list**
- [ ] Startup command set correctly
- [ ] App settings configured
- [ ] Tested locally with `python app.py`
- [ ] Tested with Docker (if using)
- [ ] requirements.txt is clean
- [ ] No secrets in code (use env vars)
- [ ] README.md has deployment instructions

---

**Status:** ✅ Ready to Deploy
**Last Updated:** December 18, 2025
**App Version:** v1.0.0
