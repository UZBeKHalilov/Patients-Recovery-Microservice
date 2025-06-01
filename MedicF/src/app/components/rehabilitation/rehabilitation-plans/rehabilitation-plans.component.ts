import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RehabilitationService } from '../../../services/rehabilitation/rehabilitation.service';

@Component({
  selector: 'app-rehabilitation-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rehabilitation-plans.component.html',
  styleUrl: './rehabilitation-plans.component.css'
})
export class RehabilitationPlansComponent implements OnInit {
  rehabilitationPlans: any[] = [];

  constructor(private rehabilitationService: RehabilitationService) { }

  ngOnInit(): void {
    this.getRehabilitationPlans();
  }

  getRehabilitationPlans(): void {
    this.rehabilitationService.getRehabilitationPlans()
      .subscribe(plans => this.rehabilitationPlans = plans);
  }
}