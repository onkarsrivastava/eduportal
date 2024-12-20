import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const courses = ['MCA', 'CBB'];
  const subjects = {
    MCA: ['Sub1', 'Sub2'],
    CBB: ['Sub3', 'Sub4'],
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setSelectedSubject(null);
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    window.open(`/pdfs/${subject.toLowerCase()}.pdf`, '_blank');
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Academic Resources Hub</h1>
        <p>Access previous year questions and comprehensive syllabus materials</p>
        <div className="buttons">
          <button className="browse-button" onClick={() => setSelectedCourse(null)}>
            Browse Courses →
          </button>
          <button className="learn-button">Learn More</button>
        </div>
      </div>

      <div className="search-section">
        <input type="text" placeholder="Search for subjects, courses, or materials..." />
        <button className="search-button">🔍 Search</button>
      </div>

      {!selectedCourse && (
        <div className="course-section">
          <h2>Select a Course:</h2>
          {courses.map((course) => (
            <button key={course} className="course-button" onClick={() => handleCourseClick(course)}>
              {course}
            </button>
          ))}
        </div>
      )}

      {selectedCourse && !selectedSubject && (
        <div className="subject-section">
          <h2>Available Subjects for {selectedCourse}:</h2>
          {subjects[selectedCourse].map((subject) => (
            <button key={subject} className="subject-button" onClick={() => handleSubjectClick(subject)}>
              {subject}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
