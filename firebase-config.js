// Preencha com as chaves públicas do seu projeto Firebase
// Estas chaves são públicas e podem ficar no frontend. NÃO coloque segredos aqui.
// Guia de configuração no README.

window.FIREBASE_CONFIG = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  appId: "",
};

(function initFirebase() {
  try {
    if (!window.firebase || !window.FIREBASE_CONFIG || !window.FIREBASE_CONFIG.projectId) {
      return; // sem firebase ou sem config: apenas ignore
    }
    // Evita inicializar duas vezes no modo compat
    if (!firebase.apps || !firebase.apps.length) {
      firebase.initializeApp(window.FIREBASE_CONFIG);
    }
    // Opcional: expõe para outros scripts
    window.firebaseApp = firebase.app();
    try {
      window.firebaseDb = firebase.firestore();
    } catch (e) {
      // Firestore não disponível nesta página (ex.: admin.html vai carregar o script correspondente)
    }
  } catch (err) {
    console.warn("Firebase init falhou:", err);
  }
})();
