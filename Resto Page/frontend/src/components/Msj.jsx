import { useState } from "react";
import { useRezise } from "../context/config/resize";
import { gbid } from "../functions/getDOM";
import "../style/msj/manifiest.css";

let waitMsj = false;

export const showMsj = () => {
  waitMsj = true;
};
export default function Msj({ type, msj }) {
  const device = useRezise();
  const [opacity, setOpacity] = useState(0);

  if (waitMsj) {
    setOpacity(1);
    setTimeout(() => {
      setOpacity(0);
    }, 5000);
    waitMsj = false;
  }

  return (
    <div>
      <div
        className={`msj-cont msj-cont-${device} msj-type-${type}`}
        style={{
          opacity: opacity,
        }}
      >
        <label className={`msj msj-${device}`}>{msj}</label>
      </div>
    </div>
  );
}
