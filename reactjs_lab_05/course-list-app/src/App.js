function CourseItem(props) {
  return (
    <div style={{ border: '2px solid #333', padding: '15px', margin: '10px', borderRadius: '10px', backgroundColor: props.courseType === 'Online' ? '#d0f0ff' : '#fff0d0' }}>
      <h3>📚 {props.courseName}</h3>
      <p><b>Instructor:</b> {props.instructor}</p>
      <p><b>Duration:</b> {props.duration}</p>
      <p><b>Type:</b> {props.courseType === 'Online' ? '🌐 Online' : '🏫 Offline'}</p>
    </div>
  );
}

function App() {
  const courses = [
    { courseName: "React JS", instructor: "Mr. Sharif", duration: "3 Months", courseType: "Online" },
    { courseName: "Node.js", instructor: "Mr. Ali", duration: "2 Months", courseType: "Offline" },
    { courseName: "MongoDB", instructor: "Ms. Sara", duration: "1 Month", courseType: "Online" },
    { courseName: "Express.js", instructor: "Mr. Ahmed", duration: "2 Months", courseType: "Offline" },
    { courseName: "Full Stack MERN", instructor: "Mr. Sharif", duration: "6 Months", courseType: "Online" },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>📋 Course List</h1>
      {courses.map((course, index) => (
        <CourseItem
          key={index}
          courseName={course.courseName}
          instructor={course.instructor}
          duration={course.duration}
          courseType={course.courseType}
        />
      ))}
    </div>
  );
}

export default App;