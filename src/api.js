const BASE_URL = import.meta.env.PROD ? '' : (import.meta.env.VITE_API_URL || 'https://solo-carnes-api-wilfredo.onrender.com');

export async function login(email, password) {
  const response = await fetch(`${BASE_URL}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'No se pudo iniciar sesión.');
  return data;
}

async function request(path, token, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { Authorization: `Bearer ${token}`, ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...options.headers },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'No se pudo completar la operación.');
  return data;
}

export const getProducts = token => request('/api/productos?limite=100', token);
export const createProduct = (token, product) => request('/api/productos', token, { method: 'POST', body: JSON.stringify(product) });
export const getPurchases = token => request('/api/compras?limite=30', token);
export const createPurchase = (token, purchase) => request('/api/compras', token, { method: 'POST', body: JSON.stringify(purchase) });
export const getSales = token => request('/api/ventas?limite=30', token);
export const createSale = (token, sale) => request('/api/ventas', token, { method: 'POST', body: JSON.stringify(sale) });
export const createConsumption = (token, consumption) => request('/api/consumos', token, { method: 'POST', body: JSON.stringify(consumption) });
export const getMovements = token => request('/api/kardex?limite=50', token);
export const getUsers = token => request('/api/usuarios?limite=100', token);
export const createUser = (token, user) => request('/api/usuarios', token, { method: 'POST', body: JSON.stringify(user) });
export const deleteUser = (token, id) => request('/api/usuarios/' + id, token, { method: 'DELETE' });

export const getRecipes = (token, platoId) => request('/api/recetas?' + (platoId ? 'plato_id=' + platoId + '&' : '') + 'carga=' + Date.now(), token);
export const createRecipe = (token, recipe) => request('/api/recetas', token, { method: 'POST', body: JSON.stringify(recipe) });
export const deleteRecipe = (token, id) => request(`/api/recetas/${id}`, token, { method: 'DELETE' });



export const deleteProduct = (token, id) => request('/api/productos/' + id, token, { method: 'DELETE' });
