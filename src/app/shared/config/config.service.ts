export class ConfigService {

  constructor() {
  }

  getAppUrl(): string {
    return 'http://localhost:8080/';
  }

  getApiUrl(): string {
    return 'http://localhost:8080/api/';
  }

}
