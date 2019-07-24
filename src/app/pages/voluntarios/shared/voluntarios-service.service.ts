import { Voluntario } from './voluntario.model';

import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource-service.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class VoluntariosService extends BaseResourceService<Voluntario> {

  constructor(protected injector: Injector) {
    super('voluntario', injector);
  }

  importDataVoluntarios(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    console.log(file);
    return this.http.post(`${this.configService.getApiUrl()}${this.apiPath}`, formData).pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
      );
  }
}



