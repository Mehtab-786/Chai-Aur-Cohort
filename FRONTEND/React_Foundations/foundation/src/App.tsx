import "./App.css";

function App() {
  type User = {
    name: string;
    age: number;
  };

  const user: User = {
    name: "Mehtab",
    age: 17,
  };

  return (
    <h1>
      {user.name} is of {user.age} years
    </h1>
  );
}

export default App;
