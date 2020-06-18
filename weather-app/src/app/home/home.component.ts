import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import * as moment from 'moment-timezone';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    current;
    currentWeather;
    currentCity;
    forecast;
    timezone;
    date;

    constructor(private weatherService: WeatherService) {
        moment.locale('es')
    }

    async ngOnInit() {
        this.currentCity = "Ubicación actual"
        this.weatherService.current().then((currentWeather)=>{
            this.timezone = currentWeather.timezone
            this.setCurrents(currentWeather);
        });
        this.weatherService.forecast().then((forecastWeather)=>{
            this.forecast = forecastWeather.daily;
        });
    }

    selectCity(e){
        switch (e.value) {
            case "none":
                this.currentCity = "Ubicación actual"
                break;
            case "bsas":
                this.currentCity = "Buenos Aires"
                break;
            case "londres":
                this.currentCity = "Londres"
                break;
            case "paris":
                this.currentCity = "Paris"
                break;
            case "tokio":
                this.currentCity = "Tokio"
                break;
            case "newyork":
                this.currentCity = "Nueva York"
                break;
        }
        if(e.value != "none")
        {
            this.weatherService.current(e.value).then((currentWeather)=>{
                this.setCurrents(currentWeather);
            });
            this.weatherService.forecast(e.value).then((forecastWeather)=>{
                this.forecast = forecastWeather.daily;
            });
        }
        else
        {
            this.weatherService.current().then((currentWeather)=>{
                this.setCurrents(currentWeather);
            });
            this.weatherService.forecast().then((forecastWeather)=>{
                this.forecast = forecastWeather.daily;
            });
        }
    }

    setCurrents(currentWeather){
        this.current = currentWeather.current;
        this.currentWeather = currentWeather.current.weather[0];
        this.current.temp = Math.floor(this.current.temp)
        this.date = moment(this.current.dt*1000).tz(this.timezone).format("D dddd HH:mm")
    }

}
