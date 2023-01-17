import { Response, Request } from "express";
import { container } from "tsyringe";
import { ImportCategoryUseCase } from "./importCategoryUseCase";

class ImportCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;

    const importCategoryUseCase = container.resolve(ImportCategoryUseCase);

    await importCategoryUseCase.execute(file);

    return res.send();
  }
}

export { ImportCategoryController };
