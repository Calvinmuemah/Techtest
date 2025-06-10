export const categories = [
  {
    id: "1",
    name: "Laptops",
    image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Powerful laptops for work and play",
    itemCount: 15
  },
  {
    id: "2",
    name: "Phones",
    image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Latest smartphones and accessories",
    itemCount: 24
  },
  {
    id: "3",
    name: "Accessories",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Enhance your tech experience",
    itemCount: 42
  },
  {
    id: "4",
    name: "Home Appliances",
    image: "https://images.pexels.com/photos/6636954/pexels-photo-6636954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description: "Smart appliances for modern homes",
    itemCount: 18
  }
];

export const getCategoryById = (id) => {
  return categories.find(category => category.id === id);
};
