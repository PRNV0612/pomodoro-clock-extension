# Pomodoro Clock Extension

A simple and effective **Pomodoro Timer** browser extension to enhance your productivity by dividing work sessions and breaks with customizable timers. This extension also features a **to-do list/reminder** functionality and displays **non-intrusive alerts** when it's time to take a break.

## Features

- **Customizable Timer**: Set custom durations for your work (study) time and break (cooldown) time.
- **Countdown Display**: The timer is displayed with a circular progress ring that visually shrinks as time progresses.
- **Reminders/To-Do List**: Easily add, remove, and manage your tasks while keeping track of your time.
- **Non-Intrusive Alerts**: When the study time ends, the extension shows a toast notification that does not disturb your workflow.
- **Break Notification**: Notifies you when it's time to take a break and when to resume your tasks.
- **Responsive Design**: Works seamlessly in the extension popup, with a clean and simple user interface.

## Installation

1. Clone or download the repository:
    ```bash
    git clone https://github.com/your-username/pomodoro-clock-extension.git
    ```

2. Open Google Chrome (or your preferred Chromium-based browser) and navigate to `chrome://extensions/`.

3. Enable **Developer Mode** (toggle in the top right corner).

4. Click on the **Load unpacked** button and select the folder where this project was cloned.

5. The Pomodoro Clock extension should now appear in your extension list. Click the extension icon to open it in the popup.

## How to Use

1. **Set the Timer**:
   - By default, the timer is set to 25 minutes for study time and 5 minutes for break time.
   - You can adjust the duration of the **study** and **break** periods by editing the input fields in the popup.

2. **Start/Pause the Timer**:
   - Press the **Start** button to begin the countdown. You can pause and resume it by pressing the button again.
   - The timer will automatically transition to break mode when the study time finishes, and vice versa.

3. **Manage Reminders**:
   - Add tasks to your **To-Do List** using the input field and pressing the "Add Task" button.
   - Remove tasks by clicking the "Remove" button next to each task.

4. **Toast Notification**:
   - When the study or break time is up, a **non-intrusive toast alert** will appear at the center of the screen to notify you.

## Technologies Used

- **React**: For building the user interface and managing state.
- **CSS Flexbox**: For responsive and flexible layout design.
- **JavaScript**: For handling the timer logic and user interactions.
- **SVG**: Used to create the circular countdown ring.

## Customization

To modify the timer settings:
- You can change the default **study** and **break** durations by editing the initial state values in the `PomodoroClock` component in `popup.js`.

Example:
```jsx
const [studyTime, setStudyTime] = useState(25 * 60); // Default 25 minutes
const [cooldownTime, setCooldownTime] = useState(5 * 60); // Default 5 minutes
```

## Future Enhancements

- Add sound notifications at the end of each session.
- Allow users to track completed Pomodoro sessions.
- Implement dark mode for better accessibility.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize any section or add more details based on your project!
