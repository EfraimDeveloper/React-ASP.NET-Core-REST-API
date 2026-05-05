const URL = "https://produtoonline-cmb9gvf9cgbpfcfd.francecentral-01.azurewebsites.net/api/Produto";

export async function getProducts() {
  const res = await fetch(URL);
  return await res.json();
}

export async function getProduct(id) {
  const res = await fetch(`${URL}/${id}`);
  return await res.json();
}

export async function createProduct(product) {
  await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
}

export async function updateProduct(id, product) {
  await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(id) {
  await fetch(`${URL}/${id}`, {
    method: "DELETE",
  });
}