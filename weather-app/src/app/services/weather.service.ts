import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {

    url = "http://localhost:3100"
    version = "/v1"

    constructor(private http: HttpClient) { }

    public current(city=""): Promise<any> {
        return this.http.get<any>(`${this.url}${this.version}/current/${city}`).toPromise<any>();
    }

    public forecast(city=""): Promise<any> {
        return this.http.get<any>(`${this.url}${this.version}/forecast/${city}`).toPromise<any>();
    }
}
