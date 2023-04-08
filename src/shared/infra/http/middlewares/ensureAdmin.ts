import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/usersRepository";
import { AppError } from "@shared/errors/appError";
import { Request, Response, NextFunction } from "express";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError("User isn't admin!");
  }

  return next();
}
