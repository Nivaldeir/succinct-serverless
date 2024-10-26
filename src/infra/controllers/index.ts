import { Controller } from "../../@types/controller";
import { CreateAgenda } from "../../core/services/agenda/create-agenda";
import { GetAgenda } from "../../core/services/medico/get-agenda";
import { AgendaDatabase } from "../database/fake.database/agenda.database";
import { MedicoDatabase } from "../database/fake.database/medico.database";
import { CreateAgendaController } from "./agenda/create-agenda";
import { GetMedicosController } from "./medicos/get-medicos";

export class ControllerFactory {
  static create(): Controller[] {
    const agendaRepository = new AgendaDatabase();
    const medicoRepository = new MedicoDatabase();
    const createAgenda = new CreateAgenda(agendaRepository, medicoRepository);
    const getAgenda = new GetAgenda(medicoRepository);
    return [
      new CreateAgendaController("/agenda", "post", createAgenda),
      new GetMedicosController("/agenda", "get", getAgenda),
    ]
  }
}