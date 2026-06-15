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

tiempoRestante: number = 10; //temporizador de 10 segundos para cada intento
intervaloId: any;

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
    //Dificultad
    if (this.dificultad === 'FACIL') this.intentosMaximos = 6;
    if (this.dificultad === 'MEDIO') this.intentosMaximos = 5;
    if (this.dificultad === 'DIFICIL') this.intentosMaximos = 4;

  
    const index = Math.floor(Math.random() * this.listaPalabras.length);
    
    this.palabraSecreta = this.listaPalabras[index].texto;
    this.categoriaActual = this.listaPalabras[index].categoria; 
    
    //Reseteo de variables para un nuevo juego
    this.palabraOculta = Array(this.palabraSecreta.length).fill('_');
    this.letrasUsadas = [];
    this.errores = 0;
    this.juegoTerminado = false;
    this.victoria = false;

    
    this.manejarTiempo();
  } 

  manejarTiempo(): void {
    //Si ya hay un temporizador corriendo, lo limpiamos para que no se duplique
    if (this.intervaloId) {
      clearInterval(this.intervaloId);
    }
    
    this.tiempoRestante = 10; 

    this.intervaloId = setInterval(() => {
      if (!this.juegoTerminado) {
        this.tiempoRestante--;
        
        //Si el tiempo llega a 0, el estudiante pierde automáticamente la partida
        if (this.tiempoRestante <= 0) {
          this.juegoTerminado = true;
          this.puntaje = 0; // Penalización por perder
          clearInterval(this.intervaloId);
        }
      } else {
        clearInterval(this.intervaloId);
      }
    }, 1000); // Se ejecuta cada 1 segundo
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
      
      //Efecto de sonido agudo y limpio para acierto
      this.reproducirSonido(600, 'sine');

    
      if (!this.palabraOculta.includes('_')) {
        this.victoria = true;
        this.juegoTerminado = true;
        this.puntaje += 100; 
        
        // Actualizar el récord en LocalStorage si corresponde
        if (this.puntaje > this.recordMaximo) {
          this.recordMaximo = this.puntaje;
          localStorage.setItem('recordAhorcado', this.recordMaximo.toString());
        }
      }
      
    } else {
      
      this.errores++;
      
      //Efecto de sonido grave y seco para fallo
      this.reproducirSonido(150, 'square');

      // Validar si alcanzó el límite de fallos permitidos (Derrota)
      if (this.errores >= this.intentosMaximos) {
        this.juegoTerminado = true;
        this.puntaje = 0; // Rompe la racha de puntos acumulados
      }
    }
  }

  letraDeshabilitada(letra: string): boolean {
    return this.letrasUsadas.includes(letra) || this.juegoTerminado;
  }

  reproducirSonido(frecuencia: number, tipo: 'sine' | 'square') {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = tipo;
  osc.frequency.setValueAtTime(frecuencia, ctx.currentTime);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 0.4);
  osc.stop(ctx.currentTime + 0.4);
}
}