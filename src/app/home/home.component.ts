import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { JobService } from '../admin/services/job.service';
import { ApplicantService } from '../services/applicant.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  jobs: [];
  submitted: boolean;
  loading: boolean;
  dialog: boolean;
  form: any;
  constructor(    private messageService: MessageService,
    private jobService: JobService,
    private applicantService:ApplicantService,
    private fb:FormBuilder) {
      this.form = this.fb.group({
        jobId:["",Validators.required],
        name:["",Validators.required],
        email:["", [Validators.email,Validators.email]],
        mobileNumber:["",[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
      })
     }

  ngOnInit() {
    this.getData();
  }
  getData(event = null) {
    this.loading = true;
    this.jobService.getAllAvailble().subscribe(
      (res: any) => {
        this.jobs = res.data;
      },
      () => (this.loading = false),
      () => (this.loading = false)
    );
  }
  openDialog(job){
    this.form.get('jobId').setValue(job.id);
    this.dialog = true;
  }
  hideDialog(){
    this.form.reset()
    this.dialog = false;

  }
  saveApplication(){
    this.submitted = true;
    if(this.form.valid){
      this.loading = true;
      this.applicantService.add(this.form.value).subscribe(
        (res: any) => {
          if (res.isSuccess) {
            this.form.reset();
            this.hideDialog();
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Application Sent',
              life: 3000,
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
              life: 3000,
            });
          }
        },
        () => (this.loading = false),
        () => (this.loading = false)
      );
    }

  }
}
