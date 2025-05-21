import express from 'express'
import { addCompany, approveCompany } from '../controllers/company.controllers.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { verifyRole } from '../middlewares/role.middleware.js';

const companyRouter = express.Router();


companyRouter.get('/', verifyToken, verifyRole, (req, res) => {
    res.send({ body: 'A list of companies' })
})

companyRouter.get('/:id', verifyToken, (req, res) => {
    res.send({ body: 'Company profile' })
})

companyRouter.post('/register-company', verifyToken, addCompany)

companyRouter.patch('/:id/approve', verifyToken, approveCompany)

companyRouter.delete('/:id', verifyToken, (req, res) => {
    res.send({ body: 'Company profile deleted' })
})

export default companyRouter