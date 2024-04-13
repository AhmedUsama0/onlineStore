import { CartContext } from "../Contexts/Contexts";
import { useContext } from "react";

const useCart = () => useContext(CartContext);

export default useCart;