import { useEffect, useState } from "react";
import {getProducts,createProduct,updateProduct,deleteProduct,} from "../api/products";
import ProductForm from "../components/ProductForm";

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
    await updateProduct(selectedProduct.id, product);
  } else {
    await createProduct(product);
  }

  setSelectedProduct(null);

  await load(); // 👈 IMPORTANTE: espera atualizar
}

  async function handleDelete(id) {
    await deleteProduct(id);
    load();
  }

 function handleEdit(product) {
  setSelectedProduct(null); // força reset primeiro

  setTimeout(() => {
    setSelectedProduct(product);
  }, 0);
}
  return (
    <div>
      <h1>Produtos</h1>

      <ProductForm
        onSave={handleSave}
        selectedProduct={selectedProduct}
      />

      <hr />

{products.map(p => (
  <div key={p.id}>
    {p.nome} - {p.preco}€
    
    <button onClick={() => handleEdit(p)}>
      Editar
    </button>

    <button onClick={() => handleDelete(p.id)}>
      Apagar
    </button>
  </div>
))}
    </div>
  );
}

export default ProductList;