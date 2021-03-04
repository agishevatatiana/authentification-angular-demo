import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class EventService {
    private eventsUrl = 'http://localhost:3000/api/events';
    private specialEventsUrl = 'http://localhost:3000/api/special';

    constructor(private http: HttpClient) {
    }

    getEvents(): Observable<any> {
        return this.http.get<any>(this.eventsUrl);
    }

    getSpecialEvents(): Observable<any> {
        return this.http.get<any>(this.specialEventsUrl);
    }
}
