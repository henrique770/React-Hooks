import React, { useState, useEffect, useMemo, useCallback } from 'react';

export default function App() {
  // useState retorna um array com dois elementos, onde o primeiro é a constante que armazena aquele estado e o segundo é uma função para substituir o valor daquele estado.

  const [tech, setTech] = useState([]);
  const [newTech, setNewTech] = useState('');

  // O useCallback é similar ao useMemo, mas ao invés de retornar um único resultado ele retorna uma função

  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
    setNewTech('');
  }, [newTech, tech]);
  // useEffect recebe como parâmetro uma função callback e nela serão realizados os efeitos colaterais necessários pelo componente durante seu ciclo de vida.
  useEffect(() => {
    const StorageTech = localStorage.getItem('tech');

    if (StorageTech) {
      setTech(JSON.parse(StorageTech));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  // useMemo é utilizado por exemplo quando você precisa realizar cálculos de alguma variavél baseado em alguma alteração de outra variável
  const techSize = useMemo(() => tech.length, [tech]);
  return (
    <>
      <form>
        <strong>React Hooks</strong>
        <ul>
          {tech.map(t => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <strong>You have {techSize} technologies</strong>
        <br />
        <div className="formFormat">
          <input
            type="text"
            value={newTech}
            onChange={e => setNewTech(e.target.value)}
          />

          <button type="button" onClick={handleAdd}>
            Add
          </button>
        </div>
      </form>
    </>
  );
}
