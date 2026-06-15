import { Component, OnInit } from '@angular/core';

interface Palabra {
  texto: string;
  categoria: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})



export class AppComponent implements OnInit {
 
  listaPalabras: Palabra[] = [
    { texto: 'ANGULAR', categoria: 'Tecnología' },
    { texto: 'LINUX', categoria: 'Sistemas Operativos' },
    { texto: 'WSL', categoria: 'Entornos de Desarrollo' },
    { texto: 'TYPESCRIPT', categoria: 'Programación' },
    { texto: 'SISTEMA', categoria: 'Informática' }
  ];
  dificultad: 'FACIL' | 'MEDIO' | 'DIFICIL' = 'MEDIO';
  puntaje: number = 0;
recordMaximo: number = 0;

  palabraSecreta: string = '';
  categoriaActual: string = ''; 
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
    const guardado = localStorage.getItem('recordAhorcado');
    if (guardado) {
      this.recordMaximo = parseInt(guardado, 10);
    }
    this.iniciarJuego();
  }

  iniciarJuego(): void {
    //Seleccionar el objeto aleatorio de la lista estructurada
    const index = Math.floor(Math.random() * this.listaPalabras.length);
    
    //Extraemos las propiedades del objeto seleccionado
    this.palabraSecreta = this.listaPalabras[index].texto;
    this.categoriaActual = this.listaPalabras[index].categoria; 
    
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
      //Sumamos puntos y validamos el récord máximo
      if (!this.palabraOculta.includes('_')) {
        this.victoria = true;
        this.juegoTerminado = true;
        this.puntaje += 100; // +100 puntos por ganar
        if (this.puntaje > this.recordMaximo) {
          this.recordMaximo = this.puntaje;
          localStorage.setItem('recordAhorcado', this.recordMaximo.toString());
        }
      }
    } else {
      this.errores++;
      //Si pierde, la racha de puntos vuelve a 0
      if (this.errores >= this.intentosMaximos) {
        this.juegoTerminado = true;
        this.puntaje = 0; // Penalización por perder
      }
    }
  }

  letraDeshabilitada(letra: string): boolean {
    return this.letrasUsadas.includes(letra) || this.juegoTerminado;
  }
}