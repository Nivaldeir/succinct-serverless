import { Request, Response, NextFunction } from "express";
import { Controller, HttpMethod } from "../../../@types/controller";
import { MedicoSchema } from "../../../core/domain/medicos";
import { GetAgenda } from "../../../core/services/medico/get-agenda";
import { formatDate } from "../../../utils/date";
import { Replace } from "../../../@types/global";


export type ResponseType = { medicos: Replace<Omit<MedicoSchema, "agenda">, { horarios_disponiveis: string[]}>[] }	
export class GetMedicosController implements Controller {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly service: GetAgenda
  ) {}
  getHandler(): (request: Request<any>, response: Response<ResponseType>, next: NextFunction) => Promise<void> {
    return async (request, response): Promise<void> => {
      try {
        const result = await this.service.exec()
        response.status(200).json({
          medicos: result.map(medico => ({ ...medico, horarios_disponiveis: medico.horarios_disponiveis.map(data => formatDate(new Date(data))) })),
        });
      } catch (error) {
        response.status(400)
      }
    };
  }
  getPath(): string {
    return this.path
  }
  getMethod(): HttpMethod {
    return this.method
  }
}
