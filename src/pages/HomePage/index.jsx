import { useEffect, useState } from "react";
import axios from 'axios';
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import styles from "./styles.module.scss";

export const HomePage = () => {
    const [productList, setProductList] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // Carrega produtos da API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://hamburgueria-kenzie-json-serve.herokuapp.com/products');
                setProductList(response.data);
            } catch (error) {
                console.error('Falha ao carregar os produtos:', error);
            }
        };
        fetchProducts();
    }, []);

    // Persistência dos produtos e do carrinho no localStorage
    useEffect(() => {
        localStorage.setItem('productList', JSON.stringify(productList));
        localStorage.setItem('cartList', JSON.stringify(cartList));
    }, [productList, cartList]);

    const addToCart = (product) => {
        const existingItem = cartList.find(item => item.id === product.id);
        setCartList(existingItem ?
            cartList.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) :
            [...cartList, { ...product, quantity: 1 }]
        );
    };

    const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
    };

    const removeItem = (productId) => {
        setCartList(currentCartList => currentCartList.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCartList([]);
    };

    const cartItemCount = cartList.reduce((total, item) => total + item.quantity, 0);
    const filteredProducts = productList.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Header
                toggleCartVisibility={toggleCartVisibility}
                setSearchTerm={setSearchTerm}
                cartItemCount={cartItemCount}
            />
            <main className={styles.mainGrid}>
                <ProductList productList={filteredProducts} addToCart={addToCart} />
                {isCartVisible && (
                    <CartModal
                        cartList={cartList}
                        toggleCartVisibility={toggleCartVisibility}
                        removeItem={removeItem}
                        clearCart={clearCart}
                    />
                )}
            </main>
        </>
    );
};





