"use client";
import "./schedule.css";
import { useState } from 'react';
import Navbar from "../components/navbar/navbar";

const COMMON_SUBJECTS = [
  'Mathematics', 'Physics', 'Chemistry', 'Biology', 
  'History', 'Geography', 'English', 'Literature',
  'Computer Science', 'Economics', 'Business Studies',
  'Accounting', 'Art', 'Music', 'Physical Education',
  'Psychology', 'Sociology', 'Political Science',
  'Languages', 'Calculus', 'Algebra', 'Statistics'
];

export default function SchedulePage() {
  const [studentName, setStudentName] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [examType, setExamType] = useState('school');
  const [inputError, setInputError] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateError, setDateError] = useState('');

  const validateDates = (start, end) => {
    if (start && end) {
      const startDateObj = new Date(start);
      const endDateObj = new Date(end);
      
      if (endDateObj < startDateObj) {
        setDateError('End date cannot be before start date');
        return false;
      }
    }
    setDateError('');
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

  const validateSubject = (subject) => {
    const trimmedSubject = subject.trim();
    
    if (!trimmedSubject) {
      setInputError('Please enter a subject name');
      return false;
    }
    
    if (subjects.some(s => s.name.toLowerCase() === trimmedSubject.toLowerCase())) {
      setInputError('This subject is already added');
      return false;
    }
    
    const isCommonSubject = COMMON_SUBJECTS.some(
      sub => sub.toLowerCase() === trimmedSubject.toLowerCase()
    );
    
    if (!isCommonSubject) {
      if (!confirm(`"${trimmedSubject}" is not a common subject. Are you sure you want to add it?`)) {
        return false;
      }
    }
    
    setInputError('');
    return true;
  };

  const addSubject = () => {
    if (validateSubject(newSubject)) {
      setSubjects([...subjects, {
        id: Date.now(),
        name: newSubject.trim().charAt(0).toUpperCase() + newSubject.trim().slice(1).toLowerCase(),
        difficulty: 2
      }]);
      setNewSubject('');
    }
  };

  const updateDifficulty = (id, difficulty) => {
    setSubjects(subjects.map(subj => 
      subj.id === id ? {...subj, difficulty} : subj
    ));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addSubject();
    }
  };

  const canGenerateSchedule = subjects.length > 0 && !dateError && startDate && endDate;

  return (
    <div className="page-wrapper">
      <div 
        className="page-background" 
        style={{ backgroundImage: "url('/back.jpg')" }}
      ></div>
      
      <div className="page-container">
        <Navbar currentPage="schedule" />
        <div className="schedule-container">
          <header className="schedule-header">
            <h1>📚 Study Schedule Wizard</h1>
            <p>Let's create your perfect study plan!</p>
          </header>

          <section className="info-section">
            <div className="input-group">
              <label htmlFor="name">👩‍🎓 Your Name</label>
              <input
                id="name"
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
          </section>

          <section className="time-section">
            <div className="input-group">
              <label>📅 Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                className="borderless-input"
              />
            </div>

            <div className="input-group">
              <label>📅 End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                className="borderless-input"
              />
            </div>
            {dateError && <p className="error-message">{dateError}</p>}
          </section>

          <section className="subjects-section">
            <h2>📖 Your Subjects</h2>
            
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
            {inputError && <p className="error-message">{inputError}</p>}

            <div className="subjects-list">
              {subjects.length > 0 ? (
                subjects.map(subject => (
                  <div key={subject.id} className="subject-card">
                    <span className="subject-name">{subject.name}</span>
                    
                    <div className="difficulty-selector">
                      <span>Difficulty:</span>
                      {[1, 2, 3].map(level => (
                        <button
                          key={level}
                          className={`difficulty-btn ${subject.difficulty === level ? 'active' : ''}`}
                          onClick={() => updateDifficulty(subject.id, level)}
                        >
                          {['😊', '😐', '😩'][level-1]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-subjects">No subjects added yet. Start by adding your subjects above.</p>
              )}
            </div>
          </section>

          <button 
            className="generate-button cute-button"
            disabled={!canGenerateSchedule}
          >
            Generate My Schedule ✨
          </button>
        </div>
      </div>
    </div>
  );
}