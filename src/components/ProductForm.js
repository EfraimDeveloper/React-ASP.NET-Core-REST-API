import { useState, useEffect } from "react";
import { TextField, Button, Paper, Typography } from "@mui/material";

function ProductForm({ onSave, selectedProduct }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  useEffect(() => {
    if (selectedProduct) {
      setNome(selectedProduct.nome || "");
      setPreco(selectedProduct.preco || "");
    } else {
      setNome("");
      setPreco("");
    }
  }, [selectedProduct]);

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      nome,
      preco: Number(preco),
    });

    setNome("");
    setPreco("");
  }

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {selectedProduct ? "Editar Produto" : "Novo Produto"}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Preço"
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ mt: 2 }}
        >
          Guardar
        </Button>
      </form>
    </Paper>
  );
}

export default ProductForm;