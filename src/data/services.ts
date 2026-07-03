export interface Service {
  slug: string;
  title: string;
  tag: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  items: string[];
  highlight: string;
  highlightAccent?: boolean;
  formTitle: string;
  formBtn: string;
  iconPath: string;
  related: string[];
}

export const services: Service[] = [
  {
    slug: 'defensa-judicial',
    title: 'Representación Judicial',
    tag: 'Área Jurídica',
    shortDesc: 'Representamos a personas y empresas en juicios civiles, familiares, laborales y patrimoniales con estrategias de defensa sólidas y eficaces.',
    longDesc: 'Representamos a personas y empresas en juicios civiles, familiares, laborales y patrimoniales, desarrollando estrategias de defensa sólidas y eficaces. Entendemos que detrás de cada juicio o demanda existe una persona que necesita respuestas claras, defensa sólida y resultados concretos.',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80',
    items: [
      'Demandas civiles',
      'Contestación de demandas',
      'Representación judicial',
      'Comparecencias',
      'Juicios Policía Local',
      'Indemnizaciones',
      'Recursos judiciales',
    ],
    highlight: '¿Le han presentado una demanda o necesita iniciar una? El tiempo es clave. Contáctenos de inmediato para preparar la mejor defensa.',
    formTitle: 'Evaluación de su caso',
    formBtn: 'QUIERO ASESORÍA LEGAL',
    iconPath: 'M14 4l6 6-8.5 8.5-6-6L14 4zM4 20l6-6',
    related: ['familia', 'laboral', 'mediacion'],
  },
  {
    slug: 'familia',
    title: 'Derecho de Familia',
    tag: 'Familia',
    shortDesc: 'Asesoría especializada en conflictos familiares complejos con enfoque estratégico y soluciones reales que protegen a su familia.',
    longDesc: 'Protegemos lo más importante. Ofrecemos asesoría especializada en conflictos familiares complejos con enfoque estratégico y soluciones reales. Entendemos la sensibilidad que rodea cada situación familiar y trabajamos con cercanía, discreción y compromiso para proteger a su familia.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80',
    items: [
      'Divorcio',
      'Compensación económica',
      'Pensión de alimentos',
      'Cuidado personal',
      'Relación directa y regular',
      'Violencia intrafamiliar',
      'Liquidación de sociedad conyugal',
      'Declaración Bien familiar',
    ],
    highlight: '¿Está atravesando una separación o conflicto familiar? Podemos acompañarle durante todo el proceso con discreción y estrategia.',
    formTitle: 'Cuéntenos su caso familiar',
    formBtn: 'SOLICITAR CONSULTA',
    iconPath: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10',
    related: ['defensa-judicial', 'mediacion', 'laboral'],
  },
  {
    slug: 'laboral',
    title: 'Derecho Laboral',
    tag: 'Laboral',
    shortDesc: 'Defensa efectiva frente a despidos injustificados, vulneración de derechos y conflictos laborales complejos.',
    longDesc: 'Protegemos sus derechos frente a despidos injustificados, vulneración de derechos y conflictos laborales complejos. Representamos tanto a trabajadores como a empleadores con estrategia sólida y experiencia en litigación laboral.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
    items: [
      'Despido injustificado',
      'Tutela laboral',
      'Accidentes del trabajo',
      'Cobro de prestaciones',
      'Indemnizaciones',
      'Defensa del empleador',
    ],
    highlight: '¿Lo despidieron injustificadamente? Tiene derechos. Podemos ayudarle a recuperar lo que le corresponde.',
    formTitle: 'Consulte su caso laboral',
    formBtn: 'QUIERO ASESORÍA LABORAL',
    iconPath: 'M2 7h20v14a2 2 0 01-2 2H4a2 2 0 01-2-2V7zM16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2',
    related: ['defensa-judicial', 'negligencia-medica', 'mediacion'],
  },
  {
    slug: 'negligencia-medica',
    title: 'Negligencia Médica',
    tag: 'Alta Especialización',
    shortDesc: 'Demandamos responsabilidad médica y buscamos indemnización real para nuestros clientes. Mala praxis, errores quirúrgicos, diagnóstico tardío.',
    longDesc: 'Esta es una de nuestras áreas más relevantes y de mayor impacto jurídico. Demandamos responsabilidad médica y buscamos indemnización real para nuestros clientes en el sistema público y privado. Si usted o un familiar sufrió una negligencia médica, podemos ayudarle.',
    image: '/images/servicios/negligencia-medica.webp',
    items: [
      'Mala praxis médica',
      'Errores quirúrgicos',
      'Diagnóstico tardío',
      'Falta de tratamiento oportuno',
      'Negligencia hospitalaria',
      'Responsabilidad médica privada y pública',
    ],
    highlight: 'Si sufrió una negligencia médica, podemos ayudarle. Evaluamos su caso de forma confidencial y le orientamos sobre las acciones legales disponibles.',
    highlightAccent: false,
    formTitle: 'Evaluación confidencial',
    formBtn: 'REVISAR MI CASO',
    iconPath: 'M22 12h-4l-3 9L9 3l-3 9H2',
    related: ['defensa-judicial', 'laboral', 'mediacion'],
  },
  {
    slug: 'mediacion',
    title: 'Mediación',
    tag: 'Mediación',
    shortDesc: 'Facilitamos acuerdos efectivos, rápidos y menos costosos. Resolver conflictos sin llegar a juicio también es una victoria.',
    longDesc: 'Resolver conflictos sin llegar a juicio también es una victoria. Facilitamos acuerdos efectivos, rápidos y menos costosos que el proceso judicial. La mediación permite a las partes llegar a soluciones concretas y duraderas con la guía de un mediador profesional.',
    image: '/images/servicios/mediacion.webp',
    items: [
      'Mediación familiar',
      'Acuerdos patrimoniales',
      'Mediación civil',
      'Solución de conflictos',
      'Negociación extrajudicial',
    ],
    highlight: '¿Por qué elegir la mediación? Es más rápida, menos costosa y preserva las relaciones. Nuestros mediadores tienen amplia experiencia en conflictos complejos.',
    formTitle: 'Solicite información',
    formBtn: 'QUIERO UN ACUERDO',
    iconPath: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
    related: ['familia', 'defensa-judicial', 'seleccion-personal'],
  },
  {
    slug: 'seleccion-personal',
    title: 'Selección de Personal',
    tag: 'Selección',
    shortDesc: 'Evaluamos, seleccionamos y apoyamos la contratación de perfiles estratégicos para empresas de La Araucanía.',
    longDesc: 'Reclutamiento profesional para empresas. Evaluamos, seleccionamos y apoyamos la contratación de perfiles estratégicos con el respaldo de profesionales del área psicosocial. Garantizamos la idoneidad de cada candidato mediante evaluación rigurosa.',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80',
    items: [
      'Reclutamiento',
      'Selección de personal',
      'Informes psicolaborales',
      'Entrevistas laborales',
      'Perfiles de cargo',
      'Evaluación de candidatos',
    ],
    highlight: '¿Necesita contratar personal clave? Nuestro equipo psicosocial le ayudará a encontrar el candidato ideal con evaluación rigurosa.',
    formTitle: 'Adjuntar tu currículum',
    formBtn: 'ENVIAR POSTULACIÓN',
    iconPath: 'M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM16 11l2 2 4-4',
    related: ['mediacion', 'laboral', 'defensa-judicial'],
  },
];

export function getService(slug: string) {
  return services.find(s => s.slug === slug);
}

export function getRelated(slugs: string[]) {
  return slugs.map(s => services.find(sv => sv.slug === s)).filter(Boolean) as Service[];
}
