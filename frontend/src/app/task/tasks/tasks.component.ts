import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  taskForm: FormGroup;
  tasks = [];
  filteredTasks = [];
  filterStatus = '';
  isModalOpen = false;
  currentTaskId: any;


  constructor(private fb: FormBuilder, private http: ApiService, private router: Router) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['pending']
    });


  }

  ngOnInit(): void {
    if (!JSON.parse(localStorage.getItem('Users'))) {
      this.router.navigate(['/auth/login'])
    } else {
      this.loadTasks();
    }
  }
  loadTasks() {
    this.http.get('/tasks', {}).subscribe((data: any) => {
      this.tasks = data;
      this.filteredTasks = data;
    });
  }

  addTask() {
    if (this.taskForm.valid) {
      this.http.post('/tasks', this.taskForm.value).subscribe((newTask) => {
        this.tasks.push(newTask);
        this.filterTasks();
        this.taskForm.reset();
      });
    }
  }

  updateTask() {
    if (this.taskForm.valid) {
      const updatedTask = {
        ...this.taskForm.value,
      };

      this.http.patch(`/tasks/${this.currentTaskId}`, updatedTask).subscribe((response) => {
        this.tasks = this.tasks.map((task) =>
          task._id === this.currentTaskId ? updatedTask : task
        );

        this.filterTasks();
        this.closeModal();
      });


    }
  }

  deleteTask(taskId) {
    this.http.delete(`/tasks/${taskId}`).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task._id !== taskId);
      this.filterTasks();
    });
  }

  filterTasks() {
    this.filteredTasks = this.filterStatus
      ? this.tasks.filter((task) => task.status === this.filterStatus)
      : this.tasks;
  }
  openEditModal(task: any) {
    this.isModalOpen = true;
    this.currentTaskId = task._id
    this.taskForm.setValue({
      title: task.title,
      description: task.description,
      status: task.status
    });
  }

  closeModal() {
    this.isModalOpen = false;
  }

  logout() {
    localStorage.removeItem('Users')
    localStorage.removeItem('token')

    this.router.navigate(['/auth/login'])
  }
}
