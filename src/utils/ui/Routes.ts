export const Routes = {
  product: (id: string) => `/products/${id}`,
  restaurant: (id: string) => `/restaurants/${id}`,
  restaurantsRecommended: '/restaurants/recommended',
  categoryProduct: (id: string) => `/categories/${id}/products`,
}
