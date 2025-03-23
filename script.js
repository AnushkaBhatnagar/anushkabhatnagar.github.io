// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize doodles
    initDoodles();
    
    // Animate skill bars on scroll
    const skillsSection = document.querySelector('.skills-container');
    
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.skill-bar').forEach(bar => {
                        const percent = bar.getAttribute('data-percent');
                        bar.style.width = percent;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(skillsSection);
    }
    
    // Add random floating doodles
    createFloatingDoodles();
});

// Doodle initialization function
function initDoodles() {
    
    // Contact doodle
    drawContactDoodle();
    
    // Hero doodles
    drawHeroDoodles();
}

// Draw contact doodle
function drawContactDoodle() {
    const container = document.querySelector('.contact-doodle-container');
    
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 100;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Draw envelope
    ctx.beginPath();
    ctx.rect(110, 30, 80, 50);
    ctx.strokeStyle = '#8675a9';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw envelope flap
    ctx.beginPath();
    ctx.moveTo(110, 30);
    ctx.lineTo(150, 50);
    ctx.lineTo(190, 30);
    ctx.stroke();
    
    // Draw @ symbol
    ctx.font = '40px Caveat';
    ctx.fillStyle = '#a6c1ee';
    ctx.fillText('@', 220, 60);
}

// Hero doodles
function drawHeroDoodles() {
    const container = document.querySelector('.hero-doodle-container');
    
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    container.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Draw scattered creative elements
    const elements = [
        drawStar, drawCircle, drawTriangle, drawSquiggle, 
         drawWavyLine
    ];
    
    for (let i = 0; i < 40; i++) {
        const drawFunc = elements[Math.floor(Math.random() * elements.length)];
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 20 + 5;
        const opacity = Math.random() * 0.4 + 0.1;
        const color = (Math.random() > 0.5) ? 
            `rgba(166, 193, 238, ${opacity})` : 
            `rgba(251, 194, 235, ${opacity})`;
        
        drawFunc(ctx, x, y, size, color);
    }
}

// Drawing helper functions
function drawStar(ctx, x, y, size, color) {
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        ctx.lineTo(
            x + size * Math.cos((i * 2 * Math.PI / 5) - Math.PI/2),
            y + size * Math.sin((i * 2 * Math.PI / 5) - Math.PI/2)
        );
        ctx.lineTo(
            x + (size/2) * Math.cos(((i + 0.5) * 2 * Math.PI / 5) - Math.PI/2),
            y + (size/2) * Math.sin(((i + 0.5) * 2 * Math.PI / 5) - Math.PI/2)
        );
    }
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawCircle(ctx, x, y, size, color) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawTriangle(ctx, x, y, size, color) {
    ctx.beginPath();
    ctx.moveTo(x, y - size);
    ctx.lineTo(x + size, y + size);
    ctx.lineTo(x - size, y + size);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawSquiggle(ctx, x, y, size, color) {
    ctx.beginPath();
    ctx.moveTo(x - size, y);
    
    for (let i = 0; i < 4; i++) {
        const cp1x = x - size + (i * size/2);
        const cp1y = y + size;
        const cp2x = x - size + (i * size/2) + size/4;
        const cp2y = y - size;
        const endX = x - size + ((i+1) * size/2);
        const endY = y;
        
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
    }
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}

function drawWavyLine(ctx, x, y, size, color) {
    ctx.beginPath();
    ctx.moveTo(x - size, y);
    
    for (let i = 0; i < Math.floor(size/5); i++) {
        if (i % 2 === 0) {
            ctx.quadraticCurveTo(
                x - size + (i+0.5)*10, y + 10,
                x - size + (i+1)*10, y
            );
        } else {
            ctx.quadraticCurveTo(
                x - size + (i+0.5)*10, y - 10,
                x - size + (i+1)*10, y
            );
        }
    }
    
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
}



// Create floating doodles
function createFloatingDoodles() {
    const container = document.querySelector('.floating-doodles');
    
    if (!container) return;
    
    for (let i = 0; i < 15; i++) {
        const canvas = document.createElement('canvas');
        canvas.width = 40;
        canvas.height = 40;
        canvas.style.position = 'absolute';
        canvas.style.left = `${Math.random() * 100}%`;
        canvas.style.top = `${Math.random() * 100}%`;
        canvas.style.transform = `rotate(${Math.random() * 360}deg)`;
        canvas.style.opacity = '0.2';
        canvas.style.pointerEvents = 'none';
        canvas.style.transition = 'all 10s ease-in-out';
        container.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        
        // Draw a random doodle element
        const elements = [
            drawStar, drawCircle, drawTriangle, drawSquiggle, 
            drawWavyLine
        ];
        
        const drawFunc = elements[Math.floor(Math.random() * elements.length)];
        const color = (Math.random() > 0.5) ? '#a6c1ee' : '#fbc2eb';
        
        drawFunc(ctx, 20, 20, 10, color);
        
        // Animate the floating doodle
        setTimeout(() => {
            canvas.style.left = `${Math.random() * 100}%`;
            canvas.style.top = `${Math.random() * 100}%`;
            canvas.style.transform = `rotate(${Math.random() * 360}deg)`;
        }, 100);
        
        // Keep animating at random intervals
        setInterval(() => {
            canvas.style.left = `${Math.random() * 100}%`;
            canvas.style.top = `${Math.random() * 100}%`;
            canvas.style.transform = `rotate(${Math.random() * 360}deg)`;
        }, 10000 + Math.random() * 5000);
    }
}

// Get the dark mode toggle checkbox
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Check if user preference is stored in localStorage
document.addEventListener('DOMContentLoaded', function() {
    // Check if dark mode was previously enabled
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
});

// Add event listener to toggle dark mode
darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
        // Enable dark mode
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        // Disable dark mode
        document.body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
});

function zoom() {
    document.body.style.zoom = "80%" 
}