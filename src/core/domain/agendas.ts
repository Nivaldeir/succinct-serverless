import { BaseEntity } from "./baseEntity"

interface AgendaSchema {
  paciente_nome: string
  data_horario: Date
  medico_id: string
}
export class Agenda extends BaseEntity<AgendaSchema> {
  constructor(props: AgendaSchema, id?: string) {
    super(props, id)
  } 
}