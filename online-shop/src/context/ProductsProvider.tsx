import { ReactElement, createContext, useState, useEffect } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

const initState: ProductType[] = [];

export type UseProductContextType = { products: ProductType[] };

const initContextState: UseProductContextType = {
  products: [],
};

const ProductsContext = createContext<UseProductContextType>(initContextState);

type ChildernType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildernType): ReactElement => {
  const [products, setProducts] = useState<ProductType[]>(initState);

  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch("http://localhost:3500/")
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          if (err instanceof Error) console.log(err.message);
        });
      return data;
    };

    fetchProducts().then((products) => setProducts(products));
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
