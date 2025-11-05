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
  filteredCategories: any[] = [];
  searchModel = {
    searchTerm: ''
  };

  constructor(private quizService: QuizService, private router: Router) { }

ngOnInit(): void {
    this.quizService.getQuizCategories();
    this.filteredCategories = this.quizContent;
  }

  addAnswer(answer: string, questionId: number) {
    this.quizService.addAnswer(answer, questionId);
  }

  onSearch(form: any) {
    const searchTerm = form.value.searchTerm || '';
    if (!searchTerm.trim()) {
      this.filteredCategories = this.quizContent;
      return;
    }
    const searchLower = searchTerm.toLowerCase().trim();
    this.filteredCategories = this.quizContent.filter(category => 
      category?.name?.toLowerCase().includes(searchLower)
    );
  }

goToHome() {
    this.router.navigate(['/']);
    this.quizService.resetQuiz();
 }

}
