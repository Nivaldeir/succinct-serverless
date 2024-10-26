import { Medico } from "../domain/medicos";

export abstract class MedicoRepository {
  abstract get(): Promise<Medico[]>;
  abstract getById(id: string): Promise<Medico>;
}