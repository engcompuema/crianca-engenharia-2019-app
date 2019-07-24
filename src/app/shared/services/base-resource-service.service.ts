import { ConfigService } from './../config/config.service';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceModel } from '../models/base-resource-model.model';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Response } from '../../shared/models/response.model';
import { Page } from '../models/page';

@Injectable({
  providedIn: 'root'
})

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;
  protected configService: ConfigService = new ConfigService();
  constructor(
    protected apiPath: string,
    protected injector: Injector,
  ) {
    this.http = injector.get(HttpClient);
  }


  getAll(): Observable<T[]> {
    const url = `${this.configService.getApiUrl()}${this.apiPath}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResources)
    );
  }

  findAll(page: number, count: number): Observable<Page<T>> {
    const url = `${this.configService.getApiUrl()}${this.apiPath}/${page}/${count}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataPagesToResources)
    );
  }

  getById(id: number): Observable<T> {
    const url = `${this.configService.getApiUrl()}${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    );
  }

  create(resource: T): Observable<T> {
    const url = `${this.configService.getApiUrl()}${this.apiPath}`;
    return this.http.post(url, resource).pipe(
      catchError(this.handleError),
      map(this.jsonDataToResource)
    );
  }

  update(resource: T): Observable<T> {
    const url = `${this.configService.getApiUrl()}${this.apiPath}/${resource.id}`;
    return this.http.put(url, resource).pipe(
      catchError(this.handleError),
      map(() => resource)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.configService.getApiUrl()}${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  // Metodos Protegidos

  protected jsonDataToResources(jsonData: Response<T[]>): T[] {
    const resources: T[] = [];
    jsonData.data.forEach(element => resources.push(element as T));
    return resources;
  }

  protected jsonDataToResource(jsonData: Response<T>): T {
    return jsonData.data as T;
  }

  protected jsonDataPagesToResources(jsonData: Response<Page<T>>): Page<T> {
    const resources = Object.assign(new Response(), jsonData.data);
    return resources;
  }

  protected handleError(error: Response<T[]>): Observable<any> {
    console.log('ERRO NA REQUISIÇÃO => ', error);
    return throwError(error);
  }
}
