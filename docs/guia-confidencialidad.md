# Guía de confidencialidad y anonimización

Reglas para todo contenido del portafolio que se relacione con experiencia laboral anterior: textos del sitio, proyectos, casos QA, diagramas, README, commits y PRs.

Las reglas 1 y 3 están resumidas en `CLAUDE.md`. `src/test/confidentiality.test.ts` verifica automáticamente que el nombre del ex empleador y los mecanismos internos prohibidos no aparezcan en proyectos ni en casos QA.

## Reglas

1. **El nombre del ex empleador solo aparece en Experiencia** (empresa, cargo, fechas y una descripción genérica del rol). Nunca en proyectos, casos QA, diagramas, README, commits ni PRs. Ningún proyecto enlaza a esa entrada.
2. **Patrón, no implementación.** El problema se describe como lo reconocería cualquier empresa del rubro, y la solución con patrones (API intermedia, servicio de integración, ETL, máquina de estados).
3. **Tecnologías sí, mecanismos no.** Se pueden nombrar lenguajes, frameworks, bases de datos y el ERP como tecnología (SAP Business One / SAP HANA) en etiquetas y diagramas. Está prohibido nombrar sus mecanismos o artefactos internos: Transaction Notification, DI API, Service Layer, vistas, tablas, procedimientos, campos de usuario, JDBC, endpoints, reglas o nombres de objetos.
4. **Sin cifras de la empresa:** porcentajes, volúmenes, cantidad de sucursales, bodegas, usuarios, pedidos o registros. El impacto se describe de forma cualitativa, y tampoco se usan comparaciones que impliquen una medición ("de horas a minutos").
5. **Sin procesos internos:** flujos de aprobación, roles, nombres de áreas, documentos internos ni reglas de negocio propias.
6. **Diagramas en 4 capas genéricas:** Cliente → API → Worker/Adapter → Persistencia.
7. **Casos QA como propiedades verificables** (idempotencia, consistencia, concurrencia, robustez), con datos ficticios.
8. **Capturas:** solo del propio portafolio o de proyectos propios. Nunca de sistemas de la empresa.
9. **Datos de prueba en proyectos propios:** personas, direcciones y documentos siempre ficticios. Si se basan en casos reales, se usan lugares públicos o direcciones inventadas, nunca domicilios ni datos de clientes reales.
10. **Prueba de fuego antes de publicar:**
    - ¿Un competidor aprendería algo sobre cómo opera la empresa?
    - ¿Podría haberlo escrito alguien de cualquier otra empresa del rubro?
    Si la primera es "sí" o la segunda es "no", se reescribe.
11. **Ante la duda, no se publica** y se pregunta.
