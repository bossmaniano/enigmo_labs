import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Globe, Database, Workflow, Search, Zap, Cog } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

// Module-level scroll helper — shared across all components
const smoothScrollTo = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handle scroll events for active link and navbar background
  useEffect(() => {
    // Section IDs for active link tracking
    const sectionIds = ['hero', 'protocol', 'developers', 'pricing', 'testimonials'];
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      // Update active link based on scroll position
      const currentSection = sectionIds.find(id => {
        const element = document.getElementById(id);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });
      
      // Update URL hash for smooth scrolling indication
      if (currentSection && currentSection !== 'hero') {
        window.history.replaceState(null, '', `#${currentSection}`);
      } else if (currentSection === 'hero') {
        window.history.replaceState(null, '', window.location.pathname);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Call once on mount to set initial state
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
// Smooth scroll helper
   const smoothScrollToLocal = (id: string) => {
     smoothScrollTo(id);
     setIsMobileMenuOpen(false); // Close mobile menu when clicking a link
   };

return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-egyptian-blue origin-left transform scale-x-0 transition-transform duration-300"
           id="scroll-progress"
           style={{ transformOrigin: 'left' }}
      ></div>
      
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`sticky top-0 z-50 backdrop-blur-md bg-white/80 ${isScrolled ? 'border-b border-black/10' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Left Side - Brand */}
            <motion.div
              onClick={() => smoothScrollToLocal('hero')}
              className="flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-2xl font-bold tracking-wider font-mono text-black">
                ENIGMO LABS
              </span>
            </motion.div>
            
            {/* Center - Navigation Links (Hidden on Mobile) */}
            <div className="hidden md:flex items-center space-x-8">
              {['Protocol', 'Developers', 'Pricing', 'Testimonials'].map((link, index) => {
                const sectionId = link.toLowerCase();
                const isActive = window.location.hash === `#${sectionId}` || 
                               (sectionId === 'developers' && window.location.hash === '') ||
                               (sectionId === 'hero' && window.location.hash === '' && index === 0);
                               
                return (
                  <motion.div
                    key={link}
onClick={() => smoothScrollToLocal(sectionId)}
                     className={`flex items-center space-x-2 text-sm font-mono tracking-widest uppercase
                              ${isActive ? 'text-egyptian-blue' : 'text-black/60'}
                              hover:text-egyptian-blue transition-colors duration-200
                              relative`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-2 h-0.5 bg-egyptian-blue"></span>
                    )}
                    {link}
                  </motion.div>
                );
              })}
            </div>
            
            {/* Right Side - Action Button and Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Open menu"
              >
                <motion.div
                  className="relative w-6 h-4"
                >
                  <span className="absolute left-0 top-0 w-full h-0.5 bg-white transition-transform duration-200"
                        style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(6px, 6px)' : 'rotate(0)' }}
                  ></span>
                  <span className="absolute left-0 top-50% w-full h-0.5 bg-white transition-transform duration-200"
                        style={{ transform: isMobileMenuOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'translateY(-50%)' }}
                  ></span>
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transition-transform duration-200"
                        style={{ transform: isMobileMenuOpen ? 'rotate(45deg) translate(-6px, 6px)' : 'rotate(0)' }}
                  ></span>
                </motion.div>
              </button>
              
               {/* Action Button - Consultation */}
               <motion.button
                 onClick={() => smoothScrollTo('contact')}
                 className="px-4 py-2 text-sm font-medium text-black border border-black/20 rounded-lg 
                           hover:bg-egyptian-blue/20 hover:text-egyptian-blue transition-all duration-300"
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 Consultation
               </motion.button>
            </div>
          </div>
          
          {/* Mobile Menu Drawer */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
            >
              <div className="flex flex-col h-full p-6">
                {/* Close Button */}
                <div className="mb-6 flex justify-end">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <motion.div className="relative w-5 h-5">
                      <span className="absolute left-0 top-0 w-full h-0.5 bg-white transition-transform duration-200"
                            style={{ transform: 'rotate(45deg)' }}
                      ></span>
                      <span className="absolute left-0 top-0 w-full h-0.5 bg-white transition-transform duration-200"
                            style={{ transform: 'rotate(-45deg)' }}
                      ></span>
                    </motion.div>
                  </button>
                </div>
                
                {/* Menu Links */}
                <div className="flex-1 space-y-4">
                  {['Protocol', 'Developers', 'Pricing', 'Testimonials'].map((link, index) => {
                    const sectionId = link.toLowerCase();
                    const isActive = window.location.hash === `#${sectionId}` || 
                                   (sectionId === 'developers' && window.location.hash === '') ||
                                   (sectionId === 'hero' && window.location.hash === '' && index === 0);
                                   
                    return (
                      <motion.div
                        key={link}
onClick={() => {
                           smoothScrollToLocal('contact');
                           setIsMobileMenuOpen(false);
                         }}
                        className={`flex items-center space-x-3 py-3 px-4 rounded-lg 
                                  ${isActive ? 'bg-egyptian-blue/20' : 'bg-transparent'}
                                  hover:bg-black/10 transition-colors duration-200`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <span className="text-sm font-mono tracking-widest uppercase 
                                ${isActive ? 'text-egyptian-blue' : 'text-black'}">
                          {link}
                        </span>
                        {isActive && (
                          <span className="ml-auto w-2 h-2 bg-egyptian-blue rounded"></span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
      
      {/* Update scroll progress bar */}
      <motion.div
        
        style={{
          width: `${Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100, 100)}%`
        }}
      >
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-egyptian-blue origin-left transform scale-x-0 transition-transform duration-300"
             id="scroll-progress"
             style={{ transformOrigin: 'left', width: '100%' }}
        ></div>
      </motion.div>
    </>
  )
}

// Neural Pulse Animation Component


const AnimatedSphere = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "░▒▓█▀▄▌▐│─┤├┴┬╭╮╰╯";
    let time = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const radius = Math.min(rect.width, rect.height) * 0.525;

      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";


      const points: { x: number; y: number; z: number; char: string }[] = [];

      // Generate sphere points
      for (let phi = 0; phi < Math.PI * 2; phi += 0.15) {
        for (let theta = 0; theta < Math.PI; theta += 0.15) {
          const x = Math.sin(theta) * Math.cos(phi + time * 0.5);
          const y = Math.sin(theta) * Math.sin(phi + time * 0.5);
          const z = Math.cos(theta);

          // Rotate around Y axis
          const rotY = time * 0.3;
          const newX = x * Math.cos(rotY) - z * Math.sin(rotY);
          const newZ = x * Math.sin(rotY) + z * Math.cos(rotY);

          // Rotate around X axis
          const rotX = time * 0.2;
          const newY = y * Math.cos(rotX) - newZ * Math.sin(rotX);
          const finalZ = y * Math.sin(rotX) + newZ * Math.cos(rotX);

          const depth = (finalZ + 1) / 2;
          const charIndex = Math.floor(depth * (chars.length - 1));

          points.push({
            x: centerX + newX * radius,
            y: centerY + newY * radius,
            z: finalZ,
            char: chars[charIndex],
          });
        }
      }

      // Sort by z for depth
      points.sort((a, b) => a.z - b.z);

      // Draw points
      points.forEach((point) => {
        const alpha = 0.2 + (point.z + 1) * 0.4;
        ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
        ctx.fillText(point.char, point.x, point.y);
      });

      time += 0.02;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: "block" }}
    />
  );
}

const GlobalHero = () => {
   const terms = ["Intelligence", "Websites", "Systems", "Agents", "Automation"];
   const [currentTerm, setCurrentTerm] = useState(0);

   useEffect(() => {
     const interval = setInterval(() => {
       setCurrentTerm((prev) => (prev + 1) % terms.length);
     }, 3000);
     return () => clearInterval(interval);
   }, [terms.length]);

   return (
     <section id="hero" className="relative min-h-screen overflow-hidden bg-white">
       {/* Soft background gradient */}
       <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100" />

       {/* Faded blurry sphere on the LEFT side */}
       <motion.div
         initial={{ opacity: 0, x: -40 }}
         animate={{ opacity: 0.15, x: 0 }}
         transition={{ duration: 1.2, delay: 0.2 }}
         className="absolute left-[-8%] top-[-10%] w-[60vw] h-[60vw] max-w-[550px] max-h-[550px] z-0"
       >
         <div className="w-full h-full blur-[80px] opacity-60">
           <AnimatedSphere />
         </div>
       </motion.div>

       {/* Secondary smaller sphere — left-mid overlap for depth */}
       <motion.div
         initial={{ opacity: 0, x: -20 }}
         animate={{ opacity: 0.08, x: 0 }}
         transition={{ duration: 1.4, delay: 0.5 }}
         className="absolute left-[10%] top-[20%] w-[25vw] h-[25vw] max-w-[220px] max-h-[220px] z-0"
       >
         <div className="w-full h-full blur-[60px] opacity-50">
           <AnimatedSphere />
         </div>
       </motion.div>

       {/* Text Content — centered on right side, always on top */}
       <div className="relative z-10 flex items-center min-h-screen px-4 sm:px-8 lg:px-16 py-16 sm:py-24 lg:py-0">
         <div className="max-w-2xl mx-auto lg:mx-0 lg:ml-[12%]">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.1 }}
             className="mb-6"
           >
             <span className="inline-flex items-center px-3 py-1.5 bg-egyptian-blue/10 border border-egyptian-blue/20 rounded-full text-xs font-mono text-egyptian-blue tracking-wider uppercase">
               <span className="w-1.5 h-1.5 bg-egyptian-blue rounded-full mr-2 animate-pulse"></span>
               Based in Nairobi, Kenya
             </span>
           </motion.div>

           <motion.h1
             className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] text-black mb-6"
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.9, delay: 0.25 }}
           >
             Deciphering Complexity.
             <br />
             <span className="relative">
               Engineering{" "}
               <AnimatePresence mode="wait">
                 <motion.span
                   key={terms[currentTerm]}
                   initial={{ y: 25, opacity: 0, filter: "blur(6px)" }}
                   animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                   exit={{ y: -25, opacity: 0, filter: "blur(6px)" }}
                   transition={{ duration: 0.55, ease: "easeInOut" }}
                   className="text-egyptian-blue inline-block"
                 >
                   {terms[currentTerm]}
                 </motion.span>
               </AnimatePresence>
             </span>
           </motion.h1>

           <motion.p
             className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mb-10"
             initial={{ opacity: 0, y: 25 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.9, delay: 0.45 }}
           >
             Welcome to Enigmo Labs. We transform fragmented data into elegant, high-performance systems through Web Engineering, Management Systems, AI Agents, and Automation.
           </motion.p>

           <motion.div
             initial={{ opacity: 0, y: 25 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.9, delay: 0.65 }}
           >
             <button
               onClick={() => smoothScrollTo('contact')}
               className="group relative inline-flex items-center gap-2 px-8 py-4 bg-egyptian-blue text-black font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
             >
               <span className="relative z-10">Initialize Project</span>
               <span className="relative z-10 w-5 h-5 rounded-full border-2 border-black/30 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300 text-sm">
                 →
               </span>
             </button>
           </motion.div>
         </div>
       </div>
     </section>
   )
 }

// The Enigmo Protocol Section
const EnigmoProtocol = () => {
  const steps = [
    {
      title: "Analyze",
      description: "We decipher organizational bottlenecks and data enigmas.",
      icon: Search
    },
    {
      title: "Architect",
      description: "We design a custom \"Memory + Logic\" stack using Supabase and Python tailored to your vertical.",
      icon: Database
    },
    {
      title: "Automate",
      description: "We deploy systems and AI agents for 24/7 autonomous execution.",
      icon: Zap
    }
  ];

  return (
    <section id="protocol" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 text-black">The Enigmo Protocol</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our systematic approach to transforming complexity into clarity
          </p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={step.title}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex items-center justify-between"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-black">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                <div className="ml-8">
                  <motion.div
                    animate={
                      step.title === "Analyze"
                        ? { rotate: 360 }
                        : step.title === "Architect"
                        ? { scale: [1, 1.1, 1] }
                        : { opacity: [1, 0.5, 1] }
                    }
                    transition={
                      step.title === "Analyze"
                        ? { duration: 4, repeat: Infinity, ease: "linear" }
                        : step.title === "Architect"
                        ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                    }
                  >
                    <step.icon className="w-12 h-12 text-egyptian-blue" />
                  </motion.div>
                </div>
              </motion.div>
              {index < steps.length - 1 && (
                <hr className="border-gray-700 mt-8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Built for Developers Section
const BuiltForDevelopers = () => {
  const [copied, setCopied] = useState(false);

  const codeSnippet = `curl -X POST https://api.enigmo-labs.com/v1/agents \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "prompt": "Analyze this dataset",
    "data": {...},
    "webhook": "https://your-app.com/webhook"
  }'`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <section id="developers" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 text-black">Built for Developers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Enterprise-grade infrastructure with developer-first APIs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-egyptian-blue">Headless Integration</h3>
              <p className="text-gray-700">
                Deploy AI agents that live inside your existing Slack, WhatsApp, or Discord workflows.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-egyptian-blue">Secure Infrastructure</h3>
              <p className="text-gray-700">
                All systems built with Supabase/PostgreSQL with robust multi-role permissions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-semibold text-egyptian-blue">Scalable RAG</h3>
              <p className="text-gray-700">
                Advanced Retrieval-Augmented Generation that grows with your company's private data.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-lg p-6 border border-black/10"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-600 font-mono">API Request</span>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 bg-egyptian-blue text-black text-xs rounded hover:bg-opacity-80 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="text-sm text-gray-700 font-mono overflow-x-auto">
              <code>{codeSnippet}</code>
            </pre>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Core Capabilities Bento Grid Section
const CoreCapabilitiesGrid = () => {
  const capabilities = [
    {
      icon: Globe,
      title: "Web Engineering",
      description: "High-conversion storefronts and UI/UX."
    },
    {
      icon: Database,
      title: "Management Systems",
      description: "Multi-role platforms (e.g., School Exam Systems) built on Supabase."
    },
    {
      icon: Brain,
      title: "AI Agent Orchestration",
      description: "Specialized RAG-powered cognitive infrastructure."
    },
    {
      icon: Workflow,
      title: "Autonomous Workflows",
      description: "24/7 organizational automation."
    }
  ]

  return (
    <section id="capabilities" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 text-black">Core Capabilities</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our four pillars of digital engineering excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50/50 backdrop-blur-lg border border-black/10 rounded-xl p-6 hover:border-egyptian-blue/50 transition-all duration-300 hover-glow"
            >
              <capability.icon className="w-8 h-8 text-egyptian-blue mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-black">{capability.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{capability.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Protocol Pricing Section
const ProtocolPricing = () => {
  const protocols = [
    {
      id: 1,
      title: "Foundations",
      category: "Web",
      subtitle: "High-Performance Web Engineering.",
      price: "KSh 35,000",
      icon: Globe,
      features: [
        "Custom v0 UI/UX Design",
        "SEO & Global Edge Hosting",
        "1-Year Free Domain & SSL",
        "Speed Optimization"
      ],
      cta: "Initialize Web Project"
    },
    {
      id: 2,
      title: "Intelligence",
      category: "Systems",
      subtitle: "Custom Management Systems.",
      price: "KSh 100,000",
      icon: Database,
      features: [
        "Everything in Foundations",
        "Full Supabase/PostgreSQL Backend",
        "Multi-role Admin & Staff Portals",
        "WhatsApp & M-Pesa API Integrations"
      ],
      cta: "Deploy Ecosystem",
      popular: true
    },
    {
      id: 3,
      title: "Enigma",
      category: "AI",
      subtitle: "AI Agent Orchestration.",
      price: "KSh 500,000",
      icon: Brain,
      features: [
        "Everything in Intelligence",
        "RAG-powered Private AI Agents",
        "Autonomous Workflow Orchestration",
        "Private Model Hosting"
      ],
      cta: "Orchestrate Agents"
    },
    {
      id: 4,
      title: "Bespoke",
      category: "Custom",
      subtitle: "Specialized Engineering Solutions.",
      price: "CUSTOM PROTOCOL",
      icon: Cog,
      features: [
        "Bespoke Systems Architecture",
        "Legacy Data Modernization",
        "Dedicated Engineering Consultation",
        "Unlimited Scaling"
      ],
      cta: "Initialize Consultation"
    }
  ]

return (
     <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 text-black">Protocol Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose your engineering path - from foundational websites to AI-powered automation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {protocols.map((protocol, index) => (
            <motion.div
              key={protocol.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`
                bg-gray-50 border border-black/10 rounded-xl p-8 flex flex-col
                ${protocol.popular ? 'border-2 border-egyptian-blue' : ''}
              `}
              whileHover={{ y: -8 }}
            >
              {protocol.popular && (
                <div className="mb-4">
                  <span className="px-3 py-1 bg-egyptian-blue text-white text-xs font-bold rounded-full">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <protocol.icon className="w-8 h-8 text-egyptian-blue" />
                <div>
                  <h3 className="text-xl font-bold text-black">{protocol.title}</h3>
                  <span className="text-xs text-gray-500 font-medium">{protocol.category}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-6">{protocol.subtitle}</p>

              <div className="text-2xl font-bold text-black mb-6">{protocol.price}</div>

              <ul className="space-y-3 mb-8 flex-1">
                {protocol.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-egyptian-blue mt-1">✓</span>
                    <span className="text-black text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

<button
                 onClick={() => smoothScrollTo('contact')}
                 className={`
                 w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300
                 ${protocol.popular
                   ? 'bg-egyptian-blue text-black hover:bg-opacity-90'
                   : 'bg-white/5 text-black border border-black/10 hover:bg-white/10'
                 }
               `}
               >
                 {protocol.cta}
               </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Aligned Testimonials Marquee Section
const AlignedTestimonialsMarquee = () => {
  const testimonials = [
    // Management
    { quote: "The Enigmo Labs team digitized our entire examination process. What used to take weeks now happens in real-time.", author: "Registrar", company: "Academic Institution" },
    { quote: "Enigmo Labs transformed our messy student data into a precision-engineered management system that just works.", author: "Principal", company: "Tassia Schools" },
    { quote: "Their logistics automation cut our order processing time by 70%. Absolutely game-changing for our operations.", author: "Operations Manager", company: "Logistics Hub" },
    { quote: "The financial reporting system they built gives us instant insights across all our branches.", author: "Finance Director", company: "Retail Chain" },
    { quote: "Our inventory management is now fully automated with real-time dashboards for decision making.", author: "CEO", company: "Retail Chain" },
    // AI/RAG
    { quote: "The RAG-powered research assistant accelerated our data analysis by 300%.", author: "Research Lead", company: "Tech Startup" },
    { quote: "Customer support tickets reduced by 60% after deploying their AI agent orchestration.", author: "Customer Success Head", company: "SaaS Platform" },
    { quote: "Private AI agents handling our document processing with 99% accuracy.", author: "Data Scientist", company: "AI Labs" },
    { quote: "Enigmo's RAG architecture powers our entire knowledge base with unprecedented accuracy.", author: "CTO", company: "Osma AI" },
    { quote: "The autonomous workflow system saved us 40 hours per week in manual tasks.", author: "Managing Director", company: "Consulting Firm" },
    // Web/UI
    { quote: "Our new website converts 3x better than the old one. Clean, fast, and effective.", author: "Marketing Head", company: "E-commerce" },
    { quote: "The fintech dashboard they designed processes transactions seamlessly with beautiful UX.", author: "Founder", company: "Fintech Startup" },
    { quote: "Creative direction and execution perfectly captured our brand essence.", author: "Creative Director", company: "Design Studio" },
    { quote: "Our e-commerce platform now handles Black Friday traffic without breaking a sweat.", author: "E-commerce Owner", company: "Online Store" },
    { quote: "Migration to their modern stack was seamless with zero downtime.", author: "ICT Consultant", company: "Government Agency" },
    // Automation
    { quote: "Product cycles are 50% faster with their automation layer in place.", author: "Product Manager", company: "Tech Company" },
    { quote: "Sales lead qualification is now fully automated with instant notifications.", author: "Sales Lead", company: "B2B Services" },
    { quote: "Our startup scaled from 0 to 10k users with their infrastructure.", author: "Startup Founder", company: "EdTech" },
    { quote: "Branch operations synchronized automatically across all locations.", author: "Operations Lead", company: "Banking" },
    { quote: "Report generation that took days now completes in minutes.", author: "Branch Manager", company: "Microfinance" },
  ]

  const getRandomTestimonials = (arr: typeof testimonials, count: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const [testimonialSets] = useState([
    getRandomTestimonials(testimonials, Math.ceil(testimonials.length / 2)),
    getRandomTestimonials(testimonials, Math.ceil(testimonials.length / 2)),
    getRandomTestimonials(testimonials, Math.ceil(testimonials.length / 2))
  ])

  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null)

return (
     <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-egyptian-blue/10 border border-egyptian-blue/30 rounded-full px-4 py-2 mb-6">
            <span className="text-xs font-mono text-egyptian-blue uppercase tracking-wider">Social Proof</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-black">
            Aligned <span className="text-egyptian-blue">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from organizations transforming their operations with our engineering expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-hidden">
          {[0, 1, 2].map((columnIndex) => (
            <div
              key={columnIndex}
              className="relative h-[700px] overflow-hidden"
              onMouseEnter={() => setHoveredColumn(columnIndex)}
              onMouseLeave={() => setHoveredColumn(null)}
            >
              <motion.div
                className="flex flex-col gap-6"
                animate={{
                  y: hoveredColumn === columnIndex ? 0 : [-700, 0],
                }}
                transition={{
                  y: {
                    duration: 25 + columnIndex * 8,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                {[...testimonialSets[columnIndex], ...testimonialSets[columnIndex]].map((testimonial, index) => (
                  <motion.div
                    key={`${columnIndex}-${index}`}
                    className="h-64 bg-gray-50 border border-black/10 rounded-xl p-8 hover:border-egyptian-blue/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 0 40px rgba(16, 52, 166, 0.4)"
                    }}
                  >
                    <blockquote className="text-black leading-relaxed text-lg mb-6 flex-1">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="flex flex-col gap-2">
                      <cite className="text-black font-bold not-italic">
                        {testimonial.author}
                      </cite>
                      <span className="text-egyptian-blue text-sm font-mono">
                        {testimonial.company}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Contact Terminal Section
const ContactTerminal = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Protocol: '',
    Brief: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [displayedLines, setDisplayedLines] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

try {
      const formspreeFormId = import.meta.env.VITE_FORMSPREE_FORM_ID || '';

      // Build Formspree payload — only fields Formspree actually supports
      // Formspree accepts: field names matching the form + _subject
      // Dual-email info is included as visible fields so the architect sees
      // the client's email/phone in the notification, and the subject is
      // customised so the client auto-reply can be configured in Formspree.
      const formPayload = new FormData();
      formPayload.append('Name', formData.Name);
      formPayload.append('Email', formData.Email);
      formPayload.append('Phone', formData.Phone);
      formPayload.append('Protocol', formData.Protocol);
      formPayload.append('Brief', formData.Brief);
      // Custom subject for architect notification
      formPayload.append('_subject', `NEW ENIGMO PROTOCOL: ${formData.Name}`);

      // Guard: skip real submission if Formspree ID is not configured or is the placeholder
      if (!formspreeFormId || formspreeFormId === 'YOUR_FORM_ID') {
        console.log('Formspree form ID not configured — simulating submission for development/demo.');
        console.log('To enable live submissions, replace YOUR_FORM_ID in .env with your actual Formspree form ID.');
        // Simulate success in dev mode
        setStatus('success');
        setDisplayedLines(0);
        setTimeout(() => {
          setFormData({ Name: '', Email: '', Phone: '', Protocol: '', Brief: '' });
        }, 8000);
        return;
      }

      // Submit to Formspree via fetch
      const response = await fetch(`https://formspree.io/f/${formspreeFormId}`, {
        method: 'POST',
        body: formPayload,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Formspree returned ${response.status}`);
      }

      // Trigger success terminal with typewriter animation
      setStatus('success');
      setDisplayedLines(0);

      // Reset form after success
      setTimeout(() => {
        setFormData({
          Name: '',
          Email: '',
          Phone: '',
          Protocol: '',
          Brief: ''
        });
      }, 8000);

    } catch (error) {
      console.error('Form submission failed:', error);
      setStatus('error');
      setErrorMessage('Connection Timeout. Please retry or contact enigmolabs@gmail.com directly.');
    }
  };

  // Typewriter effect for success terminal lines
  const terminalLines = [
    '[SYSTEM]: PACKET ENCRYPTED AND DISPATCHED.',
    '[SYSTEM]: ARCHITECT NOTIFIED (enigmolabs@gmail.com).',
    '[SYSTEM]: CONFIRMATION SENT TO CLIENT.',
    '[SYSTEM]: STATUS: STANDBY FOR CONTACT WITHIN 12H.'
  ];

  // Animate terminal lines appearing one by one
  useEffect(() => {
    if (status === 'success' && displayedLines < terminalLines.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [status, displayedLines, terminalLines.length]);

  const resetForm = () => {
    setFormData({
      Name: '',
      Email: '',
      Phone: '',
      Protocol: '',
      Brief: ''
    });
    setStatus('idle');
    setDisplayedLines(0);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-midnight">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-white font-mono">Contact Terminal</h2>
          <p className="text-gray-400 max-w-xl mx-auto font-mono">
            Initialize your project protocol through our secure engineering interface
          </p>
        </motion.div>

        {status === 'success' ? (
          // Success Terminal with Typewriter Effect
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring' }}
            className="font-mono bg-gray-900/50 border border-white/10 rounded-xl p-8 text-center min-h-[280px] flex flex-col items-center justify-center"
          >
            <div className="space-y-3 max-w-md mx-auto">
              {terminalLines.slice(0, displayedLines).map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="text-green-400 text-sm"
                >
                  {line}
                </motion.div>
              ))}
              {displayedLines < terminalLines.length && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="text-green-400 text-sm"
                >
                  ▊
                </motion.span>
              )}
            </div>
            <motion.button
              onClick={resetForm}
              className="mt-8 px-6 py-2 text-sm font-medium text-white border border-white/20 rounded-lg
                        hover:bg-egyptian-blue/20 hover:text-white transition-all duration-300 font-mono"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              [ RESET TERMINAL ]
            </motion.button>
          </motion.div>
        ) : status === 'error' ? (
          // Error State - Return to form
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div style={{ display: 'none' }}>
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </div>

            <div className="text-center mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg font-mono text-sm">
              <span className="text-red-400">⚠️</span>
              <span className="text-red-400 ml-2">{errorMessage}</span>
            </div>

            {/* Form fields - Single Column Command Terminal Layout */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                  &gt; Full Name
                </label>
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-egyptian-blue/50 focus:border-egyptian-blue
                            text-white placeholder-gray-500 font-mono text-sm"
                  placeholder="Enter full name..."
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                  &gt; Official Email
                </label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-egyptian-blue/50 focus:border-egyptian-blue
                            text-white placeholder-gray-500 font-mono text-sm"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                  &gt; Phone Number
                </label>
                <input
                  type="tel"
                  name="Phone"
                  value={formData.Phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-egyptian-blue/50 focus:border-egyptian-blue
                            text-white placeholder-gray-500 font-mono text-sm"
                  placeholder="+254..."
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                  &gt; Protocol Tier
                </label>
                <select
                  name="Protocol"
                  value={formData.Protocol}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-egyptian-blue/50 focus:border-egyptian-blue
                            text-white placeholder-gray-500 font-mono text-sm"
                >
                  <option value="" className="bg-black text-white">Select Protocol Type</option>
                  <option value="Foundations" className="bg-black text-white">Foundations</option>
                  <option value="Intelligence" className="bg-black text-white">Intelligence</option>
                  <option value="Enigma" className="bg-black text-white">Enigma</option>
                  <option value="Bespoke" className="bg-black text-white">Bespoke</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                  &gt; Technical Brief
                </label>
                <textarea
                  name="Brief"
                  value={formData.Brief}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-egyptian-blue/50 focus:border-egyptian-blue
                            text-white placeholder-gray-500 font-mono text-sm resize-none"
                  placeholder="Describe your project requirements and technical specifications..."
                />
              </div>
            </div>

{/* Submit Button - Error State */}
             <div className="flex justify-center pt-2">
               <motion.button
                 type="submit"
                 disabled={(status as string) === 'sending'}
                 className={`
                   font-mono px-8 py-3 text-sm font-bold tracking-[0.2em] rounded-lg
                   border border-white/20
                   transition-all duration-300
                   ${(status as string) === 'sending'
                     ? 'bg-black/70 text-white/40 cursor-not-allowed'
                     : 'bg-transparent text-white hover:bg-egyptian-blue/20 hover:border-egyptian-blue/50 active:scale-[0.98]'
                   }
                 `}
                 whileHover={(status as string) !== 'sending' ? { scale: 1.02 } : {}}
                 whileTap={(status as string) !== 'sending' ? { scale: 0.98 } : {}}
               >
                 {(status as string) === 'sending' ? '▸ INITIALIZING PROTOCOL...' : '[ INITIALIZE PROTOCOL ]'}
</motion.button>
            </div>
          </form>
        ) : (
          // Default State - Clean Form
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact" />
            <div style={{ display: 'none' }}>
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </div>

            {/* Form fields - Single Column Command Terminal Layout */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                  &gt; Full Name
                </label>
                <input
                  type="text"
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-egyptian-blue/50 focus:border-egyptian-blue
                            text-white placeholder-gray-500 font-mono text-sm"
                  placeholder="Enter full name..."
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                  &gt; Official Email
                </label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-egyptian-blue/50 focus:border-egyptian-blue
                            text-white placeholder-gray-500 font-mono text-sm"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                  &gt; Phone Number
                </label>
                <input
                  type="tel"
                  name="Phone"
                  value={formData.Phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-egyptian-blue/50 focus:border-egyptian-blue
                            text-white placeholder-gray-500 font-mono text-sm"
                  placeholder="+254..."
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                  &gt; Protocol Tier
                </label>
                <select
                  name="Protocol"
                  value={formData.Protocol}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-egyptian-blue/50 focus:border-egyptian-blue
                            text-white placeholder-gray-500 font-mono text-sm"
                >
                  <option value="" className="bg-black text-white">Select Protocol Type</option>
                  <option value="Foundations" className="bg-black text-white">Foundations</option>
                  <option value="Intelligence" className="bg-black text-white">Intelligence</option>
                  <option value="Enigma" className="bg-black text-white">Enigma</option>
                  <option value="Bespoke" className="bg-black text-white">Bespoke</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-500 mb-2 uppercase tracking-wider">
                  &gt; Technical Brief
                </label>
                <textarea
                  name="Brief"
                  value={formData.Brief}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-black/60 border border-white/10 rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-egyptian-blue/50 focus:border-egyptian-blue
                            text-white placeholder-gray-500 font-mono text-sm resize-none"
                  placeholder="Describe your project requirements and technical specifications..."
                />
              </div>
            </div>

            {/* Submit Button - Default State */}
            <div className="flex justify-center pt-2">
              <motion.button
                type="submit"
                disabled={(status as string) === 'sending'}
                className={`
                  font-mono px-8 py-3 text-sm font-bold tracking-[0.2em] rounded-lg
                  border border-white/20
                  transition-all duration-300
                  ${(status as string) === 'sending'
                    ? 'bg-black/70 text-white/40 cursor-not-allowed'
                    : 'bg-transparent text-white hover:bg-egyptian-blue/20 hover:border-egyptian-blue/50 active:scale-[0.98]'
                  }
                `}
                whileHover={(status as string) !== 'sending' ? { scale: 1.02 } : {}}
                whileTap={(status as string) !== 'sending' ? { scale: 0.98 } : {}}
              >
                {(status as string) === 'sending' ? '▸ INITIALIZING PROTOCOL...' : '[ INITIALIZE PROTOCOL ]'}
              </motion.button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}

// Global Footer Section
const GlobalFooter = () => {
  return (
    <footer className="bg-white border-t border-black/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-xl font-bold text-black mb-2">ENIGMO LABS</div>
            <p className="text-gray-500 text-sm">Nairobi, Kenya.</p>
          </div>
          <div>
            <h4 className="text-black font-semibold mb-3 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#protocol" className="text-gray-600 hover:text-egyptian-blue text-sm transition-colors">Protocol</a></li>
              <li><a href="#developers" className="text-gray-600 hover:text-egyptian-blue text-sm transition-colors">Developers</a></li>
              <li><a href="#pricing" className="text-gray-600 hover:text-egyptian-blue text-sm transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-black font-semibold mb-3 text-sm">Contact Us</h4>
            <a href="mailto:enigmolabs@gmail.com" className="text-egyptian-blue hover:text-egyptian-blue/80 text-sm transition-colors font-mono">
              enigmolabs@gmail.com
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-black/10">
          <p className="text-center text-gray-500 text-xs">
            © 2026 Enigmo Labs. Engineering Intelligence from Nairobi.
          </p>
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      <Navbar />
       <main>
        <GlobalHero />
        <EnigmoProtocol />
        <BuiltForDevelopers />
        <CoreCapabilitiesGrid />
        <ProtocolPricing />
        <AlignedTestimonialsMarquee />
        <ContactTerminal />
       </main>
      <GlobalFooter />
    </div>
  )
}

export default App