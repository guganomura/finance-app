import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGastos } from '../../context/GastosContext';
import './NovoGasto.css';

const CATEGORIAS = ['Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Moradia', 'Educação', 'Outros'];

function NovoGasto() {
  const navigate = useNavigate();
  const { adicionarGasto } = useGastos();

  const hoje = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    valor: '',
    categoria: '',
    data: hoje,
    descricao: '',
    recorrente: false,
  });

  const [erros, setErros] = useState({});

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (erros[name]) setErros((prev) => ({ ...prev, [name]: '' }));
  }

  function validar() {
    const novosErros = {};
    if (!form.valor || form.valor === 'R$ 0,00') novosErros.valor = 'Informe o valor do gasto.';
    if (!form.categoria) novosErros.categoria = 'Selecione uma categoria.';
    return novosErros;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const novosErros = validar();
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      return;
    }

    const valorNumerico = parseFloat(
      form.valor.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
    );

    adicionarGasto({
      valor: valorNumerico,
      categoria: form.categoria,
      data: form.data,
      descricao: form.descricao,
      recorrente: form.recorrente,
    });

    navigate('/', { state: { sucesso: true } });
  }

  return (
    <div className="novo-gasto">
      <header className="novo-gasto__header">
        <button className="novo-gasto__back" onClick={() => navigate('/')}>←</button>
        <h1>Novo Gasto</h1>
      </header>

      <form className="novo-gasto__form" onSubmit={handleSubmit}>

        <div className="novo-gasto__field">
          <label>Valor *</label>
          <input
            className={`novo-gasto__input ${erros.valor ? 'novo-gasto__input--erro' : ''}`}
            type="text"
            name="valor"
            placeholder="R$ 0,00"
            value={form.valor}
            onChange={handleChange}
          />
          {erros.valor && <span className="novo-gasto__erro">{erros.valor}</span>}
        </div>

        <div className="novo-gasto__field">
          <label>Categoria *</label>
          <select
            className={`novo-gasto__input ${erros.categoria ? 'novo-gasto__input--erro' : ''}`}
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
          >
            <option value="">Selecione...</option>
            {CATEGORIAS.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {erros.categoria && <span className="novo-gasto__erro">{erros.categoria}</span>}
        </div>

        <div className="novo-gasto__field">
          <label>Data *</label>
          <input
            className="novo-gasto__input"
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
          />
        </div>

        <div className="novo-gasto__field">
          <label>Descrição (opcional)</label>
          <input
            className="novo-gasto__input"
            type="text"
            name="descricao"
            placeholder="Ex: Almoço com amigos"
            value={form.descricao}
            onChange={handleChange}
          />
        </div>

        <div className="novo-gasto__toggle-field">
          <label>Gasto Recorrente</label>
          <div
            className={`novo-gasto__toggle ${form.recorrente ? 'novo-gasto__toggle--on' : ''}`}
            onClick={() => setForm((prev) => ({ ...prev, recorrente: !prev.recorrente }))}
          >
            <div className="novo-gasto__toggle-thumb" />
          </div>
        </div>

        <div className="novo-gasto__actions">
          <button type="button" className="novo-gasto__btn-cancelar" onClick={() => navigate('/')}>
            Cancelar
          </button>
          <button type="submit" className="novo-gasto__btn-salvar">
            Salvar
          </button>
        </div>

      </form>
    </div>
  );
}

export default NovoGasto;
