(function () {
  // Referências para elementos da interface do painel de admin
  var ui = {
    login: document.getElementById("admin-login"),
    panel: document.getElementById("admin-panel"),
    btnGoogle: document.getElementById("btn-google"),
    btnLogout: document.getElementById("btn-logout"),
    form: document.getElementById("form-settings"),
    status: document.getElementById("status"),
    // Campos de entrada do formulário
    pixKey: document.getElementById("admin-pix-chave"),
    wifiSsid: document.getElementById("admin-wifi-ssid"),
    wifiPass: document.getElementById("admin-wifi-pass"),
    priceTapFade: document.getElementById("admin-price-tap-fade"),
    priceMidFade: document.getElementById("admin-price-mid-fade"),
    priceCorteBarba: document.getElementById("admin-price-corte-barba"),
    pricePlatinado: document.getElementById("admin-price-platinado"),
    priceInfantil: document.getElementById("admin-price-infantil"),
    priceLowFade: document.getElementById("admin-price-low-fade"),
  };

  // Mostra uma mensagem de status no topo do formulário
  function setStatus(msg, ok) {
    if (!ui.status) return;
    ui.status.textContent = msg || "";
    ui.status.style.color = ok ? "#2e7d32" : "#666";
  }

  function init() {
    try {
      // Verifica se o Firebase está configurado antes de iniciar
      if (!window.firebase || !window.FIREBASE_CONFIG || !window.FIREBASE_CONFIG.projectId) {
        setStatus("Configure o Firebase em firebase-config.js", false);
        return;
      }
      // Evita inicialização duplicada
      if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(window.FIREBASE_CONFIG);
      }
      var auth = firebase.auth(); // Autenticação (Google)
      var db = firebase.firestore(); // Banco de dados (Firestore)
      var docRef = db.collection("site").doc("settings"); // Documento único de configurações públicas

      // Observa mudanças de autenticação e alterna entre login e painel
      auth.onAuthStateChanged(function (user) {
        if (user) {
          ui.login.style.display = "none";
          ui.panel.style.display = "block";
          setStatus("Carregando configurações...", false);
          loadSettings();
        } else {
          ui.login.style.display = "block";
          ui.panel.style.display = "none";
          setStatus("", false);
        }
      });

      // Login com Google (popup)
      if (ui.btnGoogle) {
        ui.btnGoogle.addEventListener("click", function () {
          var provider = new firebase.auth.GoogleAuthProvider();
          auth.signInWithPopup(provider).catch(function (err) {
            alert("Falha ao autenticar: " + (err && err.message ? err.message : err));
          });
        });
      }

      // Logout
      if (ui.btnLogout) {
        ui.btnLogout.addEventListener("click", function () { auth.signOut(); });
      }

      // Converte entrada de texto em número (ou retorna null)
      function numberOrNull(v) {
        if (v === undefined || v === null || v === "") return null;
        var n = Number(String(v).replace(",", "."));
        return isNaN(n) ? null : n;
      }

      // Carrega configurações existentes do Firestore e preenche o formulário
      function loadSettings() {
        docRef.get().then(function (snap) {
          if (!snap.exists) { setStatus("Preencha e salve suas configurações.", false); return; }
          var data = snap.data() || {};
          // Pix
          ui.pixKey.value = (data.pix && data.pix.key) || "";
          // Wi‑Fi
          ui.wifiSsid.value = (data.wifi && data.wifi.ssid) || "";
          ui.wifiPass.value = (data.wifi && data.wifi.password) || "";
          // Preços
          var p = data.prices || {};
          ui.priceTapFade.value = p.tapFade != null ? p.tapFade : "";
          ui.priceMidFade.value = p.midFade != null ? p.midFade : "";
          ui.priceCorteBarba.value = p.corteBarba != null ? p.corteBarba : "";
          ui.pricePlatinado.value = p.platinado != null ? p.platinado : "";
          ui.priceInfantil.value = p.infantil != null ? p.infantil : "";
          ui.priceLowFade.value = p.lowFade != null ? p.lowFade : "";
          setStatus("Configurações carregadas.", true);
        }).catch(function (err) {
          console.error(err);
          setStatus("Erro ao carregar configurações.", false);
        });
      }

      // Salva alterações do formulário no Firestore
      if (ui.form) {
        ui.form.addEventListener("submit", function (e) {
          e.preventDefault();
          setStatus("Salvando...", false);
          var payload = {
            pix: { key: ui.pixKey.value.trim() || null },
            wifi: { ssid: ui.wifiSsid.value.trim() || null, password: ui.wifiPass.value.trim() || null },
            prices: {
              tapFade: numberOrNull(ui.priceTapFade.value),
              midFade: numberOrNull(ui.priceMidFade.value),
              corteBarba: numberOrNull(ui.priceCorteBarba.value),
              platinado: numberOrNull(ui.pricePlatinado.value),
              infantil: numberOrNull(ui.priceInfantil.value),
              lowFade: numberOrNull(ui.priceLowFade.value),
            },
            updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
          };
          docRef.set(payload, { merge: true }).then(function () {
            setStatus("Salvo com sucesso.", true);
          }).catch(function (err) {
            console.error(err);
            alert("Falha ao salvar: " + (err && err.message ? err.message : err));
            setStatus("Falha ao salvar.", false);
          });
        });
      }
    } catch (err) {
      console.warn("Admin falhou:", err);
      setStatus("Erro ao iniciar admin.", false);
    }
  }

  // Inicializa quando o DOM estiver pronto
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
