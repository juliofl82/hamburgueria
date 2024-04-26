import { MdDelete } from "react-icons/md";
import styles from "./styles.module.scss";

export const CartItemCard = ({ product, onRemoveItem }) => {
   return (
      <li className={styles.listGrid}>
         <div className={styles.itemGrid}>
            <div className={styles.cartItens}>
               <div>
                  <img className={styles.imgCart} src={product.img} alt={product.name} />
               </div>
               <div>
                  <h3>{product.name}</h3>
                  <p>{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL" })}</p>
               </div>
            </div>
            <button className={styles.buttonDeleteItenCart} onClick={onRemoveItem} aria-label="delete" title="Remover item">
               <MdDelete size={21} />
            </button>
         </div>
      </li>
   );
};
