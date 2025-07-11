"use client";
import "./about.css";
import Navbar from "../components/navbar/navbar";
import { useRouter } from 'next/navigation';

export default function About() {
    const router = useRouter();

    const handleGetStarted = () => {
        router.push('/schedule');
    };

    return (
        <div className="page-wrapper">
            <div 
                className="page-background" 
                style={{ backgroundImage: "url('/back.jpg')" }}
            ></div>
            
            <div className="page-container">
                <Navbar currentPage="about" />
                
                <div className="about-container">
                    <header className="about-header">
                        <div className="about-content">
                            <h1 className="about-title">📚 Focus Fuel</h1>
                            <p className="about-subtitle">Your Personal Study Success Companion</p>
                            <div className="about-decoration">✨ 📖 ✨</div>
                        </div>
                    </header>

                    <section className="mission-section">
                        <div className="section-card">
                            <h2>🎯 Our Mission</h2>
                            <p>
                                We believe every student deserves a personalized study plan that works for them. 
                                Our Study Schedule Wizard transforms the overwhelming task of exam preparation 
                                into an organized, manageable, and stress-free journey to academic success.
                            </p>
                        </div>
                    </section>

                    <section className="features-section">
                        <h2>✨ What Makes Us Special</h2>
                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-icon">🧠</div>
                                <h3>Smart Planning</h3>
                                <p>Our intelligent algorithm considers your subject difficulty preferences and available time to create the perfect study schedule.</p>
                            </div>
                            
                            <div className="feature-card">
                                <div className="feature-icon">📅</div>
                                <h3>Flexible Scheduling</h3>
                                <p>Whether it's school exams, competitive tests, or college preparations - we adapt to your specific exam type and timeline.</p>
                            </div>
                            
                            <div className="feature-card">
                                <div className="feature-icon">🎨</div>
                                <h3>Beautiful Interface</h3>
                                <p>Study planning shouldn't be boring! Our colorful, intuitive design makes organizing your studies actually enjoyable.</p>
                            </div>
                            
                            <div className="feature-card">
                                <div className="feature-icon">📊</div>
                                <h3>Difficulty-Based</h3>
                                <p>Rate your subjects by difficulty and let us allocate more time to challenging topics while keeping easier ones fresh.</p>
                            </div>
                        </div>
                    </section>

                    <section className="how-it-works-section">
                        <div className="section-card">
                            <h2>🚀 How It Works</h2>
                            <div className="steps-container">
                                <div className="step">
                                    <div className="step-number">1</div>
                                    <div className="step-content">
                                        <h4>Tell Us About You</h4>
                                        <p>Share your name, exam type, and study timeline</p>
                                    </div>
                                </div>
                                
                                <div className="step">
                                    <div className="step-number">2</div>
                                    <div className="step-content">
                                        <h4>Add Your Subjects</h4>
                                        <p>List all your subjects and rate their difficulty level</p>
                                    </div>
                                </div>
                                
                                <div className="step">
                                    <div className="step-number">3</div>
                                    <div className="step-content">
                                        <h4>Get Your Schedule</h4>
                                        <p>Receive a personalized study plan optimized for your success</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="stats-section">
                        <h2>📈 Why Students Love Us</h2>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-number">95%</div>
                                <div className="stat-label">Success Rate</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">10k+</div>
                                <div className="stat-label">Happy Students</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">22+</div>
                                <div className="stat-label">Subject Areas</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-number">4.9⭐</div>
                                <div className="stat-label">User Rating</div>
                            </div>
                        </div>
                    </section>

                    <section className="testimonial-section">
                        <div className="section-card">
                            <h2>💬 What Students Say</h2>
                            <div className="testimonials">
                                <blockquote className="testimonial">
                                    <p>"This app completely changed how I approach studying. I went from feeling overwhelmed to confident about my exams!"</p>
                                    <cite>- Sarah, High School Student</cite>
                                </blockquote>
                                
                                <blockquote className="testimonial">
                                    <p>"The difficulty-based scheduling is genius. I finally have enough time for my challenging subjects!"</p>
                                    <cite>- Mike, College Student</cite>
                                </blockquote>
                            </div>
                        </div>
                    </section>

                    <section className="cta-section">
                        <div className="cta-card">
                            <h2>Ready to Transform Your Study Routine?</h2>
                            <p>Join thousands of successful students who've already discovered the power of smart scheduling!</p>
                            <button className="cta-button" onClick={handleGetStarted}>
                                Start Creating Your Schedule ✨
                            </button>
                        </div>
                    </section>

                    <footer className="about-footer">
                        <p>Made with ❤️ for students who want to succeed</p>
                        <div className="footer-links">
                            <span>Study Smart • Study Better • Succeed More</span>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    );
}