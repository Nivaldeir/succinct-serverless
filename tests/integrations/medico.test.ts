import { MedicoRepository } from "../../core/application/medico.repository";
import { Agenda } from "../../core/domain/agendas";
import { Medico } from "../../core/domain/medicos";
import { MockMedicoRepository } from "./mocks/mock.medico";


describe('Medicos', () => {
  let medico: Medico;
  let medicoRepository: MedicoRepository;

  beforeEach(() => {
    medico = new Medico({
      nome: "Dr. Silva",
      especiailidade: "Cardiologia",
      horarios_disponiveis: [new Date()],
    });

    medicoRepository = new MockMedicoRepository();
  });

  it('deve criar uma instância de Medico corretamente', () => {
    expect(medico.get("nome")).toBe("Dr. Silva");
    expect(medico.get("especiailidade")).toBe("Cardiologia");
    expect(Array.isArray(medico.get("horarios_disponiveis"))).toBe(true);
  });

  it('deve adicionar uma agenda ao médico', () => {
    const agendaMock = {
      paciente_nome: "Nivaldeir",
      data_horario: new Date(),
      medico_id: medico.get("id"),
    };
    const newAgenda = new Agenda(agendaMock);
    medico.addingAgenda(newAgenda);
    const agenda = medico.get("agenda")[0];
    expect(agenda.get("medico_id")).toBe(agendaMock.medico_id);
    expect(agenda.get("paciente_nome")).toBe(agendaMock.paciente_nome);
  });

  it('deve remover uma agenda do médico', () => {
    const agendaMock = {
      paciente_nome: "Nivaldeir",
      data_horario: new Date(),
      medico_id: medico.get("id"),
    };
    const newAgenda = new Agenda(agendaMock);
    medico.addingAgenda(newAgenda);
    medico.removingAgenda(newAgenda.get("id"));
    const agendas = medico.get("agenda");
    expect(agendas).not.toContainEqual(agendaMock);
  });

  it('deve retornar uma lista de médicos do repositório', async () => {
    const medicos = await medicoRepository.get();
    expect(medicos).not.toBeNull()
  });
});
