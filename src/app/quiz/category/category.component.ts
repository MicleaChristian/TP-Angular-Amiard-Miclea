import { Component, OnInit } from '@angular/core';
import { QuizService } from "../../shared/services/quiz.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{

  quizContent: any[] = this.quizService.quizContent;

  constructor(private quizService: QuizService, private router: Router) { }

ngOnInit(): void {
    this.quizService.getQuizCategories();
  }

goToHome() {
    this.router.navigate(['/']);
    this.quizService.resetQuiz();
 }

}
