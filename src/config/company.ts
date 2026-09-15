// ============================================================================
// NOVAREK TECHNOLOGIES — Datos centralizados de la empresa
// ============================================================================
// EDITAR AQUÍ: todos los datos visibles en la landing se configuran desde este
// archivo. Cuando tengas los datos reales (email, WhatsApp, ciudad, redes),
// reemplaza los valores placeholder.

const siteUrl = (
	import.meta.env.PUBLIC_SITE_URL ?? "https://novarek.mx"
).replace(/\/$/, "");

export const company = {
	// --- Identidad ---
	name: "Novarek Technologies",
	shortName: "NOVAREK",
	logo: "/brand/novarek-technologies-logo.png",
	siteUrl,
	tagline: "Software que ordena tu negocio.",
	description:
		"Creamos sistemas, portales y automatizaciones para empresas que quieren trabajar con más orden y menos tareas manuales.",

	// --- Contacto (✏️ EDITAR con datos reales) ---
	email: "contacto@novarek.mx", // TODO: reemplazar
	whatsapp: "+52 1 55 0000 0000", // TODO: reemplazar
	whatsappLink: "https://wa.me/5215500000000", // TODO: reemplazar
	city: "Ciudad de México", // TODO: reemplazar
	country: "México",
	location: "Ciudad de México, México", // TODO: reemplazar

	// --- Redes sociales (✏️ EDITAR; dejar string vacío para ocultar) ---
	social: {
		facebook: "https://www.facebook.com/profile.php?id=61593262486150",
		instagram: "",
		linkedin: "",
		twitter: "",
		github: "",
	},

	// --- SEO / meta ---
	metaTitle: "Software a medida para ordenar tu negocio | Novarek",
	metaDescription:
		"Novarek crea sistemas, portales y automatizaciones para empresas que quieren trabajar con más orden, menos tareas manuales y mejor atención a clientes.",

	// --- Año actual (footer) ---
	year: "2026",

	// --- Hero ---
	kicker: "// SISTEMAS DE NUEVA GENERACIÓN",
	heroSubtitle:
		"Diseñamos y construimos plataformas, aplicaciones e inteligencia artificial a la medida de tu negocio.",

	// --- Servicios ---
	serviceEyebrow: "Servicios",
	serviceTitle: "Todo lo que tu empresa necesita para crecer con tecnología.",
	serviceLede:
		"Un equipo multidisciplinario que cubre el ciclo completo de desarrollo: de la idea al despliegue.",
	services: [
		{
			icon: "terminal",
			title: "Sistemas a medida",
			description:
				"Software hecho para tu operación, no genérico. Diseñamos la arquitectura según tu problema real.",
		},
		{
			icon: "cpu",
			title: "Inteligencia artificial",
			description:
				"Modelos y agentes que resuelven tareas concretas: automatización, análisis y decisiones más inteligentes.",
		},
		{
			icon: "cloud-computing",
			title: "Cloud e infraestructura",
			description:
				"Arquitecturas escalables y seguras en la nube. Migraciones, CI/CD y optimización de costos.",
		},
		{
			icon: "device-mobile",
			title: "Apps móviles y web",
			description:
				"Productos digitales rápidos, accesibles y con experiencia impecable en cada dispositivo.",
		},
		{
			icon: "shield-check",
			title: "Seguridad y auditoría",
			description:
				"Protegemos tu información: revisiones de código, pruebas de penetración y cumplimiento normativo.",
		},
		{
			icon: "bolt",
			title: "Modernización de software",
			description:
				"Actualizamos sistemas heredados a tecnologías actuales sin detener tu operación.",
		},
	],

	// --- Proceso ---
	processTitle: "Un proceso claro, de la idea al lanzamiento.",
	processSteps: [
		{
			icon: "radar",
			title: "Descubrir",
			description:
				"Entendemos tu negocio, tu usuario y el problema exacto antes de escribir una sola línea.",
		},
		{
			icon: "pencil-code",
			title: "Diseñar",
			description:
				"Definimos arquitectura, experiencia y un plan técnico con entregables claros.",
		},
		{
			icon: "code",
			title: "Construir",
			description:
				"Desarrollo en ciclos cortos, con revisiones constantes y calidad verificable.",
		},
		{
			icon: "rocket",
			title: "Lanzar",
			description:
				"Desplegamos, medimos y seguimos mejorando. Tu sistema evoluciona con tu negocio.",
		},
	],

	// --- Stack ---
	stackTitle: "Tecnología que eligen las empresas que quieren avanzar.",
	techStack: [
		{
			category: "Frontend",
			tags: ["React", "Next.js", "Astro", "Vue", "TypeScript", "Tailwind"],
		},
		{
			category: "Backend",
			tags: ["Node.js", "Python", "Go", "GraphQL", "PostgreSQL", "Redis"],
		},
		{
			category: "Cloud y datos",
			tags: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Docker", "BigQuery"],
		},
		{
			category: "IA y automatización",
			tags: ["OpenAI", "Hugging Face", "LLMs", "RAG", "Agentes", "MLOps"],
		},
	],

	// --- Sectores (reemplaza la sección de proyectos inventados) ---
	sectorsTitle: "Sectores de impacto.",
	sectorsLede:
		"Aplicamos la misma disciplina técnica a industrias con necesidades muy distintas.",
	sectors: [
		{
			icon: "building-bank",
			title: "Fintech",
			description:
				"Plataformas de pago, banca digital y automatización de procesos financieros con seguridad de primera.",
		},
		{
			icon: "heart",
			title: "Salud",
			description:
				"Sistemas de gestión clínica, telemedicina y análisis de datos médicos con estándares de cumplimiento.",
		},
		{
			icon: "truck",
			title: "Logística",
			description:
				"Seguimiento en tiempo real, optimización de rutas y control de inventario para operaciones grandes.",
		},
		{
			icon: "shopping-cart",
			title: "Comercio",
			description:
				"Experiencias de compra rápidas, catálogos dinámicos y motores de recomendación que venden más.",
		},
		{
			icon: "school",
			title: "Educación",
			description:
				"Plataformas de aprendizaje, evaluación automatizada y contenido adaptativo para instituciones.",
		},
		{
			icon: "building-community",
			title: "Sector público",
			description:
				"Servicios digitales confiables y accesibles para gobiernos y organizaciones de gran escala.",
		},
	],
};

export type Company = typeof company;
