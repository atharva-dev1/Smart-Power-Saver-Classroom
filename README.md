# ⚡ Smart Power Saver Classroom

**Next-Gen Classroom Energy Automation System**  
*Designed & Developed by Team PowerSyncers*

![Project Banner](https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop)

## 🌟 Overview

**Smart Power Saver** is an innovative IoT-based solution designed to automate and optimize energy consumption in educational institutions. 

This project features a **fully interactive 3D simulation** that behaves exactly like the physical hardware. It demonstrates how an Arduino-based system detects classroom occupancy to automatically control lights, fans, and AC units, significantly reducing electricity wastage.

## ✨ Key Features

-   **🚀 Immersive 3D Simulation**: A realistic classroom environment built with Three.js to visualize the system in action.
-   **👁️ Smart Occupancy Detection**: Simulates PIR sensors detecting human presence to trigger automation.
-   **⚡ Automated Control Logic**: 
    -   **Occupied**: Instantly turns ON appliances.
    -   **Empty**: Initiates a countdown and cuts power automatically to save energy.
-   **🎮 Manual Override Mode**: Allows teachers/admins to bypass the sensor for manual control.
-   **📊 Real-time Status Panel**: Live monitoring of relays, sensors, and calculated energy efficiency estimates.
-   **📱 Mobile Responsive & PWA**: Fully optimized for phones/tablets and installable as a native Android app.

## 🛠️ Tech Stack

-   **Frontend Framework**: React.js (Vite)
-   **Styling Engine**: Tailwind CSS
-   **3D Graphics**: React Three Fiber (Three.js)
-   **UI Components**: Shadcn UI & Lucide Icons
-   **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
-   Node.js (v16 or higher)
-   npm (Node Package Manager)

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/smart-power-saver.git](https://github.com/your-username/smart-power-saver.git)
    cd smart-power-saver
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the local server**
    ```bash
    npm run dev
    ```
    Open `http://localhost:8080` to view the app.

## 📖 How to Use

1.  **Initialize System**: Click the start button on the landing page to enter the dashboard.
2.  **Test Modes**:
    -   **Occupied Mode**: Simulates students entering. Watch the relay click and lights turn on.
    -   **Empty Mode**: Simulates everyone leaving. The system waits (timeout) before saving power.
    -   **Auto-Play**: Sit back and watch the system demonstrate its capabilities automatically.
3.  **Install App**: On mobile devices, use the "Install App" button in the menu to add it to your home screen.

## 👥 Team PowerSyncers

Built with ❤️ for **TECH_EXPO 2K25** at **PSIT_CHE**.

-   **Atharva Sharma** - Full Stack Developer & UI/UX Design [Project Lead]
-   **[Aryan Sachan]** - [Hardware Design]
-   **[Ashwin Jauhary]** - [Software Developer]
-   **[Aviral Mishra]** - [Documentation and Research]
-   **[Arpit Bajpai]** - [Documentation And Research]

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
