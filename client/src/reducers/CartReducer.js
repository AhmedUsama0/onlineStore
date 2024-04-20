const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return [
                ...state,
                {
                    id: action.id,
                    title: action.title,
                    price: action.price,
                    image: action.image,
                    quantity: action.quantity,
                }
            ]
        case "UPDATE_QUANTITY":
            return state.map(item => {
                if (item.id === action.id) {
                    return {
                        ...item,
                        quantity: item.quantity + action.quantity
                    }
                }
                return item;
            })
        case "EMPTY_CART":
            return [];
        default:
            return [...state];
    }
}

export default cartReducer;