// components/navbar/Navbar.js
"use client";
import "./navbar.css";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Focus Fuel</h1>
        <div className="fire-animation">
          <span className="flame">🔥</span>
          <span className="sparkles">✨</span>
        </div>
      </div>
      <div className="nav-links">
        <Link 
          href="/" 
          className={`nav-link ${pathname === '/' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link 
          href="/schedule" 
          className={`nav-link ${pathname === '/schedule' ? 'active' : ''}`}
        >
          Schedule
        </Link>
        <Link 
          href="/about" 
          className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
        >
          About
        </Link>
      </div>
    </nav>
  );
}