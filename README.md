# Página de Jeez

1. Sube todo este contenido a un repo de GitHub (rama `main`).
2. Settings → Pages → Deploy from a branch → `main` / root.
3. Crea una API key de YouTube Data API v3 (Google Cloud Console).
4. Settings → Secrets and variables → Actions → New secret: `YT_API_KEY`.
5. Actions → "Actualizar estadisticas" → Run workflow (después corre solo cada 6 horas).

TikTok y Kick se editan a mano en `stats.json` (`tiktok.followers`, `kick.followers`).
