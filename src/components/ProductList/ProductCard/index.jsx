import styles from "./styles.module.scss";

export const ProductCard = ({ product, addToCart }) => {
    return(
        <li className={styles.cardGrid}>
            <div className={styles.imgBox}>
                <img src={product.img} alt={product.name} />
                </div>            
            
            <div className={styles.itensInfo}>
                <h3>{product.name}</h3>
                <span>{product.category}</span>
                <span>{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})}</span>
                <button onClick={() => addToCart(product)}>Adicionar</button>
            </div>
        </li>
    )
}
