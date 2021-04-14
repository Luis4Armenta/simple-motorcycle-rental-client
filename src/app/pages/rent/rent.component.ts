import { Component, OnInit } from '@angular/core';
import { Motorcycle } from 'src/interfaces/motorcycle';
import { MotorcycleService } from 'src/services/motorcycle.service';

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.scss']
})
export class RentComponent implements OnInit {
  schedule: string[] = []
  motorcycles: Motorcycle[] = []

  constructor(private readonly _motorcycleService: MotorcycleService) {
    this.schedule = this.generateSchedules()
  }

  ngOnInit(): void {
    this.getMotorcyclesInformation()
  }

  generateSchedules(): string[] {
    const schedule: string[] = []
    for (let hours = 8; hours < 20; hours++) {
      if (hours.toString().length < 2) {
        schedule.push(`0${hours}:00`)
        schedule.push(`${hours}:30`)
      } else {
        schedule.push(`${hours}:00`)
        schedule.push(`${hours}:30`)
      }
    }
    schedule.push('20:00')
    console.log(schedule)
    return schedule
  }

  getMotorcyclesInformation() {
    this._motorcycleService.getAllMotorcycles().subscribe(data => {
      console.log(data)
      this.motorcycles = data
    }, err => console.error)
  }

  private getHours(currentTime: string) {
    return currentTime.split(':')[0]
  }

  private getMinutes(currentTime: string) {
    return currentTime.split(':')[1]
  }

}
