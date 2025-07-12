"use client";
import "./schedule.css";
import Navbar from "../components/navbar/navbar";
import React, { useState } from "react";

const COMMON_SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "English",
  "Literature",
  "Computer Science",
  "Economics",
  "Business Studies",
  "Accounting",
  "Art",
  "Music",
  "Physical Education",
  "Psychology",
  "Sociology",
  "Political Science",
  "Languages",
  "Calculus",
  "Algebra",
  "Statistics",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function CalendarPicker({
  selectedDate,
  onDateSelect,
  onClose,
  minDate = null,
  maxDate = null,
}) {
  const [currentDate, setCurrentDate] = useState(
    selectedDate ? new Date(selectedDate) : new Date()
  );
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());

  const endDate = new Date(lastDayOfMonth);
  endDate.setDate(endDate.getDate() + (6 - lastDayOfMonth.getDay()));

  const days = [];
  const currentDay = new Date(startDate);

  while (currentDay <= endDate) {
    days.push(new Date(currentDay));
    currentDay.setDate(currentDay.getDate() + 1);
  }

  const isDateDisabled = (date) => {
    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;
    return false;
  };

  const isDateSelected = (date) => {
    if (!selectedDate) return false;
    const selected = new Date(selectedDate);
    return date.toDateString() === selected.toDateString();
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleDateClick = (date) => {
    if (isDateDisabled(date)) return;

    // Fix: Use local date formatting to avoid timezone issues
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    onDateSelect(formattedDate);
    onClose();
  };

  const handleYearSelect = (selectedYear) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(selectedYear);
    setCurrentDate(newDate);
    setShowYearPicker(false);
  };

  const handleMonthSelect = (selectedMonth) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(selectedMonth);
    setCurrentDate(newDate);
    setShowMonthPicker(false);
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 10; i <= currentYear + 10; i++) {
      years.push(i);
    }
    return years;
  };

  return (
    <div className="calendar-overlay">
      <div className="calendar-popup">
        <div className="calendar-header">
          <button
            className="calendar-nav-btn"
            onClick={() => navigateMonth(-1)}
          >
            ←
          </button>
          <div className="calendar-title-container">
            <button 
              className="calendar-title-btn"
              onClick={() => setShowMonthPicker(!showMonthPicker)}
            >
              {MONTHS[month]}
            </button>
            <button 
              className="calendar-title-btn"
              onClick={() => setShowYearPicker(!showYearPicker)}
            >
              {year}
            </button>
          </div>
          <button className="calendar-nav-btn" onClick={() => navigateMonth(1)}>
            →
          </button>
        </div>

        {showYearPicker && (
          <div className="calendar-picker-dropdown">
            <div className="picker-grid">
              {generateYearOptions().map((yearOption) => (
                <button
                  key={yearOption}
                  className={`picker-option ${yearOption === year ? 'selected' : ''}`}
                  onClick={() => handleYearSelect(yearOption)}
                >
                  {yearOption}
                </button>
              ))}
            </div>
          </div>
        )}

        {showMonthPicker && (
          <div className="calendar-picker-dropdown">
            <div className="picker-grid">
              {MONTHS.map((monthName, index) => (
                <button
                  key={index}
                  className={`picker-option ${index === month ? 'selected' : ''}`}
                  onClick={() => handleMonthSelect(index)}
                >
                  {monthName}
                </button>
              ))}
            </div>
          </div>
        )}

        {!showYearPicker && !showMonthPicker && (
          <div className="calendar-grid">
            {DAYS.map((day) => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            ))}

            {days.map((date, index) => {
              const isCurrentMonth = date.getMonth() === month;
              const isDisabled = isDateDisabled(date);
              const isSelected = isDateSelected(date);
              const isTodayDate = isToday(date);

              return (
                <button
                  key={index}
                  className={`
                    calendar-day 
                    ${isCurrentMonth ? "" : "other-month"} 
                    ${isDisabled ? "disabled" : ""} 
                    ${isSelected ? "selected" : ""} 
                    ${isTodayDate ? "today" : ""}
                  `}
                  onClick={() => handleDateClick(date)}
                  disabled={isDisabled}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        )}

        <div className="calendar-footer">
          <button className="calendar-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SchedulePage() {
  const [studentName, setStudentName] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [examType, setExamType] = useState("school");
  const [inputError, setInputError] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  // Study hours configuration state
  const [dailyStudyHours, setDailyStudyHours] = useState(6);
  const [sessionDuration, setSessionDuration] = useState(45);
  const [breakDuration, setBreakDuration] = useState(15);
  const [preferredStartTime, setPreferredStartTime] = useState("09:00");

  const validateDates = (start, end) => {
    if (start && end) {
      const startDateObj = new Date(start);
      const endDateObj = new Date(end);

      if (endDateObj < startDateObj) {
        setDateError("End date cannot be before start date");
        return false;
      }
    }
    setDateError("");
    return true;
  };

  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    validateDates(newStartDate, endDate);
  };

  const handleEndDateChange = (e) => {
    const newEndDate = e.target.value;
    setEndDate(newEndDate);
    validateDates(startDate, newEndDate);
  };

  const handleStartCalendarSelect = (date) => {
    setStartDate(date);
    validateDates(date, endDate);
  };

  const handleEndCalendarSelect = (date) => {
    setEndDate(date);
    validateDates(startDate, date);
  };

  const validateSubject = (subject) => {
    const trimmedSubject = subject.trim();

    if (!trimmedSubject) {
      setInputError("Please enter a subject name");
      return false;
    }

    if (
      subjects.some(
        (s) => s.name.toLowerCase() === trimmedSubject.toLowerCase()
      )
    ) {
      setInputError("This subject is already added");
      return false;
    }

    const isCommonSubject = COMMON_SUBJECTS.some(
      (sub) => sub.toLowerCase() === trimmedSubject.toLowerCase()
    );

    if (!isCommonSubject) {
      if (
        !confirm(
          `"${trimmedSubject}" is not a common subject. Are you sure you want to add it?`
        )
      ) {
        return false;
      }
    }

    setInputError("");
    return true;
  };

  const addSubject = () => {
    if (validateSubject(newSubject)) {
      setSubjects([
        ...subjects,
        {
          id: Date.now(),
          name:
            newSubject.trim().charAt(0).toUpperCase() +
            newSubject.trim().slice(1).toLowerCase(),
          difficulty: 2,
        },
      ]);
      setNewSubject("");
    }
  };

  const updateDifficulty = (id, difficulty) => {
    setSubjects(
      subjects.map((subj) => (subj.id === id ? { ...subj, difficulty } : subj))
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addSubject();
    }
  };

  const canGenerateSchedule =
    subjects.length > 0 && !dateError && startDate && endDate;

  const today = new Date().toISOString().split("T")[0];

  // Calculate study session statistics
  const totalSessionsPerDay = Math.floor(
    (dailyStudyHours * 60) / (sessionDuration + breakDuration)
  );
  const actualStudyTime = totalSessionsPerDay * sessionDuration;
  const totalBreakTime = totalSessionsPerDay * breakDuration;

  return (
    <div className="page-wrapper">
      <div className="page-background" style={{ backgroundImage: "url('/backnew.jpg')" }}></div>

      <div className="page-container">
        <Navbar currentPage="schedule" />
        <div className="schedule-container">
          <div className="schedule-header">
            <h1>📚Focus Fuel </h1>
            <p>Let's create your perfect study plan!</p>
          </div>

          <div className="info-section">
            <div className="input-group">
              <label>👩‍🎓 Your Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter your name"
                className="borderless-input"
              />
            </div>

            <div className="input-group">
              <label>📝 Exam Type</label>
              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="borderless-select"
              >
                <option value="school">School Exams</option>
                <option value="competitive">Competitive Exams</option>
                <option value="college">College Tests</option>
                <option value="elite">Elite</option>
              </select>
            </div>
          </div>

          <div className="time-section">
            <div className="input-group">
              <label>📅 Start Date</label>
              <div className="date-input-wrapper">
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
                <button
                  type="button"
                  onClick={() => setShowStartCalendar(true)}
                  className="calendar-icon-btn"
                >
                  📅
                </button>
              </div>
            </div>

            <div className="input-group">
              <label>📅 End Date</label>
              <div className="date-input-wrapper">
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                />
                <button
                  type="button"
                  onClick={() => setShowEndCalendar(true)}
                  className="calendar-icon-btn"
                >
                  📅
                </button>
              </div>
            </div>
          </div>

          {dateError && <div className="error-message">{dateError}</div>}

          <div className="study-hours-section">
            <h3>⏰ Study Hours Configuration</h3>

            <div className="study-hours-grid">
              <div className="input-group">
                <label>Daily Study Hours</label>
                <input
                  type="number"
                  min="1"
                  max="16"
                  value={dailyStudyHours}
                  onChange={(e) =>
                    setDailyStudyHours(parseInt(e.target.value) || 1)
                  }
                  className="cute-input"
                />
              </div>

              <div className="input-group">
                <label>Session Duration (min)</label>
                <input
                  type="number"
                  min="15"
                  max="120"
                  step="15"
                  value={sessionDuration}
                  onChange={(e) =>
                    setSessionDuration(parseInt(e.target.value) || 45)
                  }
                  className="cute-input"
                />
              </div>

              <div className="input-group">
                <label>Break Duration (min)</label>
                <input
                  type="number"
                  min="5"
                  max="60"
                  step="5"
                  value={breakDuration}
                  onChange={(e) =>
                    setBreakDuration(parseInt(e.target.value) || 15)
                  }
                  className="cute-input"
                />
              </div>

              <div className="input-group">
                <label>🌅 Preferred Start Time</label>
                <input
                  type="time"
                  value={preferredStartTime}
                  onChange={(e) => setPreferredStartTime(e.target.value)}
                  className="cute-input"
                />
              </div>
            </div>

            <div className="study-stats">
              <h4>📊 Daily Study Statistics</h4>
              <div className="stats-grid">
                <div className="stat-box total-sessions">
                  <div>Total Sessions</div>
                  <div>{totalSessionsPerDay}</div>
                </div>
                <div className="stat-box study-time">
                  <div>Actual Study Time</div>
                  <div>
                    {Math.floor(actualStudyTime / 60)}h {actualStudyTime % 60}m
                  </div>
                </div>
                <div className="stat-box break-time">
                  <div>Total Break Time</div>
                  <div>
                    {Math.floor(totalBreakTime / 60)}h {totalBreakTime % 60}m
                  </div>
                </div>
                <div className="stat-box start-time">
                  <div>Study Starts At</div>
                  <div>{preferredStartTime}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="subjects-section">
            <h3>📖 Your Subjects</h3>

            <div className="subject-input-group">
              <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a subject (e.g., Mathematics)"
                className="cute-input"
              />
              <button onClick={addSubject} className="cute-button">
                Add ➕
              </button>
            </div>

            {inputError && <div className="error-message">{inputError}</div>}

            <div>
              {subjects.length > 0 ? (
                subjects.map((subject) => (
                  <div key={subject.id} className="subject-card">
                    <span className="subject-name">{subject.name}</span>
                    <div className="difficulty-selector">
                      <span>Difficulty:</span>
                      {[1, 2, 3].map((level) => (
                        <button
                          key={level}
                          className={`difficulty-btn ${
                            subject.difficulty === level ? "active" : ""
                          }`}
                          onClick={() => updateDifficulty(subject.id, level)}
                        >
                          {["😊", "😐", "😩"][level - 1]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-subjects">
                  <p>
                    No subjects added yet. Start by adding your subjects above.
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            className={`generate-button ${canGenerateSchedule ? "active" : ""}`}
            disabled={!canGenerateSchedule}
          >
            Generate My Schedule ✨
          </button>
        </div>
      </div>

      {/* Calendar Modals */}
      {showStartCalendar && (
        <CalendarPicker
          selectedDate={startDate}
          onDateSelect={handleStartCalendarSelect}
          onClose={() => setShowStartCalendar(false)}
          minDate={today}
          maxDate={endDate || undefined}
        />
      )}

      {showEndCalendar && (
        <CalendarPicker
          selectedDate={endDate}
          onDateSelect={handleEndCalendarSelect}
          onClose={() => setShowEndCalendar(false)}
          minDate={startDate || today}
        />
      )}
    </div>
  );
}