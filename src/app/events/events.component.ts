import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EventService } from '../event.service';

@UntilDestroy()
@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
    events: any[] = [];

    constructor(
        private eventService: EventService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.eventService.getEvents()
            .pipe(untilDestroyed(this))
            .subscribe(res => {
                if (res.status === 200) {
                    this.events = res.data;
                }
            }, err => {
                this.router.navigate(['/login']);
            });
    }

}
