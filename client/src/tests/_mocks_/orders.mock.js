export const order = {
  address: {
    city: 'Berlin',
    country: 'Germany',
    street: 'Wriezener Str. 12',
    zip: '13055',
  },
  bookingDate: 1554284950000,
  customer: {
    email: 'emad.alam@construyo.de',
    name: 'Emad Alam',
    phone: '015252098067',
  },
  title: 'Test Order 1',
  id: 'hKlIKPoZc2xCKGTUKZK2',
};

export const orders = [order];

export const ordersState = {
  orders,
  order,
  length: 0,
  success: false,
  fetching: false,
  updating: false,
};
