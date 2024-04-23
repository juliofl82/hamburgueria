import styles from "./styles.module.scss";

export const ProductCard = ({ product, addToCart }) => {
    return(
        <li className={styles.cardGrid}>
            <div className={styles.imgBox}>
                <img src={product.img} alt={product.name} />
                </div>            
            
            <div className={styles.itensInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <span className={styles.productCategory}>{product.category}</span>
                <span className={styles.price} >{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})}</span>
                <button onClick={() => addToCart(product)}>Adicionar</button>
            </div>
        </li>
    )
}
