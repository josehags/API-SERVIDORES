import { NextFunction, Request, Response } from 'express';

import * as yup from 'yup';
import { APPDataSource } from '../database/data-source';
import { Servidor } from '../models/Servidor';
import { validatePhone } from '../Utils/validate';

class PhoneController {
  async create(request: Request, response: Response, next: NextFunction) {
    const { phone_Number } = request.body;
    const { id } = request.params;

    const error = validatePhone(phone_Number);

    if (error.length) {
      return response.status(400).json({ message: error });
    }

    const schema = yup.object().shape({
      phone_Number: yup
        .string()
        .required('ERRO! Necessário preencher o campo telefone '),
    });

    try {
      await schema.validate(request.body);
    } catch (err) {
      return response.status(400).json({
        erro: true,
        mensagem: err.errors,
      });
    }

    const servidoresRepository = APPDataSource.getRepository(Servidor);

    // const phoneAlreadyExists = await servidoresRepository.findOne({
    //   where: { phones: phone_Number },
    // });

    // if (phoneAlreadyExists) {
    //   //throw new AppError('Servidor já existe!');
    //   return response.status(400).json({ status: 'Telefone já existe!' });
    // }

    const servidores = servidoresRepository.create(
      {
        id,
      },
      { phone: [phone_Number] },
    );

    await servidoresRepository.save(servidores);

    return response.status(201).json(servidoresRepository);
  }
}

export { PhoneController };
