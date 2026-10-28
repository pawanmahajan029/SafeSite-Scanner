# How to Run in VS Code / Antigravity IDE

This guide shows you how to run the project directly inside the **VS Code** or **Antigravity IDE** integrated terminal.

---

## Step 1: Open the Terminal in VS Code / Antigravity IDE

1. Press **`` Ctrl + ` ``** (Backtick — the key above `Tab`).
   * *Alternatively:* Click **Terminal** from the top menu bar → **New Terminal**.
2. Your terminal will automatically open at the bottom of the screen inside your project folder (`raven-main`).

---

## Step 2: Start the Backend (Terminal 1)

In the open terminal panel at the bottom:

1. Navigate into the `backend` folder:
   ```powershell
   cd backend
   ```

2. Run this command to start the backend:
   ```powershell
   .\venv\Scripts\uvicorn.exe main:app --reload --host 127.0.0.1 --port 8000
   ```

3. **✅ You will see:**
   ```text
   INFO:     Application startup complete.
   INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
   ```

👉 **Leave this terminal running.**

---

## Step 3: Open a Second Terminal (Terminal 2)

You need a second terminal tab for the frontend while the backend stays running:

1. In the top-right corner of the **Terminal panel**, click the **`+` (plus)** icon (or press `Ctrl + Shift + \``).
   * *Tip:* You can also click the **Split Terminal icon** to view both terminals side-by-side.
2. A new, blank terminal tab will appear.

---

## Step 4: Start the Frontend (Terminal 2)

In your new second terminal:

1. Navigate into the `frontend` folder:
   ```powershell
   cd frontend
   ```

2. Run this command to start the frontend:
   ```powershell
   npm run dev
   ```

3. **✅ You will see:**
   ```text
     VITE v5.4.21  ready in 250 ms

     ➜  Local:   http://localhost:5173/
   ```

👉 **Leave this terminal running as well.**

---

## Step 5: Open the Application

* Hold **`Ctrl`** and **click** on `http://localhost:5173/` directly inside the terminal (or open your browser manually).
* **Website UI:** [http://localhost:5173](http://localhost:5173)
* **API Documentation (Swagger UI):** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## How to Stop the Servers

When you want to stop:
1. Click on the first terminal tab and press **`Ctrl + C`**.
2. Switch to the second terminal tab and press **`Ctrl + C`**.

---




## 🛠️ First-Time Setup (Only Needed Once on a New Computer)

If you just cloned or downloaded this project on a new computer, you must run this one-time setup before starting:

### Prerequisites
Make sure you have installed on your computer:
* **Python 3.10+** ([python.org](https://www.python.org/downloads/))
* **Node.js (v18+) & npm** ([nodejs.org](https://nodejs.org/))

---

### Step A: Setup Backend Dependencies (One-time)
In your terminal, run:

```powershell
cd backend
python -m venv venv
.\venv\Scripts\pip.exe install -r requirements.txt
cd ..
```

---

### Step B: Setup Frontend Dependencies (One-time)
In your terminal, run:

```powershell
cd frontend
npm install
cd ..
```

---

### Step C: Setup Environment File (One-time)
Copy the example environment configuration:

```powershell
Copy-Item .env.example .env
```

---

## 📦 What Dependencies Are Being Installed?

Here is an overview of what the setup installs and why:

### Backend Dependencies (`requirements.txt`)
| Package | Purpose |
| :--- | :--- |
| **`fastapi` & `uvicorn`** | High-performance asynchronous REST API server and WebSocket handler. |
| **`httpx`** | Asynchronous HTTP client for passive web scanning and header inspection. |
| **`beautifulsoup4` & `lxml`** | HTML/DOM parsers for crawling links, JSON-LD, forms, and scripts. |
| **`cryptography`** | SSL/TLS certificate analysis, protocol verification, and cipher suite checks. |
| **`slowapi`** | Rate limiting (prevents target overload and rate limit abuse). |
| **`weasyprint`** | Generates downloadable PDF security assessment reports. |
| **`python-dotenv`** | Loads `.env` configuration (API keys, body size limits). |

### Frontend Dependencies (`package.json`)
| Package | Purpose |
| :--- | :--- |
| **`react` & `react-dom`** | Core UI component framework (v18). |
| **`vite`** | Fast bundler and local development server with instant Hot Module Replacement (HMR). |
| **`tailwindcss`** | Modern styling framework powering the dark/light cyber theme. |
| **`lucide-react`** | Vector security icons (shields, bugs, servers, search). |
| **`chart.js` / `recharts`** | Visual score gauges and vulnerability distribution charts. |
| **`axios`** | Sends scan requests to backend API (`/api/scan/...`). |

---

## 💾 Database (Automatic Setup)
You **do not** need to install or configure any database (like MySQL or PostgreSQL). 
The backend automatically initializes a local **SQLite database** at `backend/data/scans.db` the very first time you start it. All past scan history is saved here automatically.

---

## ❓ Common First-Time Troubleshooting

### 1. `'python'` is not recognized
* **Cause:** Python is either not installed or wasn't added to your system PATH during installation.
* **Fix:** Reinstall Python from [python.org](https://www.python.org/downloads/) and make sure to check the box: **`☑ Add python.exe to PATH`**.

### 2. `'npm'` is not recognized
* **Cause:** Node.js is not installed.
* **Fix:** Download and run the Node.js installer from [nodejs.org](https://nodejs.org/) (LTS version).

### 3. PowerShell says: `Running scripts is disabled on this system`
* **Fix:** You don't need to run `activate` scripts! Just use the direct command provided in Step 2:
  ```powershell
  .\venv\Scripts\uvicorn.exe main:app --reload --host 127.0.0.1 --port 8000
  ```
  *(This bypasses PowerShell script execution policy restrictions completely).*

### 4. Port 8000 or 5173 is already in use
* **Fix:** If another application or a previous scan session is running, close other terminal windows or run:
  ```powershell
  # To stop any running uvicorn process on Windows
  Get-Process -Name python -ErrorAction SilentlyContinue | Stop-Process -Force
  ```

---

🎉 **You are all set!** Follow **Steps 1 to 5** at the top whenever you want to run the application.


