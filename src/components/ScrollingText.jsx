import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './ScrollingText.css'

const ScrollingText = ({ text = "Clyra Studio", className = "" }) => {
  const scrollRef = useRef(null)

  useEffect(() => {
    const element = scrollRef.current
    if (element) {
      gsap.to(element, {
        x: "-100%",
        duration: 110,
        ease: "none",
        repeat: -1
      })
    }
  }, [])

  return (
    <div className={`scrolling-container ${className}`}>
      <div ref={scrollRef} className="scrolling-text">
        {Array(10).fill(text).map((item, index) => (
          <span key={index} className="text-item">
            {item}
            <span className="text-separator">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default ScrollingText