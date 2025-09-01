import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-[10%] bg-[rgba(0,0,0,0.7)] py-8 sm:py-12 lg:py-16">
      <section className="px-4 sm:px-8 lg:px-20" id="contact">
        <div className="container mx-auto">
          <div className="flex text-center flex-col mb-8 sm:mb-12">
            <h2 className='font-bold text-2xl sm:text-3xl lg:text-4xl w-full text-white'>Contact Us</h2>
            <p className="text-gray-300 mt-2 text-sm sm:text-base">Get in touch with our team</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <motion.div 
              className="w-full lg:w-2/5"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start">
                  <div className="bg-blue-500 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-white text-sm sm:text-base"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Location</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">Kigali Rwanda</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                    <i className="fas fa-envelope text-white text-sm sm:text-base"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Email</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">contact@quanta.example</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                    <i className="fas fa-phone text-white text-sm sm:text-base"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Call Us</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">+250 79 44 12 876</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-500 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 flex-shrink-0">
                    <i className="fas fa-clock text-white text-sm sm:text-base"></i>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm sm:text-base">Working Hours</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">Mon-Fri: 9AM - 6PM</p>
                    <p className="text-gray-300 text-xs sm:text-sm">Sat-Sun: Closed</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="w-full lg:w-3/5"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded mb-4 sm:mb-6 text-sm sm:text-base">
                  Thank you for your message! We will get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded mb-4 sm:mb-6 text-sm sm:text-base">
                  There was an error sending your message. Please try again.
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <input
                      type="text"
                      id="name"
                      placeholder="Your Name"
                      {...register('name', { required: 'Name is required' })}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border ${errors.name ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
                    />
                    {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name.message}</span>}
                  </div>
                  <div>
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
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base`}
                    />
                    {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>}
                  </div>
                </div>
                <div>
                  <input
                    type="text"
                    id="subject"
                    placeholder="Subject"
                    {...register('subject')}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Your Message"
                    {...register('message', { required: 'Message is required' })}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-800 border ${errors.message ? 'border-red-500' : 'border-gray-700'} rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base resize-none`}
                  ></textarea>
                  {errors.message && <span className="text-red-500 text-sm mt-1">{errors.message.message}</span>}
                </div>
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition duration-300 flex items-center justify-center text-sm sm:text-base w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
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