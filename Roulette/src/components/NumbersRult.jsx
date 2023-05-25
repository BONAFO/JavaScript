import isMobile from "../functions/isMobile";
import BetModal from "./BetModa";

export default function NumbersRult({
  content,
  classesMob = { div: "", btn: "" },
  classesDesk = { div: "", btn: "" },
  styles = { div: {}, btn: {} },
  setModal,
  setBets
}) {
  return (
    <div
      className={isMobile() ? classesMob.div : classesDesk.div}
      onClick={() => {
        sessionStorage.setItem("modal", "true");
        setModal(<BetModal numb={content} setBets={setBets} />);
      }}
      style={styles.div}
    >


      <button
        className={isMobile() ? classesMob.btn : classesDesk.btn}
        style={styles.btn}
        id={`btn-${content}`}
      >
        {content}
      </button>
    </div>
  );
}
