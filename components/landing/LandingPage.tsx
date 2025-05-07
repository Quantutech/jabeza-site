"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './LandingPage.module.css';
import YouTube from 'react-youtube';

// Helper function to check if element is in viewport

export default function LandingPage() {
  // State for YouTube player
  const [player, setPlayer] = useState<any>(null);
  // State for sound toggle
  const [isSoundOn, setIsSoundOn] = useState(false);

  // Refs for all sections
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Refs for specific elements
  const logoRef = useRef<HTMLDivElement>(null);
  const subTextRefs = useRef<HTMLSpanElement[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const backgroundWordRef = useRef<HTMLDivElement>(null);
  const aboutTextRefs = useRef<HTMLDivElement[]>([]);
  const serviceCardRefs = useRef<HTMLDivElement[]>([]);
  const projectHeadingRef = useRef<HTMLHeadingElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const testimonialRefs = useRef<HTMLDivElement[]>([]);
  const footerElementsRef = useRef<HTMLDivElement>(null);
  const svgPathRef = useRef<SVGPathElement>(null);

  // YouTube options
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      controls: 0,
      mute: 1,
      loop: 1,
      playlist: 'jtBBYfeRVnM',
      modestbranding: 1,
      showinfo: 0,
      rel: 0,
      origin: typeof window !== 'undefined' ? window.location.origin : '',
      host: 'https://www.youtube-nocookie.com' // Use privacy-enhanced mode
    },
  };
  

  // Handle YouTube player ready
  const onReady = (event: any) => {
    setPlayer(event.target);
    event.target.mute();
    event.target.playVideo();
  };

  // Toggle sound function
  const toggleSound = () => {
    if (player) {
      if (isSoundOn) {
        player.mute();
      } else {
        player.unMute();
        player.setVolume(30); // Set to 30% volume
      }
      setIsSoundOn(!isSoundOn);
    }
  };

  // Split text helper function
  const splitText = (text: string) => {
    return text.split(' ').map((word, index) => (
      <span 
        key={index} 
        className={styles.word}
        ref={(el) => {
          if (el) subTextRefs.current[index] = el;
        }}
      >
        {word}
      </span>
    ));
  };

  // Initialize GSAP animations
  useEffect(() => {
    const loadGsap = async () => {
      if (typeof window === 'undefined') return;

      try {
        // Import GSAP and plugins
        const gsapModule = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        const { SplitText } = await import('gsap/SplitText');
        
        const gsap = gsapModule.default;
        
        // Register plugins
        gsap.registerPlugin(ScrollTrigger, SplitText);
        
        // Set up master timeline
        const masterTl = gsap.timeline();
        
        // Hero section animations
        if (heroRef.current && logoRef.current) {
          // Main logo animation
          masterTl.fromTo(
            logoRef.current,
            { 
              scale: 0.8,
              opacity: 0,
              filter: 'blur(10px)'
            },
            { 
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)',
              duration: 2,
              ease: 'power3.out'
            }
          );

          // Subtitle word-by-word animation
          if (subTextRefs.current.length) {
            masterTl.fromTo(
              subTextRefs.current,
              { 
                y: 50,
                opacity: 0
              },
              { 
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power2.out'
              },
              '-=1.5'
            );
          }

          // Scroll indicator animation
          if (scrollIndicatorRef.current) {
            masterTl.fromTo(
              scrollIndicatorRef.current,
              { y: 0, opacity: 0.5 },
              { 
                y: 10, 
                opacity: 1,
                repeat: -1,
                yoyo: true,
                duration: 1,
                ease: 'power1.inOut'
              },
              '-=1'
            );
          }

          // SVG line drawing animation
          if (svgPathRef.current) {
            const pathLength = svgPathRef.current.getTotalLength();
            
            gsap.set(svgPathRef.current, {
              strokeDasharray: pathLength,
              strokeDashoffset: pathLength
            });
            
            ScrollTrigger.create({
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
              onUpdate: (self) => {
                const progress = self.progress;
                gsap.to(svgPathRef.current, {
                  strokeDashoffset: pathLength - (pathLength * progress),
                  ease: 'none',
                  duration: 0.1
                });
              }
            });
          }

          // Parallax background effect
          gsap.to(heroRef.current.querySelector(`.${styles.heroBg}`), {
            y: '30%',
            ease: 'none',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true
            }
          });
        }

        // About section animations
        if (aboutRef.current && backgroundWordRef.current) {
          // Pin the section
          ScrollTrigger.create({
            trigger: aboutRef.current,
            start: 'top top',
            end: '+=100%',
            pin: true,
            pinSpacing: true
          });

          // Background word animation
          gsap.fromTo(
            backgroundWordRef.current,
            { opacity: 0.05, scale: 0.9 },
            {
              opacity: 0.2,
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: aboutRef.current,
                start: 'top bottom',
                end: 'center center',
                scrub: true
              }
            }
          );

          // Text blocks animation
          if (aboutTextRefs.current.length) {
            aboutTextRefs.current.forEach((block, index) => {
              gsap.fromTo(
                block,
                { y: 100, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  ease: 'power2.out',
                  scrollTrigger: {
                    trigger: aboutRef.current,
                    start: `top+=${index * 15}% center`,
                    end: `top+=${(index + 1) * 15}% center`,
                    toggleActions: 'play none none reverse',
                    scrub: 1
                  }
                }
              );
            });
          }
        }

// In your component, at the top level:
    if (!servicesRef.current || !serviceCardRefs.current.length || typeof gsap === 'undefined') return;
    
    // Import GSAP and plugins (move this to the top of the component if needed)
    const loadGsap = async () => {
      if (typeof window === 'undefined') return;
      
      try {
        const gsapModule = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        gsap.registerPlugin(ScrollTrigger);
        
        const serviceCards = serviceCardRefs.current;
        const servicesContainer = servicesRef.current.querySelector(`.${styles.servicesContainer}`);
        
        // Position cards initially
        gsap.set(serviceCards, {
          x: (index) => index % 2 === 0 ? '-100%' : '100%',
          opacity: 0,
          position: 'relative',
          top: 'auto',
          left: 'auto'
        });
        
        // Create a timeline for the services section
        const servicesTl = gsap.timeline({
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top top",
            end: "+=400%",
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            fastScrollEnd: true,
            onUpdate: (self) => {
              // Calculate which card should be active based on scroll progress
              const progress = self.progress;
              const totalCards = serviceCards.length;
              const cardDuration = 1 / totalCards;
              
              serviceCards.forEach((card, index) => {
                const cardStart = index * cardDuration;
                const cardEnd = (index + 1) * cardDuration;
                
                // Make card visible when in its section
                if (progress >= cardStart && progress < cardEnd) {
                  gsap.to(card, {
                    x: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                  });
                } else {
                  // Hide cards when not in their section
                  gsap.to(card, {
                    x: index % 2 === 0 ? '-100%' : '100%',
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.in"
                  });
                }
              });
            }
          }
        });
        
        // Return cleanup function
        return () => {
          if (servicesTl) servicesTl.kill();
          const st = ScrollTrigger.getAll().find(
            trigger => trigger.vars.trigger === servicesRef.current
          );
          if (st) st.kill();
        };
      } catch (error) {
        console.error("Error setting up services animations:", error);
      }
    };
    
    // Call the async function
    const cleanup = loadGsap();
    
    // Return a cleanup function
    return () => {
      cleanup.then(cleanupFn => cleanupFn && cleanupFn());
    };
        // Project section animations
        if (projectRef.current && projectHeadingRef.current && ctaButtonRef.current) {
          // Pin the section
          const projectTrigger = ScrollTrigger.create({
            trigger: projectRef.current,
            start: 'top top',
            end: '+=200%',
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
              // Control video playback based on scroll position
              if (player) {
                const progress = self.progress;
                const videoDuration = player.getDuration();
                const targetTime = videoDuration * progress;
                
                // Only seek if the difference is significant to avoid jittering
                const currentTime = player.getCurrentTime();
                if (Math.abs(currentTime - targetTime) > 0.5) {
                  player.seekTo(targetTime);
                }
              }
            }
          });

          // Heading animation with SplitText
          if (projectHeadingRef.current.textContent) {
            const splitHeading = new SplitText(projectHeadingRef.current, { 
              type: "chars,words" 
            });
            
            gsap.fromTo(
              splitHeading.chars,
              { y: 100, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                stagger: 0.03,
                duration: 1,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                  trigger: projectRef.current,
                  start: 'top 40%',
                  toggleActions: 'play none none reverse'
                }
              }
            );
          }

          // CTA button animation
          gsap.fromTo(
            ctaButtonRef.current,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: 'elastic.out(1, 0.5)',
              scrollTrigger: {
                trigger: projectRef.current,
                start: 'top 30%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        // Testimonials section animations
        if (testimonialsRef.current && testimonialRefs.current.length) {
          // Pin the section
          ScrollTrigger.create({
            trigger: testimonialsRef.current,
            start: 'top top',
            end: '+=200%',
            pin: true,
            pinSpacing: true
          });

          // Create a testimonial timeline
          const testimonialTl = gsap.timeline({
            scrollTrigger: {
              trigger: testimonialsRef.current,
              start: 'top top',
              end: '+=200%',
              scrub: true
            }
          });

          // Animate testimonials sequentially
          testimonialRefs.current.forEach((testimonial, index) => {
            const avatarEl = testimonial.querySelector(`.${styles.avatar}`);
            const quoteEl = testimonial.querySelector(`.${styles.quote}`);
            
            // Add to timeline - each testimonial taking up 1/3 of the scroll range
            testimonialTl
              .fromTo(
                testimonial,
                { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
                { opacity: 1, x: 0, duration: 0.3 },
                index * 0.33
              )
              .fromTo(
                avatarEl,
                { scale: 0 },
                { scale: 1, duration: 0.2, ease: 'back.out(1.7)' },
                index * 0.33 + 0.1
              )
              .fromTo(
                quoteEl,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.2 },
                index * 0.33 + 0.15
              )
              .to(
                testimonial,
                { opacity: 0, duration: 0.2 },
                index * 0.33 + 0.31
              );
          });
        }

        // Footer animations
        if (footerRef.current && footerElementsRef.current) {
          // Staggered entrance for footer elements
          const footerChildren = footerElementsRef.current.children;
          
          gsap.fromTo(
            footerChildren,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: footerRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none'
              }
            }
          );

          // Title tracking animation
          const footerTitle = footerRef.current.querySelector(`.${styles.footerTitle}`);
          if (footerTitle) {
            gsap.fromTo(
              footerTitle,
              { letterSpacing: '0px' },
              {
                letterSpacing: '3px',
                scrollTrigger: {
                  trigger: footerRef.current,
                  start: 'top bottom',
                  end: 'top 70%',
                  scrub: true
                }
              }
            );
          }
        }

        // Color scheme transition based on scroll
        const sections = [
          heroRef.current,
          aboutRef.current,
          servicesRef.current,
          projectRef.current,
          testimonialsRef.current,
          footerRef.current
        ];

        sections.forEach((section, index) => {
          if (!section) return;
          
          // Skip the first section (hero)
          if (index === 0) return;
          
          const hueRotation = index * 15; // Increase hue rotation gradually
          
          ScrollTrigger.create({
            trigger: section,
            start: 'top center',
            onEnter: () => {
              gsap.to('body', {
                backgroundColor: `hsl(${hueRotation}, 15%, 10%)`,
                duration: 1
              });
            },
            onLeaveBack: () => {
              // Go back to previous section's color
              const prevHueRotation = (index - 1) * 15;
              gsap.to('body', {
                backgroundColor: `hsl(${prevHueRotation}, 15%, 10%)`,
                duration: 1
              });
            }
          });
        });

        // Return cleanup function
        return () => {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
          masterTl.kill();
        };
      } catch (error) {
        console.error("Error setting up GSAP animations:", error);
      }
    };

    // Call the async function
    const cleanup = loadGsap();
    
    // Return cleanup function
    return () => {
      cleanup.then(cleanupFn => cleanupFn && cleanupFn());
    };
  }, [player]);

  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section ref={heroRef} className={styles.hero}>
        <div className={styles.heroBg}></div>
        <div className={styles.heroContent}>
          <div ref={logoRef} className={styles.logo}>
            <h1 className={styles.logoHeading}>JABEZA FILMS</h1>
            <svg className={styles.underline} width="300" height="20" viewBox="0 0 300 20">
              <path
                ref={svgPathRef}
                d="M8,12 C50,18 250,18 292,12"
                className={styles.path}
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <div className={styles.heroSubtext}>
            {splitText("Cinematic storytelling that moves and inspires")}
          </div>
          <div ref={scrollIndicatorRef} className={styles.scrollIndicator}>
            <span className={styles.scrollText}>Scroll to Explore</span>
            <span className={styles.arrowDown}></span>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className={styles.about}>
        <div ref={backgroundWordRef} className={styles.backgroundWord}>VISION</div>
        <div className={styles.aboutContent}>
          <div 
            ref={(el) => { if (el) aboutTextRefs.current[0] = el; }} 
            className={styles.aboutTextBlock}
          >
            <h2 className={styles.aboutHeading}>We tell stories that stick</h2>
          </div>
          <div 
            ref={(el) => { if (el) aboutTextRefs.current[1] = el; }}
            className={styles.aboutTextBlock}
          >
            <p className={styles.aboutText}>Our philosophy is simple: create bold, authentic, and emotionally resonant stories.</p>
          </div>
          <div 
            ref={(el) => { if (el) aboutTextRefs.current[2] = el; }}
            className={styles.aboutTextBlock}
          >
            <p className={styles.aboutText}>We believe in the power of visual language to transform, inspire, and connect.</p>
          </div>
          <div 
            ref={(el) => { if (el) aboutTextRefs.current[3] = el; }}
            className={styles.aboutTextBlock}
          >
            <p className={styles.aboutText}>Every frame matters. Every moment counts.</p>
          </div>
        </div>
      </section>

{/* Services Section */}
<section ref={servicesRef} className={styles.services}>
  <div className={styles.servicesContainer}>
    <div 
      ref={(el) => { if (el) serviceCardRefs.current[0] = el; }}
      className={styles.serviceCard}
    >
      <div className={styles.serviceIcon}>
        <span className={styles.iconFilm}></span>
      </div>
      <h3 className={styles.serviceHeading}>Film Production</h3>
      <p className={styles.serviceText}>From concept to final edit, we bring your vision to life with cinematic excellence.</p>
    </div>
    
    <div 
      ref={(el) => { if (el) serviceCardRefs.current[1] = el; }}
      className={styles.serviceCard}
    >
      <div className={styles.serviceIcon}>
        <span className={styles.iconCamera}></span>
      </div>
      <h3 className={styles.serviceHeading}>Commercial Production</h3>
      <p className={styles.serviceText}>Compelling brand stories that captivate audiences and deliver results.</p>
    </div>
    
    <div 
      ref={(el) => { if (el) serviceCardRefs.current[2] = el; }}
      className={styles.serviceCard}
    >
      <div className={styles.serviceIcon}>
        <span className={styles.iconEdit}></span>
      </div>
      <h3 className={styles.serviceHeading}>Post-Production</h3>
      <p className={styles.serviceText}>Expert editing, color grading, and sound design that elevates your content.</p>
    </div>
    
    <div 
      ref={(el) => { if (el) serviceCardRefs.current[3] = el; }}
      className={styles.serviceCard}
    >
      <div className={styles.serviceIcon}>
        <span className={styles.iconIdea}></span>
      </div>
      <h3 className={styles.serviceHeading}>Creative Direction</h3>
      <p className={styles.serviceText}>Strategic visual storytelling that aligns with your brand and audience.</p>
    </div>
  </div>
</section>

      {/* Featured Project Section */}
      <section ref={projectRef} className={styles.project}>
        <div className={styles.videoBg}>
          <YouTube
            videoId="jtBBYfeRVnM"
            opts={opts}
            onReady={onReady}
            className={styles.youtubePlayer}
          />
          <button 
            onClick={toggleSound} 
            className={styles.soundToggle}
            aria-label={isSoundOn ? "Mute" : "Unmute"}
          >
            {isSoundOn ? "🔊" : "🔇"}
          </button>
        </div>
        <div className={styles.projectContent}>
          <h2 ref={projectHeadingRef} className={styles.projectHeading}>Featured Project</h2>
          <h3 className={styles.projectSubheading}>"The Silent Echo"</h3>
          <p className={styles.projectDescription}>Award-winning short film exploring themes of memory and identity.</p>
          <button ref={ctaButtonRef} className={styles.ctaButton}>Watch the Reel</button>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className={styles.testimonials}>
        <h2 className={styles.testimonialsHeading}>Client Praise</h2>
        <div className={styles.testimonialsContainer}>
          <div 
            ref={(el) => { if (el) testimonialRefs.current[0] = el; }}
            className={styles.testimonial}
          >
            <div className={styles.avatar}>SF</div>
            <blockquote className={styles.quote}>
              "Jabeza Films transformed our brand story into a visual masterpiece. Their cinematic approach sets them apart."
              <cite className={styles.citation}>Sarah Fitzgerald, Lumina Brands</cite>
            </blockquote>
          </div>
          
          <div 
            ref={(el) => { if (el) testimonialRefs.current[1] = el; }}
            className={styles.testimonial}
          >
            <div className={styles.avatar}>MJ</div>
            <blockquote className={styles.quote}>
              "Working with the Jabeza team was a revelation. They captured the essence of our message in ways we never imagined."
              <cite className={styles.citation}>Marcus James, Vertex Studios</cite>
            </blockquote>
          </div>
          
          <div 
            ref={(el) => { if (el) testimonialRefs.current[2] = el; }}
            className={styles.testimonial}
          >
            <div className={styles.avatar}>AK</div>
            <blockquote className={styles.quote}>
              "Their attention to detail and cinematic vision turned our simple concept into an award-winning campaign."
              <cite className={styles.citation}>Anika Karim, Global Media</cite>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer ref={footerRef} className={styles.footer}>
        <div ref={footerElementsRef} className={styles.footerContent}>
          <h2 className={styles.footerTitle}>Let's Tell Your Story</h2>
          
          <div className={styles.footerInfo}>
            <a href="mailto:hello@jabezafilms.com" className={styles.footerLink}>hello@jabezafilms.com</a>
            <p className={styles.address}>123 Creative Avenue, Los Angeles, CA 90210</p>
            
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialIcon}>
                <span className={styles.iconInstagram}></span>
              </a>
              <a href="#" className={styles.socialIcon}>
                <span className={styles.iconVimeo}></span>
              </a>
              <a href="#" className={styles.socialIcon}>
                <span className={styles.iconLinkedin}></span>
              </a>
            </div>
            
            <p className={styles.copyright}>© {new Date().getFullYear()} Jabeza Films. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}