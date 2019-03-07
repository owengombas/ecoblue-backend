import { Router, Get, Context, Inject } from "rakkit";
import { ProbGeneratorService } from "../services/ProbGeneratorService";

@Router("prob")
export class ProbRouter {
  @Inject()
  private _probGeneratorService: ProbGeneratorService;

  @Get("/")
  get(context: Context) {
    context.body = this._probGeneratorService.ComputedInfos;
  }
}
