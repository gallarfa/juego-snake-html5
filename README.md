# Snake Game Pro 🐍

Bienvenido a **Snake Game Pro**, una implementación moderna y profesional del clásico juego de la viborita (Snake). Este proyecto está diseñado con un enfoque académico, demostrando buenas prácticas en el desarrollo frontend utilizando tecnologías web estándar.

## 🚀 Características

- **Diseño Moderno:** Interfaz de usuario atractiva con modo oscuro (Dark Mode), sombras suaves, colores vibrantes y una cuadrícula de fondo sutil.
- **Gráficos en Canvas:** Renderizado eficiente utilizando la API de HTML5 Canvas.
- **Sistema de Puntuación:** Seguimiento del puntaje actual y almacenamiento local (LocalStorage) del récord histórico (High Score).
- **Dificultad Progresiva:** La velocidad de la serpiente aumenta gradualmente a medida que consumes comida, aumentando el desafío.
- **Controles Intuitivos:** Soporte para teclas direccionales (Flechas) y teclas WASD.

## 🛠️ Tecnologías Utilizadas

Este proyecto fue desarrollado utilizando el tridente fundamental del desarrollo web:

1. **HTML5:** Estructuración semántica de la interfaz y provisión del elemento `<canvas>` para el renderizado del juego.
2. **CSS3:** Estilado del juego utilizando variables CSS para el manejo de colores, Flexbox para la disposición de elementos, y efectos visuales modernos (como `backdrop-filter` y `box-shadow`).
3. **JavaScript (ES6+):** Lógica principal del juego.
   - Manejo del estado (Posición de la serpiente, dirección, puntaje).
   - Bucle de juego optimizado usando `setTimeout`.
   - Detección de colisiones (con paredes y con el cuerpo de la serpiente).
   - Interactividad mediante Event Listeners.

## 📁 Estructura del Proyecto

```text
juego/
├── index.html    # Estructura principal del documento y la interfaz.
├── style.css     # Hoja de estilos con el diseño profesional y responsivo.
├── script.js     # Lógica del motor del juego y manipulación del DOM.
└── README.md     # Documentación del proyecto.
```

## 🎮 Cómo Jugar

1. **Instalación:** No requiere instalación. Simplemente abre la carpeta del proyecto.
2. **Ejecución:** Haz doble clic sobre el archivo `index.html` para abrirlo en tu navegador web de preferencia (se recomienda Google Chrome, Firefox o Edge).
3. **Controles:**
   - Haz clic en **Comenzar**.
   - Usa las **Flechas del teclado** (Arriba, Abajo, Izquierda, Derecha) o las teclas **W, A, S, D** para dirigir la serpiente.
   - Come los puntos rojos para ganar puntos y crecer.
   - ¡Evita chocar contra las paredes o contra tu propio cuerpo!

## 🎓 Objetivos del Proyecto

Este proyecto fue creado con el objetivo de presentar una solución completa, limpia y funcional para la materia de programación/desarrollo web, demostrando:
- Separación de responsabilidades (HTML para estructura, CSS para presentación, JS para comportamiento).
- Manipulación de elementos del DOM.
- Uso del contexto 2D de Canvas.
- Manejo del almacenamiento local en el navegador.

---
*Desarrollado para entrega académica.*
