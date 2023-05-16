import { useState } from "react";
import isMobile from "../functions/isMobile";
import { generator, validateInputs } from "../functions/mainGenerator";

export default function GenInt() {
  const showNumbers = (numbers) => {
    let preparedNumbers = "";
    numbers.map((number, i) => {
      if (i !== numbers.length - 1) {
        preparedNumbers += "[ " + number + " ] // ";
      } else {
        preparedNumbers += "[ " + number + " ]";
      }
    });

    return preparedNumbers;
  };
  const [numbers, setNumbers] = useState([]);
  return (
    <div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <div>
          <label
            className="tag t-shadow-basic"
            style={{
              fontSize: isMobile() ? "3vh" : "2vw",
            }}
            htmlFor="num-min"
          >
            MIN ("DEFAULT 0")
          </label>
          <br />
          <input
            className="input t-shadow-basic rounded"
            type="number"
            name="num-min"
            style={{
              fontSize: isMobile() ? "3vh" : "2vw",
            }}
            id="num-min"
          />
        </div>
        <br />
        <div
          style={{
            textAlign: "center",
          }}
        >
          <label
            className="tag t-shadow-basic"
            style={{
              fontSize: isMobile() ? "3vh" : "2vw",
            }}
            htmlFor="num-max"
          >
            MAX ("DEFAULT 999.999.999")
          </label>
          <br />
          <input
            style={{
              fontSize: isMobile() ? "3vh" : "2vw",
            }}
            className="input t-shadow-basic rounded"
            type="number"
            name="num-max"
            id="num-max"
          />
        </div>
        <br />
        <div
          style={{
            textAlign: "center",
          }}
        >
          <label
            className="tag t-shadow-basic"
            style={{
              fontSize: isMobile() ? "3vh" : "2vw",
            }}
            htmlFor="num-min"
          >
            AMMOUNT OF NUMBERS ("DEFAULT 1")
          </label>
          <br />
          <input
            style={{
              fontSize: isMobile() ? "3vh" : "2vw",
            }}
            className="input t-shadow-basic rounded"
            type="number"
            name="num-min"
            id="num-ammount"
          />
        </div>
        <br />

        <div
          style={{
            textAlign: "center",
          }}
        >
          <label
            htmlFor="num-repeat"
            style={{
              fontSize: isMobile() ? "3.5vh" : "2vw",
            }}
            className="tag t-shadow-basic"
          >
          NO REPEAT NUMBERS?
          </label>
          <br />
          <input
            type="checkbox"
            id="num-repeat"
            name="num-repeat"
            style={{
              width: isMobile() ? "5vh" : "3vw",
              height: isMobile() ? "5vh" : "3vw",
            }}
          />
        </div>

        <br />

        <div
          style={{
            textAlign: "center",
          }}
        >
          <button
            className="selector t-shadow-basic rounded"
            style={{
              fontSize: isMobile() ? "3vh" : "2.5vw",
            }}
            onClick={() => {
              const value = validateInputs({
                ammount: document.getElementById("num-ammount").value,
                max: document.getElementById("num-max").value,
                min: document.getElementById("num-min").value,
                decimals: "",
                type: "float",
                repeat: document.getElementById("num-repeat").checked,
              });

              if (value.bool) {
                document.getElementById("error").style.opacity = 0;
                document.getElementById("numbers").style.opacity = 1;

                setNumbers(generator(value.value));
              } else {
                document.getElementById("error").style.opacity = 1;
                document.getElementById("error").textContent = value.txt;
              }
            }}
          >
            GENERATE
          </button>
        </div>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <h3
            style={{
              opacity: 0,
              fontSize: isMobile() ? "3vh" : "2.5vw",
            }}
            className="numbers t-shadow-basic"
            id="numbers"
          >
            {showNumbers(numbers)}
          </h3>
          <h3
            className="erorr t-shadow-basic"
            style={{
              opacity: 0,
              fontSize: isMobile() ? "3vh" : "2.5vw",
            }}
            id="error"
          >
            0000
          </h3>
        </div>
      </div>
    </div>
  );
}
