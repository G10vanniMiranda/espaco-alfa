// Inicializa AOS (carregado com defer no head)
if (window.AOS && typeof AOS.init === 'function') {
    AOS.init();
}

// Helpers para abrir/fechar modais via classe 'hidden'
function openModal(selector) {
    const el = document.querySelector(selector);
    if (el) {
        el.classList.remove('hidden');
        el.setAttribute('aria-hidden', 'false');
    }
}

function closeModal(selector) {
    const el = document.querySelector(selector);
    if (el) {
        el.classList.add('hidden');
        el.setAttribute('aria-hidden', 'true');
    }
}

// Bind dos botões (defensivo: só se existir na página)
const btnClosePix = document.querySelector('#btn-modal-close');
const btnOpenPix = document.querySelector('#btn-modal-pix');
const btnCloseWifi = document.querySelector('#btn-modal-wifi-close');
const btnOpenWifi = document.querySelector('#btn-modal-wifi');

btnClosePix && btnClosePix.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal('.modal-pix');
});

btnOpenPix && btnOpenPix.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('.modal-pix');
});

btnCloseWifi && btnCloseWifi.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal('.modal-wifi');
});

btnOpenWifi && btnOpenWifi.addEventListener('click', (e) => {
    e.preventDefault();
    openModal('.modal-wifi');
});

// Copiar texto
function copiarTexto() {
    const chaveEl = document.getElementById('chave');
    if (!chaveEl) return;
    const chave = chaveEl.innerText;
    navigator.clipboard
        .writeText(chave)
        .then(() => {
            alert('Chave copiada: ' + chave);
        })
        .catch((err) => {
            console.error('Erro ao copiar: ', err);
        });
}