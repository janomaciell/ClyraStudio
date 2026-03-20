import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollingText from '../components/ScrollingText'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

const Home = () => {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const heroTaglineRef = useRef(null)
  const approachItemsRef = useRef([])
  const clientCardsRef = useRef([])
  const decorativeElementsRef = useRef([])

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.fromTo(heroTaglineRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    )
    .fromTo(titleRef.current.children,
      { opacity: 0, y: 100, rotationX: 90 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "back.out(1.7)"
      },
      "-=0.3"
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" },
      "-=0.8"
    )

    decorativeElementsRef.current.forEach((element, index) => {
      if (element) {
        gsap.set(element, { opacity: 0, scale: 0 })
        gsap.to(element, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay: 1.5 + (index * 0.1),
          ease: "back.out(1.7)"
        })
        gsap.to(element, {
          y: -20,
          duration: 2 + (index * 0.5),
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        })
      }
    })

    gsap.utils.toArray('.section').forEach((section) => {
      gsap.fromTo(section,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    approachItemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(item,
          { opacity: 0, y: 100, rotationY: 45, scale: 0.8 },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: ".approach-grid",
              start: "top 70%",
              toggleActions: "play none none reverse"
            }
          }
        )

        item.addEventListener('mouseenter', () => {
          gsap.to(item, { y: -15, rotationY: 5, scale: 1.05, duration: 0.4, ease: "power2.out" })
        })
        item.addEventListener('mouseleave', () => {
          gsap.to(item, { y: 0, rotationY: 0, scale: 1, duration: 0.4, ease: "power2.out" })
        })
      }
    })

    clientCardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: ".clients-mosaic",
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  const clientProjects = [
    {
      title: "Encuentrame QR",
      category: "PRODUCTO PROPIO",
      subcategories: ["WEB APP", "GEOLOCALIZACIÓN"],
      color: "#00F5D4",
      image: "/encuentrame.png"
    },
    {
      title: "Bob's Café",
      category: "GASTRONOMÍA",
      subcategories: ["WEB PRESENCIAL", "DISEÑO"],
      color: "#ffffff",
      image: "/bobs-cafe.png"
    },
    {
      title: "VIRA Constructora",
      category: "INMOBILIARIA",
      subcategories: ["WEB PRESENCIAL", "CATÁLOGO"],
      color: "#00F5D4",
      image: "/viraconstructora.png"
    },
    {
      title: "Tejiendo con Andy",
      category: "E-COMMERCE",
      subcategories: ["CURSOS ONLINE", "MERCADOPAGO"],
      color: "#ffffff",
      image: "/tejiendoconandy.jpeg"
    },
    {
      title: "Cursos de Pilates",
      category: "E-COMMERCE",
      subcategories: ["SUSCRIPCIONES", "MERCADOPAGO"],
      color: "#00F5D4",
      image: "/og-image.png"
    },
    {
      title: "Criptomix",
      category: "FINTECH",
      subcategories: ["BLOCKCHAIN", "TRADING"],
      color: "#ffffff",
      image: "/criptomix.png"
    }
  ]

  return (
    <div className="home modern-home">

      {/* Hero */}
      <section ref={heroRef} className="hero modern-hero">
        <div className="hero-content">
          <p ref={heroTaglineRef} className="hero-tagline">
            DISEÑO · DESARROLLO · RESULTADOS
          </p>

          <h1 ref={titleRef} className="hero-title modern-title">
            <span className="title-clyra">Clyra</span>
            <span className="title-studio">Studio</span>
          </h1>

          <p ref={subtitleRef} className="hero-subtitle modern-subtitle">
            Presencia digital que <span className="highlight">convierte</span>
          </p>

          <div className="decorative-elements">
            <div ref={el => decorativeElementsRef.current[0] = el} className="floating-element element-1">
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="25" fill="none" stroke="#00F5D4" strokeWidth="1.5"/>
              </svg>
            </div>
            <div ref={el => decorativeElementsRef.current[1] = el} className="floating-element element-2">
              <svg width="40" height="40" viewBox="0 0 40 40">
                <rect x="10" y="10" width="20" height="20" fill="none" stroke="#ffffff" strokeWidth="1.5" transform="rotate(45 20 20)"/>
              </svg>
            </div>
            <div ref={el => decorativeElementsRef.current[2] = el} className="floating-element element-3">
              <div className="accent-dot"></div>
            </div>
          </div>
        </div>
      </section>

      <ScrollingText />

      {/* Nuestro Enfoque */}
      <section className="section approach modern-approach">
        <div className="container">
          <div className="approach-header">
            <h2 className="section-title modern-section-title">
              Nuestro enfoque
            </h2>
            <p className="approach-description">
              Diseñamos y desarrollamos experiencias digitales a medida,
              con código limpio y resultados medibles para tu negocio.
            </p>
          </div>

          <div className="approach-grid modern-grid">
            <div className="approach-item modern-card" ref={el => approachItemsRef.current[0] = el}>
              <div className="card-number">01</div>
              <h3>Estrategia</h3>
              <div className="card-line"></div>
              <p>Analizamos tu negocio y tu competencia antes de escribir una sola línea de código. Cada decisión tiene un porqué.</p>
            </div>

            <div className="approach-item modern-card" ref={el => approachItemsRef.current[1] = el}>
              <div className="card-number">02</div>
              <h3>Desarrollo</h3>
              <div className="card-line"></div>
              <p>Stack moderno, React + Django, desplegado en la nube. Rápido, seguro y escalable desde el día uno.</p>
            </div>

            <div className="approach-item modern-card" ref={el => approachItemsRef.current[2] = el}>
              <div className="card-number">03</div>
              <h3>Resultados</h3>
              <div className="card-line"></div>
              <p>Entregamos en 7 a 14 días. Soporte post-lanzamiento incluido. Tu web trabaja mientras vos dormís.</p>
            </div>
          </div>
        </div>
      </section>

      <ScrollingText />

      {/* Proyectos */}
      <section className="section clients modern-clients">
        <div className="container">
          <div className="clients-header">
            <h2 className="section-title modern-section-title">
              Proyectos
              <svg className="title-underline" viewBox="0 0 100 20">
                <path d="M0,10 Q50,0 100,10" stroke="#00F5D4" strokeWidth="2" fill="none"/>
              </svg>
            </h2>
            <p className="clients-subtitle">Lo que construimos para nuestros clientes</p>
          </div>

          <div className="clients-mosaic">
            {clientProjects.map((project, index) => (
              <div
                key={index}
                className="client-card"
                ref={el => clientCardsRef.current[index] = el}
                style={{ '--card-color': project.color }}
              >
                <div className="card-tags">
                  <span className="main-tag">{project.category}</span>
                  {project.subcategories.map((sub, subIndex) => (
                    <span key={subIndex} className="sub-tag">{sub}</span>
                  ))}
                </div>
                <div className="card-image">
                  <img src={project.image} alt={project.title} />
                </div>
                <h3 className="card-title">{project.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="section mission modern-mission">
        <div className="container">
          <div className="mission-vision-wrapper">

            <div className="mission-content">
              <div className="mission-text-block">
                <h2 className="section-title modern-section-title">
                  Qué hacemos
                </h2>
                <div className="large-text">
                  Transformamos negocios reales en <span className="highlight">presencias digitales que generan clientes</span>, no solo visitas.
                </div>
                <p className="regular-text">
                  Somos un estudio boutique de desarrollo web con base en Argentina. Trabajamos con pymes, profesionales independientes y negocios de e-commerce que necesitan resultados concretos, no promesas de agencia.
                </p>
              </div>
            </div>

            <div className="vision-content">
              <div className="vision-text-block">
                <h2 className="section-title modern-section-title">
                  A dónde vamos
                </h2>
                <div className="large-text">
                  Ser el estudio de referencia para negocios argentinos que quieren <span className="highlight">competir en serio en el mundo digital</span>.
                </div>
                <p className="regular-text">
                  Cada proyecto que entregamos es una vitrina de lo que es posible cuando el diseño y el código trabajan juntos con un objetivo claro: hacer crecer tu negocio.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

export default Home