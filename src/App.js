import React, { useState } from "react";
import "./App.css";

function App() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const courses = ["MCA", "CBB"];
  const subjects = {
    MCA: ["MCA522", "mca505", "MCA601", "MCA521", "MCA534", "MCA501", "MCA519"],
    CBB: ["bin463", "bin465", "bin466", "bin466", "bin468", "bin469"],
  };

  // Flattened subject list for search functionality
  const allSubjects = Object.values(subjects).flat();

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setDropdownVisible(null); // Reset dropdown visibility
  };

  const handleDropdownClick = (subject) => {
    setDropdownVisible(dropdownVisible === subject ? null : subject);
  };

  const handleYearClick = (subject, year) => {
    const fileName = `${subject}_${year}.pdf`.toLowerCase();
    window.open(`/pdfs/${fileName}`, "_blank");
    setDropdownVisible(null); // Close the dropdown after clicking
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter subjects based on search query
  const filteredSubjects = allSubjects.filter((subject) =>
    subject.toLowerCase().includes(searchQuery)
  );

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
        <input
          type="text"
          placeholder="Search for subjects, courses, or materials..."
          onChange={handleSearch}
          value={searchQuery}
        />
        <button className="search-button">🔍 Search</button>
      </div>

      {/* Search Results Section */}
      {searchQuery && (
        <div className="search-results">
          <h2>Search Results:</h2>
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject) => (
              <div key={subject} className="dropdown-container">
                <button
                  className="subject-button"
                  onClick={() => handleDropdownClick(subject)}
                >
                  {subject}
                </button>
                {dropdownVisible === subject && (
                  <div className="dropdown-menu">
                    <button
                      className="dropdown-item"
                      onClick={() => handleYearClick(subject, 2023)}
                    >
                      2023
                    </button>
                    <button
                      className="dropdown-item"
                      onClick={() => handleYearClick(subject, 2024)}
                    >
                      2024
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No subjects found for "{searchQuery}"</p>
          )}
        </div>
      )}

      {/* Courses Section */}
      {!searchQuery && !selectedCourse && (
        <div className="course-section">
          <h2>Select a Course:</h2>
          {courses.map((course) => (
            <button
              key={course}
              className="course-button"
              onClick={() => handleCourseClick(course)}
            >
              {course}
            </button>
          ))}
        </div>
      )}

      {/* Subjects Section */}
      {selectedCourse && !searchQuery && (
        <div className="subject-section">
          <h2>Available Subjects for {selectedCourse}:</h2>
          {subjects[selectedCourse].map((subject) => (
            <div key={subject} className="dropdown-container">
              <button
                className="subject-button"
                onClick={() => handleDropdownClick(subject)}
              >
                {subject}
              </button>
              {dropdownVisible === subject && (
                <div className="dropdown-menu">
                  <button
                    className="dropdown-item"
                    onClick={() => handleYearClick(subject, 2023)}
                  >
                    2023
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => handleYearClick(subject, 2024)}
                  >
                    2024
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
