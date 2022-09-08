import { Pipe, PipeTransform } from '@angular/core';
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