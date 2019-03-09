import {
  BeforeMiddleware,
  IBaseMiddleware,
  Context,
  NextFunction
} from "rakkit";

@BeforeMiddleware()
export class OptionsMiddleware implements IBaseMiddleware {
  async use(context: Context, next: NextFunction) {
    if (context.method === "OPTIONS") {
      context.body = "";
      context.status = 200;
    } else {
      await next();
    }
  }
}
