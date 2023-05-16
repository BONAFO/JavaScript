import { useState } from "react";
import GenInt from "./GenInt";
import GenFloat from "./GenFloat";
import "../style/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import isMobile from "../functions/isMobile";

export default function RandomNumberGenerator() {
  const [genType, setGenType] = useState("");

  return (
    <div>
      <div>
        <h1
          className="title t-shadow-basic"
          style={{
            fontSize: isMobile() ? "6vh" : "5vw",
          }}
        >
          R.N.G.
        </h1>
        <h2
          className="t-shadow-basic sub-title"
          style={{
            fontSize: isMobile() ? "5vh" : "3vw",
          }}
        >
          WHAT TIPE OF NUMBER DO YOU WANT TO GENERATE?
        </h2>
        <div style={{ textAlign: "center" }}>
          <button
            style={{
              fontSize: isMobile() ? "4vh" : "3vw",
            }}
            className="selector t-shadow-basic rounded"
            onClick={() => {
              setGenType(<GenInt />);
            }}
          >
            INT
          </button>
          <br />
          <button
            style={{
              fontSize: isMobile() ? "4vh" : "3vw",
            }}
            className="selector t-shadow-basic rounded"
            onClick={() => {
              setGenType(<GenFloat />);
            }}
          >
            FLOAT
          </button>
        </div>
      </div>
      {genType}
    </div>
  );
}
