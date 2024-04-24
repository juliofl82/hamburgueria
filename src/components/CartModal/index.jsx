import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import styles from "./styles.module.scss";

export const CartModal = ({ cartList, toggleCartVisibility }) => {
   const total = cartList.reduce((prevValue, product) => {
      return prevValue + product.price;
   }, 0);

   return (
      
      

      <div className={styles.modalCard} role="dialog">
         <div className={styles.modalHeader}>
            <h2>Carrinho de compras</h2>
            <button onClick={toggleCartVisibility} aria-label="close" title="Fechar">
               <MdClose size={21} />
            </button>
         </div>
         <div>
            <ul>
               {cartList.map((product) => (
                  <CartItemCard key={product.id} product={product} />
               ))}
            </ul>
         </div>
         <div>
            <div>
               <span>Total</span>
               <span>{total.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})}</span>
            </div>
            <button>Remover todos</button>
         </div>
      </div>
   );
};
