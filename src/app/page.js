// app/page.js
import "./page.css";
import Navbar from "./components/navbar/navbar";
import Hero from "./components/Hero/hero";

export default function hello() {
  return (
    <div className="student-app">
      <Navbar />
      <main className="main-content">
        <Hero />
      </main>
    </div>
  );
}