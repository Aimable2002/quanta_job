import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight, FaStar, FaDownload } from 'react-icons/fa';
import type { Product } from '../types/type';
import productsData from '../decla/product';
import styles from '../css/Product.module.css'

const Products = () => {
  // const [scrollPosition, setScrollPosition] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = (): void => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 300;
      // setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  const scrollRight = (): void => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 300;
      // setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  }

  return (
    <section className={styles.products} id="products">
      <div style={{paddingLeft: '10%', paddingRight: '10%'}}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>QUANTA Products</h2>
          <p className={styles.sectionSubtitle}>Our latest innovations changing the tech landscape</p>
        </div>
        <div className={styles.productsContainer}>
          <button 
            className={`${styles.scrollArrow} ${styles.leftArrow}`} 
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <FaChevronLeft className='flex text-center'/>
          </button>
          <div className={styles.productsScroll} ref={scrollContainerRef}>
            {productsData.map((product: Product) => (
              <div key={product.id} className={styles.productCard}>
                {product.badge && <div className={styles.productBadge}>{product.badge}</div>}
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={styles.productImg} 
                  loading="lazy"
                />
                <div className={styles.productContent}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className={styles.productMeta}>
                    <span><FaStar /> {product.rating}</span>
                    <span><FaDownload /> {product.downloads}</span>
                  </div>
                  <a href="#" className={styles.btnSmall}>Learn More</a>
                </div>
              </div>
            ))}
          </div>
          <button 
            className={`${styles.scrollArrow} ${styles.rightArrow}`} 
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;