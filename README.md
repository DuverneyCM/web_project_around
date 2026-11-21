<!-- # Tripleten web_project_around_es -->

# TripleTen: Around The U.S. / Alrededor de EE.UU

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![POO](https://img.shields.io/badge/POO-3178C6?style=for-the-badge)
![BEM](https://img.shields.io/badge/Metodología_BEM-000000?style=for-the-badge&logo=bem&logoColor=white)

## 📌 Descripción del Proyecto

**Around The U.S.** es una aplicación web interactiva y responsiva para compartir y explorar fotografías de lugares. Forma parte del bootcamp de desarrollo web de **TripleTen**.

La aplicación permite consultar tarjetas desde una API, agregar lugares, dar o quitar "me gusta" y eliminar tarjetas después de confirmar la acción. También permite editar el nombre y la descripción del perfil, cambiar el avatar y abrir las fotografías en una vista ampliada. Las tarjetas se crean y actualizan en el servidor mediante solicitudes HTTP.

---

## 🚀 Características Principales

- **Diseño Responsivo (Mobile-First):** Adaptado de manera fluida para dispositivos móviles, tabletas y ordenadores de escritorio.
- **Perfil personalizable:** Edición del nombre y la descripción del usuario.
- **Galería de tarjetas:** Creación, eliminación, "me gusta" y vista ampliada de las fotografías.
- **Ventanas modales:** Formularios emergentes para editar el perfil y agregar tarjetas.
- **Validación de formularios:** Reglas de validación y mensajes de error para los campos de entrada.
- **TypeScript y POO:** Uso de clases y tipos para organizar y mantener el código.
- **Estructura CSS Modular:** Uso de la metodología **BEM (Block, Element, Modifier)** y arquitectura de archivos organizada.
- **Flexbox y Grid CSS:** Diseños modernos para la galería y distribución de elementos.

---

## 🛠️ Tecnologías y Herramientas Utilizadas

- **HTML5:** Marcador semántico y estructurado. Las tarjetas se generan a partir de templates.
- **CSS3:** Estilos avanzados, Flexbox, CSS Grid y Media Queries.
- **JavaScript:** Lógica del cliente, manejo de eventos y manipulación del DOM.
- **TypeScript:** Tipado estático para detectar errores y mejorar la claridad y mantenibilidad del código.
- **Fetch API y HTTP:** Comunicación con el servidor para consultar y modificar datos.
- **Promesas y funciones asíncronas:** `async`/`await` y `.then()` para procesar respuestas del servidor.
- **Manejo de excepciones:** Propagación de errores en la capa de API y captura en los flujos de formularios y confirmación.
- **POO:** Clases para popups, tarjetas, secciones, validación de formularios y comunicación con la API.
- **MutationObserver:** Observa cambios en el estado del popup para actualizar la validación del formulario cuando se abre.
- **Metodología BEM:** Para una nomenclatura limpia y mantenible en CSS.
- **Git y GitHub:** Control de versiones y despliegue del proyecto.

---

## 📚 Funcionalidad agregada en el Sprint 9

- Integración con la API del proyecto mediante solicitudes HTTP.
- Carga y actualización de tarjetas y perfil: agregar tarjetas, cambiar el avatar, gestionar "me gusta" y eliminar con confirmación.
- Uso de promesas y funciones asíncronas para esperar y procesar las respuestas.
- Manejo de excepciones durante las operaciones de datos.
- Indicadores temporales de actividad —como "Guardando..." y botones deshabilitados— mientras se procesan solicitudes.
- Efecto hover en la imagen de perfil: Al pasar el cursor sobre ésta, se atenúa y muestra un icono de edición para indicar que es interactiva.
- Uso de **OpenAI Codex** como herramienta de apoyo para depurar errores, revisar tipos y desarrollar funcionalidades.

---

## 📸 Capturas de Pantalla

|                    Vista de Escritorio                     |                       Vista Móvil                        |
| :--------------------------------------------------------: | :------------------------------------------------------: |
| _![Screen_1024](./docs/images/Screenshot_screen_1024.png)_ | _![Screen_320](./docs/images/Screenshot_screen_320.png)_ |

---

## 🔗 Enlaces del Proyecto

- **Repositorio en GitHub:** [DuverneyCM/web_project_around](https://github.com/DuverneyCM/web_project_around)
- **Página en Vivo ( [GitHub Pages](https://duverneycm.github.io/web_project_around/public/index.html) ):**

---

## ⚙️ Cómo ejecutar el proyecto localmente

Si deseas clonar y probar este proyecto en tu máquina local, sigue estos pasos:

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/DuverneyCM/web_project_around_es.git
   ```

2. **Abre la carpeta del proyecto** en tu editor de código favorito (por ejemplo, [Visual Studio Code](https://code.visualstudio.com/)).

3. **Ejecuta el proyecto:** Puedes abrir directamente el archivo `index.html` en tu navegador web, O utilizar una extensión como **Live Server** en VS Code para una mejor experiencia de desarrollo con recarga automática.

---

## 💡 Author

- **[DuverneyCM, M.Eng](https://github.com/DuverneyCM)** - _Web Development, SoC-FPGA & Embedded Systems_

---

> _Proyecto desarrollado como parte del plan de estudios de TripleTen._  
> _Este archivo fue generado 95% por IA :)_
