"use client";

import { useEffect, useState } from "react";
import ProductItem from "./components/productitem/ProductItem";
import styles from "./page.module.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Product request failed: ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Product response was not a list");
        }

        setProducts(data);
      } catch {
        if (!controller.signal.aborted) {
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>SMART ACADEMY STORE</p>
        <h1>პროდუქტები</h1>
        <p className={styles.subtitle}>აღმოაჩინე ჩვენი პროდუქტების კოლექცია</p>
      </header>

      {loading ? (
        <p className={styles.status} role="status">
          იტვირთება
        </p>
      ) : error ? (
        <p className={styles.status} role="alert">
          მოხდა შეცდომა
        </p>
      ) : (
        <section className={styles.products} aria-label="პროდუქტების სია">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </section>
      )}
    </main>
  );
}
