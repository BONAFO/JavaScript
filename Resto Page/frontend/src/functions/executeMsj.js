import Msj from "../components/Msj";

export default function executeMSJ(showMsj,
setMjs, params={
    mjs : "",
    type : "err"
}) {
    showMsj();
    setMjs(<Msj msj={params.mjs} type={params.type}></Msj>);

    setTimeout(() => {
        setMjs("")
    }, 5500);
}