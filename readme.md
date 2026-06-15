# 🚀 Laboratorio 10 - Angular

📖 Descripción
Curso: Desarrollo de Aplicaciones Web
Profesor: Carlo Jose Luis Corrales Delgado

🕹️ Juego del Ahorcado - Angular 22 & WSL
▶️ Video de funcionalidad: https://www.youtube.com/watch?v=aGLnAU9gCyw
Una aplicación web interactiva, moderna y de alto rendimiento del clásico juego del "Ahorcado". Este proyecto fue desarrollado bajo la arquitectura de componentes autónomos de **Angular 22**, utilizando un entorno de desarrollo basado en **WSL Linux (Ubuntu)** y control de versiones estricto con Git.
---

## 🚀 Características Principales

* **Arquitectura Standalone:** Componentes independientes y ligeros.
* **Nuevo Flujo de Control:** Renderizado dinámico y eficiente en el HTML mediante las directivas nativas.
* **Gestión por Categorías:** Palabras estructuradas mediante una interfaz fuerte de TypeScript.
* **Persistencia Local:** Sistema de puntuación acumulativa y récord máximo grabado en el navegador a través de `LocalStorage`.
* **Dificultad Dinámica:** Modificación en tiempo real de los intentos máximos permitidos.
* **Temporizador de Adrenalina:** Cuenta regresiva asíncrona de 10 segundos por partida.
* **Audio Sintetizado:** Efectos de sonido retro generados mediante la API nativa `AudioContext` del navegador (sin archivos de audio externos).
* **Estética Geek/Hacker:** Interfaz personalizada con temática de programación, cuadrícula digital y animaciones reactivas de derrota.

---
## 🛠️ Tecnologías Utilizadas
* **Framework:** Angular 22 (Modo Standalone)
* **Lenguaje:** TypeScript / HTML5 / CSS3 (Animaciones avanzadas con `@keyframes`)
* **Entorno de Desarrollo:** WSL (Windows Subsystem for Linux) + Ubuntu
* **Control de Versiones:** Git (Flujo de trabajo incremental de 20 commits)
---
## 📂 Estructura de Archivos Clave
La estructura del componente principal mantiene una nomenclatura limpia y moderna:
```text
src/app/
├── app.ts   -> Lógica del juego, temporizadores y síntesis de audio (TypeScript)
├── app.html -> Interfaz de usuario estructurada con el flujo de control nativo
└── app.css  -> Estilos personalizados, cuadrícula de programación y animaciones
