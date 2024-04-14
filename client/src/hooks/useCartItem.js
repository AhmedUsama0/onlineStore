import { useCart } from "../hooks";

const useCartItem = () => {
    const { cart, dispatch } = useCart();
    const handleCartItem = ({ title, price, quantity, image, id }) => {
        const existItemIndex = cart.findIndex((item) => item.id === id);
        if (existItemIndex !== -1) {
            dispatch({
                type: "UPDATE_QUANTITY",
                id,
                quantity,
            });
            return;
        }
        dispatch({
            type: "ADD_TO_CART",
            id,
            title,
            price,
            image,
            quantity,
        });
    }
    return handleCartItem;
}

export default useCartItem;