import { AgendaRepository } from "../../application/agenda.repository"
import { MedicoRepository } from "../../application/medico.repository"
import { Agenda } from "../../domain/agendas"

export class CreateAgenda {
  constructor(
    private readonly agendaRepository: AgendaRepository,
    private readonly medicoRepository: MedicoRepository,
  ) {}
  async exec({ paciente_nome, data_horario, medico_id }: Props) {
    try {
      const isExist = await this.medicoRepository.getById(medico_id)
      const agenda = new Agenda({ paciente_nome, data_horario, medico_id })
      await this.agendaRepository.create(agenda)
      return {
        agenda,
        medico: isExist.get("nome"),
      }
    } catch (error) {
      throw error
    }
  }
}

type Props = {
  paciente_nome: string, 
  data_horario: Date
  medico_id: string
}