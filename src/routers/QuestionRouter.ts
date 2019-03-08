import { Router, Post, Context, Get, Inject } from "rakkit";
import { QuestionService } from "../services";

@Router("question")
export class QuestionRouter {
  @Inject()
  private _questionService: QuestionService;

  @Post("/")
  async addAnswer(context: Context) {
    const { questionIndex, answerIndex } = context.request.body;
    if (questionIndex !== undefined && answerIndex !== undefined) {
      context.body = await this._questionService.AddAnswer(
        questionIndex,
        answerIndex
      );
    } else {
      context.status = 403;
      context.body = "fill:all";
    }
  }

  @Get("/")
  async getQuestions(context: Context) {
    context.body = await this._questionService.getQuestions();
  }
}
