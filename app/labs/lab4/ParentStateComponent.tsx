import { useState } from "react";
import ChildStateComponent from "./ChildStateComponent";
export default function ParentStateComponent() {
  const [counter, setCounter] = useState(123);
  return (
    <div>
      <h2>Parent State Component</h2>
      <ChildStateComponent counter={counter} setCounter={setCounter} />
    </div>
  );
}
