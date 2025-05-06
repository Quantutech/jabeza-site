"use client"

import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from './AdditionalSections.module.css';

const AdditionalSections = () => {
  // Add an effect to ensure the AdditionalSections component appears correctly
  useEffect(() => {
    // Force a layout reflow to ensure proper rendering
    const nextSection = document.querySelector('.jabeza-next-section');
    if (nextSection) {
      nextSection.classList.add(styles.active);
    }
    
    // Add a class to the body to help with transitions
    document.body.classList.add('additional-sections-loaded');
    
    // Cleanup function
    return () => {
      document.body.classList.remove('additional-sections-loaded');
    };
  }, []);

  return (
    <div className="jabeza-next-section" style={{ marginTop: 0, paddingTop: 0 }}>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Services</h2>
          <p className={styles.sectionSubtitle}>
            From concept to completion, we handle every aspect of the filmmaking process
          </p>
          
          <div className={styles.cardsGrid}>
            {/* Service Card 1 */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>🎬</div>
              <h3 className={styles.cardTitle}>Film Production</h3>
              <p className={styles.cardDescription}>
                Full-service production from pre to post. We bring your vision to life with our experienced crew and cutting-edge equipment.
              </p>
              <Link href="/services/production" className={styles.cardLink}>
                Learn More
              </Link>
            </div>
            
            {/* Service Card 2 */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>✏️</div>
              <h3 className={styles.cardTitle}>Screenwriting</h3>
              <p className={styles.cardDescription}>
                Compelling stories that capture your audience&apos;s attention. Our writers craft narratives that engage and inspire.
              </p>
              <Link href="/services/screenwriting" className={styles.cardLink}>
                Learn More
              </Link>
            </div>
            
            {/* Service Card 3 */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>🎭</div>
              <h3 className={styles.cardTitle}>Talent Direction</h3>
              <p className={styles.cardDescription}>
                Bringing out the best performances. Our directors work closely with talent to deliver authentic and powerful moments.
              </p>
              <Link href="/services/direction" className={styles.cardLink}>
                Learn More
              </Link>
            </div>
            
            {/* Service Card 4 */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>🎨</div>
              <h3 className={styles.cardTitle}>Visual Effects</h3>
              <p className={styles.cardDescription}>
                Seamless integration of digital artistry. Our VFX team creates stunning visual elements that enhance your story.
              </p>
              <Link href="/services/vfx" className={styles.cardLink}>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Work Section */}
      <section className={styles.recentWorkSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Recent Projects</h2>
          <p className={styles.sectionSubtitle}>
            Explore our latest cinematic creations
          </p>
          
          <div className={styles.projectsGrid}>
            {/* Project 1 */}
            <div className={styles.projectCard}>
              <div className={styles.projectImage} style={{ backgroundColor: '#333' }}>
                {/* Placeholder for image */}
                <div className={styles.placeholderText}>Project Image</div>
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>The Silent Echo</h3>
                <p className={styles.projectDescription}>
                  A haunting exploration of memory and loss set against the backdrop of a remote coastal town.
                </p>
                <Link href="/projects/silent-echo" className={styles.projectLink}>
                  View Project
                </Link>
              </div>
            </div>
            
            {/* Project 2 */}
            <div className={styles.projectCard}>
              <div className={styles.projectImage} style={{ backgroundColor: '#333' }}>
                {/* Placeholder for image */}
                <div className={styles.placeholderText}>Project Image</div>
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>Neon Dreams</h3>
                <p className={styles.projectDescription}>
                  A vibrant music video that captures the energy and essence of nightlife in the city.
                </p>
                <Link href="/projects/neon-dreams" className={styles.projectLink}>
                  View Project
                </Link>
              </div>
            </div>
            
            {/* Project 3 */}
            <div className={styles.projectCard}>
              <div className={styles.projectImage} style={{ backgroundColor: '#333' }}>
                {/* Placeholder for image */}
                <div className={styles.placeholderText}>Project Image</div>
              </div>
              <div className={styles.projectInfo}>
                <h3 className={styles.projectTitle}>Beyond Horizon</h3>
                <p className={styles.projectDescription}>
                  A documentary following explorers as they journey through uncharted territories.
                </p>
                <Link href="/projects/beyond-horizon" className={styles.projectLink}>
                  View Project
                </Link>
              </div>
            </div>
          </div>
          
          <div className={styles.centeredCta}>
            <Link href="/portfolio" className={styles.primaryButton}>
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>What Our Clients Say</h2>
          <div className={styles.testimonials}>
            {/* Testimonial 1 */}
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialText}>
              &ldquo;Jabeza Films transformed our brand story into a visual masterpiece. Their attention to detail and creative vision exceeded our expectations.&rdquo;
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar} style={{ backgroundColor: '#e12727' }}></div>
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>Alex Johnson</h4>
                  <p className={styles.authorTitle}>Marketing Director, Imaginex</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialText}>
              &ldquo;Working with the team at Jabeza was a seamless experience from start to finish. They truly understood our vision and brought it to life.&rdquo;
              </div>
              <div className={styles.testimonialAuthor}>
                <div className={styles.authorAvatar} style={{ backgroundColor: '#e12727' }}></div>
                <div className={styles.authorInfo}>
                  <h4 className={styles.authorName}>Sarah Williams</h4>
                  <p className={styles.authorTitle}>Creative Director, Artisan Studios</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>Ready to Tell Your Story?</h2>
          <p className={styles.ctaDescription}>
            Let&apos;s create something extraordinary together. Reach out to us and start your journey with Jabeza Films.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.primaryButton}>
              Contact Us
            </Link>
            <Link href="/about" className={styles.secondaryButton}>
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerColumns}>
            <div className={styles.footerColumn}>
              <h3 className={styles.footerTitle}>Jabeza Films</h3>
              <p className={styles.footerDescription}>
                Storytelling with soul. We create cinematic experiences that resonate with audiences and leave lasting impressions.
              </p>
            </div>
            
            <div className={styles.footerColumn}>
              <h3 className={styles.footerTitle}>Navigation</h3>
              <ul className={styles.footerLinks}>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/services">Services</Link></li>
                <li><Link href="/portfolio">Portfolio</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerColumn}>
              <h3 className={styles.footerTitle}>Contact</h3>
              <ul className={styles.contactInfo}>
                <li>info@jabezafilms.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Creative Studio, Filmmakers Lane, Hollywood, CA 90028</li>
              </ul>
            </div>
          </div>
          
          <div className={styles.footerBottom}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Jabeza Films. All rights reserved.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Instagram</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Twitter</a>
              <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Vimeo</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdditionalSections;