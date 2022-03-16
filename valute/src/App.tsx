import React from "react";
import "./App.css";

import { getTodayValuteData } from "./serverData/getValuteDataRequests";

function App() {
  getTodayValuteData();
  return <div className="App"></div>;
}

export default App;
