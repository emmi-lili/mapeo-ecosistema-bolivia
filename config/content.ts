/**
 * Central content config.
 * Edit ALL landing-page copy here — every section imports from this file.
 * Replace placeholder text, avatars and logos with your real assets.
 */

export const site = {
  name: "Mapeo",
  // Short tagline used in footer / meta description
  tagline: "Analítica simple y sin humo para tu producto.",
};

export const nav = {
  links: [
    { label: "Producto", href: "#producto" },
    { label: "Precios", href: "#precios" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Empezar", href: "#precios" },
};

export const hero = {
  // Titular a dos líneas (se renderiza con salto entre las dos partes)
  titleLine1: "Primer mapeo del ecosistema",
  titleLine2: "cripto y blockchain en Bolivia",
  subtitle:
    "Un directorio vivo de las startups, comunidades, exchanges y builders del cripto boliviano. Para encontrarse, colaborar e invertir sin depender del boca a boca.",
  cta: { label: "Descargar el ebook aquí", href: "#producto" },
  microcopy: "Gratis. Te lo enviamos a tu correo.",
  // Prueba social bajo el CTA
  socialProof: {
    count: "+2.400",
    label: "equipos ya lo usan",
    // Reemplaza por rutas reales; se usan como <img src>. Placeholder inicial.
    avatars: [
      "https://i.pravatar.cc/80?img=1",
      "https://i.pravatar.cc/80?img=5",
      "https://i.pravatar.cc/80?img=12",
      "https://i.pravatar.cc/80?img=32",
      "https://i.pravatar.cc/80?img=47",
    ],
  },
};

export const howItWorks = {
  eyebrow: "Cómo funciona",
  title: "En marcha en 3 pasos",
  subtitle: "Sin instalaciones complejas. Del registro al primer insight en minutos.",
  steps: [
    {
      number: "01",
      title: "Conecta tu producto",
      description:
        "Pega un snippet de una línea o usa una de nuestras integraciones nativas. Sin tocar tu backend.",
    },
    {
      number: "02",
      title: "Define lo que importa",
      description:
        "Marca los eventos y métricas clave con clics, no con código. Mapeo aprende de tu producto solo.",
    },
    {
      number: "03",
      title: "Toma decisiones",
      description:
        "Recibe informes claros y alertas accionables. Comparte con tu equipo en un enlace.",
    },
  ],
};

export const testimonials = {
  eyebrow: "Testimonios",
  title: "Equipos que ya lo entienden",
  items: [
    {
      quote:
        "Pasamos de pelearnos con hojas de cálculo a decisiones en minutos. Mapeo es lo primero que abre mi equipo cada mañana.",
      name: "Lucía Fernández",
      handle: "@lucia_builds",
      avatar: "https://i.pravatar.cc/80?img=45",
    },
    {
      quote:
        "La curva de aprendizaje es cero. Se lo enseñé a marketing en una tarde y ya sacan sus propios informes.",
      name: "Diego Ramírez",
      handle: "@dramirez",
      avatar: "https://i.pravatar.cc/80?img=15",
    },
    {
      quote:
        "Por fin una herramienta de analítica que no necesita un data engineer para funcionar. Justo lo que buscábamos.",
      name: "Marta Ibáñez",
      handle: "@marta_i",
      avatar: "https://i.pravatar.cc/80?img=25",
    },
  ],
};

// Iconos por nombre (lucide-react). Ver components/Features.tsx para el mapeo.
export const features = {
  eyebrow: "Features",
  title: "Todo lo que necesitas, nada de lo que sobra",
  items: [
    {
      icon: "Zap",
      title: "Tiempo real",
      description:
        "Cada evento aparece al instante. Sin esperas ni refrescos manuales.",
    },
    {
      icon: "ShieldCheck",
      title: "Privacidad primero",
      description:
        "Cumple con GDPR de serie. Sin cookies invasivas ni venta de datos.",
    },
    {
      icon: "LineChart",
      title: "Informes claros",
      description:
        "Gráficas que se leen de un vistazo, pensadas para humanos, no para analistas.",
    },
    {
      icon: "Bell",
      title: "Alertas inteligentes",
      description:
        "Te avisamos cuando algo cambia de verdad, no con ruido innecesario.",
    },
  ],
};

export const integrations = {
  eyebrow: "Integraciones",
  title: "Conecta con lo que ya usas",
  subtitle: "Con código o sin él. Tú eliges cómo empezar.",
  groups: [
    {
      label: "Con código",
      // Reemplaza por logos reales (SVG/PNG en escala de grises).
      logos: ["React", "Next.js", "Node", "Python", "Ruby", "Go"],
    },
    {
      label: "Sin código",
      logos: ["Webflow", "Shopify", "WordPress", "Wix", "Framer", "Squarespace"],
    },
  ],
};

export const founder = {
  eyebrow: "Nota del fundador",
  // Foto redonda — reemplaza por la real
  photo: "https://i.pravatar.cc/160?img=68",
  name: "Álvaro Núñez",
  role: "Fundador de Mapeo",
  // Párrafos de la carta
  paragraphs: [
    "Durante años monté productos y sufrí las mismas herramientas de analítica: potentes sobre el papel, imposibles en la práctica. Pasaba más tiempo configurando dashboards que entendiendo a mis usuarios.",
    "Construí Mapeo para la persona que fui: alguien que quiere respuestas claras sin necesitar un máster en datos. Nada de setups eternos, nada de gráficas que no dicen nada.",
    "Si le das una oportunidad, creo que vas a recuperar algo muy valioso: tu tiempo. Y si algo no encaja, escríbeme. Leo todos los mensajes.",
  ],
};

export const pricing = {
  eyebrow: "Precios",
  title: "Precios simples y honestos",
  subtitle: "Empieza gratis. Escala cuando lo necesites. Cancela cuando quieras.",
  plans: [
    {
      name: "Starter",
      price: "0€",
      period: "/mes",
      description: "Para proyectos que empiezan.",
      cta: { label: "Empezar gratis", href: "#" },
      popular: false,
      features: [
        "Hasta 10.000 eventos/mes",
        "1 proyecto",
        "Informes básicos",
        "Retención de 30 días",
      ],
    },
    {
      name: "Pro",
      price: "29€",
      period: "/mes",
      description: "Para equipos en crecimiento.",
      cta: { label: "Probar 14 días", href: "#" },
      popular: true,
      features: [
        "Hasta 500.000 eventos/mes",
        "Proyectos ilimitados",
        "Informes avanzados y alertas",
        "Retención de 12 meses",
        "Soporte prioritario",
      ],
    },
    {
      name: "Business",
      price: "99€",
      period: "/mes",
      description: "Para producto a escala.",
      cta: { label: "Hablar con ventas", href: "#" },
      popular: false,
      features: [
        "Eventos ilimitados",
        "Roles y permisos",
        "SSO y auditoría",
        "Retención personalizada",
        "Soporte dedicado",
      ],
    },
  ],
};

export const faq = {
  eyebrow: "FAQ",
  title: "Preguntas frecuentes",
  items: [
    {
      q: "¿Necesito conocimientos técnicos para empezar?",
      a: "No. Puedes instalar Mapeo pegando un snippet de una línea o usando una integración sin código. En pocos minutos estarás viendo datos.",
    },
    {
      q: "¿Mis datos están seguros?",
      a: "Sí. Cumplimos con GDPR, ciframos los datos en tránsito y en reposo, y nunca vendemos ni compartimos tu información con terceros.",
    },
    {
      q: "¿Puedo cancelar en cualquier momento?",
      a: "Por supuesto. No hay permanencia. Cancelas cuando quieras desde tu panel y conservas el acceso hasta el final del periodo pagado.",
    },
    {
      q: "¿Ofrecéis prueba gratuita?",
      a: "Sí, 14 días con todas las funciones del plan Pro y sin necesidad de tarjeta. Después puedes seguir en el plan gratuito si lo prefieres.",
    },
    {
      q: "¿Con qué herramientas se integra?",
      a: "Con las principales tecnologías con código (React, Next.js, Node, Python…) y plataformas sin código (Webflow, Shopify, WordPress y más).",
    },
  ],
};

export const finalCta = {
  title: "Empieza a entender tu producto hoy",
  subtitle: "Únete a miles de equipos que ya toman mejores decisiones con Mapeo.",
  cta: { label: "Empezar gratis", href: "#precios" },
  microcopy: "14 días gratis. Sin tarjeta.",
  // Reutiliza los avatares del hero por defecto
  avatars: hero.socialProof.avatars,
  socialLabel: `${hero.socialProof.count} ${hero.socialProof.label}`,
};

export const footer = {
  description:
    "Analítica de producto simple, privada y accionable. Hecha para gente que construye.",
  columns: [
    {
      title: "Producto",
      links: [
        { label: "Features", href: "#producto" },
        { label: "Precios", href: "#precios" },
        { label: "Integraciones", href: "#integraciones" },
        { label: "Changelog", href: "#" },
      ],
    },
    {
      title: "Recursos",
      links: [
        { label: "Documentación", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Guías", href: "#" },
        { label: "Estado", href: "#" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { label: "Sobre nosotros", href: "#" },
        { label: "Contacto", href: "#" },
        { label: "Privacidad", href: "#" },
        { label: "Términos", href: "#" },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Mapeo. Todos los derechos reservados.`,
};
