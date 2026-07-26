/**
 * Central content config.
 * Edit ALL landing-page copy here - every section imports from this file.
 *
 * Copy basada en: Brief_Web_Mapeo_Crypto_Bolivia_2026 (versión light).
 * Todo lo que dice "(en el ebook)" es lo que NO se revela en la web.
 */

export const site = {
  name: "Mapeo",
  tagline:
    "El primer mapeo integral del ecosistema crypto y blockchain en Bolivia.",
};

export const nav = {
  edition: "Edición 2026",
  links: [
    { label: "El hallazgo", href: "#hallazgo" },
    { label: "Web3 cívico", href: "#web3" },
    { label: "El ebook", href: "#descarga" },
  ],
  cta: { label: "Descargar el ebook", href: "#descarga" },
};

export const hero = {
  // Titular a dos líneas (la segunda va en esmeralda)
  titleLine1: "Mapeo del ecosistema cripto y blockchain en",
  titleLine2: "Bolivia",
  subtitle:
    "El primer mapeo integral del ecosistema crypto y blockchain en Bolivia: actores, regulación, volúmenes y las brechas que definen lo que viene. Con datos oficiales del BCB, ASFI y UIF.",
  cta: { label: "Descargar el ebook", href: "#descarga" },
  microcopy: "Gratis. Te lo enviamos a tu correo.",
  // Cifras destacadas bajo el CTA
  stats: [
    { value: "+630%", label: "crecimiento en un año" },
    { value: "10", label: "categorías de actores" },
    { value: "+90", label: "actores mapeados" },
    { value: "77/23", label: "brecha de género" },
  ],
};

// Mini línea de tiempo regulatoria (teaser - la completa va en el ebook)
export const timeline = {
  label: "Del veto a la habilitación",
  steps: [
    { year: "2014", title: "Prohibición", caption: "El BCB veta las criptomonedas." },
    { year: "2020", title: "Presión del dólar", caption: "La escasez de divisas empuja a stablecoins." },
    { year: "2024", title: "Habilitación", caption: "Se autorizan los activos virtuales." },
    { year: "2025", title: "Hacia una CBDC", caption: "El Estado explora moneda digital." },
  ],
};

// Sección "El hallazgo central"
export const hallazgo = {
  id: "hallazgo",
  eyebrow: "El hallazgo central",
  title:
    "La adopción real es mucho más grande de lo que dicen los números oficiales.",
  paragraphs: [
    "Bolivia pasó de diez años de prohibición a habilitar los activos virtuales. El detonante no fue la tecnología: fue la falta de dólares. Las stablecoins se volvieron el refugio de valor y el canal de pagos de facto.",
    "Pero hay una grieta entre lo que el Estado registra y lo que realmente ocurre en la cadena. Esa distancia es el dato más importante del mapeo.",
  ],
  note: "El número exacto, en el ebook.",
};

// Sección "Más que stablecoins"
export const web3 = {
  id: "web3",
  eyebrow: "Más que stablecoins",
  title: "Blockchain en Bolivia no es solo dólares digitales.",
  paragraphs: [
    "Hay una capa web3 no especulativa con el Estado, la academia y la sociedad civil de protagonistas: voto ciudadano con blockchain, tokenización del agro e inmobiliario, trazabilidad para exportación, una CBDC del banco central.",
    "El valor cívico y productivo, no la especulación, es lo que está moviendo la adopción.",
  ],
  note: "Los casos con nombres y cifras, en el ebook.",
};

// Sección de descarga (CTA final)
export const download = {
  id: "descarga",
  eyebrow: "Descarga",
  title: "El mapa está aquí. Los resultados concretos están en el ebook.",
  intro: "Dentro encontrarás:",
  contents: [
    "El directorio nombrado de +90 actores",
    "Los padrones ASFI",
    "Las tablas completas de volúmenes",
    "El benchmarking con Argentina y Brasil",
    "Los 10 insights desarrollados",
    "La línea de tiempo regulatoria completa",
  ],
  cta: { label: "Descargar el ebook", href: "#descarga" },
  microcopy: "Gratis. Te lo enviamos a tu correo.",
};

// Cajita de contacto (si una solución no respondió / corrección de datos)
export const contact = {
  id: "contacto",
  eyebrow: "Contacto",
  title: "¿Una solución no respondió?",
  body: "Si representas a un actor del ecosistema o quieres corregir un dato del mapeo, escríbenos. Respondemos.",
  cta: {
    label: "Escribirnos",
    href: "mailto:hola@mapeocrypto.bo?subject=Contacto%20Mapeo%20Crypto%20Bolivia",
  },
};

export const footer = {
  description:
    "El primer mapeo integral del ecosistema crypto y blockchain en Bolivia. Actores, regulación, volúmenes y las brechas que definen lo que viene.",
  // Aclaración a incluir una vez
  aclaracion:
    'En Bolivia "ETF" = Empresa de Tecnología Financiera (fintech), no Exchange Traded Fund.',
  disclaimer:
    "Tus datos no se comparten ni se venden. Este mapeo es un proyecto altruista: solo usamos tu correo para enviarte el ebook.",
  columns: [
    {
      title: "Contenido",
      links: [
        { label: "El hallazgo", href: "#hallazgo" },
        { label: "Web3 cívico", href: "#web3" },
        { label: "El ebook", href: "#descarga" },
      ],
    },
    {
      title: "Fuentes",
      links: [
        { label: "BCB", href: "#" },
        { label: "ASFI", href: "#" },
        { label: "UIF", href: "#" },
      ],
    },
    {
      title: "Contacto",
      links: [
        { label: "Escríbenos", href: "#contacto" },
        { label: "Prensa", href: "#contacto" },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} Mapeo Crypto Bolivia. Todos los derechos reservados. Realizado por Brissia, Emmi y Yhovana.`,
};
