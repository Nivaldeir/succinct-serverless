import { AgendaRepository } from "../../../core/application/agenda.repository";
import { Agenda } from "../../../core/domain/agendas";

export class AgendaDatabase implements AgendaRepository {
  private agenda: Agenda[] = []

  
  async getById(medicoId: string): Promise<Agenda[]> {
    const agenda = this.agenda.filter(agenda => agenda.get("medico_id") === medicoId)
    return agenda
  }
  
  async create(agenda: Agenda): Promise<void> {
    this.agenda.push(agenda)
  }
}