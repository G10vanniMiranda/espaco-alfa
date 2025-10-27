(function () {
  // Le as configurações do Firestore e aplica no DOM (preços, Wi‑Fi e Pix)
  function formatBRL(v) {
    if (v === undefined || v === null || v === "") return null;
    var num = typeof v === "number" ? v : Number(String(v).replace(/[^0-9.,-]/g, "").replace(",", "."));
    if (isNaN(num)) return null;
    try {
      return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    } catch (_) {
      return "R$ " + num.toFixed(2).replace(".", ",");
    }
  }

  function setText(id, text) {
    var el = document.getElementById(id);
    if (el && text != null) el.textContent = text;
  }

  function applySettings(data) {
    if (!data || typeof data !== "object") return;

    // Preços
    var prices = data.prices || {};
    if (prices.tapFade != null) setText("price-tap-fade", formatBRL(prices.tapFade));
    if (prices.midFade != null) setText("price-mid-fade", formatBRL(prices.midFade));
    if (prices.corteBarba != null) setText("price-corte-barba", formatBRL(prices.corteBarba));
    if (prices.platinado != null) setText("price-platinado", formatBRL(prices.platinado));
    if (prices.infantil != null) setText("price-infantil", formatBRL(prices.infantil));
    if (prices.lowFade != null) setText("price-low-fade", formatBRL(prices.lowFade));

    // Wi‑Fi
    var wifi = data.wifi || {};
    if (wifi.ssid) setText("wifi-ssid", wifi.ssid);
    if (wifi.password) setText("wifi-pass", wifi.password);

    // Pix
    var pix = data.pix || {};
    if (pix.key) setText("chave", pix.key);
  }

  function load() {
    try {
      if (!window.firebase || !window.FIREBASE_CONFIG || !window.FIREBASE_CONFIG.projectId) return;
      if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(window.FIREBASE_CONFIG);
      }
      var db = firebase.firestore();
      // Documento único com as configurações públicas do site
      var docRef = db.collection("site").doc("settings");
      docRef.get().then(function (snap) {
        if (snap.exists) {
          applySettings(snap.data());
        }
      }).catch(function (err) {
        console.warn("Falha ao carregar settings:", err);
      });
    } catch (err) {
      console.warn("Settings não aplicados:", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", load);
  } else {
    load();
  }
})();
