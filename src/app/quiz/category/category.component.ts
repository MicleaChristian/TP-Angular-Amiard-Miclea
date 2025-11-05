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
  filteredCategories: any[] = [];
  searchModel = {
    searchTerm: ''
  };

  constructor(private readonly quizService: QuizService) { }

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

  onReset() {
    this.searchModel.searchTerm = '';
    this.filteredCategories = this.quizContent;
  }
}
