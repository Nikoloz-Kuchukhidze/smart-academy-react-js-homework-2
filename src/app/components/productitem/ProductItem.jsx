import styles from "./ProductItem.module.css";

export default function ProductItem({ product }) {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={product.image}
          alt={product.title}
          loading="lazy"
        />
      </div>
      <div className={styles.details}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
      </div>
    </article>
  );
}
