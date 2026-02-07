// ========================================
// THEME TOGGLE
// ========================================
(function() {
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  htmlElement.setAttribute('data-theme', currentTheme);
  
  themeToggle.addEventListener('click', function() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
})();

// ========================================
// ANIMATED ROLE TITLES
// ========================================
(function() {
  const roles = [
    "Java / Spring Boot Developer",
    "Backend Developer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Microservice Architect",
    "Software Developer"
  ];
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  const roleTextElement = document.getElementById('role-text');
  
  function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      roleTextElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      roleTextElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500;
    }
    
    setTimeout(typeRole, typingSpeed);
  }
  
  setTimeout(typeRole, 1000);
})();

// ========================================
// SMOOTH SCROLLING
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === '#' + current) {
      const accentColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent-primary');
      link.style.color = accentColor;
    }
  });
});

// ========================================
// SCROLL ANIMATIONS
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements that should animate on scroll
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll(
    '.timeline-item, .project-card, .skill-category, .education-card, .stat-item'
  );
  
  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
let lastScrollTop = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    // Scrolling down
    nav.style.transform = 'translateY(-100%)';
  } else {
    // Scrolling up
    nav.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop;
});

// ========================================
// PARALLAX EFFECT FOR HERO BACKGROUND
// ========================================
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    const heroBackground = hero.querySelector('::before');
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ========================================
// CARD TILT EFFECT (SUBTLE)
// ========================================
document.querySelectorAll('.project-card, .skill-category, .education-card').forEach(card => {
  card.addEventListener('mousemove', function(e) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  });
  
  card.addEventListener('mouseleave', function() {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ========================================
// TIMELINE ANIMATION
// ========================================
const timelineObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.5
});

document.querySelectorAll('.timeline-item').forEach(item => {
  timelineObserver.observe(item);
});

// ========================================
// STATS COUNTER ANIMATION
// ========================================
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current) + '+';
    }
  }, 16);
}

const statsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numberElement = entry.target.querySelector('.stat-number');
      const targetValue = parseFloat(numberElement.textContent);
      animateCounter(numberElement, targetValue);
      statsObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

document.querySelectorAll('.stat-item').forEach(stat => {
  statsObserver.observe(stat);
});