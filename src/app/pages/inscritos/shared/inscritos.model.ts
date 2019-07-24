import { BaseResourceModel } from 'src/app/shared/models/base-resource-model.model';

export class Inscritos extends BaseResourceModel {
  public nome ?: string;
  public cpf ?: string;
  public email ?: string;
  public checkin ?: Date;
  public emailEnviado ?: boolean;
  public funcao ?: string;
  public tipoAtividade ?: string;
  constructor() {
    super();
  }
}
