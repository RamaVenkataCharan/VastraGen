import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

// ════════════════════════════════════════════
// DATA
// ════════════════════════════════════════════
const AVATARS = [
  'https://api.dicebear.com/8.x/lorelei/svg?seed=priya&backgroundColor=0d0d1a',
  'https://api.dicebear.com/8.x/lorelei/svg?seed=arjun&backgroundColor=0d0d1a',
  'https://api.dicebear.com/8.x/lorelei/svg?seed=meera&backgroundColor=0d0d1a',
  'https://api.dicebear.com/8.x/lorelei/svg?seed=rohit&backgroundColor=0d0d1a',
  'https://api.dicebear.com/8.x/lorelei/svg?seed=nisha&backgroundColor=0d0d1a',
  'https://api.dicebear.com/8.x/lorelei/svg?seed=kavya&backgroundColor=0d0d1a',
];

const DESIGNS = [
  { id:1, title:'Zari Lehenga Royale', img:'/assets/design1.png', likes:4821, saved:false, tags:['Lehenga','Bridal','Gold'], author:'Priya Sharma', authorAvatar:AVATARS[0], badge:'Trending', badgeType:'badge-gold' },
  { id:2, title:'Peacock Saree Opus', img:'/assets/design2.png', likes:3274, saved:false, tags:['Saree','Silk','Blue'], author:'Arjun Mehta', authorAvatar:AVATARS[1], badge:'Featured', badgeType:'badge-purple' },
  { id:3, title:'Anarkali Mirage', img:'/assets/design3.png', likes:2908, saved:false, tags:['Anarkali','Mirror','Festive'], author:'Meera Iyer', authorAvatar:AVATARS[2], badge:'AI Pick', badgeType:'badge-teal' },
  { id:4, title:'Bandhani Dreams', img:'/assets/design1.png', likes:1567, saved:false, tags:['Bandhani','Rajasthani'], author:'Kavya Nair', authorAvatar:AVATARS[5], badge:'New', badgeType:'badge-rose' },
  { id:5, title:'Ikkat Elegance', img:'/assets/design2.png', likes:2103, saved:false, tags:['Ikkat','Andhra','Weave'], author:'Rohit Kulkarni', authorAvatar:AVATARS[3], badge:'Trending', badgeType:'badge-gold' },
  { id:6, title:'Pashmina Aurora', img:'/assets/design3.png', likes:3490, saved:false, tags:['Kashmiri','Pashmina'], author:'Nisha Reddy', authorAvatar:AVATARS[4], badge:'Featured', badgeType:'badge-purple' },
];

const CREATORS = [
  { id:1, name:'Priya Sharma', handle:'@priya_designs', avatar:AVATARS[0], designs:142, followers:'48.2K', following:true },
  { id:2, name:'Arjun Mehta', handle:'@arjun_couture', avatar:AVATARS[1], designs:98, followers:'31.7K', following:false },
  { id:3, name:'Meera Iyer', handle:'@meera_creates', avatar:AVATARS[2], designs:210, followers:'72.4K', following:false },
  { id:4, name:'Rohit Kulkarni', handle:'@rohit_ethnic', avatar:AVATARS[3], designs:57, followers:'19.3K', following:true },
];

const FEED_POSTS = [
  {
    id:1, author:'Priya Sharma', avatar:AVATARS[0], time:'2m ago', verified:true,
    text: 'Just generated this <strong>Zari Lehenga Royale</strong> using VastraGen\'s new Bridal Collection model 🔥 The gold thread textures came out absolutely stunning. Who wants a tutorial?',
    image:'/assets/design1.png', likes:342, comments:58, shares:24, liked:false,
  },
  {
    id:2, author:'Meera Iyer', avatar:AVATARS[2], time:'17m ago', verified:true,
    text: 'Experimenting with <strong>Peacock motifs</strong> + deep indigo. VastraGen understood the assignment. What regional style should I try next? Drop your suggestions below 👇',
    image:'/assets/design2.png', likes:189, comments:43, shares:11, liked:false,
  },
  {
    id:3, author:'Arjun Mehta', avatar:AVATARS[1], time:'1h ago', verified:false,
    text: 'Quick tip: when prompting for <strong>Anarkali designs</strong>, add "mirror work", "festive lighting" and "flowing panels" to get dramatic results. Changed my workflow completely.',
    image:null, likes:521, comments:87, shares:46, liked:true,
  },
];

const TRENDING = [
  { rank:'01', tag:'#BridalLehenga', count:'12.4K posts' },
  { rank:'02', tag:'#AISaree', count:'9.8K posts' },
  { rank:'03', tag:'#ZariWork', count:'7.1K posts' },
  { rank:'04', tag:'#KashmiriPashmina', count:'5.6K posts' },
  { rank:'05', tag:'#AnarkaliRevival', count:'4.2K posts' },
];

const SUGGESTIONS = [
  { name:'Kavya Nair', handle:'@kavya.eth', avatar:AVATARS[5] },
  { name:'Nisha Reddy', handle:'@nisha_designs', avatar:AVATARS[4] },
  { name:'Rohit Kulkarni', handle:'@rohit_ethnic', avatar:AVATARS[3] },
];

const NOTIFICATIONS = [
  { id:1, text:'<strong>Priya Sharma</strong> liked your design "Bandhani Dreams"', time:'2m ago', unread:true },
  { id:2, text:'<strong>VastraGen AI</strong> finished generating your "Kashmiri Shawl" design', time:'15m ago', unread:true },
  { id:3, text:'<strong>Meera Iyer</strong> started following you', time:'1h ago', unread:true },
  { id:4, text:'Your design was featured in <strong>This Week\'s Top Picks</strong>', time:'3h ago', unread:false },
  { id:5, text:'<strong>Arjun Mehta</strong> commented on your post', time:'5h ago', unread:false },
];

const INIT_MESSAGES = [
  { id:1, type:'recv', text:'Hey! Loved your Anarkali design 😍 Which model did you use?', time:'10:42 AM' },
  { id:2, type:'sent', text:'Thanks! I used the Festive Fusion model with custom embroidery prompts 🔥', time:'10:43 AM' },
  { id:3, type:'recv', text:'That texture detail is insane. Can you share the exact prompt?', time:'10:44 AM' },
];

// ════════════════════════════════════════════
// INLINE SVG ICONS
// ════════════════════════════════════════════
const Icon = ({ name, size=18, style={} }) => {
  const icons = {
    home:     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z"/><path strokeLinecap="round" strokeLinejoin="round" d="M9 21V12h6v9"/></svg>,
    explore:  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/></svg>,
    spark:    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    community:<svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
    bell:     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>,
    search:   <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/></svg>,
    heart:    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    heartFill:<svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
    comment:  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    share:    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
    bookmark: <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>,
    send:     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
    x:        <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    plus:     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    verify:   <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/></svg>,
    wand:    <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>,
    chat:     <svg width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>,
  };
  return <span style={{ display:'inline-flex', alignItems:'center', ...style }}>{icons[name] || null}</span>;
};

// ════════════════════════════════════════════
// LOGO
// ════════════════════════════════════════════
const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="navbar-logo">
    <rect width="36" height="36" rx="10" fill="url(#lg)" />
    <path d="M10 26L18 10l8 16H10z" fill="url(#lg2)" opacity="0.9"/>
    <path d="M14 21h8" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <defs>
      <linearGradient id="lg" x1="0" y1="0" x2="36" y2="36">
        <stop stopColor="#d4af37"/><stop offset="1" stopColor="#7c3aed"/>
      </linearGradient>
      <linearGradient id="lg2" x1="10" y1="10" x2="26" y2="26">
        <stop stopColor="white" stopOpacity="0.9"/><stop offset="1" stopColor="white" stopOpacity="0.4"/>
      </linearGradient>
    </defs>
  </svg>
);

// ════════════════════════════════════════════
// NAVBAR
// ════════════════════════════════════════════
const Navbar = ({ activePage, setActivePage, notifOpen, setNotifOpen, unreadCount }) => {
  const navItems = ['Home','Explore','Generate','Community'];
  return (
    <nav className="navbar">
      <a className="navbar-brand" href="#">
        <Logo />
        <span className="navbar-name gradient-text">VastraGen</span>
      </a>
      <div className="navbar-center">
        {navItems.map(n => (
          <button key={n} id={`nav-${n.toLowerCase()}`}
            className={`nav-link${activePage === n ? ' active' : ''}`}
            onClick={() => setActivePage(n)}>{n}</button>
        ))}
      </div>
      <div className="navbar-right">
        <div className="navbar-search-wrap">
          <div className="search-bar">
            <span className="search-icon"><Icon name="search" size={15}/></span>
            <input placeholder="Search designs, creators…" id="global-search" />
            <kbd className="search-shortcut">/</kbd>
          </div>
        </div>
        <div className="navbar-divider-v" />
        <div className="navbar-actions">
          <div className="icon-btn tooltip-wrap" id="notif-btn" onClick={() => setNotifOpen(o => !o)}>
            <Icon name="bell" size={18}/>
            {unreadCount > 0 && <span className="notif-dot"/>}
            <span className="tooltip">Notifications</span>
          </div>
          <div className="icon-btn tooltip-wrap" id="chat-nav-btn">
            <Icon name="chat" size={18}/>
            <span className="tooltip">Messages</span>
          </div>
        </div>
        <div className="navbar-divider-v" />
        <div className="navbar-profile" id="user-avatar">
          <img src={AVATARS[0]} className="avatar avatar-nav" alt="Profile" />
          <span className="navbar-profile-name">Priya</span>
          <Icon name="explore" size={12} style={{color:'var(--text-muted)', marginLeft: -2}}/>
        </div>
      </div>
    </nav>
  );
};

// ════════════════════════════════════════════
// NOTIFICATION PANEL
// ════════════════════════════════════════════
const NotifPanel = ({ onClose }) => (
  <div className="notif-panel">
    <div className="notif-header">
      <span style={{fontWeight:700, fontSize:15}}>Notifications</span>
      <button className="btn btn-ghost" style={{padding:'4px 12px', fontSize:12}} onClick={onClose}>Mark all read</button>
    </div>
    {NOTIFICATIONS.map(n => (
      <div key={n.id} className={`notif-item${n.unread?' unread':''}`}>
        {n.unread && <span className="notif-dot-inline"/>}
        <div>
          <div className="notif-text" dangerouslySetInnerHTML={{__html: n.text}}/>
          <div className="notif-time">{n.time}</div>
        </div>
      </div>
    ))}
  </div>
);

// ════════════════════════════════════════════
// HERO VISUAL (Option 1 + 2 + 3)
// ════════════════════════════════════════════
const HeroVisual = () => {
  const [designs, setDesigns] = useState([]);
  const [index, setIndex] = useState(0);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-300, 300], [5, -5]);
  const rotateY = useTransform(x, [-300, 300], [-5, 5]);

  useEffect(() => {
    // Try absolute localhost first, fallback to same origin if proxy is configured
    fetch('http://localhost:5000/api/designs')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log("Fetched designs:", data);
        if (Array.isArray(data) && data.length > 0) setDesigns(data);
        else console.warn("API returned invalid or empty data:", data);
      })
      .catch(err => {
        console.error("Critical error fetching designs:", err);
        // Fallback to static data as a failsafe
        setDesigns([
          { id: 1, imageUrl: "/assets/design1.png", title: "Failsafe Design 1", trending: "#Failsafe", designer: "System" },
          { id: 2, imageUrl: "/assets/design2.png", title: "Failsafe Design 2", trending: "#Failsafe", designer: "System" }
        ]);
      });
  }, []);

  useEffect(() => {
    if (designs.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % designs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [designs]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  if (designs.length === 0) return (
    <div className="w-full h-full flex items-center justify-center bg-base-900/50 backdrop-blur-md">
      <div className="text-gold animate-pulse text-sm font-semibold tracking-widest uppercase">Loading AI Designs...</div>
    </div>
  );

  const current = designs[index];

  return (
    <motion.div 
      className="relative w-full h-full overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
      style={{ rotateX, rotateY, perspective: 1000, backgroundColor: '#07070f' }}
    >
      {/* Visual Depth Glow (Option 3) */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold-dim blur-[120px] rounded-full opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-purple-light/10 blur-[100px] rounded-full opacity-20 pointer-events-none" />

      {/* Main Slider (Option 1) */}
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={current.imageUrl}
          alt={current.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Narrative Gradient Blend */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to left, transparent, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.9) 100%)' }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 40%)' }} />

      {/* Floating Storytelling (Option 2) */}
      <div className="absolute top-12 right-12 flex flex-col gap-4 z-20 pointer-events-none items-end">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10 shadow-2xl"
        >
          <span className="text-xs text-gold font-bold tracking-tight">🔥 Trending {current.trending}</span>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl p-4 rounded-xl border border-white/10 shadow-2xl text-right"
        >
          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Top Creator</p>
          <p className="text-white text-sm font-bold">{current.designer}</p>
        </motion.div>
      </div>

      {/* Final Social Proof Card */}
      <div className="absolute bottom-12 right-12 z-20">
        <motion.div 
          key={`card-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl max-w-[280px]"
        >
          <p className="text-[10px] text-gold/80 font-bold uppercase tracking-widest mb-2">✨ Just Generated</p>
          <h3 className="text-white text-lg font-extrabold leading-tight mb-4">{current.title}</h3>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[0,1,2].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#07070f] bg-gray-800 overflow-hidden">
                  <img src={AVATARS[i+2]} alt="" className="w-full h-full object-cover"/>
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-400 font-medium">+124 others liked</span>
          </div>
        </motion.div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 left-12 flex gap-3 z-30">
        {designs.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className="h-1 rounded-full cursor-pointer transition-all duration-500"
            style={{ 
              width: i === index ? '32px' : '8px',
              backgroundColor: i === index ? 'var(--gold)' : 'rgba(255,255,255,0.2)'
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// ════════════════════════════════════════════
// HERO
// ════════════════════════════════════════════
const Hero = ({ onExplore, onGenerate }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section className="hero" id="hero-section" style={{ overflow: 'hidden' }}>
      <div className="orb" style={{width:800,height:800,background:'radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)',top:'-10%',left:'-10%',pointerEvents:'none'}}/>
      
      <div style={{ display: 'flex', width: '100%', minHeight: '100vh', position: 'relative', zIndex: 10 }}>
        {/* LEFT: Storytelling & CTA */}
        <div style={{ width: '50%', display: 'flex', alignItems: 'center', padding: '0 80px' }}>
          <motion.div 
            variants={container} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }}
            className="hero-content"
          >
            <motion.div variants={item} className="hero-eyebrow" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span className="hero-eyebrow-line" style={{ width: 32, height: 2, background: 'var(--gold)' }}/>
              <span className="hero-badge" style={{ fontSize: 12, fontWeight: 700, color: 'var(--gold)', letterSpacing: '0.1em' }}>AI-Powered • Ethnic Wear</span>
            </motion.div>
            <motion.h1 variants={item} className="hero-title" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 800, lineHeight: 1, marginBottom: 24 }}>
              Design the<br/>
              <span className="gradient-text serif italic">Future of Fashion</span>
            </motion.h1>
            <motion.p variants={item} className="hero-subtitle" style={{ fontSize: 18, color: 'var(--text-secondary)', maxWidth: 500, marginBottom: 40, lineHeight: 1.6 }}>
              Generate breathtaking Indian ethnic wear designs with AI. Connect with India's finest fashion creators. Share, inspire, and collaborate.
            </motion.p>
            <motion.div variants={item} className="hero-cta" style={{ display: 'flex', gap: 16 }}>
              <button className="btn btn-gold btn-lg" style={{ height: 56, padding: '0 32px' }} onClick={onGenerate}>
                <Icon name="wand" size={18}/> Start Generating
              </button>
              <button className="btn btn-outline btn-lg" style={{ height: 56, padding: '0 32px' }} onClick={onExplore}>
                <Icon name="explore" size={18}/> Explore Designs
              </button>
            </motion.div>
            <motion.div variants={item} className="hero-stats" style={{ display: 'flex', gap: 48, marginTop: 64 }}>
              {[['48K+','Creators'],['2.4M','Designs'],['99.2%','Quality Score']].map(([v,l]) => (
                <div key={l}>
                  <div className="hero-stat-value gradient-text" style={{ fontSize: 32, fontWeight: 800 }}>{v}</div>
                  <div className="hero-stat-label" style={{ fontSize: 12, textTransform: 'uppercase', color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{l}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT: Visual System */}
        <div style={{ width: '50%', height: '100vh', position: 'sticky', top: 0 }}>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
};

// ════════════════════════════════════════════
// DESIGN CARD
// ════════════════════════════════════════════
const DesignCard = ({ d, onSave, onLike }) => (
  <div className="design-card" id={`design-${d.id}`}>
    <div className="design-card-image">
      <img src={d.img} alt={d.title} loading="lazy"/>
      <button className="design-card-saved" id={`save-${d.id}`} onClick={() => onSave(d.id)}>
        {d.saved ? '★ Saved' : '☆ Save'}
      </button>
      <div className="design-card-overlay">
        <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
          {d.tags.map(t => <span key={t} className="tag active" style={{fontSize:11}}>{t}</span>)}
        </div>
      </div>
    </div>
    <div className="design-card-body">
      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
        <span className={`badge ${d.badgeType}`}>{d.badge}</span>
      </div>
      <div className="design-card-title">{d.title}</div>
      <div className="design-card-meta">
        <div className="design-card-author">
          <img src={d.authorAvatar} className="avatar avatar-sm" alt={d.author}/>
          <span>{d.author}</span>
        </div>
        <button className={`like-btn${d.liked?' liked':''}`} id={`like-${d.id}`} onClick={() => onLike(d.id)}>
          <Icon name={d.liked?'heartFill':'heart'} size={15}/> {(d.likes/1000).toFixed(1)}K
        </button>
      </div>
    </div>
  </div>
);

// ════════════════════════════════════════════
// EXPLORE PAGE
// ════════════════════════════════════════════
const ExplorePage = ({ designs, onSave, onLike }) => {
  const [activeTab, setActiveTab] = useState('Trending');
  const [activeFilter, setActiveFilter] = useState('All');
  const tabs = ['Trending','Latest','Following','AI Picks'];
  const filters = ['All','Lehenga','Saree','Anarkali','Bandhani','Pashmina','Sherwani'];
  return (
    <div>
      <div className="section" style={{paddingBottom:0}}>
        <div className="section-header">
          <div>
            <h1 className="section-title">Explore <span className="gradient-text">Designs</span></h1>
            <p className="section-sub">Discover AI-generated ethnic wear from India's top creators</p>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:16,marginBottom:28}}>
          <div className="tabs">
            {tabs.map(t => <button key={t} id={`tab-${t.replace(' ','-').toLowerCase()}`} className={`tab${activeTab===t?' active':''}`} onClick={() => setActiveTab(t)}>{t}</button>)}
          </div>
          <div className="filter-row">
            {filters.map(f => <button key={f} id={`filter-${f.toLowerCase()}`} className={`tag${activeFilter===f?' active':''}`} onClick={() => setActiveFilter(f)}>{f}</button>)}
          </div>
        </div>
      </div>
      <div className="section" style={{paddingTop:24}}>
        <div className="grid-masonry">
          {designs.map((d,i) => <div key={d.id} className="animate-fadeInUp" style={{animationDelay:`${i*60}ms`}}><DesignCard d={d} onSave={onSave} onLike={onLike}/></div>)}
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════
// FEED (HOME)
// ════════════════════════════════════════════
const FeedPost = ({ p, onLike }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const submit = () => { if (!comment.trim()) return; setComments(c => [...c, {text:comment, time:'Just now'}]); setComment(''); setShowComments(true); };
  return (
    <div className="post-card" id={`post-${p.id}`}>
      <div className="post-header">
        <img src={p.avatar} className="avatar avatar-md" alt={p.author}/>
        <div className="post-author-info">
          <div style={{display:'flex',alignItems:'center',gap:6}}>
            <span className="post-author-name">{p.author}</span>
            {p.verified && <span style={{color:'var(--gold)'}}><Icon name="verify" size={14}/></span>}
          </div>
          <div className="post-time">{p.time}</div>
        </div>
        <button className="btn btn-outline" style={{padding:'6px 16px',fontSize:13}}>Follow</button>
      </div>
      <div className="post-body" dangerouslySetInnerHTML={{__html: p.text}}/>
      {p.image && <img src={p.image} className="post-image" alt="Design post" loading="lazy"/>}
      <div className="post-footer">
        <button className={`like-btn${p.liked?' liked':''}`} id={`post-like-${p.id}`} onClick={() => onLike(p.id)}>
          <Icon name={p.liked?'heartFill':'heart'} size={16}/> {p.liked ? p.likes+1 : p.likes}
        </button>
        <button className="like-btn" id={`post-comment-btn-${p.id}`} onClick={() => setShowComments(s=>!s)}>
          <Icon name="comment" size={16}/> {p.comments + comments.length}
        </button>
        <button className="like-btn" id={`post-share-${p.id}`}>
          <Icon name="share" size={16}/> {p.shares}
        </button>
        <button className="like-btn" style={{marginLeft:'auto'}} id={`post-save-${p.id}`}>
          <Icon name="bookmark" size={16}/>
        </button>
      </div>
      {showComments && comments.length > 0 && (
        <div style={{marginTop:12, paddingTop:12, borderTop:'1px solid var(--border)', display:'flex', flexDirection:'column', gap:10}}>
          {comments.map((c,i) => (
            <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
              <img src={AVATARS[0]} className="avatar avatar-sm" alt="You"/>
              <div className="glass" style={{padding:'8px 14px', borderRadius:12, flex:1, fontSize:14}}>
                {c.text} <span style={{fontSize:11, color:'var(--text-muted)', marginLeft:8}}>{c.time}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="post-comment-box">
        <img src={AVATARS[0]} className="avatar avatar-sm" alt="You"/>
        <input className="input post-comment-input" id={`comment-input-${p.id}`} placeholder="Add a comment…" value={comment} onChange={e => setComment(e.target.value)} onKeyDown={e => e.key==='Enter' && submit()}/>
        <button className="btn btn-gold" style={{padding:'10px 16px'}} id={`comment-submit-${p.id}`} onClick={submit}><Icon name="send" size={14}/></button>
      </div>
    </div>
  );
};

const HomePage = ({ designs, feedPosts, onSave, onLike, onPostLike }) => (
  <div style={{display:'flex', gap:28, padding:'88px 80px 60px', maxWidth:1400, margin:'0 auto'}}>
    <div style={{flex:1, minWidth:0, display:'flex', flexDirection:'column', gap:24}}>
      {/* Stories */}
      <div className="glass" style={{borderRadius:'var(--radius-lg)', padding:'18px 20px'}}>
        <div className="stories-row">
          <div className="story-item" id="story-add">
            <div className="story-ring" style={{background:'var(--bg-glass)', border:'2px dashed var(--border-gold)'}}>
              <div className="story-ring-inner" style={{display:'flex', alignItems:'center', justifyContent:'center', background:'var(--gold-dim)'}}>
                <Icon name="plus" size={22} style={{color:'var(--gold)'}}/>
              </div>
            </div>
            <span className="story-label">Your Story</span>
          </div>
          {CREATORS.map((c,i) => (
            <div key={c.id} className="story-item" id={`story-${c.id}`}>
              <div className="story-ring"><div className="story-ring-inner"><img src={c.avatar} alt={c.name}/></div></div>
              <span className="story-label">{c.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Feed */}
      {feedPosts.map(p => <FeedPost key={p.id} p={p} onLike={onPostLike}/>)}
    </div>
    {/* Sidebar */}
    <aside className="sidebar" style={{display:'none'}}>
      <div className="sidebar-card">
        <div className="sidebar-title">Trending Topics</div>
        {TRENDING.map(t => (
          <div key={t.tag} className="trending-item" id={`trend-${t.tag.slice(1)}`}>
            <span className="trending-rank">{t.rank}</span>
            <div><div className="trending-tag">{t.tag}</div><div className="trending-count">{t.count}</div></div>
          </div>
        ))}
      </div>
      <div className="sidebar-card">
        <div className="sidebar-title">Suggested Creators</div>
        {SUGGESTIONS.map(s => (
          <div key={s.handle} className="suggest-item">
            <img src={s.avatar} className="avatar avatar-sm" alt={s.name}/>
            <div className="suggest-info"><div className="suggest-name">{s.name}</div><div className="suggest-handle">{s.handle}</div></div>
            <span className="suggest-follow" id={`follow-${s.handle.slice(1)}`}>Follow</span>
          </div>
        ))}
      </div>
    </aside>
  </div>
);

// ════════════════════════════════════════════
// GENERATE PAGE
// ════════════════════════════════════════════
const GeneratePage = () => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Bridal');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(null);
  const styles = ['Bridal','Festive','Casual','Royal','Minimalist','Contemporary'];
  const suggestions = ['Deep teal lehenga with gold zari border','Purple silk saree with peacock motifs','Red anarkali with mirror work and floral prints'];
  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setGenerating(true); setGenerated(null);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 2800);
  };
  return (
    <div style={{padding:'100px 80px 60px', maxWidth:900, margin:'0 auto'}}>
      <div style={{textAlign:'center', marginBottom:48}}>
        <div className="badge badge-gold" style={{marginBottom:16}}><Icon name="wand" size={12}/> AI Design Studio</div>
        <h1 className="section-title">Generate Your <span className="gradient-text">Perfect Design</span></h1>
        <p style={{color:'var(--text-secondary)', fontSize:16, marginTop:10}}>Describe your dream ethnic wear and watch AI bring it to life in seconds</p>
      </div>
      <div className="prompt-section">
        <div className="orb" style={{width:300,height:300,background:'radial-gradient(circle, #d4af37 0%, transparent 70%)',top:'-20%',left:'50%',transform:'translateX(-50%)'}}/>
        <div style={{position:'relative', zIndex:2}}>
          <div style={{display:'flex',gap:10,flexWrap:'wrap',justifyContent:'center',marginBottom:24}}>
            {styles.map(s => <button key={s} id={`style-${s.toLowerCase()}`} className={`tag${style===s?' active':''}`} onClick={() => setStyle(s)}>{s}</button>)}
          </div>
          <div className="prompt-input-wrap">
            <input id="generate-prompt" className="prompt-input" placeholder="e.g. A royal blue lehenga with silver embroidery and peacock motifs…" value={prompt} onChange={e => setPrompt(e.target.value)} onKeyDown={e => e.key==='Enter' && handleGenerate()}/>
            <button className="btn btn-gold" id="generate-btn" onClick={handleGenerate} disabled={generating}>
              {generating ? '⏳ Generating…' : <><Icon name="wand" size={16}/> Generate</>}
            </button>
          </div>
          <div style={{marginTop:16, display:'flex', gap:8, flexWrap:'wrap', justifyContent:'center'}}>
            {suggestions.map((s,i) => <button key={i} id={`suggestion-${i}`} className="tag" style={{fontSize:12}} onClick={() => setPrompt(s)}>✨ {s.slice(0,35)}…</button>)}
          </div>
        </div>
      </div>
      {generating && (
        <div style={{marginTop:40, textAlign:'center'}}>
          <div className="skeleton" style={{width:'100%',height:400,borderRadius:'var(--radius-xl)',marginBottom:16}}/>
          <p style={{color:'var(--text-muted)', fontSize:14}}>🎨 AI is weaving your design masterpiece…</p>
        </div>
      )}
      {generated && (
        <div className="animate-fadeInUp" style={{marginTop:40}}>
          <div style={{borderRadius:'var(--radius-xl)', overflow:'hidden', border:'1px solid var(--border-gold)', boxShadow:'var(--shadow-gold)'}}>
            <img src={style==='Bridal'?'/assets/design1.png':style==='Festive'?'/assets/design3.png':'/assets/design2.png'} style={{width:'100%',maxHeight:500,objectFit:'cover',display:'block'}} alt="Generated design"/>
          </div>
          <div style={{marginTop:20, display:'flex', gap:12, justifyContent:'center'}}>
            <button className="btn btn-gold" id="download-design-btn"><Icon name="bookmark" size={16}/> Save to Collection</button>
            <button className="btn btn-outline" id="share-design-btn"><Icon name="share" size={16}/> Share to Community</button>
            <button className="btn btn-ghost" id="regenerate-btn" onClick={() => { setGenerated(null); handleGenerate(); }}>🔄 Regenerate</button>
          </div>
        </div>
      )}
    </div>
  );
};

// ════════════════════════════════════════════
// COMMUNITY PAGE
// ════════════════════════════════════════════
const CommunityPage = () => {
  const [followed, setFollowed] = useState({});
  const toggle = id => setFollowed(f => ({ ...f, [id]: !f[id] }));
  return (
    <div style={{padding:'100px 80px 60px'}}>
      <div className="section-header">
        <div>
          <h1 className="section-title">Top <span className="gradient-text">Creators</span></h1>
          <p className="section-sub">Follow India's most celebrated AI fashion designers</p>
        </div>
        <div className="tabs">
          {['All','Following','Rising Stars'].map(t => <button key={t} className="tab">{t}</button>)}
        </div>
      </div>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:20, marginBottom:60}}>
        {CREATORS.map(c => (
          <div key={c.id} className="creator-card" id={`creator-${c.id}`}>
            <div className="creator-avatar-wrap">
              <div className="creator-avatar-ring"/>
              <img src={c.avatar} className="avatar avatar-lg" alt={c.name}/>
            </div>
            <div>
              <div className="creator-name">{c.name}</div>
              <div className="creator-handle">{c.handle}</div>
            </div>
            <div className="creator-stats">
              <div className="creator-stat"><div className="creator-stat-val">{c.designs}</div><div className="creator-stat-label">Designs</div></div>
              <div className="creator-stat"><div className="creator-stat-val">{c.followers}</div><div className="creator-stat-label">Followers</div></div>
            </div>
            <button
              id={`follow-creator-${c.id}`}
              className={`btn ${(followed[c.id] ?? c.following) ? 'btn-outline' : 'btn-gold'}`}
              style={{width:'100%'}} onClick={() => toggle(c.id)}>
              {(followed[c.id] ?? c.following) ? '✓ Following' : '+ Follow'}
            </button>
          </div>
        ))}
      </div>
      {/* Trending section */}
      <div className="glass" style={{borderRadius:'var(--radius-xl)', padding:36}}>
        <div className="section-title" style={{marginBottom:24}}>Trending <span className="gradient-text">Topics</span></div>
        <div style={{display:'flex', flexWrap:'wrap', gap:12}}>
          {TRENDING.map(t => (
            <div key={t.tag} id={`trending-${t.tag.slice(1)}`} className="glass" style={{borderRadius:'var(--radius-md)', padding:'14px 20px', cursor:'pointer', transition:'var(--transition)'}}>
              <div style={{fontSize:16, fontWeight:700, color:'var(--gold)'}}>{t.tag}</div>
              <div style={{fontSize:12, color:'var(--text-muted)', marginTop:4}}>{t.count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════
// CHAT
// ════════════════════════════════════════════
const Chat = () => {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState(INIT_MESSAGES);
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  useEffect(() => { if (open) endRef.current?.scrollIntoView({behavior:'smooth'}); }, [msgs, open]);
  const send = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), type:'sent', text:input, time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) };
    setMsgs(m => [...m, newMsg]);
    setInput('');
    setTimeout(() => {
      const replies = ['That sounds amazing! 🔥', 'I\'ll try that prompt right now!', 'Can you share the full settings?', 'VastraGen never disappoints 🙌'];
      setMsgs(m => [...m, { id: Date.now()+1, type:'recv', text: replies[Math.floor(Math.random()*replies.length)], time: new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) }]);
    }, 1200);
  };
  return (
    <>
      {!open && (
        <button className="chat-fab" id="chat-fab" onClick={() => setOpen(true)} title="Open Chat">
          💬
        </button>
      )}
      {open && (
        <div className="chat-panel" id="chat-panel">
          <div className="chat-header">
            <div className="creator-avatar-wrap" style={{flexShrink:0}}>
              <img src={AVATARS[2]} className="avatar avatar-sm" alt="Meera"/>
            </div>
            <div className="chat-header-info">
              <div className="chat-header-title">Meera Iyer</div>
              <div className="chat-header-sub">● Online</div>
            </div>
            <button className="icon-btn" id="chat-close-btn" onClick={() => setOpen(false)} style={{width:32,height:32}}><Icon name="x" size={16}/></button>
          </div>
          <div className="chat-messages" id="chat-messages">
            {msgs.map(m => (
              <div key={m.id} className={`chat-msg ${m.type}`}>
                <div className="chat-bubble">{m.text}</div>
                <div className="chat-time">{m.time}</div>
              </div>
            ))}
            <div ref={endRef}/>
          </div>
          <div className="chat-footer">
            <input id="chat-input" className="input" style={{borderRadius:99}} placeholder="Type a message…" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && send()}/>
            <button className="btn btn-gold" id="chat-send-btn" style={{padding:'10px 16px', borderRadius:99}} onClick={send}><Icon name="send" size={14}/></button>
          </div>
        </div>
      )}
    </>
  );
};

// ════════════════════════════════════════════
// APP ROOT
// ════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState('Home');
  const [designs, setDesigns] = useState(DESIGNS);
  const [feedPosts, setFeedPosts] = useState(FEED_POSTS);
  const [notifOpen, setNotifOpen] = useState(false);
  const [unread, setUnread] = useState(3);

  const handleSave = id => setDesigns(ds => ds.map(d => d.id===id ? {...d, saved:!d.saved} : d));
  const handleLike = id => setDesigns(ds => ds.map(d => d.id===id ? {...d, liked:!d.liked, likes: d.liked ? d.likes-1 : d.likes+1} : d));
  const handlePostLike = id => setFeedPosts(ps => ps.map(p => p.id===id ? {...p, liked:!p.liked} : p));
  const handleNotifOpen = (o) => { setNotifOpen(o); if (o) setUnread(0); };

  const renderPage = () => {
    if (page==='Explore') return <ExplorePage designs={designs} onSave={handleSave} onLike={handleLike}/>;
    if (page==='Generate') return <GeneratePage/>;
    if (page==='Community') return <CommunityPage/>;
    return <><Hero onExplore={() => setPage('Explore')} onGenerate={() => setPage('Generate')}/><ExplorePage designs={designs} onSave={handleSave} onLike={handleLike}/></>;
  };

  return (
    <>
      <Navbar activePage={page} setActivePage={setPage} notifOpen={notifOpen} setNotifOpen={handleNotifOpen} unreadCount={unread}/>
      {notifOpen && <NotifPanel onClose={() => setNotifOpen(false)}/>}
      <main onClick={() => notifOpen && setNotifOpen(false)}>{renderPage()}</main>
      <Chat/>
      <footer className="footer">
        <div style={{marginBottom:12}}>
          <span className="gradient-text" style={{fontWeight:800, fontSize:18}}>VastraGen</span>
        </div>
        <p>© 2026 VastraGen. AI-Powered Indian Fashion. Made with ❤️ in India 🇮🇳</p>
      </footer>
    </>
  );
}
