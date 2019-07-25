import {  Inscritos } from './inscritos.model';

import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from 'src/app/shared/services/base-resource-service.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class InscritosService extends BaseResourceService<Inscritos> {

  constructor(protected injector: Injector) {
    super('inscritos', injector);
  }

  importData(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.configService.getApiUrl()}${this.apiPath}`, formData).pipe(
        map(this.jsonDataToResource.bind(this)),
        catchError(this.handleError)
      );
  }

  sendConfirmacao(id) {
    return this.http.post(`${this.configService.getApiUrl()}${this.apiPath}/${id}/sendConfirmacao`, id).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }
}



