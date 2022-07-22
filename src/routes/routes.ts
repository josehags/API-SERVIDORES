import { Router } from 'express';
import { ServidorController } from '../controllers/ServidorController';

const router = Router();
const servidorController = new ServidorController();
/*
    5 métodos de requisição HTTP mais utilizados:
    GET => Busca
    POST => salvar
    PUT => Alterar
    DELETE => Deletar
    PATCH => Alteração específica
*/

router.post('/servidores', servidorController.create);
router.get('/servidores', servidorController.all);
router.get('/servidores/:id', servidorController.one);
router.put('/servidores/:id', servidorController.update);
router.delete('/servidores/:id', servidorController.remove);

// Rotas de Telefones

router.post('/servidores/phones', servidorController.createPhone);
router.post('/servidores/phones', servidorController.phoneBook);

export { router }; // Retornando as rotas preenchidas para o server.ts
