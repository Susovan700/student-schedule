// components/navbar/Navbar.js
"use client";
import "./navbar.css";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1 className="hi">StudyForge</h1>
          <div className="fire-animation">
            <span className="flame">🔥</span>
            <span className="sparkle">✨</span>
            <span className="sparkle">✨</span>
          </div>
        </div>
        
        <div className="nav-links">
          <Link 
            href="/" 
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
            <span className="nav-text">Home</span>
            <span className="nav-icon">🏠</span>
          </Link>
          <Link 
            href="/schedule" 
            className={`nav-link ${pathname === '/schedule' ? 'active' : ''}`}
          >
            <span className="nav-text">Schedule</span>
            <span className="nav-icon">📅</span>
          </Link>
          <Link 
            href="/about" 
            className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
          >
            <span className="nav-text">About</span>
            <span className="nav-icon">ℹ️</span>
          </Link>
        </div>
        <div className="nav-highlight"></div>
      </div>
    </nav>
  );
}