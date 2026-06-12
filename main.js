window.addEventListener('load', () => {

  // Barra de progreso 
  const progressBar = document.getElementById('reading-progress');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrolled / totalHeight * 100) + '%';
  });

  const bannerBg = document.getElementById('hbg');

  window.addEventListener('scroll', () => {
    bannerBg.style.transform = `scale(1.06) translateY(${window.scrollY * 0.28}px)`;
  });

  // Revela secciones al entrar a la vision
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('visible');

      // Las barras dentro del elemento arrancan con un pequeño delay
      entry.target.querySelectorAll('.bar-fill').forEach(bar => {
        const targetWidth = bar.getAttribute('data-w');
        if (targetWidth) {
          setTimeout(() => { bar.style.width = targetWidth + '%'; }, 300);
        }
      });
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Barras que están fuera de el alcance
  document.querySelectorAll('.bar-fill:not(.reveal *)').forEach(bar => {
    const targetWidth = bar.getAttribute('data-w');
    if (!targetWidth) return;

    const barObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        setTimeout(() => { bar.style.width = targetWidth + '%'; }, 300);
        barObserver.unobserve(bar);
      });
    }, { threshold: 0.5 });

    barObserver.observe(bar);
  });

  // Texto del banner
  document.querySelectorAll('.banner-content > *').forEach((el, i) => {
    const delay = i * 0.15 + 0.3;

    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  });

});