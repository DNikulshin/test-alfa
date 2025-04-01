import { IProduct } from "../types/types";

export const mockProducts: IProduct[] = Array.from(
  { length: 20 },
  (_, index) => ({
    id: index + 1,
    title: `Product ${index + 1}`,
    price: `${(Math.random() * 100).toFixed(2)}$`,
    description: `Description for product ${index + 1}`,
    category: `Category ${Math.floor(Math.random() * 5) + 1}`,
    image: `http://dummyimage.com/200x200/000/fff&text=Product+${index + 1}`,
    like: false,
  })
);
