import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollingText from '../components/ScrollingText'
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
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: filtersRef.current,
          start: "top 90%"
        }
      }
    )
  }, [])

  useEffect(() => {
    const items = gsap.utils.toArray('.portfolio-item')

    items.forEach((item, index) => {
      gsap.fromTo(item,
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
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
      title: "Clínica Integral Norte",
      category: "presencial",
      image: "https://via.placeholder.com/600x400/0a0a0a/00F5D4?text=01",
      description: "Web presencial con sistema de turnos online y formulario de contacto.",
      client: "Medicina privada — GBA",
      metric: "+180% Consultas"
    },
    {
      id: 2,
      title: "Muebles Artesanos",
      category: "ecommerce",
      image: "https://via.placeholder.com/600x400/111111/F2F2F0?text=02",
      description: "Catálogo digital con carrito y pago integrado vía MercadoPago.",
      client: "Pyme — CABA",
      metric: "+320% Ventas online"
    },
    {
      id: 3,
      title: "Estudio Jurídico Paz",
      category: "presencial",
      image: "https://via.placeholder.com/600x400/0a0a0a/00F5D4?text=03",
      description: "Sitio institucional con secciones de especialidades y contacto directo.",
      client: "Estudio legal — Córdoba",
      metric: "+90% Leads"
    },
    {
      id: 4,
      title: "Academia Fitness BA",
      category: "webapp",
      image: "https://via.placeholder.com/600x400/111111/F2F2F0?text=04",
      description: "Plataforma con gestión de turnos, membresías y panel de administración.",
      client: "Fitness — Palermo",
      metric: "500+ usuarios activos"
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
      opacity: 0,
      duration: 0.3,
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
          <p className="page-subtitle">Trabajo seleccionado con resultados reales</p>
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
                      <div className="project-metric">{project.metric}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>

            <div className="modal-header">
              <span className="modal-number">0{selectedProject.id}</span>
              <h2>{selectedProject.title}</h2>
              <p className="modal-client">{selectedProject.client}</p>
            </div>

            <div className="modal-image">
              <img src={selectedProject.image} alt={selectedProject.title} />
            </div>

            <div className="modal-info">
              <p>{selectedProject.description}</p>
              <div className="modal-metric">
                <span>Resultado</span>
                <strong>{selectedProject.metric}</strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Portfolio