# Configuración de Deployment

## Secrets de GitHub

Para que el workflow de deployment funcione, debes configurar los siguientes secrets en tu repositorio de GitHub:

### Pasos para agregar los secrets:

1. Ve a tu repositorio: https://github.com/codigoraul/grilliabogados-astro
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Secrets and variables** → **Actions**
4. Click en **New repository secret**
5. Agrega los siguientes secrets uno por uno:

### Secrets requeridos:

| Nombre | Valor |
|--------|-------|
| `FTP_SERVER` | `ftp.grilliabogados.cl` |
| `FTP_USERNAME` | `conexion@grilliabogados.cl` |
| `FTP_PASSWORD` | `[TU_CONTRASEÑA_FTP]` |

### Configuración FTP:
- **Servidor:** ftp.grilliabogados.cl
- **Puerto:** 21
- **Protocolo:** FTPS (FTP explícito)
- **Usuario:** conexion@grilliabogados.cl
- **Directorio remoto:** /public_html/prueba/
- **URL del sitio:** https://grilliabogados.cl/prueba

## Cómo funciona el deployment

El workflow se ejecutará automáticamente cuando:
- Hagas push a la rama `main`
- O manualmente desde la pestaña "Actions" en GitHub

### Proceso:
1. ✅ Descarga el código
2. ✅ Instala Node.js y dependencias
3. ✅ Construye el sitio con `npm run build`
4. ✅ Sube los archivos del directorio `dist/` al servidor FTP

## Deployment manual

También puedes ejecutar el deployment manualmente:
1. Ve a la pestaña **Actions** en GitHub
2. Selecciona el workflow "Deploy to FTP"
3. Click en **Run workflow**
4. Selecciona la rama `main` y confirma

## Notas importantes

- El directorio `dist/` contiene el sitio construido y es lo que se sube al servidor
- El workflow usa FTPS (FTP seguro) en el puerto 21
- Los archivos se suben a `/public_html/prueba/` en el servidor
- El sitio estará disponible en: https://grilliabogados.cl/prueba
- **IMPORTANTE:** Nunca compartas tu contraseña FTP públicamente
