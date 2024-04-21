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

    useEffect(() => {
        const storedProducts = localStorage.getItem('productList');
        if (storedProducts) {
            setProductList(JSON.parse(storedProducts));
        } else {
         const fetchProducts = async () => {
            try {
                const response = await axios.get('https://hamburgueria-kenzie-json-serve.herokuapp.com/products');
                console.log(response.data);
                setProductList(response.data);
            } catch (error) {
                console.error('Falha ao carregar os produtos:', error);
                console.log(error);
            }
        };
        console.log('Chamando a API');
            fetchProducts();
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('productList', JSON.stringify(productList));
    }, [productList]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cartList');
        if (storedCart) {
            setCartList(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cartList', JSON.stringify(cartList));
    }, [cartList]);

    const addToCart = (product) => {
        const existingItem = cartList.find(item => item.id === product.id);
        if (existingItem) {
            setCartList(cartList.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCartList([...cartList, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (productId) => {
        setCartList(cartList.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCartList([]);
    };

    const toggleCartVisibility = () => {
        setIsCartVisible(!isCartVisible);
    };

    const filteredProducts = productList.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const cartItemCount = cartList.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <Header 
                toggleCartVisibility={toggleCartVisibility} 
                cartItemCount={cartItemCount}
                setSearchTerm={setSearchTerm}
            />
            <main className={styles.mainGrid}>
                <ProductList productList={filteredProducts} addToCart={addToCart} />
                {isCartVisible && <CartModal cartList={cartList} removeFromCart={removeFromCart} clearCart={clearCart} />}
            </main>
        </>
    );
};



