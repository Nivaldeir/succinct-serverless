import { MedicoRepository } from "../../../core/application/medico.repository";
import { Medico } from "../../../core/domain/medicos";

export class MedicoDatabase implements MedicoRepository {
  private medicos = [
    {
        "id": "4019825a-a100-4c1a-ab6c-1e8d19354c5e",
        "nome": "Dr. João da Silva",
        "especiailidade": "Cardiologia",
        "horarios_disponiveis": [
            "2024-10-30T12:00:00.000Z",
            "2024-10-30T17:00:00.000Z",
            "2024-10-31T14:00:00.000Z"
        ]
    },
    {
        "id": "e190e3e7-4d07-4dc2-b4bf-b1a6956aeba7",
        "nome": "Dra. Maria Oliveira",
        "especiailidade": "Pediatria",
        "horarios_disponiveis": [
            "2024-10-29T13:30:00.000Z",
            "2024-10-29T18:30:00.000Z",
            "2024-10-30T11:00:00.000Z"
        ]
    },
    {
        "id": "bcc28be0-3545-4d0f-8653-0f266a64111e",
        "nome": "Dr. Carlos Pereira",
        "especiailidade": "Dermatologia",
        "horarios_disponiveis": [
            "2024-10-31T15:00:00.000Z",
            "2024-10-31T19:30:00.000Z",
            "2024-11-01T12:30:00.000Z"
        ]
    }
]

 async getById(id: string): Promise<Medico> {
    const medico = await this.medicos.find(medico => medico.id === id)
    if(!medico) throw new Error("Medico nao encontrado")
    return new Medico({
      especiailidade: medico.especiailidade,
      horarios_disponiveis: medico.horarios_disponiveis.map(data => new Date(data)),
      nome: medico.nome
    }, medico.id)
  }
  async get(): Promise<Medico[]> {
    return this.medicos.map(medico => new Medico({
      especiailidade: medico.especiailidade,
      horarios_disponiveis: medico.horarios_disponiveis.map(data => new Date(data)),
      nome: medico.nome
    }, medico.id))
  }
}