import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ text: '', type: '' });

  // Initialize EmailJS
  React.useEffect(() => {
    emailjs.init({
      publicKey: "IT2nU9R5nZ7Ld7NoV",
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const showMessage = (message, type) => {
    setFormMessage({ text: message, type });
    if (type === 'success') {
      setTimeout(() => {
        setFormMessage({ text: '', type: '' });
      }, 5000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showMessage('Please fill in all required fields.', 'error');
      return;
    }

    if (!isValidEmail(formData.email)) {
      showMessage('Please enter a valid email address.', 'error');
      return;
    }

    setIsSubmitting(true);
    setFormMessage({ text: '', type: '' });

    try {
      const response = await emailjs.send(
        "service_kczxhb9",
        "template_sfwtnju",
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          title: formData.subject.trim() || 'Portfolio Contact Form',
          message: formData.message.trim()
        }
      );

      console.log('SUCCESS!', response.status, response.text);
      showMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.log('FAILED...', error);
      showMessage('Sorry, there was an error sending your message. Please try again or contact me directly.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-gray-800">
            Contact Me
          </h2>
          <div className="section-divider w-24 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Let's discuss your next project
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-gray-50 rounded-3xl p-8 shadow-lg border border-gray-200">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 transition-all duration-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 transition-all duration-300"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or inquiry..."
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-gray-900 transition-all duration-300"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 text-white p-4 rounded-xl shadow-lg hover:bg-purple-700 hover:shadow-xl transition-all duration-300 font-semibold text-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {formMessage.text && (
                <div
                  className={`form-message mt-4 p-3 rounded-xl text-center ${
                    formMessage.type === 'success'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}
                >
                  {formMessage.text}
                </div>
              )}
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-3xl p-8 shadow-lg border border-gray-200">
              <h3 className="font-playfair font-bold text-2xl mb-6 text-gray-800">
                Get In Touch
              </h3>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Ready to start your next project? I'd love to hear from you.
                Let's create something amazing together.
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:souravkumar.ofc@gmail.com"
                  className="flex items-center space-x-4 text-gray-700 hover:text-purple-600 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                    <i className="fa-solid fa-envelope text-purple-600"></i>
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm text-gray-600">
                      souravkumar.ofc@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/souravkumarofc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-700 hover:text-purple-600 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                    <i className="fa-brands fa-linkedin text-purple-600"></i>
                  </div>
                  <div>
                    <p className="font-semibold">LinkedIn</p>
                    <p className="text-sm text-gray-600">Connect with me</p>
                  </div>
                </a>

                <a
                  href="https://github.com/souravkumarofc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-700 hover:text-purple-600 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                    <i className="fa-brands fa-github text-purple-600"></i>
                  </div>
                  <div>
                    <p className="font-semibold">GitHub</p>
                    <p className="text-sm text-gray-600">
                      View my repositories
                    </p>
                  </div>
                </a>

                <a
                  href="https://x.com/souravkumarofc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 text-gray-700 hover:text-purple-600 transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                    <i className="fa-brands fa-x-twitter text-purple-600"></i>
                  </div>
                  <div>
                    <p className="font-semibold">X (Twitter)</p>
                    <p className="text-sm text-gray-600">
                      Tech thoughts & updates
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

