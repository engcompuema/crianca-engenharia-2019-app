export class ConfigService {

  constructor() {
  }

  getAppUrl(): string {
    return 'http://192.168.0.25:8080/crianca-engenharia';
  }

  getApiUrl(): string {
    return 'http://192.168.0.25:8080/crianca-engenharia/api/';
  }

}
