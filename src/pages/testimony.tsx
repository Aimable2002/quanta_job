import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import testimonialsData from '../decla/testimonial';
import styles from '../css/testimony.module.css'

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval: number;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonialsData.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonialsData.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className='flex text-center flex-col'>
          <h2 className={styles.sectionTitle}>What People Say</h2>
          <p className={styles.sectionSubtitle}>Success stories from our community</p>
        </div>
        <div className={styles.testimonialSlider}>
          <div 
            className={styles.testimonialTrack}
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonialsData.map((testimonial) => (
              <div key={testimonial.id} className={styles.testimonialSlide}>
                <div className={styles.testimonialContent}>
                  "{testimonial.content}"
                </div>
                <div className={styles.testimonialAuthor}>
                  <img 
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className={styles.testimonialAvatar}
                  />
                  <div>
                    <div className={styles.testimonialName}>{testimonial.author}</div>
                    <div className={styles.testimonialRole}>{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.sliderControls}>
          <button className={styles.sliderPrev} onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          <div className={styles.sliderDots}>
            {testimonialsData.map((_, index) => (
              <button
                key={index}
                className={`${styles.sliderDot} ${currentSlide === index ? styles.active : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <button className={styles.sliderNext} onClick={nextSlide}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;