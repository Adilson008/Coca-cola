// Registra o plugin de Scroll do GSAP
gsap.registerPlugin(ScrollTrigger);

// 1. Navbar Dinâmica e Dark Mode
const header = document.getElementById('navbar');
const themeToggle = document.getElementById('theme-toggle');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if(document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
    }
});

// 2. Animações Premium com GSAP
// Animação inicial do Hero
gsap.from(".hero h1", { duration: 1.5, y: 100, opacity: 0, ease: "power4.out", delay: 0.2 });
gsap.from(".hero p", { duration: 1.5, y: 50, opacity: 0, ease: "power4.out", delay: 0.5 });

// Efeito Parallax nas bolhas baseado no movimento do mouse (Microinteração)
document.addEventListener("mousemove", parallax);
function parallax(e) {
    document.querySelectorAll(".bubble").forEach(function(move){
        var moving_value = move.classList.contains('b1') ? 5 : (move.classList.contains('b2') ? -8 : 3);
        var x = (e.clientX * moving_value) / 250;
        var y = (e.clientY * moving_value) / 250;
        move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
    });
}

// Animação de entrada das seções no Scroll
gsap.utils.toArray('.panel').forEach(panel => {
    if(panel.id !== 'hero') {
        gsap.from(panel.querySelector('.section-title'), {
            scrollTrigger: {
                trigger: panel,
                start: "top 80%",
            },
            y: 50, opacity: 0, duration: 1, ease: "back.out(1.7)"
        });
    }
});

// 3. Lógica Gamificada (Engine de XP)
let userXP = 0;
const maxXP = 100;
const xpFill = document.getElementById('xp-fill');
const xpText = document.getElementById('xp-text');

// Função acionada ao clicar em produtos
function gainXP(amount, element) {
    if (element.classList.contains('unlocked')) return; // Impede duplo clique

    // Atualiza Lógica
    userXP += amount;
    if (userXP > maxXP) userXP = maxXP;

    // Atualiza UI da Gamificação
    element.classList.add('unlocked');
    xpFill.style.width = `${(userXP / maxXP) * 100}%`;
    xpText.innerText = `${userXP} / ${maxXP} XP`;

    // Efeito visual com GSAP no clique
    gsap.to(element, { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 });

    // Verifica Conquistas
    checkAchievements();
}

// 4. Lógica do Mini-Game de Carreiras
function startProfileTest() {
    const resultText = document.getElementById('test-result');
    resultText.classList.remove('hidden');
    resultText.innerText = "Analisando algoritmos de personalidade...";
    
    // Simula tempo de processamento
    setTimeout(() => {
        const perfis = ["Desenvolvedor de Inovação", "Estrategista de Marketing", "Engenheiro de Sustentabilidade", "Designer de Experiência"];
        const perfilSorteado = perfis[Math.floor(Math.random() * perfis.length)];
        
        resultText.innerText = `Seu perfil ideal é: ${perfilSorteado}! +50 XP concedidos.`;
        
        // Concede XP pelo teste
        gainXP(50, document.createElement('div')); // Div fantasma só pra burlar o check
    }, 1500);
}

// Destrava benefícios baseados no XP (Level Up)
function checkAchievements() {
    if (userXP >= 25) unlockBenefit('ben-1', 'Bônus Global Ativado!');
    if (userXP >= 50) unlockBenefit('ben-2', 'Trilha Flexível Desbloqueada!');
    if (userXP >= 75) unlockBenefit('ben-3', 'Gympass Pro Liberado!');
    if (userXP >= 100) unlockBenefit('ben-4', 'Ações da Empresa! Nível Máximo!');
}

function unlockBenefit(id, message) {
    const benCard = document.getElementById(id);
    if (benCard && benCard.classList.contains('locked')) {
        benCard.classList.remove('locked');
        benCard.classList.add('unlocked');
        benCard.innerHTML = `<i class="fas fa-unlock"></i><span>${message}</span>`;
        
        // Anima o destravamento
        gsap.from(benCard, { scale: 0.5, rotation: 15, opacity: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
    }
}