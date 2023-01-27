import { Request, Response } from "express";
import { UpdateUserAvatarUseCase } from "./updateUserAvatarUseCase";
import { container } from "tsyringe";

class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const avatar_file = null;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

    return res.status(201).send();
  }
}

export { UpdateUserAvatarController };
