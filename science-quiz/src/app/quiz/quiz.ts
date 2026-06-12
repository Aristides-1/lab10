import { Component } from '@angular/core';
import { Question } from '../services/question';

@Component({
  selector: 'app-quiz',
  standalone: false,
  templateUrl: './quiz.html',
  styleUrl: './quiz.css'
})
export class Quiz {
  preguntas: any[] = [];
  indiceActual = 0;
  puntaje = 0;
  juegoFinalizado = false;

  constructor(private questionService: Question) {
    this.preguntas = this.questionService.obtenerPreguntas();
  }

  responder(opcion: string) {
    if (opcion === this.preguntas[this.indiceActual].respuesta) {
      this.puntaje++;
    }

    this.indiceActual++;

    if (this.indiceActual >= this.preguntas.length) {
      this.juegoFinalizado = true;
    }
  }

  reiniciarJuego() {
    this.indiceActual = 0;
    this.puntaje = 0;
    this.juegoFinalizado = false;
  }
}