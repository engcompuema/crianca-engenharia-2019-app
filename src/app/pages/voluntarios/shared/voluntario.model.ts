import { BaseResourceModel } from 'src/app/shared/models/base-resource-model.model';

export class Voluntario extends BaseResourceModel {
  public nome ?: string;
  public cpf ?: string;
  public email ?: string;
  public emailEnviado ?: boolean;
  constructor() {
    super();
  }
}
