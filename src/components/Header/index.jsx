import { useState } from "react";
import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import styles from "./styles.module.scss";

export const Header = ({ toggleCartVisibility, setSearchTerm, cartItemCount }) => {
   const [value, setValue] = useState("");

   const handleSubmit = (e) => {
       e.preventDefault();  
       setSearchTerm(value);  
   };

   return (
      <header className={styles.headerGrid}>
         <div className={styles.menuGrid}>
            <img src={Logo} alt="Logo Kenzie Burguer" />
            <div className={styles.cartGrid}>
               <button className={styles.cartImg} onClick={toggleCartVisibility}>
                  <MdShoppingCart size={21} />
                  <div className={styles.cartItens}>
                     <span>{cartItemCount}</span>
                  </div>
               </button>
               {/* <form onSubmit={handleSubmit}>
               <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
               />
               <button type="submit">
                 <MdSearch size={21} />
               </button>
            </form> */}
            </div>
         </div>
      </header>
   );
};

