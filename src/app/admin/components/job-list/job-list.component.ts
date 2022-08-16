import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit {
  jobDialog: boolean;
  job: any;
  jobs: [];
  submitted: boolean;
  loading: boolean;
  searchModel: any = {};
  pagingData: any;
  jobText: string;
  categories: any;
  editJobMode: boolean;
  createJobMode: boolean;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private jobService: JobService
  ) {}

  ngOnInit() {
    this.getData();
    this.getCategories();
  }
  getData(event = null) {
    this.buildSearchModel(event);
    this.loading = true;
    this.jobService.getList(this.searchModel).subscribe(
      (res: any) => {
        this.jobs = res.data;
        this.pagingData = res;
      },
      () => (this.loading = false),
      () => (this.loading = false)
    );
  }

  getCategories() {
    this.jobService.getCategories().subscribe((res: any) => {
      this.categories = res.data;
    });
  }

  search(event) {
    this.getData();
  }
  buildSearchModel(event = null) {
    if (event) {
      this.searchModel['pageNumber'] = event.first / event.rows + 1;
      this.searchModel['take'] = event.rows;
    }
    if (this.jobText) {
      this.searchModel['jobTitle'] = this.jobText;
    } else {
      delete this.searchModel['jobTitle'];
    }
  }
  openNew() {
    this.job = {};
    this.submitted = false;
    this.editJobMode = false;
    this.createJobMode = true;
    this.jobDialog = true;
  }

  editJob(jobId: any) {
    this.loading = true;
    this.editJobMode = true;
    this.createJobMode = false;
    this.job = {};

    this.jobService.getById(jobId).subscribe(
      (res: any) => {
        this.job = {
          id: jobId,
          name: res.data.name,
          category: this.categories.filter(
            (c) => c.id == res.data.categoryId
          )[0],
          description: res.data.description,
          validFrom: new Date(res.data.validFrom),
          validTo: new Date(res.data.validTo),
          maximumApplications: res.data.maximumApplications,
        };
        this.job.skills = [];
        this.job.responsibilities = [];

        res.data.skills.forEach((skill) => {
          this.job.skills.push(skill.name);
        });

        res.data.responsibilities.forEach((responsibility) => {
          this.job.responsibilities.push(responsibility.name);
        });
        this.jobDialog = true;
      },
      () => (this.loading = false),
      () => (this.loading = false)
    );
  }

  deleteJob(jobId: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete This Job ?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.loading = true;
        this.jobService.delete(jobId).subscribe(
          (res: any) => {
            if(res.isSuccess){
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Job Deleted',
                life: 3000,
              });
              this.loading = false

              this.getData();
            }else{
              this.messageService.add({
                severity: 'error',
                summary: 'error',
                detail: res.message,
                life: 3000,
              });
            }
          },()=>this.loading = false);
       
      },
    });
  }

  hideDialog() {
    this.jobDialog = false;
    this.submitted = false;
  }

  saveJob() {
    this.submitted = true;
    console.log(this.job);
    if (
      !this.job.name ||
      !this.job.description ||
      !this.job.maximumApplications ||
      this.job.maximumApplications < 1 ||
      isNaN(this.job.maximumApplications) ||
      !this.job.responsibilities ||
      this.job.responsibilities.length < 1 ||
      !this.job.skills ||
      this.job.skills.length < 1 ||
      !this.job.validFrom ||
      !this.job.validTo ||
      !this.job.category
    ) {
      return 0;
    } else {
      const postedModel = { ...this.job };
      postedModel.categoryId = postedModel.category.id;
      postedModel.skills = postedModel.skills.map((e) => {
        return { name: e };
      });
      postedModel.responsibilities = postedModel.responsibilities.map((e) => {
        return { name: e };
      });

      this.loading = true;
      if (this.createJobMode && !this.editJobMode) {
        this.jobService.add(postedModel).subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.job = {};
              this.hideDialog();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Job Created',
                life: 3000,
              });
              this.getData();
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
      } else if (this.editJobMode && !this.createJobMode) {
        this.jobService.edit(postedModel).subscribe(
          (res: any) => {
            if (res.isSuccess) {
              this.job = {};
              this.hideDialog();
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: 'Job Updated',
                life: 3000,
              });
              this.getData();
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

      return 1;
    }
  }
}
