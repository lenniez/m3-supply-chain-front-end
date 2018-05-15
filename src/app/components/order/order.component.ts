import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  @Input() order: Object;
  nextStep: Object;
  nextStepText: String = null;
  showNextStepButton: boolean = false;
  error: String;
  user: Object;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    // get user
    this.user = this.authService.getUser();
    // find first step in orderStatus array that has a status === false 
    this.nextStep = this.order.orderStatus.find(this.findNextStep);
    // if that step's role !== user's role, show default text
    if (this.nextStep.role !== this.user.role) {
      this.nextStepText = 'the next step must be completed by the other party';
    }
    this.showNextStepButton = false; // do not show the "confirm and advance" button on page
    // if that step's role === user's role, then show nextStepText

    if (this.nextStep.role === this.user.role) {
      this.showNextStepButton = true; // show the "confirm and advance" button on page

      switch (this.nextStep.action) {
        case 'complete-model':
          this.nextStepText = 'complete 3D model';
          break;
        case 'accept-model':
          this.nextStepText = 'accept 3D model';
          break;
        case 'sample-subsupplier-receive':
          this.nextStepText = 'confirm sub-supplier shipments received for samples';
          break;
        case 'sample-assemble':
          this.nextStepText = 'assemble samples';
          break;
        case 'sample-ship-client':
          this.nextStepText = 'ship samples';
          break;
        case 'sample-approve':
          this.nextStepText = 'approve samples';
          break;
        case 'pre-prod':
          this.nextStepText = 'complete pre-production planning';
          break;
        case 'full-batch-subsupplier-receive':
          this.nextStepText = 'confirm sub-supplier shipments received for production batch';
          break;
        case 'full-batch-assemble':
          this.nextStepText = 'assemble production batch';
          break;
        case 'full-batch-ship-client':
          this.nextStepText = 'ship production batch';
          break;
        case 'full-batch-accept':
          this.nextStepText = 'accept production batch';
          break;
      }

    }

  }
  // function that feeds into find above that determines next step with status === false
  findNextStep(step) {
    return step.status === false;
  }

  handleAdvanceClick() {
    this.nextStep.status = true;
    console.log(this.nextStep.status);
    console.log(this.nextStep);
    // how to refresh data without making user refresh page? use navigate? 
  }

}
