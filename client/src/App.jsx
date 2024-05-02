import { useState, useEffect } from "react";
import CountUp from "react-countup";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState(null);
  const joinGame = async () => {
    await socket.emit("join_room", "start");
    await socket.emit("send_random_number");
  };

  useEffect(() => {
    socket.off("recieve_random_number").on("recieve_random_number", (data) => {
      setNumber(data);
      setList((list) => [...list, data]);
      console.log("frintend random number", data);
    });
  }, [socket]);

  const startNewHandler = async (numberSent) => {
    console.log("entered");
    await socket.emit("send_random_number");
  };

  return (
    <div>
      <div className="list-style">
        {list.slice(-15).reverse().map((each, index) => (
          <p key={index}>{`${each},`}</p>
        ))}
      </div>
      <button onClick={joinGame}>Start Game</button>
      <CountUp
        delay={0}
        start={1}
        end={number}
        onEnd={(numberSent) => startNewHandler()}
        decimals={2}
      />
    </div>
  );
}

export default App;
