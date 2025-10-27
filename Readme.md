## Links

* Link do Vídeo - Parte 01: https://www.youtube.com/watch?v=Fzc_dnqD-V0

* Link do Vídeo - Parte 02: https://www.youtube.com/watch?v=qeF7ZN5TegY

* * https://sites.appbarber.com.br/

## Admin (opcional) – Firebase

Este projeto suporta um painel simples de administração para atualizar preços, chave PIX e dados do Wi‑Fi, sem precisar editar o código.

Arquivos envolvidos:
- `admin.html`: página de administração (login Google + formulário de edição)
- `admin.js`: lógica de autenticação e salvamento no Firestore
- `settings.js`: carrega as configurações públicas e aplica no `index.html`
- `firebase-config.js`: preencha com as chaves públicas do seu projeto Firebase

### Como configurar
1) Crie um projeto no Firebase Console e habilite:
	 - Firestore (modo de produção)
	 - Authentication com provedor Google
2) Em Configurações do projeto → Suas apps → Web, copie a configuração e preencha em `firebase-config.js`:
```
window.FIREBASE_CONFIG = {
	apiKey: "...",
	authDomain: "...",
	projectId: "...",
	appId: "...",
};
```
3) Publique regras do Firestore (exemplo: leitura pública do documento de settings e escrita restrita por e‑mail):
```
rules_version = '2';
service cloud.firestore {
	match /databases/{database}/documents {
		match /site/settings {
			allow read: if true;  // qualquer pessoa lê as infos públicas do site
			allow write: if request.auth != null &&
									 request.auth.token.email in ["seu-email-admin@exemplo.com"];
		}
	}
}
```

### Estrutura do documento
As configurações ficam em `site/settings` no Firestore, por exemplo:
```
{
	pix: { key: "69993318786" },
	wifi: { ssid: "ROCHA-2.4G", password: "JV303106" },
	prices: {
		tapFade: 40,
		midFade: 40,
		corteBarba: 65,
		platinado: 180,
		infantil: 40,
		lowFade: 40
	}
}
```

### Como usar
- Abra `admin.html`, faça login com Google e salve as alterações.
- A página `index.html` carrega automaticamente as configurações via `settings.js`.
- Se `firebase-config.js` não estiver configurado, o site continua exibindo os valores fixos do HTML.
