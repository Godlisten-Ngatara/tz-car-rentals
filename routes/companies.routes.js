import express from 'express'
import { addCompany, approveCompany, getCompanys } from '../controllers/company.controllers.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { verifyRole } from '../middlewares/role.middleware.js';

const companyRouter = express.Router();


companyRouter.get('/', verifyToken, getCompanys)

companyRouter.get('/:id', verifyToken, (req, res) => {
    res.send({ body: 'Company profile' })
})

companyRouter.post('/register-company', verifyToken, addCompany)

companyRouter.patch('/:id/approve', verifyToken, approveCompany)

companyRouter.delete('/:id', verifyToken, (req, res) => {
    res.send({ body: 'Company profile deleted' })
})

export default companyRouter