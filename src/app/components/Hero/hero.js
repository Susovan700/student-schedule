"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import './hero.css';

export default function Hero() {
  const [isHovering, setIsHovering] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="hero-wrapper">
      <div className="hero-background" style={{ backgroundImage: "url('/backnew.jpg')" }}></div>
      
      <section className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Plan Your Study<br />Journey!</h1>
            <p className="hero-subtitle">
              Let our AI create the perfect schedule tailored just for you
              <span className="hero-emoji"> ✨</span>
            </p>
            <div className="hero-cta-container">
              <Link href="/schedule" className="hero-cta-button">
                Create My Schedule
                <span className="hero-button-icon"> 🚀</span>
              </Link>
              <div className="hero-scroll-prompt">
                <span><b>Select New</b></span>
                <div className="hero-scroll-arrow"><b>↑</b></div>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div 
              className={`hero-cute-character ${isHovering ? 'hover' : ''} ${isMounted ? 'mounted' : ''}`}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {isHovering && (
                <>
                  <div className="sparkle"></div>
                  <div className="blush left"></div>
                  <div className="blush right"></div>
                </>
              )}
            </div>
            <div className="hero-book-stack"></div>
            <div className="hero-stars"></div>
          </div>
        </div>
      </section>
    </div>
  );
}