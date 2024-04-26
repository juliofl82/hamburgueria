import { useEffect } from "react";
import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import styles from "./styles.module.scss";

export const CartModal = ({ cartList, toggleCartVisibility, removeItem, clearCart }) => {
   const total = cartList.reduce((prevValue, product) => {
      return prevValue + product.price * (product.quantity || 1);
   }, 0);

   const handleClickOutside = (event) => {
      if(event.target === event.currentTarget) {
          toggleCartVisibility();
      }
  };

  useEffect(() => {
   const handleKeyDown = (event) => {
      if(event.key === 'Escape') {
         toggleCartVisibility();
      }
   };
   document.addEventListener('keydown', handleKeyDown);
  },[toggleCartVisibility]);

   return (
      <div className={styles.modalOverlay} onClick={handleClickOutside}>
         <div className={styles.modalCard} role="dialog">
            <div className={styles.modalHeader}>
               <h2>Carrinho de compras</h2>
               <button onClick={toggleCartVisibility} aria-label="close" title="Fechar">
                  <MdClose size={21} />
               </button>
            </div>
            <div className={styles.listContainer}>
               <ul className={styles.listBox}>
                  {cartList.map((product) => (
                     <CartItemCard key={product.id} product={product} onRemoveItem={() => removeItem(product.id)} />
                  ))}
               </ul>
            </div>
            <div className={styles.totalBox}>
               <div className={styles.totalCartGrid}>
                  <div className={styles.totalCart}>
                     <span>Total</span>
                     <span>{total.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</span>
                  </div>
                  <button onClick={clearCart} className={styles.deleteAllButton}>Remover todos</button>
               </div>
            </div>
         </div>
      </div>
   );
};
