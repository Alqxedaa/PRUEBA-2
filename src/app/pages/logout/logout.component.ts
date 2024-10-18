// logout.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent  implements OnInit {

  private authService = inject(AuthService);

  constructor() {}

  ngOnInit(): void {
    this.authService.logout();
  }

}
