/**
 * SiTech - Factoría de Software & Woodic CAD
 * Controladores de navegación, organigrama y contacto comercial
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initOrganigramaModal();
  initContactForm();
});

/* ==========================================================================
   1. NAVEGACIÓN MÓVIL
   ========================================================================== */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (toggle && toggle.checked) {
        toggle.checked = false;
      }
    });
  });
}

/* ==========================================================================
   2. FICHAS TÉCNICAS DE PUESTOS DEL ORGANIGRAMA
   ========================================================================== */
const ROLES_INFO = {
  pm: {
    title: "Project Manager",
    area: "Dirección de Tecnología — Departamento de Desarrollo",
    dependencia: "Gerente de Desarrollo",
    objetivo: "Garantizar la entrega de proyectos dentro de los plazos, costos y alcance definidos, optimizando recursos y minimizando riesgos.",
    funciones: [
      "Definir cronogramas, hitos y entregables de cada proyecto.",
      "Coordinar equipos multidisciplinarios de desarrollo y diseño.",
      "Gestionar riesgos, cambios de alcance y prioridades.",
      "Monitorear métricas de avance (KPIs).",
      "Actuar como nexo entre el cliente corporativo y el equipo técnico."
    ],
    competencias: "Liderazgo situacional, pensamiento estratégico, comunicación efectiva, gestión del tiempo y resolución de conflictos.",
    herramientas: "Metodologías ágiles (Scrum, Kanban), gestión de proyectos (PMBOK), Jira, Trello, ClickUp, documentación funcional."
  },
  backend: {
    title: "Desarrollador BackEnd",
    area: "Dirección de Tecnología — Departamento de Desarrollo",
    dependencia: "Gerente de Desarrollo",
    objetivo: "Desarrollar soluciones robustas, seguras y escalables que permitan el correcto funcionamiento de la lógica del sistema.",
    funciones: [
      "Implementar reglas de negocio y algoritmos de cálculo (como el motor de corte 2D y despiece en Woodic).",
      "Diseñar y desarrollar APIs RESTful y servicios de sincronización de catálogos.",
      "Integrar motores de persistencia, generación documental PDF y servicios externos.",
      "Manejar mecanismos de autenticación y autorización.",
      "Optimizar el rendimiento y tiempos de respuesta de consultas."
    ],
    competencias: "Pensamiento lógico y abstracto, resolución de problemas complejos, trabajo en equipo y adaptabilidad tecnológica.",
    herramientas: "C# / .NET 8, Python, Java, Node.js, arquitectura MVC y microservicios, SQL Server, PostgreSQL."
  },
  frontend: {
    title: "Desarrollador FrontEnd",
    area: "Dirección de Tecnología — Departamento de Desarrollo",
    dependencia: "Gerente de Desarrollo",
    objetivo: "Garantizar una interacción fluida, intuitiva y visualmente coherente entre el usuario y el sistema.",
    funciones: [
      "Desarrollar interfaces web, mobile y de escritorio (incluyendo visores interactivos 3D en WPF).",
      "Integrar datos y servicios provistos por el backend.",
      "Optimizar el rendimiento visual de la aplicación.",
      "Implementar diseños adaptables a distintas resoluciones."
    ],
    competencias: "Creatividad aplicada, atención al detalle, orientación al usuario y trabajo colaborativo.",
    herramientas: "HTML, CSS, JavaScript, React, Angular, WPF / XAML, Viewport3D, consumo de APIs."
  },
  analista: {
    title: "Analista Funcional",
    area: "Dirección de Tecnología — Departamento de Sistemas",
    dependencia: "Gerente de Sistemas",
    objetivo: "Asegurar que las soluciones desarrolladas respondan con exactitud a las necesidades operativas del usuario.",
    funciones: [
      "Relevar requerimientos funcionales y no funcionales en talleres y empresas.",
      "Elaborar documentación técnica y funcional.",
      "Modelar procesos productivos y administrativos.",
      "Validar soluciones y entregas junto a los stakeholders."
    ],
    competencias: "Pensamiento analítico, comunicación clara, escucha activa y capacidad de abstracción.",
    herramientas: "UML, BPMN, técnicas de relevamiento en terreno, documentación funcional y modelado de procesos."
  },
  data: {
    title: "Data Analyst / DB Administrator",
    area: "Dirección de Tecnología — Departamento de Sistemas",
    dependencia: "Gerente de Sistemas",
    objetivo: "Garantizar la integridad, disponibilidad, seguridad y eficiencia del almacenamiento de datos.",
    funciones: [
      "Diseñar estructuras relacionales de bases de datos.",
      "Administrar usuarios, perfiles y permisos de acceso.",
      "Ejecutar políticas de copias de respaldo (backups) y recuperación.",
      "Optimizar consultas (queries) e índices."
    ],
    competencias: "Pensamiento estructurado, precisión, atención al detalle y responsabilidad.",
    herramientas: "SQL avanzado, SQL Server LocalDB, MySQL, PostgreSQL, Oracle, indexación y seguridad de datos."
  },
  ui: {
    title: "Diseñador UI / UX",
    area: "Dirección de Tecnología — Departamento de Sistemas",
    dependencia: "Gerente de Sistemas",
    objetivo: "Optimizar la experiencia del usuario mediante el diseño visual, asegurando coherencia estética y facilidad de uso.",
    funciones: [
      "Diseñar interfaces gráficas para plataformas de gestión y aplicaciones CAD.",
      "Crear prototipos y wireframes navegables.",
      "Definir hojas de estilo, paletas y componentes visuales."
    ],
    competencias: "Creatividad, atención al detalle y empatía con el usuario.",
    herramientas: "Figma, Adobe XD, principios de diseño UX/UI y prototipado."
  },
  devops: {
    title: "Ingeniero DevOps",
    area: "Dirección de Tecnología — Departamento de Sistemas",
    dependencia: "Gerente de Sistemas",
    objetivo: "Asegurar la integración continua, el despliegue continuo y la estabilidad de los entornos de producción.",
    funciones: [
      "Implementar pipelines automatizados de CI/CD.",
      "Gestionar infraestructura cloud y empaquetado de versiones.",
      "Monitorear el estado de los servicios.",
      "Automatizar tareas operativas."
    ],
    competencias: "Pensamiento sistémico, proactividad y resolución de incidentes.",
    herramientas: "Docker, Kubernetes, AWS / Azure / GCP, Bash, Python, Prometheus y Grafana."
  },
  ciberseguridad: {
    title: "Especialista en CiberSeguridad",
    area: "Dirección de Tecnología — Departamento de Sistemas",
    dependencia: "Gerente de Sistemas",
    objetivo: "Garantizar la seguridad de la información y la continuidad operativa frente a amenazas internas y externas.",
    funciones: [
      "Identificar vulnerabilidades en sistemas, redes y bases de datos.",
      "Implementar políticas de seguridad, firmado digital y cifrado.",
      "Realizar auditorías y monitoreo preventivo."
    ],
    competencias: "Pensamiento crítico, ética profesional y atención al detalle.",
    herramientas: "Seguridad informática, criptografía, normativa ISO 27001 y análisis de riesgos."
  },
  qa: {
    title: "QA Tester Funcional",
    area: "Dirección de Tecnología — Departamento de Pruebas y Control",
    dependencia: "Gerente de Pruebas",
    objetivo: "Garantizar la calidad funcional del software detectando y reportando fallos en etapas tempranas del desarrollo.",
    funciones: [
      "Diseñar planes y casos de prueba.",
      "Ejecutar pruebas funcionales sobre los módulos de cálculo y gestión.",
      "Documentar, clasificar y dar seguimiento a los errores detectados."
    ],
    competencias: "Responsabilidad, pensamiento analítico y atención al detalle.",
    herramientas: "Metodologías ágiles, pruebas de software, TestRail, Jira y Zephyr."
  },
  rendimiento: {
    title: "Tester de Seguridad & Especialista en Rendimiento",
    area: "Dirección de Tecnología — Departamento de Pruebas y Control",
    dependencia: "Gerente de Pruebas",
    objetivo: "Asegurar la estabilidad, velocidad y solidez del software bajo condiciones de carga, concurrencia y estrés.",
    funciones: [
      "Diseñar y modelar escenarios de carga realistas.",
      "Monitorear el uso de recursos para identificar cuellos de botella.",
      "Realizar pruebas de penetración y evaluar mecanismos de autenticación y cifrado."
    ],
    competencias: "Capacidad analítica y de diagnóstico, ética y actualización constante.",
    herramientas: "JMeter, Gatling, Dynatrace, New Relic, estándar OWASP y auditoría técnica."
  },
  soporte: {
    title: "Técnico de Soporte & Administrador de Sistemas",
    area: "Dirección de Tecnología — Departamento de Soporte",
    dependencia: "Gerente de Soporte",
    objetivo: "Garantizar la continuidad operativa del servicio y la disponibilidad de la infraestructura tecnológica.",
    funciones: [
      "Atender incidencias técnicas, diagnosticar fallas e instalar/configurar software en las empresas clientes.",
      "Administrar servidores, redes y estaciones de trabajo.",
      "Gestionar usuarios, accesos y mantenimiento preventivo."
    ],
    competencias: "Comunicación, paciencia, responsabilidad y pensamiento técnico.",
    herramientas: "Sistemas operativos Linux/Windows, redes, administración de servidores y soporte técnico."
  }
};

function initOrganigramaModal() {
  const organNodes = document.querySelectorAll('.org-node-action');
  const modal = document.getElementById('role-detail-modal');
  const modalClose = document.getElementById('role-modal-close');
  const modalTitle = document.getElementById('role-modal-title');
  const modalArea = document.getElementById('role-modal-area');
  const modalDependencia = document.getElementById('role-modal-dependencia');
  const modalObjetivo = document.getElementById('role-modal-objetivo');
  const modalFunciones = document.getElementById('role-modal-funciones');
  const modalCompetencias = document.getElementById('role-modal-competencias');
  const modalHerramientas = document.getElementById('role-modal-herramientas');

  if (!modal || !organNodes.length) return;

  organNodes.forEach(node => {
    node.addEventListener('click', (e) => {
      e.preventDefault();
      const roleKey = node.getAttribute('data-role');
      const data = ROLES_INFO[roleKey];
      if (!data) return;

      modalTitle.textContent = data.title;
      modalArea.textContent = data.area;
      modalDependencia.textContent = "Dependencia jerárquica: " + data.dependencia;
      modalObjetivo.textContent = data.objetivo;

      modalFunciones.innerHTML = '';
      data.funciones.forEach(fn => {
        const li = document.createElement('li');
        li.textContent = fn;
        modalFunciones.appendChild(li);
      });

      modalCompetencias.textContent = data.competencias;
      modalHerramientas.textContent = data.herramientas;

      modal.classList.add('show');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  };

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   3. FORMULARIO DE CONTACTO COMERCIAL
   ========================================================================== */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre')?.value || 'Estimado/a';
    const empresa = document.getElementById('empresa-input')?.value || 'su organización';
    const tipo = form.querySelector('input[name="tipo"]:checked')?.value || 'woodic';

    let accionTexto = "la implementación y licencia del sistema Woodic";
    if (tipo === 'a-medida') accionTexto = "el servicio de Desarrollo de Software a Medida";
    if (tipo === 'auditoria') accionTexto = "una Auditoría de Madurez Digital";

    const btn = form.querySelector('button[type="submit"]');
    if (btn) {
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = "Consulta registrada";
      btn.style.backgroundColor = '#181716';
      btn.style.borderColor = '#181716';

      const alertBox = document.createElement('div');
      alertBox.className = 'form-success-banner';
      alertBox.innerHTML = `
        <div style="font-weight:700;margin-bottom:4px;font-size:14.5px;color:#181716;">Recepción confirmada — ${nombre}</div>
        <p style="margin:0;font-size:13.5px;color:#524F4A;line-height:1.5;">
          Hemos recibido la solicitud de <strong>${empresa}</strong> referente a <strong>${accionTexto}</strong>. Nuestro equipo comercial en San Miguel de Tucumán se pondrá en contacto a la brevedad.
        </p>
      `;

      form.appendChild(alertBox);

      setTimeout(() => {
        form.reset();
        btn.disabled = false;
        btn.innerHTML = originalText;
        btn.style.backgroundColor = '';
        btn.style.borderColor = '';
        alertBox.remove();
      }, 7000);
    }
  });
}
