// Функция показа уведомления (добавь эту функцию)
function showNotification(message) {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--primary);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(108, 99, 255, 0.3);
        z-index: 10000;
        max-width: 300px;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        animation: slideIn 0.3s ease;
    `;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-info-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Удаляем уведомление через 5 секунд
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Добавляем стили для анимаций уведомлений
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Плавный скролл
document.querySelectorAll('.nav-links a, .btn, .logo').forEach(link => {
    link.addEventListener('click', function(e){
        if(this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Гамбургер меню
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('open');
    });
}

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (hamburger) hamburger.classList.remove('open');
    });
});

// Изменение хедера при скролле
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if(window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('animate-fadeIn');
        }
    });
}, observerOptions);

document.querySelectorAll('.course-card, .pricing-card, .feature, .tech-card').forEach(el => {
    observer.observe(el);
});


// Таймер для акции
function updateTimer() {
    const timerElement = document.getElementById('timer');
    if(timerElement) {
        const now = new Date();
        const endDate = new Date(now);
        endDate.setDate(now.getDate() + 2);
        
        const diff = endDate - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        timerElement.textContent = `${days}д ${hours}ч ${minutes}м ${seconds}с`;
    }
}

// Создаем элемент таймера если его нет
if(!document.getElementById('timer')) {
    const popularCard = document.querySelector('.pricing-card.popular .price');
    if (popularCard) {
        const timerElement = document.createElement('div');
        timerElement.id = 'timer';
        timerElement.style.cssText = 'font-size: 1.2rem; font-weight: bold; margin: 15px 0; color: var(--secondary);';
        popularCard.after(timerElement);
    }
}

if (document.getElementById('timer')) {
    setInterval(updateTimer, 1000);
    updateTimer();
}

// Функция для Instagram
function sendInstagramMessage() {
    const message = "Хочу обучаться в WebHCJ! 🚀";
    
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(message).then(() => {
            showNotification('Сообщение скопировано! 📋 Переходите в Instagram и отправьте его нам');
        }).catch(() => {
            showNotification('Открываем Instagram... Напишите нам "Хочу обучаться!" ✨');
        });
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = message;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('Сообщение скопировано! 📋 Переходите в Instagram и отправьте его нам');
        } catch (err) {
            showNotification('Открываем Instagram... Напишите нам "Хочу обучаться!" ✨');
        }
        document.body.removeChild(textArea);
    }
    
    setTimeout(() => {
        window.open('https://www.instagram.com/web__hcj/', '_blank');
    }, 1000);
    
    localStorage.setItem('webhcj_interest', 'true');
}

// Анимация для карточек технологий
document.addEventListener('DOMContentLoaded', function() {
    const techCards = document.querySelectorAll('.tech-card');
    
    const techObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });
    
    techCards.forEach(card => {
        card.style.animationPlayState = 'paused';
        techObserver.observe(card);
    });
});

// Typing animation for CTA
const typedText = document.querySelector('.typed-text');
const typingCode = document.querySelector('.typing-code');
const texts = [
  "Создай свой первый сайт",
  "Научись программировать", 
  "Стань веб-разработчиком",
  "Начни карьеру в IT"
];
const codeLines = [
   
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

function typeText() {
  const currentText = texts[textIndex];
  
  if (isDeleting) {
    typedText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }
  
  if (!isDeleting && charIndex === currentText.length) {
    isEnd = true;
    isDeleting = true;
    setTimeout(typeText, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex++;
    if (textIndex >= texts.length) textIndex = 0;
    setTimeout(typeText, 500);
  } else {
    const typeSpeed = isDeleting ? 50 : 100;
    setTimeout(typeText, typeSpeed);
  }
}

function typeCode() {
  const currentCode = codeLines[textIndex];
  typingCode.textContent = currentCode.substring(0, charIndex);
}

// Start typing animations
setTimeout(() => {
  typeText();
  typeCode();
}, 1000);

// Animate stats counter
function animateStats() {
  const stats = document.querySelectorAll('.stat-number');
  
  stats.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(current);
    }, 16);
  });
}

// Start stats animation when section is visible
const ctaObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateStats();
      ctaObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const ctaSection = document.querySelector('.interactive-cta');
if (ctaSection) {
  ctaObserver.observe(ctaSection);
}

// Progress steps animation
function animateProgressSteps() {
  const steps = document.querySelectorAll('.progress-step');
  let currentStep = 0;
  
  setInterval(() => {
    steps.forEach(step => step.classList.remove('active'));
    steps[currentStep].classList.add('active');
    currentStep = (currentStep + 1) % steps.length;
  }, 3000);
}

animateProgressSteps();

// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // If clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Auto-open first item
  setTimeout(() => {
    if (faqItems.length > 0) {
      faqItems[0].classList.add('active');
    }
  }, 1000);
});
// Additional footer animations
document.addEventListener('DOMContentLoaded', function() {
  // Add ripple effect to contact links
  const contactLinks = document.querySelectorAll('.contact-link');
  
  contactLinks.forEach(link => {
    link.addEventListener('mouseenter', function(e) {
      const ripple = this.querySelector('.contact-ripple');
      if (ripple) {
        ripple.style.width = '100px';
        ripple.style.height = '100px';
      }
    });
    
    link.addEventListener('mouseleave', function(e) {
      const ripple = this.querySelector('.contact-ripple');
      if (ripple) {
        ripple.style.width = '0';
        ripple.style.height = '0';
      }
    });
  });

  // Add floating animation to social buttons
  const socialBtns = document.querySelectorAll('.social-btn');
  
  socialBtns.forEach((btn, index) => {
    btn.style.animationDelay = `${index * 0.2}s`;
    btn.classList.add('social-float');
  });

  // Create additional CSS for social float
  const style = document.createElement('style');
  style.textContent = `
    .social-float {
      animation: social-float 3s ease-in-out infinite;
    }
    
    @keyframes social-float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-5px);
      }
    }
  `;
  document.head.appendChild(style);
});