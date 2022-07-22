import { NextFunction, Request, Response } from 'express';
import { Servidor } from '../models/Servidor';
import { validate } from '../Utils/validate';
import { APPDataSource } from '../database/data-source';
import * as yup from 'yup';
import { ServerPaginate } from '../models/ServerPaginate';
import { Phone } from '../models/Phone';

class ServidorController {
  async create(request: Request, response: Response, next: NextFunction) {
    const {
      name,
      mother,
      email,
      cpf,
      address,
      gender,
      birthdate,
      healthRestrictions,
      administrativeRestrictions,
    } = request.body;

    // const error = validate(cpf);

    // if (error.length) {
    //   return response.status(400).json({ message: error });
    // }

    const schema = yup.object().shape({
      name: yup.string().required('ERRO! Necessário preencher o campo nome!'),
      mother: yup.string().required('ERRO! Necessário preencher o campo mãe!'),
      email: yup
        .string()
        .email('ERRO! Necessário preencher o campo com email valido!')
        .required('ERRO! Necessário preencher o campo email!'),
      cpf: yup.string().required(),
      address: yup
        .string()
        .required('ERRO! Necessário preencher o campo endereço!'),
      gender: yup.string().required('ERRO! Necessário preencher o campo sexo!'),
      birthdate: yup
        .string()
        .required('ERRO! Necessário preencher o campo data de nascimento!'),
      healthRestrictions: yup
        .string()
        .required('ERRO! Necessário preencher o campo restrições!'),
      administrativeRestrictions: yup
        .string()
        .required(
          'ERRO! Necessário preencher o campo restrições administrativas!',
        ),
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

    const servidorAlreadyExists = await servidoresRepository.findOne({
      where: { email: email },
    });

    if (servidorAlreadyExists) {
      //throw new AppError('Servidor já existe!');
      return response.status(400).json({ status: 'Servidor já existe!' });
    }

    const servidor = servidoresRepository.create({
      name,
      mother,
      email,
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

  async createPhone(request: Request, response: Response, next: NextFunction) {
    const { phone_Number } = request.body;

    // const error = validate(cpf, phone_Number);

    // if (error.length) {
    //   return response.status(400).json({ message: error });
    // }
    const schema = yup.object().shape({
      phone_Number: yup
        .string()
        .required('ERRO! Necessário preencher o campo telefone!'),
    });

    try {
      await schema.validate(request.body);
    } catch (err) {
      return response.status(400).json({
        erro: true,
        mensagem: err.errors,
      });
    }

    const phoneRepository = APPDataSource.getRepository(Phone);

    const phoneAlreadyExists = await phoneRepository.findOne({
      where: { phone_Number: phone_Number },
    });

    if (phoneAlreadyExists) {
      return response
        .status(400)
        .json({ status: 'Este telefone já esta cadastrado!' });
    }

    const serverPhones = phoneRepository.create({ phone_Number });

    await phoneRepository.save(serverPhones);

    return response.status(201).json(serverPhones);
  }

  // metodo all  de listagem dos servidores
  async all(request: Request, response: Response, next: NextFunction) {
    const page = request.query.page ? Number(request.query.page) : 1;
    const limit = request.query.limit ? Number(request.query.limit) : 3;

    const listServers = new listServer();

    const servers = await listServers.execute({ page, limit });

    return response.json(servers);
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
      cpf,
      phone,
      address,
      gender,
      birthdate,
      healthRestrictions,
      administrativeRestrictions,
    } = request.body;
    const { id } = request.params;

    const error = validate(cpf, phone);

    if (error.length) {
      return response.status(400).json({ message: error });
    }

    const schema = yup.object().shape({
      name: yup.string().required('ERRO! Necessário preencher o campo nome!'),
      mother: yup.string().required('ERRO! Necessário preencher o campo mãe!'),
      email: yup
        .string()
        .email('ERRO! Necessário preencher o campo com email valido!')
        .required('ERRO! Necessário preencher o campo email!'),

      cpf: yup.string().required(),
      address: yup
        .string()
        .required('ERRO! Necessário preencher o campo endereço!'),
      gender: yup.string().required('ERRO! Necessário preencher o campo sexo!'),
      birthdate: yup
        .string()
        .required('ERRO! Necessário preencher o campo data de nascimento!'),
      healthRestrictions: yup
        .string()
        .required('ERRO! Necessário preencher o campo restrições!'),
      administrativeRestrictions: yup
        .string()
        .required(
          'ERRO! Necessário preencher o campo restrições administrativas!',
        ),
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

    const servidor = await servidoresRepository.update(
      {
        id,
      },
      {
        name,
        mother,
        email,
        cpf,
        phones: [],
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
      // throw new AppError('Servidor não encontrado!');
      return response.status(400).json({ status: 'Servidor não encontrado!' });
    }

    await servidoresRepository.remove(servidorToRemove);

    return response.json(servidorToRemove);
  }
}

// serviço de configuração de PAGINAÇÃO

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

class paginationSetup {
  async findAll({ page, skip, take }: SearchParams): Promise<ServerPaginate> {
    const servidoresRepository = APPDataSource.getRepository(Servidor);

    const [servidores, count] = await servidoresRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: servidores,
    };

    return result;
  }
}
// serviço  de listagem dos servidores metodo execute
class listServer {
  async execute({ page, limit }): Promise<ServerPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;

    const listFind = new paginationSetup();

    const servidores = await listFind.findAll({ page, skip, take });

    return servidores;
  }
}

export { ServidorController, listServer, paginationSetup };
