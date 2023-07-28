import { Request, Response } from "express";

import { GetAllUserUseCase } from "../../application/GetAllUserUseCase";

export class GetAllUserController {
  constructor(readonly getAllUserUseCase: GetAllUserUseCase) { }

  async run(req: Request, res: Response) {
    try {
      const products = await this.getAllUserUseCase.run();
      console.log(products);
      if (products)
        //Code HTTP : 200 -> Consulta exitosa
        res.status(200).send({
          status: "success",
          data: products.map((product: any) => {
            return {
              id: product?.id,
              name: product?.name,
              email: product?.email,
              password: product?.password,
            };
          }),
        });
      else
        res.status(400).send({
          status: "error",
          msn: "Ocurrio algún problema",
        });
    } catch (error) {
      //Code HTTP : 204 Sin contenido
      res.status(204).send({
        status: "error",
        data: "Ocurrio un error",
        msn: error,
      });
    }
  }
}
