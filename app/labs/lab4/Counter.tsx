import { useState } from "react";
export default function Counter() {
  const [count, setCount] = useState(7);
  console.log(count);
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}
        className="btn btn-success me-2"
        id="wd-counter-up-click">Up</button>
      <button onClick={() => setCount(count - 1)}
        className="btn btn-danger"
        id="wd-counter-down-click">Down</button>
      <hr/></div>);
}
