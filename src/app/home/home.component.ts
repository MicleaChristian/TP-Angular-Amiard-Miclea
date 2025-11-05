import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false
})
export class HomeComponent implements OnInit {
  playerName = '';
  isPlayerNameConfirmed = false;
  showCategories = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isUserConnected();
    this.playerName = this.authService.user?.username || '';
  }

  get isPlayerNameFill() {
    return this.playerName.length < 1;
  }

  startQuiz() {
    this.showCategories = true;
  }

  navigateToQuiz() {
    this.router.navigate(['/category', this.playerName]);
  }

  confirmPseudo() {
    this.isPlayerNameConfirmed = true;
  }
}
