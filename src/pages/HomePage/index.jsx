import { useEffect, useState } from "react";
import axios from 'axios';
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import styles from "./styles.module.scss";


export const HomePage = () => {
   const [productList, setProductList] = useState([]);
   const [cartList, setCartList] = useState([]);

   // useEffect para montagem - carrega os produtos da API e armazena em productList
   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const response = await axios.get('https://hamburgueria-kenzie-json-serve.herokuapp.com/products');
            setProductList(response.data); // Atualiza o estado com os dados recebidos
         } catch (error) {
            console.error('Falha ao carregar os produtos:', error); // Correção da sintaxe
         }
      };

      fetchProducts();
   }, []);


   // useEffect atualização - salva os produtos no localStorage (carregar no estado)
   // adição, exclusão, e exclusão geral do carrinho
   // renderizações condições e o estado para exibir ou não o carrinho
   // filtro de busca
   // estilizar tudo com sass de forma responsiva

   return (
      <>
         <Header />
         <main className={styles.mainGrid} >
            <ProductList productList={productList} />
            <CartModal cartList={cartList} />
         </main>
      </>
   );
};



