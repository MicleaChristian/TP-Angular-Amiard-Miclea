import { Component, OnInit } from '@angular/core';
import { QuizService } from "../../shared/services/quiz.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  standalone: false
})
export class QuestionComponent implements OnInit {
  quizContent: any[] = this.quizService.quizContent;
  categoryId: number = 0;

  constructor(private quizService: QuizService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.categoryId = params['categoryId'];
    });
    console.log(this.categoryId);
    this.quizService.getQuizContent();
    console.log(this.quizContent);
    this.quizContent = this.quizContent.filter(q => q.categoryId === this.categoryId);
  }

  addAnswer(answer: string, questionId: number) {
    this.quizService.addAnswer(answer, questionId);
  }
}
