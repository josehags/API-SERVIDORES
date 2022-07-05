import { NextFunction, Request, Response } from 'express';
import { Servidor } from '../models/Servidor';
import { APPDataSource } from '../database/data-source';
import * as yup from 'yup';
import { AppError } from '../errors/AppError';

class ServidorController {
  async create(request: Request, response: Response, next: NextFunction) {
    const {
      name,
      mother,
      email,
      phone,
      cpf,
      address,
      gender,
      birthdate,
      healthRestrictions,
      administrativeRestrictions,
    } = request.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      mother: yup.string().required(),
      email: yup.string().email().required(),
      phone: yup.string().required(),
      cpf: yup.string().required(),
      address: yup.string().required(),
      gender: yup.string().required(),
      birthdate: yup.string().required(),
      healthRestrictions: yup.string().required(),
      administrativeRestrictions: yup.string().required(),
    });

    // await schema.validate(request.body, { abortEarly: false });
    // throw new AppError('Erro de validação dos campos!');

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      //      throw new AppError(err);
      return response
        .status(400)
        .json({ status: 'Erro de validação dos campos!' });
    }

    const servidoresRepository = APPDataSource.getRepository(Servidor);

    const servidorAlreadyExists = await servidoresRepository.findOne({
      where: { email: email },
    });

    if (servidorAlreadyExists) {
      throw new AppError('Servidor já existe!');
      // return response.status(400).json({ status: "Servidor já existe!" });
    }

    const servidor = servidoresRepository.create({
      name,
      mother,
      email,
      phone,
      cpf,
      address,
      gender,
      birthdate,
      healthRestrictions,
      administrativeRestrictions,
    });

    await servidoresRepository.save(servidor);

    return response.status(201).json(servidor);
  }

  async all(request: Request, response: Response, next: NextFunction) {
    const servidoresRepository = APPDataSource.getRepository(Servidor);

    const all = await servidoresRepository.find();

    return response.json(all);
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const servidoresRepository = APPDataSource.getRepository(Servidor);

    const { id } = request.params;

    const one = await servidoresRepository.findOne({ where: { id: id } });

    return response.json(one);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const {
      name,
      mother,
      email,
      phone,
      cpf,
      address,
      gender,
      birthdate,
      healthRestrictions,
      administrativeRestrictions,
    } = request.body;
    const { id } = request.params;

    const schema = yup.object().shape({
      name: yup.string().required(),
      mother: yup.string().required(),
      email: yup.string().email().required(),
      phone: yup.string().required(),
      cpf: yup.string().required(),
      address: yup.string().required(),
      gender: yup.string().required(),
      birthdate: yup.string().required(),
      healthRestrictions: yup.string().required(),
      administrativeRestrictions: yup.string().required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      //      throw new AppError(err);
      return response
        .status(400)
        .json({ status: 'Erro de validação dos campos!' });
    }

    const servidoresRepository = APPDataSource.getRepository(Servidor);

    const servidor = await servidoresRepository.update(
      {
        id,
      },
      {
        name,
        mother,
        email,
        phone,
        cpf,
        address,
        gender,
        birthdate,
        healthRestrictions,
        administrativeRestrictions,
      },
    );

    return response.status(201).json(servidor);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const servidoresRepository = APPDataSource.getRepository(Servidor);

    const servidorToRemove = await servidoresRepository.findOneBy({
      id: request.params.id,
    });

    if (!servidorToRemove) {
      throw new AppError('Servidor não encontrado!');
      //return response.status(400).json({ status: "Servidor não encontrado!" });
    }

    await servidoresRepository.remove(servidorToRemove);

    return response.json(servidorToRemove);
  }
}

export { ServidorController };
