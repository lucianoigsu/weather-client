import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment-timezone';

@Component({
    selector: 'app-forecast-card',
    templateUrl: './forecast-card.component.html',
    styleUrls: ['./forecast-card.component.css']
})
export class ForecastCardComponent implements OnInit {

    @Input() daily: any;
    @Input() timezone: string;
    weather;
    min;
    max;
    day;

    constructor() {
        moment.locale('es')
    }

    ngOnInit(): void {
        this.weather = this.daily.weather[0]
        this.min = Math.floor(this.daily.temp.min)
        this.max = Math.floor(this.daily.temp.max)
        this.day = moment(this.daily.dt * 1000).tz(this.timezone).format("D dddd")
    }
}
