const users = [
  {
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "User",
    email: "user@nextmail.com",
    password: "123456",
    image_url: "https://example.com/user-image.jpg",
    bio: "This is a user bio.",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const products = [
  {
    product_id: "1",
    name: "Handcrafted Vase",
    rating: 4.5,
    price: 45.0,
    description: "A beautiful handcrafted vase made from ceramic.",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    image_url: "https://example.com/vase-image.jpg",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    product_id: "2",
    name: "Wooden Bowl",
    rating: 4.0,
    price: 30.0,
    description: "A finely crafted wooden bowl, perfect for salads.",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    image_url: "https://example.com/bowl-image.jpg",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

const reviews = [
  {
    review_id: "1",
    title: "Great Vase!",
    description: "Beautiful craftsmanship!",
    rating: 5,
    product_id: "1",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    review_id: "2",
    title: "Nice Bowl",
    description: "Well-made but a bit pricey.",
    rating: 4,
    product_id: "2",
    user_id: "410544b2-4001-4271-9855-fec4b6a6442a",
    created_at: new Date(),
    updated_at: new Date(),
  },
];

module.exports = {
  users,
  products,
  reviews,
};
