import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private baseUrl = "http://localhost:8080/question";

  constructor(private http: HttpClient) {}

  uploadFile(file: File, quizId: number) {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(
      `${this.baseUrl}/upload/${quizId}`,
      formData
    );
  }
}
