import { Component } from '@angular/core';
import { QuestionService } from '../services/question.service';
@Component({
selector: 'app-quiz',
templateUrl: './quiz.component.html',
styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
preguntas: any[] = [];
indiceActual = 0;
puntaje = 0;
juegoFinalizado = false;
constructor(private questionService: QuestionService){
this.preguntas = this.questionService.obtenerPreguntas();
}
responder(opcion: string){
if(opcion === this.preguntas[this.indiceActual].respuesta){
this.puntaje++;
}

Desarrollo de Aplicaciones Web

4

this.indiceActual++;
if(this.indiceActual >= this.preguntas.length){
this.juegoFinalizado = true;
}
}
reiniciarJuego(){
this.indiceActual = 0;
this.puntaje = 0;
this.juegoFinalizado = false;
}
}