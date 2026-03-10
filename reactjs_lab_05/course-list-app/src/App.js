function Greeting(props) {
  let message = "";
  let emoji = "";

  if (props.timeOfDay === "morning") {
    message = "Good Morning!";
    emoji = "🌅";
  } else if (props.timeOfDay === "afternoon") {
    message = "Good Afternoon!";
    emoji = "☀️";
  } else if (props.timeOfDay === "evening") {
    message = "Good Evening!";
    emoji = "🌆";
  } else {
    message = "Good Night!";
    emoji = "🌙";
  }

  return (
    <div style={{ backgroundColor: props.bgColor, padding: '20px', margin: '10px', borderRadius: '10px', width: '350px' }}>
      <h2>{emoji} {message}</h2>
      <p>Welcome, <b>{props.name}</b>!</p>
      <p>Time: {props.timeOfDay}</p>
    </div>
  );
}

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>👋 Dynamic Greeting App</h1>
      <Greeting name="Ali" timeOfDay="morning" bgColor="lightyellow" />
      <Greeting name="Sara" timeOfDay="afternoon" bgColor="lightblue" />
      <Greeting name="Umar" timeOfDay="evening" bgColor="lightpink" />
      <Greeting name="Ayesha" timeOfDay="night" bgColor="lavender" />
    </div>
  );
}

export default App;