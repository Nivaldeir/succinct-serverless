import { MedicoRepository } from "../../../core/application/medico.repository";
import { Medico } from "../../../core/domain/medicos";

const mockMedicoData = {
  nome: "Dr. Silva",
  especiailidade: "Cardiologia",
  horarios_disponiveis: [new Date()]
};
const mockMedico = new Medico(mockMedicoData);
export class MockMedicoRepository extends MedicoRepository {
  getById(id: string): Promise<Medico> {
    throw new Error("Method not implemented.");
  }
  async get(): Promise<Medico[]> {
    return [mockMedico];
  }
}