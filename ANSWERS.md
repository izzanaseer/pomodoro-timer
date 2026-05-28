# 📝 Technical Answers

---

### 1. How to run

- **Live Deployment URL:** [https://pomodoro-timer-seven-hazel.vercel.app](https://pomodoro-timer-seven-hazel.vercel.app)
- **Steps to run locally on a fresh machine:**
  1. Clone or download this repository to your machine.
  2. Navigate into the project folder (`pomodoro-timer`).
  3. Simply double-click the `index.html` file, and it will launch instantly inside any default modern web browser.

---

### 2. Stack & design choices

- **Frontend Stack Choice:** I chose **Vanilla HTML5, CSS3, and JavaScript (ES6+)** without any framework. Because the requirements called for a lean, single-screen experience, a framework like React or Vue would add unnecessary bundle size and setup complexity. Going vanilla allowed me to demonstrate clean, native DOM event handling and a lightweight, dependency-free state machine.
- **Design Decision 1 (The Clock Font):** For the `#time-display`, I explicitly used a monospace font stack (`'Courier New', Courier, monospace`). Standard geometric fonts change character widths depending on the number (e.g., "1" is narrower than "0"). By utilizing a monospace font, every digit takes up identical horizontal space, preventing the entire countdown timer layout from jittering or shaking back and forth every second.
- **Design Decision 2 (State-Driven Visual Enclosure):** I designed the main app container (`.timer-container`) to have a locked max-width of `450px` centered perfectly via Flexbox on the `body`. To enhance the "feel" of state transitions, I wrote an `updateTheme()` JavaScript function that dynamically alters the CSS `--bg-color` variable on the root page background rather than just changing the card itself. This completely immerses the user's peripheral vision—shifting to a warm, focused terracotta tone during focus blocks and a soothing pastel green during breaks—instantly conveying the active state without requiring the user to read the text label.

---

### 3. Responsive & accessibility

- **Responsive Behavior:** - On a **1440px laptop**, the app functions as an elegant, centered utility card with generous padding, preventing the controls from stretching awkwardly across an ultra-wide viewport.
  - On a **360px-wide phone**, the container utilizes `width: 100%` and defensive padding (`padding: 40px 30px;`) alongside flexible sizing (`flex: 1` on controls) to compress organically. The layout gracefully morphs into a native-feeling mobile application layout with zero horizontal overflow or clipping.
- **Accessibility Handled:** I used **relative `rem` sizing** for typography across the application instead of static pixels (`px`). If a visually impaired user scales their root browser font size up or down for accessibility, the entire application layout, text layers, and hit targets scale proportionally and legibly.
- **Accessibility Skipped:** I did not add the **Keyboard Navigation Indicator Styles**. While any user can technically press the `Tab` key to move between the custom inputs and buttons, I did not write custom CSS outlines (`button:focus`) to make the currently selected active button highly visible for users who cannot use a mouse. Given the timeline, I prioritized the core timer logic and native visual states, but adding prominent keyboard focus rings is the first accessibility feature I would implement next.

---

### 4. AI usage

- **Tool Used:** Gemini
- **What I asked & what it gave me:** - I initially asked for a step-by-step roadmap to get proper guide, a solid responsive layout framework and core ticking logic using `setInterval`.
  - Later, I added an external web link for audio alert, it triggered a browser security crash (`Cross-Origin Read Blocking (CORB)`), I asked the AI how to bypass it. It generated a complex, 30-line Web Audio API synthetic beep algorithm.
- **What I modified & why:** I rejected the AI's complex synthesizer script. While technically functional, it severely over-engineered the problem and made the codebase difficult to maintain. Instead, I pivoted to a cleaner architectural choice: I downloaded a clean local sound file (`alarm.mp3`) directly into the project workspace, and simplified the implementation down to a highly readable HTML5 `Audio()` constructor. This kept the code pristine, completely bypassed the CORB security errors and made the repository self-contained.

---

### 5. Honest gap

The one area that isn't polished enough is **timer precision drift**. JavaScript's native `setInterval(tick, 1000)` engine is known to drift over long durations because it gets throttled when the browser tab goes into the background or when the computer's CPU handles heavy background tasks.

If I had another day, I would replace the simple `timeLeft--` counter logic with a **timestamp delta system**. I would capture the exact hardware system time when the user clicks "Start" (`Date.now()`), calculate the precise future target millisecond, and use the interval loop exclusively to calculate the real difference remaining. This would ensure the timer remains 100% accurate down to the millisecond, even if the user minimizes the tab for a 25-minute session.
