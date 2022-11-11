import { Component, OnInit, ViewChild, ViewChildren } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { IonModal } from "@ionic/angular";
import { OverlayEventDetail } from "@ionic/core/components";
import { TechnicalLoggingService } from "./technical-logging.service";
import { ModalController } from "@ionic/angular";
import { TechnicalLoggingModalComponent } from "./technical-logging-modal/technical-logging-modal.component";
@Component({
  selector: "app-technical-logging",
  templateUrl: "./technical-logging.component.html",
  styleUrls: ["./technical-logging.component.css"],
})
export class TechnicalLoggingComponent {
  constructor(

    private tServiceLog: TechnicalLoggingService,
    private modalCntrl: ModalController
  ) {}
  @ViewChild(IonModal) modal: IonModal;

  public dataSelectedBool = false;
  public jobSelected: [] = [];

  step = 0;
  page = 1;

  name: string;
 
  isVisible: boolean = false;

  cancel() {
    this.modal.dismiss(null, "cancel");
  }

  confirm() {
    this.modal.dismiss(this.name, "confirm");
  }


  onClick(j) {
    this.jobSelected = j;
    this.isVisible = !this.isVisible;
    console.log(this.jobSelected);
  }
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async openModal(i: any) {
    const modal = await this.modalCntrl.create({
      component: TechnicalLoggingModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === "confirm") {
      console.log("confirmed out"), "hello";
    }
  }
  ngOnInit() {}

  ionViewWillEnter() {
    console.log("hi");
    this.tServiceLog.getAllTechnicalLogging().subscribe((result: any) => {
      console.log(result);

      this.tServiceLog.logArray = result.data;
      console.log(this.tServiceLog.logArray);
    });
  }

  getOldJob() {} // will trigger when they click on an old job and prepopulate a form/modal

  // getJob(type){
  //   this.oldJobsArray = [];
  //   this.tServiceLog.getPrevJobs(this.jobSelected).subscribe((result: any)=>{
  //     console.log(this.oldJobsArray, 'jobs')
  //   })
  //   return this.oldJobsArray[jobcardnumber]
  //    } Ill use this to retrive the specific job through jobcardNumber as an unique key.

  ionViewDidLeave() {}
}
