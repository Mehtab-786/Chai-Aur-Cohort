import { useState } from "react";
import "./App.css";
import HookForm from "./HookForm";
import ManuelForm from "./ManuelForm";

function App() {
  const [tab, setTab] = useState("manuel");
  return <>
  <h1>Let's react</h1>
  <div>
    <button onClick={() => setTab("manuel")}>Manuel Form - Controlled</button> 
    
    <button onClick={() => setTab("hook")}>React Hook Form</button>
  </div>
  {tab === 'manuel' ? <ManuelForm /> : <HookForm />}

  
  
  </>;
}

export default App;
