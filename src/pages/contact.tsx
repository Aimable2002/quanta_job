import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import styles from '../css/contact.module.css';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert('Thank you for your message! We will get back to you soon.');
    reset();
  };

  return (
    <div className="px-[10%] bg-[rgba(0,0,0,0.7)]">
      <section className={`${styles.contact} px-20`} id="contact">
        <div className="container"> {/* Added wrapper */}
          <div className="flex text-center flex-col">
            <h2 className='font-bold text-4xl w-full'>Contact Us</h2>
            <p className="text-white">Get in touch with our team</p>
          </div>
          <div className={styles.contactContent}>
            <motion.div 
              className={styles.contactInfo}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className={styles.infoItem}>
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h4>Location</h4>
                  <p>Kigali Rwanda</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <i className="fas fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  <p>contact@quanta.example</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <i className="fas fa-phone"></i>
                <div>
                  <h4>Call Us</h4>
                  <p>+250 79 44 12 876</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <i className="fas fa-clock"></i>
                <div>
                  <h4>Working Hours</h4>
                  <p>Mon-Fri: 9AM - 6PM</p>
                  <p>Sat-Sun: Closed</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className={styles.contactForm}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    {...register('name', { required: 'Name is required' })}
                    className={errors.name ? styles.error : ''}
                  />
                  {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your Email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className={errors.email ? styles.error : ''}
                  />
                  {errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>}
                </div>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Subject"
                    {...register('subject')}
                  />
                </div>
                <div className={styles.formGroup}>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Your Message"
                    {...register('message', { required: 'Message is required' })}
                    className={errors.message ? styles.error : ''}
                  ></textarea>
                  {errors.message && <span className={styles.errorMessage}>{errors.message.message}</span>}
                </div>
                <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
