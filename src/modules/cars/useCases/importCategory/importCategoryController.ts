import { Response, Request } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./importCategoryUseCase";

class ImportCategoryController {
  handle(req: Request, res: Response): Response {
    const { file } = req;

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    importCategoryUseCase.execute(file);

    return res.send();
  }
}

export { ImportCategoryController };
