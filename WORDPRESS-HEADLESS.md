# WordPress Headless — Noticias

## Arquitectura

```
WordPress (CMS)                Astro (build)                Sitio público
LocalWP local:10023    →    npm run build lee la     →    grilliabogados.cl/prueba
o grilliabogados.cl/admin    REST API y genera HTML        (estático, rápido, SEO)
```

La cliente escribe noticias en WordPress. Al publicar, un plugin avisa a GitHub
Actions, que reconstruye el sitio y lo sube por FTP. WordPress nunca sirve
páginas al público: solo es el panel de administración y la API.

## Archivos de esta integración

| Archivo | Qué hace |
|---|---|
| `src/lib/wp.ts` | Cliente de la REST API (lee `WP_API_URL`) |
| `src/pages/noticias/index.astro` | Listado de noticias |
| `src/pages/noticias/[slug].astro` | Detalle de cada noticia |
| `.env` | `WP_API_URL` local (no se sube a git) |
| `.github/workflows/deploy.yml` | Build con `WP_API_URL` + trigger desde WP |
| `wordpress/grilli-rebuild/` | Plugin WP que dispara el rebuild |

## Desarrollo local

1. LocalWP corriendo (sitio en `http://localhost:10023`).
   ⚠️ Si LocalWP cambia el puerto al reiniciar, actualiza `.env`.
2. `npm run dev` → abrir `http://localhost:4321/prueba/noticias`
3. Las entradas deben estar **Publicadas** (no borrador) y idealmente con
   **imagen destacada**.
4. En WP: **Ajustes → Enlaces permanentes → "Nombre de la entrada"**
   (si no, `/wp-json` no funciona).

## Migración LocalWP → grilliabogados.cl/admin

1. **Crear base de datos** en cPanel (MySQL Databases): BD + usuario + permisos.
2. **Exportar el sitio local**: en WP local instala el plugin
   **All-in-One WP Migration** → Exportar → Archivo (.wpress).
3. **Instalar WP remoto**: en cPanel (Softaculous/WordPress Manager) instala
   WordPress en la carpeta `admin` → quedará en `https://grilliabogados.cl/admin`.
4. **Importar**: en el WP remoto instala All-in-One WP Migration → Importar →
   sube el .wpress. Esto reemplaza todo (usuarios incluidos: entrarás con el
   usuario local `123`— cámbialo por una clave fuerte en producción ⚠️).
5. Re-guardar **Ajustes → Enlaces permanentes** después de importar.
6. Verificar: `https://grilliabogados.cl/admin/wp-json/wp/v2/posts` debe dar JSON.
7. **Seguridad mínima**: clave fuerte, plugin Limit Login Attempts, y mantener
   WP/plugins actualizados. Opcional: bloquear el front-end del WP con un
   plugin de "headless mode".

## Configurar el rebuild automático

### En GitHub (una sola vez)

1. **Variable**: repo → Settings → Secrets and variables → Actions →
   pestaña **Variables** → New variable:
   - `WP_API_URL` = `https://grilliabogados.cl/admin`
2. **Token para WP**: tu perfil GitHub → Settings → Developer settings →
   **Fine-grained tokens** → Generate:
   - Repository access: solo `grilliabogados-astro`
   - Permissions → **Contents: Read and write**
   - Copia el token (empieza con `github_pat_`).

### En WordPress (local y remoto)

1. Copiar la carpeta `wordpress/grilli-rebuild/` a `wp-content/plugins/`.
2. En `wp-config.php` agregar:
   ```php
   define('GRILLI_GITHUB_TOKEN', 'github_pat_AQUI_TU_TOKEN');
   ```
3. Activar el plugin en wp-admin → Plugins.

### Flujo de la cliente

1. Entra a `https://grilliabogados.cl/admin/wp-admin`
2. Entradas → Añadir nueva → título, contenido, imagen destacada → **Publicar**
3. En 2-3 minutos la noticia aparece en `grilliabogados.cl/prueba/noticias`
4. Si no aparece: wp-admin → **Herramientas → Publicar sitio** (botón manual)

También hay un rebuild automático diario a las 09:00 (hora Chile) como respaldo.

## Nota sobre imágenes

Las imágenes de las noticias se sirven directo desde WordPress
(`/admin/wp-content/uploads/...`). En producción funciona porque WP vive en el
mismo dominio. **Las imágenes subidas al WP local NO se verán en el sitio
remoto** hasta migrar el WP a producción.
