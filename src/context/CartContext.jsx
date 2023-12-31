import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

export const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  const addProductCart = (product, quantity) => {
    
    const index = cart.findIndex((item) => item.id === product.id);
    if (index == -1) {
      const newProduct = {
        ...product,
        quantity,
        subTotal: product.price * quantity,
      }; 
      setCart([...cart, newProduct]);
    } else { 
      const cartCopy = [...cart];
      cartCopy[index].quantity += quantity;
      cartCopy[index].subTotal = cartCopy[index].price * cartCopy[index].quantity;

      setCart(cartCopy);
    }
  };

  const removeProduct = (id) => {
        const productsFilter = cart.filter( product => product.id !== id );
        setCart(productsFilter);
  }

  const handleTotal = () => { 
        const totalItems = cart.reduce( (acum, item) => acum + item.subTotal, 0);
        setTotal(totalItems);
   }
  
   const handleTotalProducts = () => { 
        const items = cart.reduce( (acum, item) => acum + item.quantity, 0);
        setTotalProducts(items);
   }

   useEffect(() => {
    handleTotal() 
    handleTotalProducts()

    }, [cart])


  const objetValue = {
    cart,
    total,
    totalProducts,
    addProductCart,
    removeProduct
  };

  return <CartContext.Provider value={objetValue}> {children} </CartContext.Provider>;
};
