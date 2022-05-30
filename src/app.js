import React, { useState, useEffect } from "react";
//import styles from "./styles.module.css";
import "./styles.module.css";

function App() {
  const [isCustomCursor, setIsCustomCursor] = React.useState();

  function handleChange() {
    setIsCustomCursor(!isCustomCursor);
  }

  return (
    <>
      <label>
        <input type="checkbox" onChange={handleChange} />
        Включить неоновый курсор
      </label>
      {isCustomCursor && <NeonCursor />}
    </>
  );
}

const NeonCursor = (props) => {
  const [state, setState] = React.useState({ top: 0, left: 0 });
  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setState({
        top: e.pageY,
        left: e.pageX
      });
    };
    const didMount = () => {
      document.addEventListener("mousemove", handleMouseMove);
      document.documentElement.classList.add("no-cursor");
    };
    const willUnmount = () => {
      document.documentElement.classList.remove("no-cursor");
      document.removeEventListener("mousemove", handleMouseMove);
    };
    didMount();

    return () => {
      willUnmount();
    };
  }, [state]);

  return (
    <img
      alt=""
      src="https://code.s3.yandex.net/web-code/react/cursor.svg"
      width={30}
      style={{
        position: "absolute",
        top: state.top,
        left: state.left,
        pointerEvents: "none"
      }}
    />
  );
};

//ReactDOM.render(<App/>, document.querySelector('#root'));

export default App;
