import styles from "./styles.module.scss";
import { ProductCard } from "./ProductCard";

export const ProductList = ({ productList, addToCart }) => {
   return (
      <ul className={styles.listGrid}>
         {productList.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
         ))}
      </ul>
   );
};

