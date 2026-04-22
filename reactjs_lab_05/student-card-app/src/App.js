function StudentCard(props) {
  return (
    <div style={{ backgroundColor: props.color, padding: '20px', margin: '10px', borderRadius: '10px', width: '300px' }}>
      <h2>👤 {props.name}</h2>
      <p><b>Roll No:</b> {props.rollNo}</p>
      <p><b>Department:</b> {props.department}</p>
      <p><b>University:</b> {props.university}</p>
    </div>
  );
}

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>🎓 Student Information Cards</h1>
      <StudentCard name="Ali Ahmed" rollNo="BSSE-01" department="Software Engineering" university="Air University" color="lightblue" />
      <StudentCard name="Sara Khan" rollNo="BSSE-02" department="AI & ML" university="Air University" color="lightgreen" />
      <StudentCard name="Umar Farooq" rollNo="BSSE-03" department="Cyber Security" university="Air University" color="lightred" />
    </div>
  );
}

export default App;