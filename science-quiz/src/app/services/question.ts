import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Question {
  preguntas = [
    {
      pregunta: '¿Qué lenguaje utiliza Angular?',
      opciones: ['Python', 'TypeScript', 'PHP', 'Java'],
      respuesta: 'TypeScript'
    },
    {
      pregunta: '¿Qué comando carga el servidor Angular?',
      opciones: ['npm start', 'ng serve', 'node app', 'angular run'],
      respuesta: 'ng serve'
    },
    {
      pregunta: '¿Qué directiva repite elementos?',
      opciones: ['*ngIf', '*ngFor', '*ngSwitch', '*ngModel'],
      respuesta: '*ngFor'
    }
  ];

  constructor() {}

  obtenerPreguntas() {
    return this.preguntas;
  }
}