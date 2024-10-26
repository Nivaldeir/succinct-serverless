import { MedicoRepository } from "../../application/medico.repository"

export class GetAgenda {
  constructor(private readonly medicoRepository: MedicoRepository) {}
  async exec() {
    const medicos = await this.medicoRepository.get()
    return medicos.map(medico => {
      return {
        id: medico.get("id"),
        nome: medico.get("nome"),
        especiailidade: medico.get("especiailidade"),
        horarios_disponiveis: medico.get("horarios_disponiveis")
      }
    })
  }
}