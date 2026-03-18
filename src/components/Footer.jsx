import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Footer.css'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const footerRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(footerRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none'
        }
      }
    )
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer ref={footerRef} className="footer">

      {/* CTA principal */}
      <div className="footer-cta">
        <div className="footer-container">
          <div className="cta-content">
            <h2 className="cta-title">
              ¿Listo para<br />
              <span className="cta-accent">arrancar?</span>
            </h2>
            <Link to="/contact" className="cta-btn">
              Hablemos <span className="cta-arrow">→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Separador */}
      <div className="footer-divider"></div>

      {/* Cuerpo del footer */}
      <div className="footer-body">
        <div className="footer-container">
          <div className="footer-grid">

            {/* Marca */}
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="footer-logo-clyra">Clyra</span>
                <span className="footer-logo-dot">.</span>
              </div>
              <p className="footer-tagline">
                Presencia digital que convierte.
              </p>
              <p className="footer-location">
                Buenos Aires, Argentina
              </p>
            </div>

            {/* Navegación */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Páginas</h4>
              <nav className="footer-nav">
                <Link to="/">Home</Link>
                <Link to="/services">Servicios</Link>
                <Link to="/portfolio">Trabajos</Link>
                <Link to="/about">Nosotros</Link>
                <Link to="/contact">Contacto</Link>
              </nav>
            </div>

            {/* Servicios */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Servicios</h4>
              <nav className="footer-nav">
                <span>Web presencial</span>
                <span>E-commerce</span>
                <span>Web apps</span>
                <span>UX / Diseño</span>
                <span>Soporte</span>
              </nav>
            </div>

            {/* Contacto */}
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Contacto</h4>
              <nav className="footer-nav">
                <a href="mailto:hola@clyra.studio">hola@clyra.studio</a>
                <a
                  href="https://wa.me/2267405599"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
                <a
                  href="https://instagram.com/clyra.studio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                <a
                  href="https://linkedin.com/company/clyra"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </nav>
            </div>

          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <div className="footer-container">
          <div className="footer-bottom-inner">
            <p className="footer-copy">
              © {currentYear} Clyra Studio. Todos los derechos reservados.
            </p>
            <p className="footer-made">
              Hecho con <span className="footer-accent">React + Django</span> · Argentina
            </p>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer