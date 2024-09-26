import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './popup.css';

// Pomodoro Clock Component
function PomodoroClock() {
  const [studyTime, setStudyTime] = useState(25 * 60); // default 25 minutes in seconds
  const [cooldownTime, setCooldownTime] = useState(5 * 60); // default 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(studyTime);
  const [isRunning, setIsRunning] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [alertMessage, setAlertMessage] = useState(''); // State for alert messages
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility

  // Time formatter function (mm:ss)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  // Start/Pause the timer
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Reset the timer to the initial study time
  const resetTimer = () => {
    setIsRunning(false);
    setOnBreak(false);
    setTimeLeft(studyTime);
  };

  // Update timeLeft automatically when studyTime or cooldownTime is changed
  useEffect(() => {
    if (!isRunning && !onBreak) {
      setTimeLeft(studyTime);
    } else if (!isRunning && onBreak) {
      setTimeLeft(cooldownTime);
    }
  }, [studyTime, cooldownTime, isRunning, onBreak]);

   // Show alert for 3 seconds and then hide it
   const triggerAlert = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false); // Hide alert after 3 seconds
    }, 6000); // Adjust the duration as needed
  };

  // Update the countdown logic
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (timeLeft === 0) {
      if (onBreak) {
        triggerAlert('Break time is over! Time to study again.');
        setTimeLeft(studyTime);
        setOnBreak(false);
      } else {
        triggerAlert('Study session is over! Take a Break for a while, But keep an eye on the time ;)');
        setTimeLeft(cooldownTime);
        setOnBreak(true);
      }
    }
  }, [isRunning, timeLeft, onBreak, studyTime, cooldownTime]);

  // Add a task to the to-do list
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  // Remove a task from the to-do list
  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Update the circular ring progress
  useEffect(() => {
    const radius = 54; // Same as the r attribute in the SVG
    const circumference = 2 * Math.PI * radius;
  
    const progressRingCircle = document.querySelector('.progress-ring__circle') as SVGCircleElement;
    if (progressRingCircle) {
      const offset =
        circumference - (timeLeft / (onBreak ? cooldownTime : studyTime)) * circumference;
      progressRingCircle.style.strokeDashoffset = `${offset}`; // Safely accessing the style property
    }
  }, [timeLeft, onBreak, studyTime, cooldownTime]);
  

  return (
    <div className="pomodoro-clock">
      <h1>Pomodoro Clock</h1>

      {/* Circular Timer Display */}
      <div className="ring-timer">
        <div className="circle">
          <div className="time">{formatTime(timeLeft)}</div>
          <svg className="progress-ring" width="120" height="120">
            <circle
              className="progress-ring__circle"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              r="54"
              cx="60"
              cy="60"
            />
          </svg>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="controls">
        <button onClick={toggleTimer}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      {/* Time Settings */}
      <div className="settings">
        <label>
          Study Time (minutes):
          <input
            type="number"
            value={studyTime / 60}
            onChange={(e) => setStudyTime(e.target.value * 60)}
            disabled={isRunning} // Disable changing while timer is running
          />
        </label>
        <label>
          Break Time (minutes):
          <input
            type="number"
            value={cooldownTime / 60}
            onChange={(e) => setCooldownTime(e.target.value * 60)}
            disabled={isRunning} // Disable changing while timer is running
          />
        </label>
      </div>

      {/* To-do List */}
    <div className="todo-container">

     <div className="todo-list">
     <h2>Reminders/To-Do List</h2>
     <input
       type="text"
       value={newTask}
       onChange={(e) => setNewTask(e.target.value)}
       placeholder="Add a task..."
       />
     <button onClick={addTask}>Add Task</button>
     <ul>
       {tasks.map((task, index) => (
           <li key={index}>
           {task}{' '}
           <button onClick={() => removeTask(index)}>Remove</button>
         </li>
       ))}
     </ul>
   </div>
   </div>

   {/* Non-Intrusive Alert Notification */}
   {showAlert && (
     <div className="toast-alert">
       <p>{alertMessage}</p>
     </div>
   )}
    </div>
  );
}

// DOM element creation and render setup
const container = document.createElement('div');
document.body.appendChild(container);
const root = createRoot(container);
root.render(<PomodoroClock />);
