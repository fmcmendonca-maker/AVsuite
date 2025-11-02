# ✈️ Aviation Operations Suite
**Unified Web Toolkit for Airline & Charter Operations**

---

## 🧭 Overview
The **Aviation Operations Suite** is an integrated web-based platform for managing, analyzing, and simulating airline and charter operations.

It provides a cohesive environment where fleet managers, analysts, and operators can:
- Manage airline and aircraft data  
- Calculate ACMI, fuel, and navigation costs  
- Visualize KPIs and operational summaries  
- Match available aircraft to charter requests  

All modules share a unified interface, theming system, and data sources.

---

## 🧩 Components

| Module | Description | File |
|---------|--------------|------|
| 🏠 **Main Menu** | Central navigation hub with live data status, theme switching, and access to all tools. | `index.html` |
| 🧭 **Airline Manager** | Manage, filter, and explore airline data from a central JSON database. | `airline_manager.html` |
| 📊 **Analytics Dashboard** | Visualize airline KPIs, fleet distribution, and regional metrics. | `airline_dashboard.html` |
| ⚖️ **Flight Cost Calculator** | Multi-leg ACMI, fuel, navigation, landing, and handling cost simulator. Includes map and FX rate integration. | `gc_calculator.html` |
| 🧩 **Charter Match** | Match charter requests with available aircraft using operational data. | `charter_match.html` |

---

## 📂 Data Sources

| File | Purpose |
|------|----------|
| `airlineData.json` | Contains airline names, types, countries, and categories. |
| `aircraftData.json` | Contains aircraft performance and operational cost data. |

*These JSON files power all tools in the suite, ensuring consistency and shared updates.*

---

## 🎨 Theming System

The suite supports **dual visual themes**:
- 🟦 **SkyBlue Dark** — modern, technical look *(default)*
- 🟡 **Aviation Gold (FlightOps)** — Flightradar-style dark theme with gold accents

Themes are handled by `themeToggle.js` and remembered in `localStorage`.

Each page includes the toggle controls:

Your last selected theme automatically loads on every visit.

---

## 🔧 Live Features
- **Real-time FX rate fetching** (cached for 24 hours)
- **Dynamic map rendering** (Leaflet.js)
- **Live data validation** on the main menu
- **Persistent user settings**
- **Works locally or online** with:
  ```bash
  python3 -m http.server 8000


aviation-suite/
├── index.html              # Main menu (live data + theme toggle)
├── airline_manager.html    # Airline Manager
├── airline_dashboard.html  # Analytics Dashboard
├── gc_calculator.html      # Flight Cost Calculator
├── charter_match.html      # Charter Matching Tool
├── themeToggle.js          # Shared theme switching logic
├── style_skyblue.css       # Default blue theme
├── style_flightops.css     # Aviation gold theme
├── airlineData.json        # Airline data
└── aircraftData.json       # Aircraft data

🛫 Summary

The Aviation Operations Suite unifies multiple tools into a single, professional-grade environment for analyzing, managing, and simulating airline and charter operations.
Built entirely with HTML, CSS, and JavaScript, it’s lightweight, modular, and deployable anywhere — from a local test server to full production hosting.

💡 Quick Start

Clone or download the project.

Launch a local server:

python3 -m http.server 8000


Open your browser to:

http://localhost:8000


Use the main menu (index.html) to access all tools.


---

Would you like me to generate this as an actual `README.md` file (ready to download and place in your GitHub repo root)?

