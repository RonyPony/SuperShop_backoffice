import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  apiUrl = 'https://bsite.net/ronytuquizz/api'
  constructor(private http: HttpClient) { }


  getReports() {
    return this.http.get<Report[]>(`${this.apiUrl}/reports`);
  }

  getReportsById(id: number) {
    return this.http.get<Report[]>(`${this.apiUrl}/reports/${id}`);
  }

  getUserReports(userId: string) {
    return this.http.get<Report[]>(`${this.apiUrl}/reports/all/account?accountId=${userId}`);
  }

  getAllPanicReports() {
    return this.http.get<Report[]>(`${this.apiUrl}/reports/panic`);
  }

  getTipoReport(id: number) {

    switch (id) {
      case 1:
        return "Pánico"
      case 2:
        return "Robo"
      case 3:
        return "Atraco"
      case 4:
        return "Ruido"
      case 5:
        return "Violencia Sexual"
      case 6:
        return "Violencia Familiar"
      case 7:
        return "Violencia Callejera"
      case 8:
        return "Accidente de transito"
      case 9:
        return "Vehiculo Abandonado"
      case 10:
        return "Sustancias Prohibidas"
      default:
        return "Otros (categoria " + id + ")"
        break;
    }
  }

}
