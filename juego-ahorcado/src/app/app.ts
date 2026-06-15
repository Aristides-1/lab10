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