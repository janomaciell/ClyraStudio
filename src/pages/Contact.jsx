import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';   // ← NUEVA IMPORTACIÓN
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    service: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const heroRef = useRef(null);
  const formRef = useRef(null);
  const faqRef = useRef(null);
  const whatsappFloatRef = useRef(null);
  const whatsappThreadRef = useRef(null);
  const contactInfoRef = useRef(null);
  const emailFormRef = useRef(null);   // ← NUEVO REF para EmailJS

  const faqData = [
    {
      question: "¿Qué tipo de proyectos desarrollan?",
      answer: "Webs presenciales para profesionales y pymes, e-commerce con MercadoPago, y web apps a medida con panel de administración. Todo con React en el frontend y Django en el backend."
    },
    {
      question: "¿Cuánto tarda en estar lista mi web?",
      answer: "De 15 a 90 días según la complejidad del proyecto. Plazo acordado antes de arrancar, sin excusas ni demoras indefinidas."
    },
    {
      question: "¿Los precios son en pesos o en dólares?",
      answer: "Trabajamos en USD para proteger el valor del proyecto de la inflación. Aceptamos transferencia en dólares, crypto o el equivalente en pesos al cambio del día."
    },
    {
      question: "¿Incluyen soporte después de lanzar?",
      answer: "Sí. Todos los proyectos incluyen 30 días de soporte post-lanzamiento sin costo. También ofrecemos planes de mantenimiento mensual para quien lo necesite."
    },
    {
      question: "¿Trabajan con clientes de todo el país?",
      answer: "Sí, trabajamos 100% remoto. Tenemos clientes en CABA, GBA, Córdoba, Rosario y otras provincias. Las reuniones son por videollamada."
    }
  ];

  // Inicialización de GSAP (sin cambios)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline();
      heroTl.fromTo('.hero-badge',
        { opacity: 0, scale: 0, rotation: -180 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: 'back.out(1.7)' }
      )
      .fromTo('.hero-title',
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.6'
      )
      .fromTo('.hero-subtitle',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.8'
      );

      gsap.fromTo('.form-container',
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%', toggleActions: 'play none none reverse' }
        }
      );

      gsap.fromTo('.faq-item',
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: faqRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      );

      gsap.fromTo('.contact-info',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: contactInfoRef.current, start: 'top 85%', toggleActions: 'play none none reverse' }
        }
      );

      const whatsappBtn = whatsappFloatRef.current;
      const thread = whatsappThreadRef.current;

      if (whatsappBtn && thread) {
        gsap.to(whatsappBtn, { scale: 1.1, duration: 2, ease: 'power1.inOut', repeat: -1, yoyo: true });
        gsap.to(thread, { rotation: 360, duration: 4, ease: 'none', repeat: -1 });

        whatsappBtn.addEventListener('mouseenter', () => {
          gsap.to(whatsappBtn, { scale: 1.2, duration: 0.3, ease: 'back.out(1.4)' });
          gsap.to('.whatsapp-pulse', { scale: 1.5, opacity: 0.8, duration: 0.3 });
        });
        whatsappBtn.addEventListener('mouseleave', () => {
          gsap.to(whatsappBtn, { scale: 1, duration: 0.3, ease: 'power2.out' });
          gsap.to('.whatsapp-pulse', { scale: 1, opacity: 0.6, duration: 0.3 });
        });
        whatsappBtn.addEventListener('click', () => {
          gsap.to(whatsappBtn, { scale: 0.9, duration: 0.1, onComplete: () => gsap.to(whatsappBtn, { scale: 1.2, duration: 0.2 }) });
        });
      }

      const inputs = document.querySelectorAll('.form-input');
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          gsap.to(input, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
        });
        input.addEventListener('blur', () => {
          gsap.to(input, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
      });

      const submitBtn = document.querySelector('.submit-btn');
      if (submitBtn) {
        submitBtn.addEventListener('mouseenter', () => {
          gsap.to('.submit-btn-bg', { scaleX: 1, duration: 0.4, ease: 'power2.out' });
          gsap.to('.submit-arrow', { x: 5, duration: 0.3 });
        });
        submitBtn.addEventListener('mouseleave', () => {
          gsap.to('.submit-btn-bg', { scaleX: 0, duration: 0.4, ease: 'power2.out' });
          gsap.to('.submit-arrow', { x: 0, duration: 0.3 });
        });
      }
    }, [heroRef, formRef, faqRef, whatsappFloatRef, contactInfoRef]);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ← FUNCIÓN ACTUALIZADA con EmailJS (real)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Animación del botón (la misma que tenías)
    gsap.to('.submit-btn', {
      scale: 0.95,
      duration: 0.1,
      onComplete: () => gsap.to('.loading-spinner', { rotation: 360, duration: 1, ease: 'none', repeat: -1 })
    });

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,      // ← credencial
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,     // ← credencial
        emailFormRef.current,                         // ← referencia al <form>
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY       // ← credencial
      );

      // ÉXITO → mismo comportamiento visual que tenías
      setIsSuccess(true);
      gsap.to('.form-container', {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          gsap.fromTo('.success-message',
            { opacity: 0, scale: 0.8, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' }
          );
        }
      });

      setTimeout(() => {
        setFormData({ name: '', email: '', message: '', service: '' });
        setIsSuccess(false);
        gsap.to('.form-container', { opacity: 1, y: 0, duration: 0.5 });
      }, 3000);

    } catch (err) {
      console.error('Error al enviar el formulario con EmailJS:', err);
      // Podés agregar un estado de error si querés mostrar mensaje al usuario
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFaq = (index) => {
    if (openFaq === index) {
      gsap.to(`.faq-answer-${index}`, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.out' });
      setOpenFaq(null);
    } else {
      if (openFaq !== null) {
        gsap.to(`.faq-answer-${openFaq}`, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.out' });
      }
      setOpenFaq(index);
      setTimeout(() => {
        gsap.fromTo(`.faq-answer-${index}`,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
      }, 100);
    }
  };

  return (
    <div className="contact-page">

      {/* WhatsApp flotante (sin cambios) */}
      <div className="whatsapp-floating" ref={whatsappFloatRef}>
        <a href="https://wa.me/2267405599" target="_blank" rel="noopener noreferrer" className="whatsapp-float-btn">
          <div className="whatsapp-pulse"></div>
          <svg className="whatsapp-thread" ref={whatsappThreadRef} width="70" height="70" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r="25" fill="none" stroke="#00F5D4" strokeWidth="1.5" strokeDasharray="157"/>
          </svg>
          <div className="whatsapp-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#00F5D4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
        </a>
      </div>

      {/* Hero (sin cambios) */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-container">
          <div className="hero-badge">→</div>
          <h1 className="hero-title">Hablemos de<br /><span className="hero-accent">tu proyecto</span></h1>
          <p className="hero-subtitle">
            Contanos qué necesitás y te respondemos en menos de 24 horas
          </p>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="main-section">
        <div className="content-grid">

          {/* FAQ (sin cambios) */}
          <div className="faq-section" ref={faqRef}>
            <div className="section-header">
              <h2 className="section-title accent-text">PREGUNTAS FRECUENTES</h2>
              <div className="title-underline"></div>
            </div>

            <div className="faq-list">
              {faqData.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button
                    className={`faq-question ${openFaq === index ? 'active' : ''}`}
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{index + 1}. {faq.question}</span>
                    <div className={`faq-icon ${openFaq === index ? 'rotated' : ''}`}>+</div>
                  </button>
                  <div className={`faq-answer faq-answer-${index}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario + Contacto */}
          <div className="form-contact-section">
            <div className="form-section" ref={formRef}>
              {!isSuccess ? (
                <div className="form-container">
                  <div className="form-header">
                    <h3>Contanos tu proyecto</h3>
                    <p>Te respondemos en menos de 24hs</p>
                  </div>
                  {/* ← AQUÍ AGREGAMOS EL REF */}
                  <form 
                    ref={emailFormRef}
                    className="contact-form" 
                    onSubmit={handleSubmit}
                  >
                    <div className="form-group">
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange}
                        placeholder="Nombre" 
                        className="form-input" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange}
                        placeholder="Email" 
                        className="form-input" 
                        required 
                      />
                      <div className="email-arrow">→</div>
                    </div>
                    <div className="form-group">
                      <select 
                        name="service" 
                        value={formData.service} 
                        onChange={handleInputChange}
                        className="form-input form-select" 
                        required
                      >
                        <option value="">¿Qué necesitás?</option>
                        <option value="presencial">Web presencial</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="webapp">Web app a medida</option>
                        <option value="ux">Diseño UX/UI</option>
                        <option value="soporte">Soporte / Mantenimiento</option>
                        <option value="consulta">Consulta general</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <textarea 
                        name="message" 
                        rows="4" 
                        value={formData.message} 
                        onChange={handleInputChange}
                        placeholder="Contanos sobre tu proyecto, objetivos y tiempos..."
                        className="form-input form-textarea" 
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="submit-btn" disabled={isLoading}>
                      <div className="submit-btn-bg"></div>
                      <span className="btn-content">
                        {isLoading ? (
                          <><span className="loading-spinner">⏳</span> Enviando...</>
                        ) : (
                          <>Enviar mensaje <span className="submit-arrow">→</span></>
                        )}
                      </span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h3>Mensaje enviado</h3>
                  <p>Te contactamos en menos de 24hs</p>
                </div>
              )}
            </div>

            <div className="contact-section" ref={contactInfoRef}>
              <h3 className="contact-title">Contacto directo</h3>
              <div className="contact-info">
                <p className="contact-address">Buenos Aires, Argentina</p>
                <a href="mailto:clyra.studiodigital@gmail.com" className="contact-email">clyra.studiodigital@gmail.com</a>
                <div className="contact-whatsapp">
                  <a href="https://wa.me/2267405599?text=Hola%20Clyra%2C%20me%20interesa%20hablar%20sobre%20mi%20proyecto"
                    target="_blank" rel="noopener noreferrer" className="whatsapp-contact-btn">
                    <span>Escribir por WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Redes (sin cambios) */}
      <section className="social-networks-section">
        <div className="container">
          <div className="social-networks">
            <h3 className="social-networks-title">Seguinos</h3>
            <div className="social-grid">
              <a href="https://instagram.com/clyrastudio__" className="social-item instagram">
                <span className="social-name">Instagram</span>
                <span className="social-username">@clyrastudio__</span>
              </a>

              <a href="https://github.com/janomaciell" className="social-item github">
                <span className="social-name">GitHub</span>
                <span className="social-username">janomaciell</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;