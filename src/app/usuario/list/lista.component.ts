import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Page } from '../../page';
import { UserDTO } from '../user-dto';
import { UserService } from '../user.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export class ListaComponent {

  constructor(private userSerivce: UserService) { }

  dataSource: MatTableDataSource<UserDTO> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'email'];

  ngOnInit() {
    this.findUsers();
  }

  setDataSource(users: Page<UserDTO>) {
    this.dataSource = new MatTableDataSource<UserDTO>(users.content);
  }

  private findUsers() {
    this.userSerivce.getAll().subscribe((response: Page<UserDTO>) => {
      this.setDataSource(response);
    })
  }

  reload() {
    this.findUsers();
  }

}