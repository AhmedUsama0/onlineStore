import { useCart } from "../hooks";

const useCartItem = () => {
    const { cart, dispatch } = useCart();
    const handleCartItem = ({ title, price, quantity, images, id }) => {
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
            image: images[0],
            quantity,
        });
    }
    return handleCartItem;
}

export default useCartItem;