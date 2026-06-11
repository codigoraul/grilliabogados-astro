/**
 * Cliente para la REST API de WordPress (headless).
 *
 * WP_API_URL = URL base del WordPress (sin /wp-json), ej:
 *   - Local:  http://grilliabogados-cms.local
 *   - Remoto: https://grilliabogados.cl/admin
 *
 * Se lee de variable de entorno (archivo .env o secret de GitHub Actions).
 * Si la API no responde durante el build, el sitio se construye igual
 * con cero noticias (no rompe el deploy).
 */

const WP_BASE =
  import.meta.env.WP_API_URL ??
  process.env.WP_API_URL ??
  'http://localhost:10023';

const API = `${WP_BASE.replace(/\/$/, '')}/wp-json/wp/v2`;

export interface Post {
  id: number;
  slug: string;
  title: string;
  date: string;        // ISO
  dateFormatted: string; // ej. "11 de junio de 2026"
  excerpt: string;     // texto plano, sin HTML
  content: string;     // HTML del cuerpo
  image: string | null;
  imageAlt: string;
  categories: string[];
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8230;|\[&hellip;\]/g, '…')
    .replace(/\s+/g, ' ')
    .trim();
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function mapPost(raw: any): Post {
  const media = raw._embedded?.['wp:featuredmedia']?.[0];
  const cats: string[] =
    raw._embedded?.['wp:term']?.[0]?.map((t: any) => t.name) ?? [];

  return {
    id: raw.id,
    slug: raw.slug,
    title: stripHtml(raw.title?.rendered ?? ''),
    date: raw.date,
    dateFormatted: formatDate(raw.date),
    excerpt: stripHtml(raw.excerpt?.rendered ?? '').slice(0, 220),
    content: raw.content?.rendered ?? '',
    image: media?.source_url ?? null,
    imageAlt: media?.alt_text || stripHtml(raw.title?.rendered ?? ''),
    categories: cats,
  };
}

/** Todas las noticias publicadas (hasta 100), más recientes primero. */
export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(
      `${API}/posts?_embed=1&per_page=100&orderby=date&order=desc&status=publish`,
    );
    if (!res.ok) throw new Error(`WP API HTTP ${res.status}`);
    const data = await res.json();
    return (Array.isArray(data) ? data : []).map(mapPost);
  } catch (err) {
    console.warn(
      `⚠️  No se pudo conectar a WordPress (${API}). El sitio se construye sin noticias.`,
      err instanceof Error ? err.message : err,
    );
    return [];
  }
}
