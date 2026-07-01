

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { products as productsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [orders, setOrders] = useState([]);

    const [products] = useState(productsData);

    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please Select Product Size")
            return;
        }

        let cartData = structuredClone(cartItems)

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1
            }
        }
        else {
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }
        setCartItems(cartData);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async (itemId, size, quantity) => {

        let cartData = structuredClone(cartItems);

        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }
    //----------------  Cancel Order Function
    const cancelOrder = (orderId, productId, size) => {

        const updatedOrders = orders.map((order) => {

            if (order.id !== orderId) {
                return order;
            }
            const updatedItem = order.items.filter((item) => {
                return !(item._id === productId && item.size === size);
            });
            return {
                ...order,
                items: updatedItem
            };
        });

        const finalOrders = updatedOrders.filter(
            (order) => order.items.length > 0
        )
        setOrders(finalOrders);

        toast.success("Order cancelled sccessfully");
    }








    //    useEffect for cart load with localstorage

    useEffect(() => {
        const savedCart = localStorage.getItem("cart")

        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    //  for cart saved
    useEffect(() => {
        localStorage.setItem(
            "cart",
            JSON.stringify(cartItems)
        );
    }, [cartItems]);

    //    useEffect for rder load with localstorage

    useEffect(() => {
        const savedOrders = localStorage.getItem("orders");

        if (savedOrders) {
            setOrders(JSON.parse(savedOrders));
        }
    }, [])
    //  for order saved

    useEffect(() => {
        localStorage.setItem("orders",
            JSON.stringify(orders)
        );
    }, [orders])

    const value = {
        products,
        currency,
        delivery_fee,

        search,
        setSearch,

        showSearch,
        setShowSearch,

        cartItems,
        setCartItems,
        addToCart,

        getCartCount,
        updateQuantity,
        getCartAmount,

        orders,
        setOrders,

        cancelOrder,

        navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;