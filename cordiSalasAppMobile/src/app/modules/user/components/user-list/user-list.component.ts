import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services';
import { CreateUserComponent } from '../create-user/create-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './templates/user-list.component.html',
})
export class UserListComponent {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm = '';
  pageSize = 5;
  currentPage = 1;

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.internatInit();
  }

  internatInit() {
    this.getUsers();
    this.userService.userSubject.subscribe((data: boolean) => {
      this.getUsers();
    });
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      (data: User[]) => {
        this.users = data;
        this.filteredUsers = data;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  applyFilter() {
    this.filteredUsers = this.users.filter((user) =>
      user.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  create() {
    this.modalService.open(CreateUserComponent, { size: 'lg' });
  }

  edit(user: User) {
    const modalRef = this.modalService.open(EditUserComponent);
    modalRef.componentInstance.user = user;
  }

  delete(id: any) {
    const modalRef = this.modalService.open(DeleteUserComponent);
    modalRef.componentInstance.id = id;
  }
}

