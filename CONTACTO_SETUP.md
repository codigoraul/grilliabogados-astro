# Configuración del Formulario de Contacto

## Archivos PHP

El sistema de formularios utiliza PHP para procesar y enviar los correos electrónicos.

### Archivos incluidos:

1. **`public/contacto.php`** - Script principal que procesa el formulario
2. **`public/contacto-config.php.example`** - Archivo de configuración de ejemplo

## Configuración

### 1. Crear archivo de configuración

Copia el archivo de ejemplo y configúralo:

```bash
cp public/contacto-config.php.example public/contacto-config.php
```

### 2. Editar configuración

Abre `public/contacto-config.php` y configura los valores:

```php
return [
  'BASE_PATH' => '/prueba',  // Ruta base del sitio
  'SITE_URL' => 'https://www.grilliabogados.cl',
  'TO_EMAIL' => 'grilliabogados@gmail.com',  // Email de destino
  'FROM_EMAIL' => 'contacto@grilliabogados.cl',
  'FROM_NAME' => 'Grilli Abogados',
  'BCC_EMAILS' => '',  // Opcional: emails en copia oculta
];
```

### 3. Configuración del servidor

El servidor debe tener:
- PHP 7.4 o superior
- Función `mail()` habilitada
- Permisos de escritura en `/tmp` para archivos temporales

## Características

✅ **Validación de campos obligatorios**
- Nombre, email y mensaje son requeridos

✅ **Protección anti-spam**
- Honeypot field (`_gotcha`)
- Validación de email

✅ **Soporte para archivos adjuntos**
- Solo en formulario de Selección de Personal
- Formatos: PDF, DOC, DOCX
- Tamaño máximo: 5MB

✅ **Email HTML profesional**
- Diseño con tabla estilizada
- Colores corporativos de Grilli Abogados
- Información del remitente para Reply-To

✅ **Respuestas JSON**
- Integración AJAX desde el frontend
- Mensajes de éxito/error personalizados

## Pruebas

### Modo debug

Para verificar la configuración sin enviar emails:

```
https://www.grilliabogados.cl/prueba/contacto.php?debug=1
```

Esto mostrará la configuración actual en formato JSON.

## Deployment

### Build

El archivo PHP se copia automáticamente a la carpeta `dist/` durante el build:

```bash
npm run build
```

### FTP

Asegúrate de que los archivos PHP se suban correctamente:
- `dist/contacto.php`
- `dist/contacto-config.php` (si existe)

## Solución de problemas

### Los emails no llegan

1. Verifica que la función `mail()` esté habilitada en el servidor
2. Revisa los logs del servidor PHP
3. Verifica que el email `FROM_EMAIL` esté configurado correctamente
4. Algunos servidores requieren que el dominio del `FROM_EMAIL` coincida con el dominio del sitio

### Error 500

1. Verifica los permisos del archivo PHP (644)
2. Revisa los logs de error de PHP
3. Asegúrate de que PHP 7.4+ esté instalado

### Archivos adjuntos no funcionan

1. Verifica el límite de `upload_max_filesize` en php.ini
2. Verifica el límite de `post_max_size` en php.ini
3. Asegúrate de que el formulario tenga `enctype="multipart/form-data"`

## Seguridad

- ✅ Sanitización de headers de email
- ✅ Validación de tipos de archivo
- ✅ Límite de tamaño de archivo
- ✅ Protección contra inyección de headers
- ✅ Honeypot anti-spam
- ✅ Validación de email con filter_var

## Soporte

Para problemas o preguntas, contacta al desarrollador.
