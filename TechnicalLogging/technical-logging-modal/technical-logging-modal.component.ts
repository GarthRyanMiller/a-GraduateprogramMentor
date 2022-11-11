import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from "@angular/forms";
import { ModalController, ActionSheetController } from "@ionic/angular";

import { TechnicalLoggingService } from "../technical-logging.service";

@Component({
  selector: "app-technical-logging-modal",
  templateUrl: "./technical-logging-modal.component.html",
  styleUrls: ["./technical-logging-modal.component.scss"],
})
export class TechnicalLoggingModalComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private tServiceLog: TechnicalLoggingService,

    private modalCntrl: ModalController,
    private actionSheetcntrl: ActionSheetController
  ) {}

  formGroup: FormGroup;
  public usersForm = new FormArray([
    new FormGroup({
      client_name: new FormControl("", { validators: Validators.required }),
      device_number: new FormControl("", { validators: Validators.required }),
      fleet_number: new FormControl("", { validators: Validators.required }),
      archived: new FormControl("", { validators: Validators.required }),
      reg_number: new FormControl("", { validators: Validators.required }),
      longitude: new FormControl("", { validators: Validators.required }),
      logged_fault_id: new FormControl("", { validators: Validators.required }),
      latitude: new FormControl("", { validators: Validators.required }),
      upload_picture_name: new FormControl("", {
        validators: Validators.required,
      }),
      type_of_damage: new FormControl("", { validators: Validators.required }),
      current_fault_log_status: new FormControl("", {
        validators: Validators.required,
      }),
      date_of_log: new FormControl("", { validators: Validators.required }),
      notes: new FormControl("", { validators: Validators.required }),
      completeddate: new FormControl("", { validators: Validators.required }),
      title: new FormControl("", { validators: Validators.required }),
      completed: new FormControl("", { validators: Validators.required }),
    }),
  ]);

  ngOnInit() {
    this.technicalLoggingForm = this.formBuilder.group({
      jobCardNumber: ["", [Validators.required, Validators.minLength(10)]],
      fleetNumber: [""],
      startTime: [""],
      finishTime: [""],
      dateT: [""],
      depature: [""],
      mileStart: [""],
      mileEnd: [""],
      technicianName: [""],
      customerName: [""],
      regNo: [""],

      //new log stuff below
      // archivied:[""],
      // client_name:[""],
      // completed:[""],
      // completeddate:[""],
      // current_fault_log_status:[""],
      // date_of_log:[""],
      // device_number:[""],
      // fleet_number:[""],
      // latitude:[""],
      // logged_fault_id:[""],
      // longitude:[""],
      // notes:[""],
      // reg_number:[""],
      // title:[""],
      // type_of_damage:[""],
      // upload_picture_name:[""]
    });
    this.repairsForm = this.formBuilder.group({
      suziCable: [""],
      maleSuziPlug: [""],
      refurbishedProSentry5: [""],
      noIrMinion: [""],
      proSentryDualSdDvr: [""],
      greenButton: [""],
      fusesLog: [""],
      powerCable: [""],
      proSentrySpeaker: [""],
      proSentry5Unit: [""],
      twoCommHarness: [""],
      gpsAntenna: [""],

      cameraB: [""],
      sleeving: [""],
      brackets: [""],
      fatigueCamera: [""],
      simActivation: [""],
      microphone: [""],
      trailerTrackingDevice: [""],
      sdCard: [""],
      tamperButton: [""],
      hardDrive: [""],
      splitter: [""],

      labourPerHrAfterHr: [""],
      trackingDevice: [""],
      speaker: [""],
      slideInBrackets: [""],
      irMinion: [""],
      perKmRate: [""],
      femaleSuziPlug: [""],
      frontPerspexCover: [""],
      redButton: [""],
      powerManagementModule: [""],
      coreExtensionCabling: [""],
      attena3G: [""],
      meterCable4: [""],
      meterCable6: [""],
    });
    this.installCheckListForm = this.formBuilder.group({
      deviceIsZerod: [],
      deviceIsOnline: [],
      allCamerasWorking: [],
      hardDriveTight: [],
      allCablesTight: [],
      threeGWorking: [],
      gpsWorking: [],
      mdvrLocked: [],
      simCardActive: [],
      panicButtons: [],
      tamperButtons: [],

      fatigueDevice: [],
      trackerDevice: [],
      originalDeviceNumber: [""],
      newDeviceNumber: [""],
      installPictureOfRepair: [],
      checkedOnlineWithOps: [],
      installTamper: [],
      installCustomerShownTamper: [],
      reportSummary: [""],
      customerName: [""],
      signatureL: [],
    });
  }
  public dataSelectedBool = false;
  private jobSelected: any;
  public selectedJob = this.tServiceLog.logArray;

  technicalLoggingForm: FormGroup;
  logForm!: FormGroup;
  repairsForm!: FormGroup;
  installCheckListForm!: FormGroup;
  logForm_step = false;
  repairsForm_step = false;
  installCheckList_step = false;
  defaultDate = "2022-01-01";
  step = 0;
  page = 1;
  isSubmitted = false; //set true when the form is valid

  //new log stuff below
  // archivied:[""],
  // client_name:[""],
  // completed:[""],
  // completeddate:[""],
  // current_fault_log_status:[""],
  // date_of_log:[""],
  // device_number:[""],
  // fleet_number:[""],
  // latitude:[""],
  // logged_fault_id:[""],
  // longitude:[""],
  // notes:[""],
  // reg_number:[""],
  // title:[""],
  // type_of_damage:[""],
  // upload_picture_name:[""]

  canDismiss = async () => {
    const actionSheet = await this.actionSheetcntrl.create({
      header: "Are you sure?",
      buttons: [
        {
          text: "Yes",
          role: "confirm",
        },
        {
          text: "No",
          role: "cancel",
        },
      ],
    });
    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    if (role === "confirm") {
      this.modalCntrl.dismiss(null, "cancel");
    }
  };

  cancelModal() {
    return this.modalCntrl.dismiss(null, "cancel");
  }
  confirmModal() {
    return this.modalCntrl.dismiss(null, "confirm");
  }
  next() {
    this.step++;
  }
  previous() {
    this.step--;
  }
  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.technicalLoggingForm.get("dateT").setValue(date, {
      onlyself: true,
    });
  }
  checkCheckBoxvalue(event) {
    console.log(event.checked);
  }
  addJobPage() {
    this.page++;
    this.step++;
  }

  //change a boolean that opens up formlogging
  backMainPage() {
    this.page = 1;
    this.step = 0;
  }
  async onSubmit() {
    console.log(this.usersForm.value)
    //currently makes sure all fields  only when submitted, are filled in, and will prommpt a 'are you sure' pop up after submtiting
    this.isSubmitted = true;
    let objLog = { ...this.usersForm.value };
     if (!this.usersForm.valid){
        console.log('Please provide all required values!')
      return false;
    }else{
    const actionSheet = await this.actionSheetcntrl.create({
      header: "Are you sure?",
      buttons: [
        {
          text: "Yes",
          role: "confirm",
        },
        {
          text: "No",
          role: "cancel",
        },
      ],
    });
    
    actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();

    if (role === "confirm") {
      let techLogObj = {
        ...this.usersForm.value,
      };
      console.log(techLogObj);
      this.tServiceLog.formLog(techLogObj).subscribe((result: any) => {
        console.log("object after submit" + techLogObj);
      });

      this.modalCntrl.dismiss(null, "cancel");
    }
  }
}
  ionViewDidLeave() {}
  ionViewWillLoad() {}
}
