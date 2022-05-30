import React, { useState, useEffect } from "react";
//useState для функционального компонента

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

class NeonCursor extends React.Component {
  constructor(props) {
    super(props);

    this.state = { top: 0, left: 0 };
  }

  componentDidMount() {
    document.addEventListener("mousemove", this.handleMouseMove);
    document.documentElement.classList.add("no-cursor");
  }

  componentWillUnmount() {
    document.documentElement.classList.remove("no-cursor");
    document.removeEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseMove = (e) => {
    this.setState({
      top: e.pageY,
      left: e.pageX
    });
  };

  render() {
    return (
      <img
        alt=""
        src="https://code.s3.yandex.net/web-code/react/cursor.svg"
        width={30}
        style={{
          position: "absolute",
          top: this.state.top,
          left: this.state.left,
          pointerEvents: "none"
        }}
      />
    );
  }
}

//ReactDOM.render(<App/>, document.querySelector('#root'));

export default App;
