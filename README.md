# ⏱️ Dynamic Pomodoro Timer with Daily History

A sleek, responsive, and intuitive single-screen Pomodoro web application. This app is designed to help users structure their work sessions effectively with customizable focus/break intervals and a persistent daily session logger.

👉 **[Live Demo URL](https://pomodoro-timer-seven-hazel.vercel.app)**

---

## Features Built

- **State-Driven Countdown:** Ticks down accurately in `mm:ss` format with continuous auto-transition loops (Focus 🔁 Break).
- **Responsive & Semantic UI:** Tailored layout that feels like a native mobile app on mobile screens and perfectly scales on desktops.
- **Dynamic Themes:** The browser background color shifts smoothly based on state (Warm terracotta for Focusing, Calming pastel green for Breaks, and Soft gray when Paused/Idle).
- **Local Audio Alerts:** Uses a local, high-compatibility audio file to sound a notification chime the exact second a cycle ends.
- **Persistent Daily History Log:** Focus sessions are saved with precise timestamps. Data survives browser refreshes using `localStorage` and automatically clears out on a new calendar day.

---

## Tech Stack Used

- **HTML5:** Clean structural layout.
- **CSS3:** Responsive Flexbox architecture, custom variables, and interactive hover transitions.
- **Vanilla JavaScript (ES6+):** Custom client-side state machine, DOM event manipulation, HTML5 Audio API integration, and LocalStorage data cache.

---

## How to Run Locally

Because this project is built entirely on standard native web technologies, there are **no complex terminal installations or dependency setups required.**

### Method 1: Just Double-Click (Simplest)

1. Clone or download this repository to your machine.
2. Open the project folder and double-click **`index.html`**. It will instantly launch in your default web browser!

### Method 2: Local Live Server

If you have VS Code installed:

1. Open the project folder in VS Code.
2. Click the **"Go Live"** button in the bottom status bar (requires the _Live Server_ extension) to view it via a local port environment.
