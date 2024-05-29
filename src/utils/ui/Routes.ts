export const Routes = {
  home: '/',
  product: (id: string) => `/products/${id}`,
  restaurant: (id: string) => `/restaurants/${id}`,
  restaurantsRecommended: '/restaurants/recommended',
  productsRecommended: '/products/recommended',
  categoryProduct: (id: string) => `/categories/${id}/products`,
  restaurantsSearch: (search: string) => `/restaurants?search=${search}`,
  myOrders: '/my-orders',
  myFavoriteRestaurants: '/my-favorite-restaurants',
}
