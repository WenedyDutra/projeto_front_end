import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
export enum  Status {
    NaoIniciado = 'NaoIniciado',
    EmAndamento = 'EmAndamento',
    Aguardando = 'Aguardando',
    Concluido = 'Concluido',
  }
@Pipe({name: 'transformstatus'})
export class Transformstatus implements PipeTransform {
  transform(value: Status): string {
    switch (value){
      case Status.NaoIniciado: return 'Não Iniciado'
      case Status.EmAndamento: return 'Em Andamento'
      case Status.Aguardando: return 'Aguardando'
      case Status.Concluido: return 'Concluído'
    };
  }
}