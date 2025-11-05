import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { QuizService } from "../../shared/services/quiz.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit, OnChanges{

  searchModel = {
  searchTerm: ''
  };
  @Input() playerName: string = '';
  currentSearchTerm: string = '';

  constructor(
    private readonly quizService: QuizService, 
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['playerName']?.currentValue) {
      this.playerName = changes['playerName'].currentValue;
      this.quizService.playerName = this.playerName;
    }
  }

ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (!this.playerName && params['playerName']) {
        this.playerName = params['playerName'];
        this.quizService.playerName = this.playerName;
      }
    });
    

    this.quizService.quizContent = [];
    this.quizService.getQuizCategories();
  }

  get quizContent(): any[] {
    return this.quizService.quizContent;
  }

  get filteredCategories(): any[] {
    const validCategories = this.quizContent.filter(cat => cat?.name?.trim());
    
    if (!this.currentSearchTerm.trim()) {
      return validCategories;
    }
    
    const searchLower = this.currentSearchTerm.toLowerCase().trim();
    return validCategories.filter(category => 
      category.name.toLowerCase().includes(searchLower)
    );
  }

  addAnswer(answer: string, questionId: number) {
    this.quizService.addAnswer(answer, questionId);
  }

  onSearch(form: any) {
    this.currentSearchTerm = form.value.searchTerm || '';
  }

goToQuestions(selectedCategoryId: number) {
    this.router.navigate(['/quiz', this.playerName, selectedCategoryId]);
    this.quizService.resetQuiz();
 }

  onReset() {
    this.searchModel.searchTerm = '';
    this.currentSearchTerm = '';
  }
}
