import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import SectionHeader from './SectionHeader';

const EMAIL = 'souravkumarjsr01@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/souravkumarofc/';
const GITHUB = 'https://github.com/souravkumarofc/';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    emailjs.init({
      publicKey: 'IT2nU9R5nZ7Ld7NoV',
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
      const response = await emailjs.send('service_kczxhb9', 'template_sfwtnju', {
        name: formData.name.trim(),
        email: formData.email.trim(),
        title: formData.subject.trim() || 'Portfolio Contact Form',
        message: formData.message.trim(),
      });

      if (process.env.NODE_ENV === 'development') {
        console.log('SUCCESS!', response.status, response.text);
      }
      showMessage("Thank you for your message! I'll get back to you soon.", 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log('FAILED...', error);
      }
      showMessage(
        'Sorry, there was an error sending your message. Please try again or contact me directly.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section theme-section py-20 md:py-28 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          <div className="lg:col-span-5 contact-intro">
            <SectionHeader
              index="09"
              title="Let's talk"
              subtitle="Open to roles, collaborations, and thoughtful engineering conversations."
              align="left"
            />

            <figure className="contact-intro-photo">
              <img
                src="/images/new_pic.png"
                alt="Portrait of Sourav Kumar, Software Developer"
                width={120}
                height={120}
                loading="lazy"
                decoding="async"
                draggable="false"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              />
              <figcaption className="contact-intro-caption text-theme-muted">
                Sourav Kumar · Software Developer
              </figcaption>
            </figure>

            <div className="contact-quick-links">
              <a href={`mailto:${EMAIL}`} className="btn-editorial-primary contact-email-cta">
                <i className="fa-solid fa-envelope" aria-hidden="true" />
                Email me
              </a>
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-secondary contact-social-pill"
              >
                <i className="fa-brands fa-linkedin" aria-hidden="true" />
                LinkedIn
              </a>
              <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial-secondary contact-social-pill"
              >
                <i className="fa-brands fa-github" aria-hidden="true" />
                GitHub
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="contact-form-card theme-card">
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="contact-field">
                  <label htmlFor="name">Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    required
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What would you like to talk about?"
                  />
                </div>
                <div className="contact-field contact-field--message">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, role, or idea..."
                    rows={5}
                    required
                  />
                </div>

                <div className="contact-form-actions">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-editorial-primary contact-submit-btn w-full sm:w-auto disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>

                {formMessage.text && (
                  <div
                    className={`contact-form-feedback form-message ${
                      formMessage.type === 'success'
                        ? 'contact-form-feedback--success'
                        : 'contact-form-feedback--error'
                    }`}
                    role="status"
                  >
                    {formMessage.text}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
