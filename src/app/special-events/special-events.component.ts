import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EventService } from '../event.service';

@UntilDestroy()
@Component({
    selector: 'app-special-events',
    templateUrl: './special-events.component.html',
    styleUrls: ['./special-events.component.css']
})
export class SpecialEventsComponent implements OnInit {
    specialEvents: any[] = [];

    constructor(
        private eventService: EventService,
        private router: Router) {
    }

    ngOnInit(): void {
        this.eventService.getSpecialEvents()
            .pipe(untilDestroyed(this))
            .subscribe(res => {
                if (res.status === 200) {
                    this.specialEvents = res.data;
                }
            }, err => {
                this.router.navigate(['/login']);
            });
    }

}
