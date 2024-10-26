import { Agenda } from "./agendas"
import { BaseEntity } from "./baseEntity"

export interface MedicoSchema {
  nome: string
  especiailidade: string
  horarios_disponiveis: Date[]
  agenda: Agenda[]
}
export class Medico extends BaseEntity<MedicoSchema> {
  constructor(props: Omit<MedicoSchema, "agenda">, id?: string) {
    super({...props, agenda: []}, id)
  }
  addingAgenda(input: Agenda){
    const horario = input.get("data_horario");
    if (!this.isHorarioDisponivel(horario)) {
      throw new Error("Horário indisponível");
    }

    const agenda = this.get("agenda");
    agenda.push(input);
    this.set("agenda", agenda);
  }
  removingAgenda(id: string){
    const agenda = this.get("agenda")
    const updatedAgenda = agenda.filter(agenda => agenda.get("id") !== id)
    this.set("agenda", updatedAgenda)
  }
  private isHorarioDisponivel(data_horario: Date): boolean {
    const horariosDisponiveis = this.get("horarios_disponiveis");
    const agenda = this.get("agenda");

    const isDisponivel = horariosDisponiveis.some(
      (disponivel) => disponivel.getTime() === data_horario.getTime()
    );

    const isAgendado = agenda.some((item) => item.get("data_horario").getTime() === data_horario.getTime());
    return isDisponivel && !isAgendado;
  }
}