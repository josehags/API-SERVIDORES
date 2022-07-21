import { Router } from 'express';
import { PhoneController } from '../controllers/PhoneController';
import { ServidorController } from '../controllers/ServidorController';

const router = Router();
const servidorController = new ServidorController();
const phoneController = new PhoneController();

/*
    5 métodos de requisição HTTP mais utilizados:
    GET => Busca
    POST => salvar
    PUT => Alterar
    DELETE => Deletar
    PATCH => Alteração específica
*/

router.post('/servidores', servidorController.create);
router.post('/phone_Number', phoneController.create);
router.get('/servidores', servidorController.all);
router.get('/servidores/:id', servidorController.one);
router.put('/servidores/:id', servidorController.update);
router.delete('/servidores/:id', servidorController.remove);

export { router }; // Retornando as rotas preenchidas para o server.ts
