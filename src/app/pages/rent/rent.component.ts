import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Motorcycle } from 'src/interfaces/motorcycle';
import { MotorcycleService } from 'src/services/motorcycle.service';
import { SocketService } from 'src/services/socket.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {
  schedule: string[] = []
  motorcycles: Motorcycle[] = []
  mySchedule: number = -2;
  ihaveSchedule: boolean = false;

  constructor(
    private readonly _socketService: SocketService,
    private readonly _userService: UserService
    ) {
    this.schedule = this.generateSchedules();
    this.getMotorcycleNumber();
    this.getAllMotorcyclesAllTime();
  }
  
  ngOnInit(): void {
  }
  
  getAllMotorcyclesAllTime() {
    this._socketService.callback.subscribe((motorcycles: Motorcycle[]) => {
      this.motorcycles = motorcycles;
    });
  }

  takeMotorcycle(scheduleNumber: number) {
    this._socketService.takeMotorcycle(scheduleNumber);
    this.getMotorcycleNumber();
    this.ihaveSchedule = true;
  }

  returnMotorcycle() {
    this._socketService.returnMotorcycle();
    this.ihaveSchedule = false;
    this.mySchedule = -2;
  }


  pickSchedule(scheduleNumber: number) {
    if (this.ihaveSchedule && (this.mySchedule > 0 && this.mySchedule < 25)) {
      this.returnMotorcycle();
    } else {
      this.takeMotorcycle(scheduleNumber);
    }
  }

  getMotorcycleNumber() {
    this._userService.getMotorcycleNumber().subscribe(number => {
      if (number.motorcycleNumber !== 0) {
        this.mySchedule = number.motorcycleNumber;
        this.ihaveSchedule = true;
      } else {
        this.mySchedule = -2;
      }
    })
  }

  generateSchedules(): string[] {
    const schedule: string[] = [];
    for (let hours = 8; hours < 20; hours++) {
      if (hours.toString().length < 2) {
        schedule.push(`0${hours}:00`);
        schedule.push(`${hours}:30`);
      } else {
        schedule.push(`${hours}:00`);
        schedule.push(`${hours}:30`);
      }
    }
    schedule.push('20:00');
    return schedule;
  }
}
