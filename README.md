<div align="center">

# 🛡️ SafeSite Scanner

**Next-Generation Passive Web Security Scanner & Attack Surface Intelligence Platform**

[![Python 3.11+](https://img.shields.io/badge/Python-3.11%2B-blue?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React 18](https://img.shields.io/badge/Frontend-React%2018-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Bundler-Vite%205-646C9A?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Tests Passing](https://img.shields.io/badge/Tests-24%2F24%20Passed-brightgreen)](backend/tests/)

<p align="center">
  <a href="#-key-features">Features</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-scoring-system">Scoring</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-security--ethics">Security & Ethics</a>
</p>

</div>

---

## ⚡ Overview

**SafeSite Scanner** is a full-stack, automated web application security auditing tool. It delivers enterprise-grade reconnaissance, vulnerability matching, parameter risk profiling, and OWASP Top 10 compliance assessments through **safe, passive analysis** — discovering flaws without sending malicious exploitation payloads.

```
   Target URL
       │
       ▼
 ┌──────────────┐      Level 1: Passive Recon & Server Fingerprint
 │   SafeSite   ├────► Level 2: CVE Matching, SSL/TLS, & WAF Detection
 │   Scanner    ├────► Level 3: Attack Vectors, XSS Reflection, & CSRF
 └──────┬───────┘      Level 4: OWASP Top 10, DNS, Email Security & Compliance
        │
        ▼
 📊 Composite Security Score (0–100) + Priority Remediation Plan
```

---

## 🚀 Key Features

### 🔍 Level 1 — Passive Reconnaissance & Fingerprinting
* **Server & Stack Detection:** Identifies web server software, versions, languages, frameworks, and CMS.
* **HTTP Security Header Audit:** Deep checks for `HSTS`, `CSP`, `X-Frame-Options`, `X-Content-Type-Options`, and `Permissions-Policy`.
* **Cookie Hygiene:** Audits `Secure`, `HttpOnly`, and `SameSite` flags across all session cookies.
* **Mozilla Observatory-Style Grading:** Provides a standardized security grade from A+ to F.

### 🛡️ Level 2 — Vulnerability Analysis
* **Local CVE Database:** Offline matching against high-risk software versions.
* **Live NVD / NIST Integration:** Real-time query to the National Vulnerability Database.
* **SSL/TLS Inspector:** Evaluates certificate validity, protocol versions (TLS 1.2/1.3), expiry, and weak ciphers.
* **WAF Fingerprinting:** Passive detection for Cloudflare, AWS WAF, Akamai, Imperva, ModSecurity, and more.

### 🎯 Level 3 — Attack Surface & Parameter Profiling
* **Injection Vector Detection:** Identifies unencoded inputs susceptible to SQLi or command injection.
* **Reflected XSS Analysis:** Evaluates parameter reflection in HTML bodies and response contexts.
* **Path Traversal & SSRF Indicators:** Flags sensitive parameter names (`file=`, `url=`, `redirect=`, `proxy=`).
* **CSRF & Rate Limiting Verification:** Evaluates form anti-CSRF token presence and client throttle behaviors.

### 🌐 Extended Security Modules
* **Site Crawler:** Recursive link and endpoint extraction with configurable depth.
* **OWASP Top 10 (2021):** Automated risk mapping against OWASP categories.
* **Compliance Assessment:** Readiness evaluations for PCI-DSS, GDPR, and HIPAA.
* **DNS & Email Security:** Resolves A, AAAA, MX, NS, and evaluates SPF, DKIM, and DMARC enforcement.
* **RFC 9116 Security.txt:** Validates standard security policy disclosures.
* **Multi-Format Export:** Export findings as JSON, CSV, or formatted reports.

---

## 🏗️ Architecture

```
SafeSite-Scanner/
├── backend/                  # FastAPI REST API (Python 3.11+)
│   ├── main.py               # API Entrypoint & middleware
│   ├── config/settings.py    # Environment settings & blocklists
│   ├── routes/               # API route handlers
│   │   ├── scan.py           # Core scanner endpoints
│   │   ├── crawler.py        # Crawler & extended analytics
│   │   ├── history.py        # Persistence & report generator
│   │   └── websocket.py      # Real-time WebSocket scan progress
│   ├── services/             # Core security analysis engines
│   ├── data/                 # CVE catalog, signatures, tech fingerprints
│   └── tests/                # Pytest automated test suite (24 tests)
├── frontend/                 # Reactive SPA (React 18 + Vite 5 + Tailwind)
│   ├── src/
│   │   ├── components/       # UI Dashboard & visualization cards
│   │   └── utils/api.js      # Axios client
│   └── tailwind.config.js    # Cybersecurity color themes
└── HOW_TO_RUN.md             # Detailed execution guide
```

---

## 📊 Scoring System

SafeSite Scanner computes a weighted composite score between **0 and 100**, placing heavier mathematical weight on confirmed vulnerabilities:

$$\text{Total Score} = (\text{Level 1} \times 0.30) + (\text{Level 2} \times 0.40) + (\text{Level 3} \times 0.30)$$

| Score Range | Status | Posture Meaning |
| :---: | :---: | :--- |
| **80 – 100** | 🟢 **Secure** | Strong defense-in-depth, modern headers, valid SSL/TLS, no high CVEs. |
| **60 – 79** | 🔵 **Moderate** | Functional security with minor misconfigurations or missing headers. |
| **40 – 59** | 🟡 **Weak / High Risk** | Vulnerabilities present or critical headers completely absent. |
| **0 – 39** | 🔴 **Critical Risk** | Severe vulnerabilities, outdated stacks, or high-severity CVE matches. |

---

## ⚡ Quick Start

### 1. Prerequisites
* **Python 3.10+**
* **Node.js 18+ & npm**

### 2. Setup Backend
```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Linux / macOS:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```
Backend API will be running on: **`http://127.0.0.1:8000`**  
Interactive API Docs (Swagger UI): **`http://127.0.0.1:8000/docs`**

### 3. Setup Frontend
```bash
# Open a second terminal and navigate to frontend
cd frontend

# Install packages
npm install

# Start Vite development server
npm run dev
```
Frontend web interface will be accessible on: **`http://localhost:5173`**

*(For a step-by-step terminal guide inside VS Code / Antigravity IDE, see [HOW_TO_RUN.md](HOW_TO_RUN.md)).*

---

## 🔌 API Reference

| Method | Endpoint | Description |
| :---: | :--- | :--- |
| `POST` | `/api/scan/full` | Full 3-level comprehensive security scan |
| `POST` | `/api/scan/level1` | Level 1: Reconnaissance, fingerprinting & headers |
| `POST` | `/api/scan/level2` | Level 2: CVE matching, SSL/TLS & WAF |
| `POST` | `/api/scan/level3` | Level 3: Parameter analysis & attack vectors |
| `POST` | `/api/scan/owasp` | OWASP Top 10 automated category evaluation |
| `POST` | `/api/crawl` | Recursive site crawler & endpoint mapper |
| `POST` | `/api/compliance` | PCI-DSS, GDPR, and HIPAA compliance check |
| `GET`  | `/api/scans` | Retrieve scan history from local SQLite store |
| `GET`  | `/api/health` | Health check and service status |

---

## 🔒 Security & Ethics

* **Passive Analysis Only:** SafeSite Scanner observes HTTP response headers, SSL certificates, DOM structures, and public metadata. It never injects destructive payloads or attempts unauthorized access.
* **SSRF & Private IP Protection:** Resolves hostnames against RFC 1918, loopback (`127.0.0.0/8`), and internal link-local addresses to prevent Server-Side Request Forgery.
* **Rate Limiting:** Enforces request quotas via `slowapi` to prevent target server denial of service.

---

