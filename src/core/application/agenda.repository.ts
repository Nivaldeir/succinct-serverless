import { Agenda } from "../domain/agendas";

export abstract class AgendaRepository {
  abstract create(agenda: Agenda): Promise<void>;
  abstract getById(medicoId: string): Promise<Agenda[]>;
}