import { useState, useEffect, useRef, createContext, useContext } from 'react'
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaPython,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaHeart,
  FaUserCircle,
  FaMapMarkerAlt,
  FaMoon,
  FaSun,
} from 'react-icons/fa'
import {
  SiJavascript,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiExpress,
  SiFigma,
} from 'react-icons/si'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

/* ───────────────────────────── THEME CONTEXT ───────────────────────────── */

const ThemeContext = createContext()

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  return useContext(ThemeContext)
}

/* ───────────────────────────── DATA ───────────────────────────── */

const personalInfo = {
  name: 'Lovely Rose',
  title: 'Web Designer',
  tagline: 'I craft beautiful, intuitive digital experiences that leave a lasting impression.',
  about:
    'I am a passionate web designer with a keen eye for aesthetics and user experience. I specialize in creating visually stunning, responsive websites that not only look amazing but also deliver seamless interactions. From wireframes to pixel-perfect designs, I bring ideas to life with creativity and precision.',
  email: 'lovelyrosemilitar12@gmail.com',
  github: 'https://github.com/lovely12-subarashii',
  facebook: 'https://www.facebook.com/share/17xWpPQRzg/',
  instagram: 'https://www.instagram.com/lvlyyyyy_20?igsh=MWkwZDlvaDV5YzJuMw==',
}

const skills = [
  { name: 'React', icon: <FaReact />, color: '#61DAFB' },
  { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
  { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
  { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
  { name: 'Express', icon: <SiExpress />, color: '#FFFFFF' },
  { name: 'Python', icon: <FaPython />, color: '#3776AB' },
  { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26' },
  { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6' },
  { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4' },
  { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
  { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
  { name: 'Figma', icon: <SiFigma />, color: '#F24E1E' },
]

const navLinks = ['Home', 'Skills', 'Contact']

/* ───────────────────────────── ANIMATED BACKGROUNDS ───────────────────────────── */

function AnimatedBackground() {
  const { theme } = useTheme()
  const canvasRef = useRef(null)
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animationId

    /* ── stars (dark mode) ── */
    const stars = []
    const STAR_COUNT = 150

    /* ── field particles (light mode) ── */
    const particles = []
    const PARTICLE_COUNT = 60

    /* ── clouds (light mode) ── */
    const clouds = []
    const CLOUD_COUNT = 12

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight
    }

    function createStars() {
      stars.length = 0
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3.5 + 1,
          speedX: (Math.random() - 0.5) * 0.18,
          speedY: Math.random() * 0.25 + 0.06,
          opacity: Math.random() * 0.5 + 0.5,
          twinkleSpeed: Math.random() * 0.02 + 0.008,
          twinkleOffset: Math.random() * Math.PI * 2,
        })
      }
    }

    function createParticles() {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 4 + 1.5,
          speedX: (Math.random() - 0.3) * 0.3,
          speedY: -(Math.random() * 0.15 + 0.03),
          opacity: Math.random() * 0.5 + 0.2,
          wobbleAmp: Math.random() * 30 + 10,
          wobbleSpeed: Math.random() * 0.01 + 0.003,
          wobbleOffset: Math.random() * Math.PI * 2,
          type: Math.random() > 0.6 ? 'glow' : 'petal',
        })
      }
    }

    function createClouds() {
      clouds.length = 0
      for (let i = 0; i < CLOUD_COUNT; i++) {
        clouds.push({
          x: Math.random() * (canvas.width + 600) - 300,
          y: Math.random() * canvas.height * 0.7 + 20,
          width: Math.random() * 350 + 200,
          height: Math.random() * 80 + 40,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.35 + 0.35,
          puffs: Math.floor(Math.random() * 4) + 4,
        })
      }
    }

    function drawDark(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const star of stars) {
        star.x += star.speedX
        star.y += star.speedY

        if (star.y > canvas.height) star.y = -6
        if (star.x < -6) star.x = canvas.width + 6
        if (star.x > canvas.width + 6) star.x = -6

        const twinkle = Math.sin(time * star.twinkleSpeed * 10 + star.twinkleOffset)
        const alpha = star.opacity * (0.5 + 0.5 * twinkle)

        /* glow halo */
        if (star.size > 1.5) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(236, 72, 153, ${alpha * 0.15})`
          ctx.fill()
        }

        /* star core */
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 245, 250, ${alpha})`
        ctx.fill()

        /* bright center for larger stars */
        if (star.size > 2) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 0.4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`
          ctx.fill()
        }
      }
    }

    function drawCloud(cloud) {
      const step = cloud.width / cloud.puffs

      /* wide base ellipse */
      ctx.beginPath()
      ctx.ellipse(
        cloud.x + cloud.width * 0.45,
        cloud.y + cloud.height * 0.2,
        cloud.width * 0.55,
        cloud.height * 0.45,
        0, 0, Math.PI * 2
      )
      ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity * 0.85})`
      ctx.fill()

      /* puffs on top */
      for (let i = 0; i < cloud.puffs; i++) {
        const cx = cloud.x + i * step
        const cy = cloud.y - Math.abs(Math.sin(i * 0.9)) * (cloud.height * 0.3)
        const r = cloud.height * (0.55 + Math.sin(i * 0.7 + 0.5) * 0.35)

        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${cloud.opacity})`
        ctx.fill()
      }

      /* bright highlight on top-left puff */
      ctx.beginPath()
      ctx.arc(cloud.x + step * 0.8, cloud.y - cloud.height * 0.15, cloud.height * 0.35, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(cloud.opacity * 1.2, 0.9)})`
      ctx.fill()
    }

    function drawLight(time) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      /* draw clouds first (behind particles) */
      for (const cloud of clouds) {
        cloud.x += cloud.speed
        if (cloud.x > canvas.width + 300) {
          cloud.x = -cloud.width - 100
          cloud.y = Math.random() * canvas.height * 0.5 + 30
        }
        drawCloud(cloud)
      }

      /* draw floating particles */
      for (const p of particles) {
        const wobble = Math.sin(time * p.wobbleSpeed * 10 + p.wobbleOffset) * p.wobbleAmp * 0.02
        p.x += p.speedX + wobble
        p.y += p.speedY

        if (p.y < -10) p.y = canvas.height + 10
        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10

        const pulse = Math.sin(time * 0.8 + p.wobbleOffset)
        const alpha = p.opacity * (0.6 + 0.4 * pulse)

        if (p.type === 'glow') {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 220, 100, ${alpha * 0.15})`
          ctx.fill()
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 200, 50, ${alpha * 0.5})`
          ctx.fill()
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 180, 200, ${alpha * 0.45})`
          ctx.fill()
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`
          ctx.fill()
        }
      }
    }

    function draw() {
      const time = Date.now() * 0.001
      if (themeRef.current === 'dark') {
        drawDark(time)
      } else {
        drawLight(time)
      }
      animationId = requestAnimationFrame(draw)
    }

    resize()
    createStars()
    createParticles()
    createClouds()
    draw()

    const handleResize = () => {
      resize()
      createStars()
      createParticles()
      createClouds()
    }
    window.addEventListener('resize', handleResize)

    const resizeObserver = new ResizeObserver(() => {
      canvas.height = document.documentElement.scrollHeight
    })
    resizeObserver.observe(document.body)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
      resizeObserver.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="star-canvas" />
}

/* ───────────────────────────── COMPONENTS ───────────────────────────── */

function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="navbar">
      <a href="#home" className="nav-logo">
        <span className="logo-gothic">
          <span className="logo-l">L</span>
          <span className="logo-r">R</span>
          <span className="logo-m">M</span>
        </span>
        {' '}
        <span className="logo-port">Port</span>
        <span className="logo-folio">folio</span>
      </a>

      <ul className={`nav-links ${open ? 'active' : ''}`}>
        {navLinks.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </button>

        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-top">
        <div className="hero-content">
          <p className="hero-greeting">Hello, I am</p>
          <h1 className="hero-name">{personalInfo.name}</h1>
          <h2 className="hero-title">{personalInfo.title}</h2>
          <p className="hero-tagline">{personalInfo.tagline}</p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">
              Get in Touch
            </a>
            <a href="#skills" className="btn btn-outline">
              View Skills
            </a>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <div className="hero-image-placeholder">
            <span>LRM</span>
          </div>
          <div className="hero-image-glow" />
        </div>
      </div>

      <div id="about" className="about-landscape">
        <div className="about-landscape-left">
          <h3 className="about-landscape-title">About Me</h3>
          <p className="about-landscape-text">{personalInfo.about}</p>
        </div>
        <div className="about-landscape-right">
          <div className="stat">
            <span className="stat-number">3+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat">
            <span className="stat-number">20+</span>
            <span className="stat-label">Projects Done</span>
          </div>
          <div className="stat">
            <span className="stat-number">10+</span>
            <span className="stat-label">Happy Clients</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section id="skills" className="skills">
      <h2 className="section-title">My Skills</h2>
      <p className="section-subtitle">Technologies I work with</p>
      <div className="skills-grid">
        {skills.map((skill) => (
          <div className="skill-card" key={skill.name}>
            <div className="skill-icon" style={{ color: skill.color }}>
              {skill.icon}
            </div>
            <span className="skill-name">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function ContactAndComments() {
  const [comments, setComments] = useState([])
  const [form, setForm] = useState({ name: '', location: '', comment: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim() || !form.comment.trim()) return
    setComments([
      { ...form, id: Date.now() },
      ...comments,
    ])
    setForm({ name: '', location: '', comment: '' })
  }

  return (
    <section className="contact-comments-section">
      {/* LEFT — Visitor Comments */}
      <div id="comments" className="comments-panel">
        <h2 className="panel-title">Visitor Comments</h2>
        <p className="panel-subtitle">Leave a message — I would love to hear from you!</p>

        <form className="comment-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUserCircle className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              name="location"
              placeholder="Your Location"
              value={form.location}
              onChange={handleChange}
            />
          </div>
          <div className="input-group">
            <textarea
              name="comment"
              placeholder="Write your comment..."
              rows="3"
              value={form.comment}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary comment-submit">
            Post Comment
          </button>
        </form>

        <div className="comments-list">
          {comments.length === 0 && (
            <p className="no-comments">No comments yet. Be the first!</p>
          )}
          {comments.map((c) => (
            <div className="comment-card" key={c.id}>
              <div className="comment-header">
                <FaUserCircle className="comment-avatar" />
                <div>
                  <span className="comment-name">{c.name}</span>
                  {c.location && (
                    <span className="comment-location">
                      <FaMapMarkerAlt /> {c.location}
                    </span>
                  )}
                </div>
              </div>
              <p className="comment-body">{c.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Get in Touch */}
      <div id="contact" className="contact-panel">
        <h2 className="panel-title">Get in Touch</h2>
        <p className="panel-subtitle">
          Feel free to reach out — I am always open to new opportunities.
        </p>
        <div className="contact-links">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
            aria-label="GitHub"
          >
            <FaGithub />
            <span>GitHub</span>
          </a>
          <a
            href={personalInfo.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
            aria-label="Facebook"
          >
            <FaFacebook />
            <span>Facebook</span>
          </a>
          <a
            href={personalInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
            aria-label="Instagram"
          >
            <FaInstagram />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        &copy; {new Date().getFullYear()} Made with <FaHeart className="footer-heart" /> by Lovely Rose Militar
      </p>
    </footer>
  )
}

/* ───────────────────────────── APP ───────────────────────────── */

export default function App() {
  return (
    <ThemeProvider>
      <AnimatedBackground />
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <ContactAndComments />
      </main>
      <Footer />
    </ThemeProvider>
  )
}
