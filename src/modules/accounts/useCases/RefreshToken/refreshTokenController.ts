import { Request, Response, response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./refreshTokenUseCase";

class RefreshTokenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers["x-access-token"] ||
      request.query.token;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const refresh_Token = await refreshTokenUseCase.execute(token);

    return response.json(refresh_Token);
  }
}

export { RefreshTokenController };
