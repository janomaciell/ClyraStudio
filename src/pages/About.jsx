import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const teamRef = useRef(null)
  const heroRef = useRef(null)
  const valuesRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(heroRef.current.querySelector('.hero-title'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3 }
    )
    gsap.fromTo(heroRef.current.querySelector('.hero-subtitle'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.6 }
    )

    gsap.utils.toArray('.member-image').forEach((image) => {
      const tl = gsap.timeline({ repeat: -1, yoyo: true })
      tl.to(image, { scale: 1.02, duration: 3, ease: "power1.inOut" })
    })

    gsap.utils.toArray('.floating-element').forEach((element) => {
      gsap.to(element, {
        y: "+=15", rotation: "+=3", duration: 4,
        ease: "power1.inOut", yoyo: true, repeat: -1
      })
    })

    gsap.utils.toArray('.value-item').forEach((item, index) => {
      gsap.to(item, {
        y: (index % 2 === 0 ? -10 : 10), duration: 5,
        ease: "power1.inOut", yoyo: true, repeat: -1, delay: index * 0.5
      })
    })
  }, [])

  // Jano (Programación) y Felix (Ventas & Prototipos)
  const teamMembers = [
    {
      name: "Jano Maciel",
      role: "Founder & Developer",
      description: "Programador experto en el rubro, especializado en el desarrollo de sistemas completos y páginas web de alto rendimiento.",
      image: "/janomaciel.png"
    },
    {
      name: "Felix Arrambide",
      role: "Seller & Prototipos",
      description: "Encargado de la atención al cliente, presupuestación y el armado de prototipos iniciales. El puente entre lo que necesitás y lo que el estudio construye.",
      image: "/felix.png"
    }
  ]
  const values = [
    {
      title: "ENTREGA",
      subtitle: "sin vueltas",
      description: "De 8 a 45 días según la complejidad del proyecto. Plazo acordado antes de arrancar, sin excusas ni demoras indefinidas."
    },
    {
      title: "TRANSPARENCIA",
      subtitle: "total",
      description: "Precio claro desde el inicio. Sin costos ocultos, sin sorpresas al final del proyecto."
    },
    {
      title: "CÓDIGO",
      subtitle: "limpio",
      description: "Proyectos mantenibles, documentados y escalables. Tu web no va a quedar atada a una persona."
    },
    {
      title: "RESULTADOS",
      subtitle: "medibles",
      description: "No entregamos webs bonitas que no convierten. Cada decisión de diseño tiene un objetivo."
    }
  ]

  return (
    <div className="about-page">

      {/* Hero */}
      <section className="about-hero" ref={heroRef}>
        <div className="hero-background">
          <div className="floating-element star-1">✦</div>
          <div className="floating-element star-2">✧</div>
          <div className="floating-element circle-1"></div>
          <div className="floating-element circle-2"></div>
        </div>
        <div className="container">
          <h1 className="hero-title">
            <span className="white-text">QUIÉNES</span><br />
            <span className="accent-text">SOMOS</span>
          </h1>
          <p className="hero-subtitle">
            Un estudio boutique de desarrollo web con base en Argentina
          </p>
        </div>
      </section>

      {/* Equipo */}
      <section className="team-section">
        <div className="container">
          <div className="team-grid" ref={teamRef}>
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <span className="member-role">{member.role}</span>
                  <h3 className="member-name">{member.name}</h3>
                  <p className="member-description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="values-section" ref={valuesRef}>
        <div className="container">
          <div className="values-header">
            <h2 className="values-main-title">NUESTROS</h2>
            <h3 className="values-sub-title">principios</h3>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-item">
                <h4 className="value-title">{value.title}</h4>
                <span className="value-subtitle">{value.subtitle}</span>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default About