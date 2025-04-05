import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7240/api/'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Generic method to GET data from any controller
  getAll(controller: string, pageSize: number = 10, pageNumber: number = 1): Observable<any> {
    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber);

    return this.http.get<any>(`${this.apiUrl}${controller}`, { params });
  }

  // Generic method to GET a single item by ID
  getById(controller: string, id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${controller}?id=${id}`);
  }

  // Generic method to CREATE a new item
  create(controller: string, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${controller}`, data);
  }

  // Generic method to UPDATE an item by ID
  update(controller: string, id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${controller}/${id}`, data);
  }

  // Generic method to DELETE an item by ID
  delete(controller: string, id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${controller}/${id}`);
  }
}