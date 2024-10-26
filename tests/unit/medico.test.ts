import { Agenda } from "../../core/domain/agendas";
import { Medico } from "../../core/domain/medicos";

describe('Medicos', () => {
  test('Deve criar um medico', () => {
    const input = {
      nome: "Nivaldeir",
      especiailidade: "Teste",
      horarios_disponiveis: [
        new Date()
      ]
    };
    const medico = new Medico(input);
    expect(medico.get("nome")).toEqual(input.nome);
    expect(medico.get("especiailidade")).toEqual(input.especiailidade);
    expect(medico.get("horarios_disponiveis")).toEqual(input.horarios_disponiveis);
  });

  test('Deve adicionar uma agenda', () => {
    const input = {
      nome: "Nivaldeir",
      especiailidade: "Teste",
      horarios_disponiveis: [
        new Date()
      ]
    };
    const medico = new Medico(input);
    const agenda = new Agenda({
      data_horario: new Date(),
      paciente_nome: "Nivaldeir",
      medico_id: medico.get("id")
    });
    medico.addingAgenda(agenda);
    expect(medico.get("agenda")[0]).toEqual(agenda);
  });

  test('Deve verificar se a agenda está ocupada para um horário específico', () => {
    const input = {
      nome: "Nivaldeir",
      especiailidade: "Teste",
      horarios_disponiveis: [
        new Date()
      ]
    };
    const medico = new Medico(input);
    const existingDate = new Date();
    const agenda1 = new Agenda({
      data_horario: existingDate,
      paciente_nome: "Paciente 1",
      medico_id: medico.get("id")
    });

    medico.addingAgenda(agenda1);
    expect(() => medico.addingAgenda(agenda1)).toThrow("Horário indisponível");
  });
});
