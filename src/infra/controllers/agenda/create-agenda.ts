import { Request, Response, NextFunction } from "express";
import { Controller, HttpMethod } from "../../../@types/controller";
import { CreateAgenda } from "../../../core/services/agenda/create-agenda";
import { formatDate } from "../../../utils/date";


export type ResponseType = { 
  message: string
  agendamento: {
    medico: string,
    paciente: string,
    data_horario: string
  }
 }	 | { message: string }
export class CreateAgendaController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: CreateAgenda
  ) {}
  getHandler(): (request: Request<any>, response: Response<ResponseType>, next: NextFunction) => Promise<void> {
    return async (request, response): Promise<void> => {
      try {
        const { paciente_nome, data_horario, medico_id } = request.body
        if(!this.validateFields(request.body)){
          response.status(400).json({
            message: "Preencha todos os campos"
          })
          return
        }
        const result = await this.service.exec({ paciente_nome, data_horario, medico_id })
        response.status(200).json({
          agendamento: {
            data_horario: formatDate(new Date(result.agenda.get("data_horario"))),
            medico: result.medico,
            paciente: result.agenda.get("paciente_nome")
          },
          message: "Agendamento realizado com sucesso"
        });
      } catch (error: any) {
        response.status(400).json({
          message: error.message
        });
      }
    };
  }
  getPath(): string {
    return this.path
  }
  getMethod(): HttpMethod {
    return this.method
  }

  //Poderia usar o Zod para validar os campos mas para agilidade e por ser simples irei fazer desta forma
  private validateFields(body: object){
    const fields = ["paciente_nome", "data_horario", "medico_id",]
    return fields.every((field) => field in body)
  }
}
