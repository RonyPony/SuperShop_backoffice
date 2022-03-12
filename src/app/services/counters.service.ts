import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { report } from 'process';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class CountersService {
  apiUrl = 'https://bsite.net/ronytuquizz/api'
  constructor(private http: HttpClient) { }

  getReportsCount() {
    this.http.get<Report[]>(`${this.apiUrl}/reports`).subscribe(report => {
      return report.length
    });
  }
}
