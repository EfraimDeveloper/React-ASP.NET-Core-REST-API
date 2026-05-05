import { useState, useEffect } from "react";

function ProductForm({ onSave, selectedProduct }) {
  const [form, setForm] = useState({
    nome: "",
    preco: ""
  });

  // sincroniza quando muda o produto selecionado
  useEffect(() => {
    if (selectedProduct) {
      setForm({
        nome: selectedProduct.nome || "",
        preco: selectedProduct.preco || ""
      });
    } else {
      setForm({
        nome: "",
        preco: ""
      });
    }
  }, [selectedProduct]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      nome: form.nome,
      preco: Number(form.preco)
    });

    // limpa form após salvar
    setForm({
      nome: "",
      preco: ""
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>
        {selectedProduct ? "Editar Produto" : "Novo Produto"}
      </h2>

      <input
        name="nome"
        placeholder="Nome"
        value={form.nome}
        onChange={handleChange}
      />

      <input
        name="preco"
        placeholder="Preço"
        type="number"
        value={form.preco}
        onChange={handleChange}
      />

      <button type="submit">
        Guardar
      </button>
    </form>
  );
}

export default ProductForm;