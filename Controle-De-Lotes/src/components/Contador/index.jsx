
import { useState } from "react";
import "./style.css";

export default function Contador() {
  const [contador, setContador] = useState(0);
  const [passo, setPasso] = useState(1);
  const [ultimoLoteRegistrado, setUltimoLoteRegistrado] = useState(null);

  const incrementar = () => {
    if (contador + passo <= 50) {
      setContador(contador + passo);
    }
  };

  const decrementar = () => {
    if (contador - passo >= 0) {
      setContador(contador - passo);
    }
  };

  const handlePassoChange = (e) => {
    const valor = Number(e.target.value);

    if (isNaN(valor) || valor < 1) {
      setPasso(1);
    } else if (valor > 10) {
      setPasso(10);
    } else {
      setPasso(valor);
    }
  };

  const finalizarLote = () => {
    if (contador > 0) {
      setUltimoLoteRegistrado(contador);
    }
    setContador(0);
  };

  const getMensagemStatus = () => {
    if (contador === 50) return "Lote Fechado";
    if (contador >= 40) return "Capacidade quase atingida";
    return "Em processamento";
  };

  const getClasseStatus = () => {
    if (contador === 50) return "status-fechado";
    if (contador >= 40) return "status-alerta";
    return "status-normal";
  };

  return (
    <div className={`contador-container ${getClasseStatus()}`}>
      <h2>Painel de Controle de Lotes</h2>

      <div className="badge-status">{getMensagemStatus()}</div>

      <p className="quantidade">Quantidade atual: {contador}</p>

      <div className="campo-passo">
        <label htmlFor="passo">Incremento (1 a 10): </label>
        <input
          id="passo"
          type="number"
          min="1"
          max="10"
          value={passo}
          onChange={handlePassoChange}
        />
      </div>

      <div className="botoes">
        <button
          onClick={decrementar}
          disabled={contador - passo < 0 || contador === 0}
        >
          -
        </button>

        <button
          onClick={incrementar}
          disabled={contador + passo > 50 || contador === 50}
        >
          +
        </button>
      </div>

      <div className="acoes-lote">
        <button className="btn-zerar" onClick={finalizarLote}>
          Finalizar Lote / Zerar
        </button>
      </div>

      {ultimoLoteRegistrado !== null && (
        <p className="ultimo-lote">
          Último lote registrado: <strong>{ultimoLoteRegistrado} caixas</strong>
        </p>
      )}
    </div>
  );
}
