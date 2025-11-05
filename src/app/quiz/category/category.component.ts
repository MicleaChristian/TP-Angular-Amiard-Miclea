import { Component, OnInit } from '@angular/core';
import { QuizService } from "../../shared/services/quiz.service";

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{

  quizContent: any[] = this.quizService.quizContent;

  constructor(private quizService: QuizService) { }

ngOnInit(): void {
    this.quizService.getQuizCategories();
  }

}
