import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/products";

import ProductForm from "../components/ProductForm";

import {
  Container,
  Typography,
  Paper,
  Button,
  Stack,
} from "@mui/material";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  async function load() {
    const data = await getProducts();
    setProducts(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSave(product) {
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, {
        ...product,
        id: selectedProduct.id,
      });
    } else {
      await createProduct(product);
    }

    setSelectedProduct(null);
    await load();
  }

  async function handleDelete(id) {
    await deleteProduct(id);
    await load();
  }

  function handleEdit(product) {
    setSelectedProduct(product);
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ my: 3 }}>
        Produtos
      </Typography>

      <ProductForm
        onSave={handleSave}
        selectedProduct={selectedProduct}
      />

      <Stack spacing={2}>
        {products.map((p) => (
          <Paper
            key={p.id}
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>
              {p.nome} - {p.preco}€
            </span>

            <div>
              <Button
                onClick={() => handleEdit(p)}
                sx={{ mr: 1 }}
                variant="outlined"
              >
                Editar
              </Button>

              <Button
                onClick={() => handleDelete(p.id)}
                color="error"
                variant="contained"
              >
                Apagar
              </Button>
            </div>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}

export default ProductList;