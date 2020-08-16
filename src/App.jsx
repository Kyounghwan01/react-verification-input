import React, { useState } from "react";
import { VerficationInput } from "./lib";

const App = () => {
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");
  return (
    <div>
      <span>{text}</span>
      <VerficationInput placeholder="0" length={6} onChange={setText} />,
      <span>{text2}</span>
      <VerficationInput length={10} onChange={setText2} />
    </div>
  );
};

export default App;
