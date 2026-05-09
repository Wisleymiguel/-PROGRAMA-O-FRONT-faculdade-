// ===== MENU HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Fecha menu ao clicar em link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ===== EFEITO 1: SKILL CARDS — highlight ao hover =====
document.querySelectorAll('.skill-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 0 24px rgba(0, 229, 255, 0.15)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = 'none';
  });
});

// ===== EFEITO 2: FILTRO DE PROJETOS =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active de todos
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeIn 0.3s ease';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ===== VALIDAÇÃO DO FORMULÁRIO =====
function validarFormulario() {
  let valido = true;

  const campos = [
    { id: 'nome', erroId: 'erro-nome', msg: 'Por favor, informe seu nome.' },
    { id: 'assunto', erroId: 'erro-assunto', msg: 'Por favor, informe o assunto.' },
    { id: 'mensagem', erroId: 'erro-mensagem', msg: 'Por favor, escreva sua mensagem.' },
  ];

  // Limpa erros anteriores
  document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
  document.querySelectorAll('input, textarea').forEach(el => el.classList.remove('erro'));

  // Valida campos simples
  campos.forEach(({ id, erroId, msg }) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (!el.value.trim()) {
      document.getElementById(erroId).textContent = msg;
      el.classList.add('erro');
      valido = false;
    }
  });

  // Valida e-mail
  const emailEl = document.getElementById('email');
  if (emailEl) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailEl.value.trim()) {
      document.getElementById('erro-email').textContent = 'Por favor, informe seu e-mail.';
      emailEl.classList.add('erro');
      valido = false;
    } else if (!emailRegex.test(emailEl.value)) {
      document.getElementById('erro-email').textContent = 'E-mail inválido.';
      emailEl.classList.add('erro');
      valido = false;
    }
  }

  // Se válido, mostra mensagem de sucesso
  if (valido) {
    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('form-success').classList.remove('hidden');k
  }

  return valido;
}

// ===== ANIMAÇÃO DE ENTRADA (scroll) =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.skill-card, .project-card, .stat-card, .timeline-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});