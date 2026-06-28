const urlParams = new URLSearchParams(window.location.search);
const tipo = urlParams.get('tipo'); 
const nome = urlParams.get('nome') || "Convidado";

let musica = null;

function iniciarTudo() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('convite').style.display = 'flex';
    
    document.getElementById('mensagem-personalizada').textContent = `${nome}, você é essencial para nós.`;
    
    musica = new Audio('um-eco-no-tempo.mp3');
    musica.play().catch(err => console.log('Erro ao tocar música:', err));
    
    setTimeout(revelarTexto, 1000);
}

function revelarTexto() {
    const el = document.getElementById('pergunta-convite');
    
    const frases = {
        'padrinho': "Aceita ser nosso Padrinho?",
        'madrinha': "Aceita ser nossa Madrinha?",
        'dama': "Aceita ser nossa Dama?",
        'pajem': "Aceita ser nosso Pajem?"
    };
    
    const textoCompleto = frases[tipo] || "Aceita ser nosso convidado especial?";
    
    let i = 0;
    el.textContent = "";
    
    const totalChars = textoCompleto.length;
    const intervalo = Math.floor(30000 / totalChars); // 30 segundos
    
    const typing = setInterval(() => {
        el.textContent += textoCompleto[i];
        i++;
        if (i >= totalChars) clearInterval(typing);
    }, intervalo);
}

function confirmarPresenca() {
    const conteudo = document.getElementById('conteudo-convite');
    conteudo.classList.add('saindo');
    
    setTimeout(() => {
        conteudo.classList.add('hidden');
        const popup = document.getElementById('popup-agradecimento');
        popup.classList.remove('hidden');
        popup.classList.add('entrando');
    }, 600);
}

function irParaWhatsApp() {
    window.location.href = "https://api.whatsapp.com/send/?phone=5521996285283&text=Olá! Recebi o convite e confirmo minha presença. Será uma honra!";
}