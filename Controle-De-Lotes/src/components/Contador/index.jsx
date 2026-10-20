
import { useState } from "react";
import "./style.css";

export default function Contador() {
  //  ESTADOS: Guardam as informações que mudam na tela em tempo real
  const [contador, setContador] = useState(0); // Quantidade atual de caixas no palete
  const [passo, setPasso] = useState(1); // Valor do incremento/decremento
  const [ultimoLoteRegistrado, setUltimoLoteRegistrado] = useState(null); // Histórico do último lote finalizado

  // FUNÇÃO DE SOMAR: Aumenta a quantidade, mas trava no limite máximo de 50 caixas
  const incrementar = () => {
    if (contador + passo <= 50) {
      setContador(contador + passo);
    }
  };

  //  FUNÇÃO DE SUBTRAIR: Diminui a quantidade, mas trava no limite mínimo de 0
  const decrementar = () => {
    if (contador - passo >= 0) {
      setContador(contador - passo);
    }
  };

  // TRATAMENTO DO INPUT: Garante que o passo digitado seja um número entre 1 e 10
  const handlePassoChange = (e) => {
    const valor = Number(e.target.value);
    if (isNaN(valor) || valor < 1) {
      setPasso(1); // Se for inválido ou menor que 1, força para 1
    } else if (valor > 10) {
      setPasso(10); // Se for maior que 10, força para 10
    } else {
      setPasso(valor); // Se for válido, aceita o valor
    }
  };

  // FINALIZAR LOTE: Salva a contagem atual no histórico (se > 0) e zera o contador
  const finalizarLote = () => {
    if (contador > 0) {
      setUltimoLoteRegistrado(contador);
    }
    setContador(0);
  };

  // MENSAGEM DO STATUS: Define o texto do aviso conforme a quantidade de caixas
  const getMensagemStatus = () => {
    if (contador === 50) return "Lote Fechado";
    if (contador >= 40) return "Capacidade quase atingida";
    return "Em processamento";
  };

  // CLASSE CSS DINÂMICA: Define qual cor o painel terá (azul, amarelo ou vermelho)
  const getClasseStatus = () => {
    if (contador === 50) return "status-fechado";
    if (contador >= 40) return "status-alerta";
    return "status-normal";
  };

  // ESTRUTURA VISUAL (JSX): O que é desenhado no navegador
  return (
    /* Container principal que troca de classe CSS dependendo da contagem */
    <div className={`contador-container ${getClasseStatus()}`}>
      <h2>Painel de Controle de Lotes</h2>

      {/* Etiqueta com o aviso do status atual */}
      <div className="badge-status">{getMensagemStatus()}</div>

      {/* Exibição do número atual de caixas */}
      <p className="quantidade">Quantidade atual: {contador}</p>

      {/* Campo para escolher de quanto em quanto vai somar/subtrair */}
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

      {/* Botões de - e + (desabilitam sozinhos quando chegam nos limites) */}
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

      {/* Botão de zerar e guardar o lote */}
      <div className="acoes-lote">
        <button className="btn-zerar" onClick={finalizarLote}>
          Finalizar Lote / Zerar
        </button>
      </div>

      {/* Exibe a linha do histórico apenas se já houver algum lote salvo */}
      {ultimoLoteRegistrado !== null && (
        <p className="ultimo-lote">
          Último lote registrado: <strong>{ultimoLoteRegistrado} caixas</strong>
        </p>
      )}
    </div>
  );
}
