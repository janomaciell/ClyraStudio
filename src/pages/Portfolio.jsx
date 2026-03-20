import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Portfolio.css'

gsap.registerPlugin(ScrollTrigger)

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('todos')
  const portfolioRef = useRef(null)
  const heroRef = useRef(null)
  const filtersRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(heroRef.current.querySelector('.page-title'),
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(heroRef.current.querySelector('.page-subtitle'),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, "-=0.6"
    )

    gsap.fromTo(filtersRef.current.children,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out",
        scrollTrigger: { trigger: filtersRef.current, start: "top 90%" }
      }
    )
  }, [])

  useEffect(() => {
    const items = gsap.utils.toArray('.portfolio-item')

    items.forEach((item) => {
      gsap.fromTo(item,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%", end: "bottom 15%", toggleActions: "play none none reverse" }
        }
      )

      const overlay = item.querySelector('.portfolio-overlay')
      const image = item.querySelector('.portfolio-image img')
      const details = item.querySelector('.project-details')

      item.addEventListener('mouseenter', () => {
        gsap.to(image, { scale: 1.05, duration: 0.6, ease: "power2.out" })
        gsap.to(overlay, { opacity: 1, duration: 0.4 })
        gsap.to(details, { y: 0, opacity: 1, duration: 0.4, delay: 0.1 })
      })
      item.addEventListener('mouseleave', () => {
        gsap.to(image, { scale: 1, duration: 0.6, ease: "power2.out" })
        gsap.to(overlay, { opacity: 0, duration: 0.4 })
        gsap.to(details, { y: 20, opacity: 0, duration: 0.3 })
      })
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [filter])

  const projects = [
    {
      id: 1,
      title: "Encuentrame QR",
      category: "webapp",
      url: "https://www.encuentrameqr.com/",
      image: "/encuentrame.png",
      description: "Plataforma de identificación de mascotas con QR, geolocalización en tiempo real, generación automática de posters y sistema de alertas a usuarios en un radio de 3 km.",
      client: "Producto propio — Argentina",
      tags: ["React", "Django", "Geolocalización", "QR"],
      metric: "Alertas por proximidad (3 km)"
    },
    {
      id: 2,
      title: "Bob's Café",
      category: "presencial",
      url: "https://bobs-cafe-pinamar.vercel.app/",
      image: "/bobs-cafe.png",
      description: "Web presencial para cafetería artesanal en Pinamar. Diseño visual de alta fidelidad con galería del local, ubicación y menú digital.",
      client: "Gastronomía — Pinamar, BA",
      tags: ["React", "Vite", "GSAP", "Diseño"],
      metric: "Presencia digital completa"
    },
    {
      id: 3,
      title: "VIRA Constructora",
      category: "presencial",
      url: "https://www.viraconstructora.com/",
      image: "/viraconstructora.png",
      description: "Plataforma inmobiliaria para constructora en Pinamar. Catálogo de propiedades, fichas técnicas por proyecto y contacto directo con el equipo.",
      client: "Real estate — Pinamar, BA",
      tags: ["React", "Django", "Inmobiliaria"],
      metric: "+4 años de proyectos exhibidos"
    },
    {
      id: 4,
      title: "Tejiendo con Andy",
      category: "ecommerce",
      url: "https://www.tejiendoconandy.com/",
      image: "/tejiendoconandy.jpeg",
      description: "Plataforma de venta de cursos de amigurumi y crochet. Pasarela de pago con MercadoPago, gestión de alumnos, base de datos relacional y animaciones GSAP.",
      client: "E-learning — Argentina",
      tags: ["React", "Django", "MercadoPago", "GSAP"],
      metric: "Pasarela de pago integrada"
    },
    {
      id: 5,
      title: "Cursos de Pilates",
      category: "ecommerce",
      url: "https://clyra-studio.vercel.app/",
      image: "/og-image.png",
      description: "Plataforma de venta de cursos de pilates online. Sistema de suscripciones, pasarela de pago con MercadoPago, base de datos compleja y frontend animado con GSAP.",
      client: "E-learning — Argentina",
      tags: ["React", "Django", "MercadoPago", "GSAP"],
      metric: "Sistema de suscripciones"
    },
    {
      id: 6,
      title: "Criptomix",
      category: "webapp",
      url: "https://criptomix.com/",
      image: "/criptomix.png",
      description: "Plataforma fintech de trading automatizado de criptomonedas. Bot inteligente, gestión de carteras y 4 pasarelas de pago: PayPal, Stripe, MercadoPago y wallets crypto.",
      client: "Fintech — Argentina",
      tags: ["React", "Django", "Blockchain", "Stripe", "MercadoPago"],
      metric: "4 pasarelas de pago integradas"
    }
  ]

  const categories = [
    { key: 'todos', label: 'Todos' },
    { key: 'presencial', label: 'Web presencial' },
    { key: 'ecommerce', label: 'E-commerce' },
    { key: 'webapp', label: 'Web app' }
  ]

  const filteredProjects = filter === 'todos'
    ? projects
    : projects.filter(project => project.category === filter)

  const openModal = (project) => {
    setSelectedProject(project)
    document.body.style.overflow = 'hidden'
    gsap.fromTo('.modal-overlay', { opacity: 0 }, { opacity: 1, duration: 0.3 })
    gsap.fromTo('.modal-content', { scale: 0.8, y: 50 }, { scale: 1, y: 0, duration: 0.5, ease: "power3.out", delay: 0.1 })
  }

  const closeModal = () => {
    gsap.to('.modal-overlay', {
      opacity: 0, duration: 0.3,
      onComplete: () => {
        setSelectedProject(null)
        document.body.style.overflow = 'auto'
      }
    })
  }

  return (
    <div className="portfolio-page">

      <div className="portfolio-hero" ref={heroRef}>
        <div className="container">
          <h1 className="page-title">Proyectos</h1>
          <p className="page-subtitle">Trabajo real con resultados medibles</p>
        </div>
      </div>

      <section className="portfolio-section">
        <div className="container">

          <div className="portfolio-filters" ref={filtersRef}>
            {categories.map(category => (
              <button
                key={category.key}
                className={`filter-btn ${filter === category.key ? 'active' : ''}`}
                onClick={() => setFilter(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="portfolio-grid" ref={portfolioRef}>
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="portfolio-item"
                onClick={() => openModal(project)}
              >
                <div className="portfolio-image">
                  <img src={project.image} alt={project.title} />
                  <div className="portfolio-overlay">
                    <div className="project-details">
                      <span className="project-number">0{project.id}</span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="project-tags">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="project-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>

            <div className="modal-left">
              <span className="modal-number">0{selectedProject.id}</span>
              <h2>{selectedProject.title}</h2>
              <p className="modal-client">{selectedProject.client}</p>

              <div className="modal-tags">
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} className="modal-tag">{tag}</span>
                ))}
              </div>

              <div className="modal-metric-block">
                <span className="modal-metric-label">Destacado</span>
                <strong className="modal-metric-value">{selectedProject.metric}</strong>
              </div>

              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-visit-btn"
                onClick={(e) => e.stopPropagation()}
              >
                Ver proyecto <span>→</span>
              </a>
            </div>

            <div className="modal-right">
              <div className="modal-image">
                <img src={selectedProject.image} alt={selectedProject.title} />
              </div>
              <p className="modal-description">{selectedProject.description}</p>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default Portfolio