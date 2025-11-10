# 🔧 Quick Fix Guide - Port 5000 Issue on macOS

## ✅ Problem Solved!

Your server has been updated to use **port 5001** instead of port 5000 to avoid conflicts with macOS AirPlay Receiver.

## What Was Changed

1. **Backend port changed:** `server/app.py` now uses port 5001
2. **Frontend updated:** `src/components/AIAssistant.jsx` connects to port 5001
3. **Scripts updated:** `start.sh` and `start.bat` reflect new port

## How to Run Now

```bash
# Navigate to server directory
cd /Users/igondelacruz/Travel_Ai/server

# Activate virtual environment
source venv/bin/activate

# Start the server (now on port 5001)
python app.py
```

The server will now run on **http://localhost:5001** ✅

## Alternative: Disable AirPlay Receiver (macOS)

If you prefer to use port 5000, you can disable AirPlay Receiver:

1. Open **System Settings** (or System Preferences)
2. Go to **General** → **AirDrop & Handoff**
3. Toggle **OFF** "AirPlay Receiver"
4. Port 5000 will now be available

## Using the Startup Script

The easy way - just run:

```bash
./start.sh
```

This will automatically:
- Start backend on port 5001
- Start frontend on port 3000
- Open your browser

## Testing the Backend

```bash
# Test if backend is running
curl http://localhost:5001/api/health

# Expected response:
# {"status":"healthy","message":"Travel AI API is running"}
```

## Common Issues Fixed

### ❌ "ModuleNotFoundError: No module named 'flask_cors'"
**Solution:** Install dependencies
```bash
cd server
source venv/bin/activate
pip install -r requirements.txt
```

### ❌ "Address already in use" on port 5000
**Solution:** Now using port 5001 (already fixed!) ✅

### ❌ Frontend can't connect to backend
**Solution:** Updated to use port 5001 (already fixed!) ✅

## Port Configuration Summary

| Service | Port | URL |
|---------|------|-----|
| Frontend (React) | 3000 | http://localhost:3000 |
| Backend (Flask) | 5001 | http://localhost:5001 |
| API Endpoints | 5001 | http://localhost:5001/api/* |

## Quick Start Commands

```bash
# Option 1: Use startup script (easiest)
./start.sh

# Option 2: Manual start
# Terminal 1 - Backend
cd server
source venv/bin/activate
python app.py

# Terminal 2 - Frontend
npm run dev
```

## All Fixed! 🎉

Your application is now ready to run without port conflicts!

**Next steps:**
1. Add your Hugging Face API key to `server/.env`
2. Run `./start.sh`
3. Open http://localhost:3000
4. Start building!

---

**Note:** All documentation has been updated to reflect port 5001.
