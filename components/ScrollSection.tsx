"use client"

import { useEffect, useRef } from 'react';
import { getAssetPath } from '../utils/paths';
import styles from '../styles/ScrollSection.module.css';

const ScrollSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoImgRef = useRef<HTMLImageElement>(null);
  const boxesRef = useRef<HTMLDivElement>(null);
  const mainTextRef = useRef<HTMLDivElement>(null);
  
  // Define logo paths with proper base path prefix
  const redLogoPath = getAssetPath('/images/JABEZA_Logo_red.svg');
  const pinkLogoPath = getAssetPath('/images/JABEZA_Logo_pink.svg');

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    // Define logo paths within useEffect to make them dependencies
    const redLogo = redLogoPath;
    const pinkLogo = pinkLogoPath;

    // Add visibility control for scroll elements - more comprehensive version
    const handleVisibility = () => {
      const scrollPosition = window.scrollY;
      const sectionHeight = sectionRef.current?.offsetHeight || 0;
      
      // Get references to elements
      const logoWrapper = document.querySelector(`.${styles.logoWrapper}`);
      const progressBar = document.querySelector(`.${styles.progressBar}`);
      const boxesContainer = document.querySelector(`.${styles.boxesContainer}`);
      
      // Get all boxes
      const boxes = document.querySelectorAll(`.${styles.box}`);
      
      // Also get the main text specifically
      const mainText = document.querySelector(`.${styles.mainText}`);
      
      // Check if scrolled past the section
      if (scrollPosition >= sectionHeight - 100) {
        // Hide elements when scrolled past the section
        if (logoWrapper) (logoWrapper as HTMLElement).style.visibility = 'hidden';
        if (progressBar) (progressBar as HTMLElement).style.visibility = 'hidden';
        if (boxesContainer) (boxesContainer as HTMLElement).style.visibility = 'hidden';
        
        // Hide all boxes
        boxes.forEach(box => {
          (box as HTMLElement).style.visibility = 'hidden';
        });
        
        // Explicitly hide main text
        if (mainText) (mainText as HTMLElement).style.visibility = 'hidden';
      } else {
        // Show elements when in the section
        if (logoWrapper) (logoWrapper as HTMLElement).style.visibility = 'visible';
        if (progressBar) (progressBar as HTMLElement).style.visibility = 'visible';
        if (boxesContainer) (boxesContainer as HTMLElement).style.visibility = 'visible';
        
        // Show all boxes
        boxes.forEach(box => {
          (box as HTMLElement).style.visibility = 'visible';
        });
        
        // Explicitly show main text
        if (mainText) (mainText as HTMLElement).style.visibility = 'visible';
      }
    };
    
    // Add scroll event listener for visibility
    window.addEventListener('scroll', handleVisibility);
    
    // Import GSAP
    const importGSAP = async () => {
      const gsapModule = await import('gsap');
      const gsap = gsapModule.default;
      const ScrollTriggerModule = await import('gsap/dist/ScrollTrigger');
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
      
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);

      // Prevent default scroll restoration
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }

      // Reset scroll position when component mounts
      window.scrollTo(0, 0);
      
      // Preload pink logo
      const preloadImg = new Image();
      preloadImg.src = pinkLogo;

      // Progress bar animation
      gsap.to(`.${styles.progressBar}`, {
        width: '100%',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8
        }
      });

      // Check if we're on mobile
      const mobile = () => window.innerWidth <= 767;

      // Get references to DOM elements
      const heroLogo = logoImgRef.current;
      const logo = logoRef.current;
      const boxes = boxesRef.current;
      const mainText = mainTextRef.current;

      if (!heroLogo || !logo || !boxes || !mainText) return;

      // Initialize animation after ensuring logo is loaded
      const initAnimation = () => {
        // Clear any previous animations
        ScrollTrigger.getAll().forEach(st => st.kill());

        // Reset all elements to their initial state
        gsap.set(logo, { y: 0 });
        gsap.set(heroLogo, { scale: 1 });
        gsap.set(boxes, { height: 0 });
        gsap.set(mainText, { opacity: 0 });

        // Reset logo to red version at start
        heroLogo.src = redLogo;

        // Calculate scaling based on actual dimensions
        const initialWidth = heroLogo.offsetWidth || 300;
        const initialHeight = heroLogo.offsetHeight || 150;

        // Target sizes in pixels
        const targetW = mobile() ? 168 : 198;
        const targetH = mobile() ? 62 : 109;

        // Calculate scale based on aspect ratio
        const widthRatio = targetW / initialWidth;
        const heightRatio = targetH / initialHeight;
        const finalScale = Math.min(widthRatio, heightRatio);

        // Fixed top padding in pixels
        const logoTopPadding = mobile() ? 50 : 80;

        // Calculate transforms
        const viewportHeight = window.innerHeight;
        const finalY = -(viewportHeight / 2) + logoTopPadding;
        const rawFinalYinVh = (finalY / viewportHeight) * 100;
        const finalYinVh = Math.max(rawFinalYinVh, -40);

        // Create animation timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 3, // Slow down animation for smoother scroll
            invalidateOnRefresh: true
          }
        });

        // Animation phases
        tl
          // Phase 1: Initial movement (0-30%)
          .to(logo, { 
            y: finalYinVh * 0.20 + 'vh',
            ease: 'power1.out' 
          }, 0)
          .to(heroLogo, { 
            scale: 0.85, 
            ease: 'power1.out' 
          }, 0)
          .to(boxes, { 
            height: '20vh', 
            ease: 'power1.out' 
          }, 0.1)
          
          // Phase 2: Middle position (30-65%)
          .to(logo, { 
            y: finalYinVh * 0.50 + 'vh',
            ease: 'power1.inOut' 
          }, 0.3)
          .to(heroLogo, { 
            scale: 0.6, 
            ease: 'power1.inOut' 
          }, 0.3)
          .to(boxes, { 
            height: '40vh', 
            ease: 'power1.inOut' 
          }, 0.3)
          .to(mainText, { 
            opacity: 1, 
            ease: 'power1.inOut' 
          }, 0.3)
          
          // Box transitions
          .to([`.${styles.box1}`, `.${styles.box5}`], {
            width: '0%',
            opacity: 0,
            borderWidth: 0,
            ease: 'power1.inOut'
          }, 0.6)
          .to([`.${styles.box2}`, `.${styles.box4}`], { 
            width: '20%', 
            ease: 'power1.inOut' 
          }, 0.6)
          .to(`.${styles.box3}`, {
            width: '60%',
            fontSize: mobile() ? 'clamp(32px,6vw,52px)' : 'clamp(42px,6vw,72px)',
            ease: 'power1.inOut'
          }, 0.6)
          
          // Phase 3: Final position (65-100%)
          .to(logo, { 
            y: finalYinVh + 'vh',
            ease: 'power2.inOut' 
          }, 0.65)
          .to(heroLogo, { 
            scale: finalScale, 
            ease: 'power2.inOut'
          }, 0.65)
          .to(boxes, { 
            height: '100vh', 
            ease: 'power2.inOut' 
          }, 0.65)
          .to([`.${styles.box2}`, `.${styles.box4}`], {
            width: '0%',
            opacity: 0,
            borderWidth: 0,
            ease: 'power2.inOut'
          }, 0.8)
          .to(`.${styles.box3}`, {
            width: '100%',
            fontSize: mobile() ? 'clamp(64px,10vw,100px)' : 'clamp(64px,10vw,240px)',
            ease: 'power2.inOut'
          }, 0.8)
          .to('body', { 
            boxShadow: 'inset 0 0 0 10px #e12727', 
            ease: 'power2.inOut' 
          }, 0.9);
      };

      // Modified logo swap function
      const setupLogoSwap = () => {
        const nextSection = document.querySelector('.jabeza-next-section');
        
        // Create ScrollTrigger for logo swap
        const opts = {
          trigger: nextSection || sectionRef.current,
          start: 'top 90%',
          end: 'bottom top',
          onEnter: () => {
            if (heroLogo) heroLogo.src = pinkLogo;
          },
          onLeaveBack: () => {
            if (heroLogo) heroLogo.src = redLogo;
          }
        };
        
        ScrollTrigger.create(opts);
        
        // Mobile-specific handling
        if (window.innerWidth <= 767) {
          const containerHeight = sectionRef.current?.offsetHeight || 0;
          
          window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const scrollThreshold = containerHeight * 0.9;
            
            if (scrollPosition >= scrollThreshold) {
              if (heroLogo) heroLogo.src = pinkLogo;
            } else {
              if (heroLogo) heroLogo.src = redLogo;
            }
          }, { passive: true });
        }
      };

      // Initialize when logo is loaded
      if (heroLogo.complete) {
        initAnimation();
        setupLogoSwap();
      } else {
        heroLogo.onload = () => {
          initAnimation();
          setupLogoSwap();
        };
      }

      // Handle window resize
      let resizeTimer: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          initAnimation();
          setupLogoSwap();
          ScrollTrigger.refresh();
          
          // Also call handleVisibility to update visibility after resize
          handleVisibility();
        }, 250);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup event listeners when component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleVisibility);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    };

    importGSAP();
    
    // Initial call to handleVisibility to set correct initial state
    handleVisibility();
    
    return () => {
      window.removeEventListener('scroll', handleVisibility);
    };
  }, [redLogoPath, pinkLogoPath]); // Include all dependencies

  return (
    <div className={styles.scrollWrapper}>
      <div className={styles.scrollSection} ref={sectionRef}>
        <div className={styles.progressBar}></div>

        <div className={styles.scrollContainer}>
          <div className={styles.logoWrapper}>
            <div className={styles.logo} ref={logoRef}>
              <img 
                ref={logoImgRef}
                id="heroLogo" 
                src={redLogoPath}
                alt="Jabeza Films Logo"
                style={{ 
                  maxWidth: '90vw',
                  maxHeight: '90vh',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>

          <div className={styles.boxesContainer} ref={boxesRef}>
            <div className={`${styles.box} ${styles.box1}`}></div>
            <div className={`${styles.box} ${styles.box2}`}></div>
            <div className={`${styles.box} ${styles.box3}`}>
              <div className={styles.mainText} ref={mainTextRef}>
                Storytelling<br/>with soul
              </div>
            </div>
            <div className={`${styles.box} ${styles.box4}`}></div>
            <div className={`${styles.box} ${styles.box5}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollSection;