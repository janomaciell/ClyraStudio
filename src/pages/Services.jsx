import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import ScrollingText from '../components/ScrollingText'
import './Services.css'

gsap.registerPlugin(ScrollTrigger, TextPlugin)

const Services = () => {
  const heroRef = useRef(null)
  const servicesRef = useRef(null)
  const processRef = useRef(null)
  const blurTextRefs = useRef([])
  const lineRefs = useRef([])

  useEffect(() => {
    const tl = gsap.timeline()

    tl.from('.hero-main-text', {
      duration: 1.5,
      y: 100,
      ease: "power3.out"
    })
    .from('.hero-sub-text', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: "power2.out"
    }, "-=0.8")

    blurTextRefs.current.forEach((el, index) => {
      if (el) {
        gsap.fromTo(el,
          { filter: 'blur(20px)', opacity: 0, scale: 1.2 },
          {
            filter: 'blur(0px)',
            opacity: 1,
            scale: 1,
            duration: 1.2,
            delay: index * 0.3,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 50%",
              end: "bottom 25%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    })

    lineRefs.current.forEach((line, index) => {
      if (line) {
        gsap.fromTo(line,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: line,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    })

    gsap.utils.toArray('.service-minimal').forEach((card, index) => {
      gsap.fromTo(card,
        { y: 100, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )

      card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.service-number'), { scale: 1.2, rotation: 5, duration: 0.3 })
        gsap.to(card.querySelector('.service-line'), { scaleX: 0.5, duration: 0.3 })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.service-number'), { scale: 1, rotation: 0, duration: 0.3 })
        gsap.to(card.querySelector('.service-line'), { scaleX: 1, duration: 0.3 })
      })
    })

    gsap.utils.toArray('.process-item').forEach((item, index) => {
      const morphText = item.querySelector('.morph-text')

      gsap.fromTo(item,
        { x: index % 2 === 0 ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )

      if (morphText) {
        ScrollTrigger.create({
          trigger: morphText,
          start: "top 80%",
          onEnter: () => {
            gsap.to(morphText, {
              duration: 0.8,
              text: morphText.dataset.text,
              ease: "none"
            })
          }
        })
      }
    })

    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  const services = [
    {
      number: "01",
      title: "Web",
      subtitle: "Presencial",
      description: "Sitios que posicionan tu negocio y generan contactos desde el día uno.",
      detail: "Para médicos, abogados y pymes"
    },
    {
      number: "02",
      title: "E-commerce",
      subtitle: "& Catálogo",
      description: "Tiendas online optimizadas para convertir visitas en ventas reales.",
      detail: "Integración con MercadoPago"
    },
    {
      number: "03",
      title: "Web",
      subtitle: "Apps",
      description: "Plataformas a medida con panel de administración y lógica propia.",
      detail: "React + Django REST"
    },
    {
      number: "04",
      title: "UX",
      subtitle: "& Diseño",
      description: "Interfaces que se sienten modernas y guían al usuario hacia la acción.",
      detail: "Diseño sin templates"
    },
    {
      number: "05",
      title: "Deploy",
      subtitle: "& Hosting",
      description: "Configuración completa en la nube: Vercel, Render y Supabase.",
      detail: "Rápido, seguro, escalable"
    },
    {
      number: "06",
      title: "Soporte",
      subtitle: "Post-launch",
      description: "Acompañamiento después de la entrega para que nada falle en producción.",
      detail: "Respuesta en 24hs"
    }
  ]

  const processSteps = [
    { title: "Descubrir", morph: "ANÁLISIS DEL NEGOCIO" },
    { title: "Diseñar", morph: "UI/UX A MEDIDA" },
    { title: "Desarrollar", morph: "CÓDIGO LIMPIO" },
    { title: "Lanzar", morph: "ENTREGA EN 7-14 DÍAS" }
  ]

  return (
    <div className="services-page">
      <div className="services-hero" ref={heroRef}>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-main-text">
              Desarrollamos
              <span className="hero-accent">Lo que tu negocio necesita</span>
            </h1>
            <p className="hero-sub-text">
              Stack moderno, diseño cuidado y entrega rápida — sin burocracia de agencia
            </p>
          </div>

          <div className="floating-texts">
            <span className="blur-text blur-text-1" ref={el => blurTextRefs.current[0] = el}>React</span>
            <span className="blur-text blur-text-2" ref={el => blurTextRefs.current[1] = el}>Django</span>
            <span className="blur-text blur-text-3" ref={el => blurTextRefs.current[2] = el}>Diseño</span>
          </div>
        </div>
      </div>

      <section className="services-minimal-section">
        <div className="container">
          <div className="section-line" ref={el => lineRefs.current[0] = el}></div>

          <div className="services-minimal-grid" ref={servicesRef}>
            {services.map((service, index) => (
              <div key={index} className="service-minimal">
                <div className="service-header">
                  <span className="service-number">{service.number}</span>
                  <div className="service-line" ref={el => lineRefs.current[index + 1] = el}></div>
                </div>

                <div className="service-content">
                  <h3 className="service-title-main">{service.title}</h3>
                  <h4 className="service-title-sub">{service.subtitle}</h4>
                  <p className="service-desc">{service.description}</p>
                  <span className="service-detail">{service.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="typography-section">
        <div className="container">
          <h2 className="large-text" ref={el => blurTextRefs.current[3] = el}>
            Código real.
          </h2>
          <h3 className="medium-text" ref={el => blurTextRefs.current[4] = el}>
            Resultados medibles.
          </h3>
        </div>
      </section>

      <section className="process-minimal-section" ref={processRef}>
        <div className="container">
          <div className="section-line" ref={el => lineRefs.current[7] = el}></div>

          <h2 className="process-title" ref={el => blurTextRefs.current[5] = el}>
            Cómo trabajamos
          </h2>

          <div className="process-minimal-grid">
            {processSteps.map((step, index) => (
              <div key={index} className="process-item">
                <span className="process-number">0{index + 1}</span>
                <h4 className="process-step-title">{step.title}</h4>
                <p className="morph-text" data-text={step.morph}>
                  {step.title.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ScrollingText text="DISEÑO · DESARROLLO · DEPLOY · SOPORTE · CLYRA STUDIO · ARGENTINA" />
    </div>
  )
}

export default Services