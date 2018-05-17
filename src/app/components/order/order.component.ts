// should all the order handling script be in the open order page component??

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
  
  @Input() order: any;
  nextStep: any;
  nextStepText: String = null;
  showNextStepButton: boolean = false;
  // counter: Number = 1;
  error: String;
  user: any;

  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    // get user
    this.user = this.authService.getUser();

    //find the next step needed
    this.findNextStep();
  }
  

  // function to find the next step that has not been completed yet
  findNextStep() {
    // find first step in orderStatus array that has a status === false 
    this.nextStep = this.order.orderStatus.find(this.findStepStatusFalse);
    // this.counter++;
    // if no next step, show "completed" text
    if (!this.nextStep) {
      this.nextStepText = 'this order has been fulfilled';
      this.showNextStepButton = false; // do not show the "confirm and advance" button on page
      return;
    }
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
          this.nextStepText = 'confirm sub-supplier sample shipments received';
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
          this.nextStepText = 'confirm sub-supplier prod shipments received';
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

  // function that feeds into findNextStep() above that determines next step with status === false
  findStepStatusFalse(step) {
    return step.status === false;
  }

  // function that updates next step's status on click of the advance button
  handleAdvanceClick() {
    // update the next step's backend status
    // then update the next step's frontend status
    // then find the new next step
    this.orderService.updateOrderStatus(this.nextStep._id)
      .then((result) => {
        console.log(result);
        // this.order = result;
        for (var ix = 0; ix < this.order.orderStatus.length; ix++) {
          const step = this.order.orderStatus[ix];
          if (step.status === false) {
            step.status = true;
            this.findNextStep();
            break;
          }
        }
      });
  }

}
