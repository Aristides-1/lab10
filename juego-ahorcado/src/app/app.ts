import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})



export class AppComponent implements OnInit {
 
  listaPalabras: string[] = ['ANGULAR', 'LINUX', 'WSL', 'TYPESCRIPT', 'PROGRAMACION', 'STANDALONE'];
  palabraSecreta: string = '';
  palabraOculta: string[] = [];
  letrasUsadas: string[] = [];
  
  intentosMaximos: number = 6;
  errores: number = 0;
  juegoTerminado: boolean = false;
  victoria: boolean = false;

  abecedario: string[] = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('');

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
    const index = Math.floor(Math.random() * this.listaPalabras.length);
    this.palabraSecreta = this.listaPalabras[index];
    
    this.palabraOculta = Array(this.palabraSecreta.length).fill('_');
    
    this.letrasUsadas = [];
    this.errores = 0;
    this.juegoTerminado = false;
    this.victoria = false;
  }

  intentarLetra(letra: string): void {
    if (this.letrasUsadas.includes(letra) || this.juegoTerminado) {
      return;
    }

    this.letrasUsadas.push(letra);

    if (this.palabraSecreta.includes(letra)) {
      for (let i = 0; i < this.palabraSecreta.length; i++) {
        if (this.palabraSecreta[i] === letra) {
          this.palabraOculta[i] = letra;
        }
      }
      if (!this.palabraOculta.includes('_')) {
        this.victoria = true;
        this.juegoTerminado = true;
      }
    } else {
      this.errores++;
      if (this.errores >= this.intentosMaximos) {
        this.juegoTerminado = true;
      }
    }
  }

  letraDeshabilitada(letra: string): boolean {
    return this.letrasUsadas.includes(letra) || this.juegoTerminado;
  }
}