import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [], // Vacío porque Angular 22 usa el nuevo @if y @for directamente
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  // Palabras para el juego
  listaPalabras: string[] = ['ANGULAR', 'LINUX', 'WSL', 'TYPESCRIPT', 'PROGRAMACION', 'STANDALONE'];
  palabraSecreta: string = '';
  palabraOculta: string[] = [];
  letrasUsadas: string[] = [];
  
  intentosMaximos: number = 6;
  errores: number = 0;
  juegoTerminado: boolean = false;
  victoria: boolean = false;

  // Abecedario para renderizar los botones en pantalla
  abecedario: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

  // Símbolos del ahorcado en ASCII que se ajustan progresivamente según los errores [0 a 6]
  fasesAhorcado: string[] = [
    `
       +---+
       |   |
           |
           |
           |
           |
     =========`,
    `
       +---+
       |   |
       O   |
           |
           |
           |
     =========`,
    `
       +---+
       |   |
       O   |
       |   |
           |
           |
     =========`,
    `
       +---+
       |   |
      /O   |
       |   |
           |
           |
     =========`,
    `
       +---+
       |   |
      /O\\  |
       |   |
           |
           |
     =========`,
    `
       +---+
       |   |
      /O\\  |
       |   |
      /    |
           |
     =========`,
    `
       +---+
       |   |
      /X\\  |  <-- ¡CORREA AJUSTADA!
       |   |
      / \\  |
           |
     =========`
  ];

  ngOnInit(): void {
    this.iniciarJuego();
  }

  iniciarJuego(): void {
    // Seleccionar palabra aleatoria
    const index = Math.floor(Math.random() * this.listaPalabras.length);
    this.palabraSecreta = this.listaPalabras[index];
    
    // Rellenar con guiones bajos según la longitud de la palabra secreta
    this.palabraOculta = Array(this.palabraSecreta.length).fill('_');
    
    // Resetear variables de control
    this.letrasUsadas = [];
    this.errores = 0;
    this.juegoTerminado = false;
    this.victoria = false;
  }

  intentarLetra(letra: string): void {
    // Si la letra ya fue pulsada o el juego acabó, bloquear acción
    if (this.letrasUsadas.includes(letra) || this.juegoTerminado) {
      return;
    }

    this.letrasUsadas.push(letra);

    if (this.palabraSecreta.includes(letra)) {
      // Acierto: Revelar la letra en la palabra oculta
      for (let i = 0; i < this.palabraSecreta.length; i++) {
        if (this.palabraSecreta[i] === letra) {
          this.palabraOculta[i] = letra;
        }
      }
      // Verificar si ya no quedan letras ocultas para declarar victoria
      if (!this.palabraOculta.includes('_')) {
        this.victoria = true;
        this.juegoTerminado = true;
      }
    } else {
      // Error: Sumar un fallo para cambiar el dibujo ASCII
      this.errores++;
      if (this.errores >= this.intentosMaximos) {
        this.juegoTerminado = true;
      }
    }
  }

  // Deshabilitar botones si ya se usaron o si terminó el juego
  letraDeshabilitada(letra: string): boolean {
    return this.letrasUsadas.includes(letra) || this.juegoTerminado;
  }
}