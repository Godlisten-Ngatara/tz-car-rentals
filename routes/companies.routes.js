import express from 'express'
import { addCompany, verifyCompany } from '../controllers/company.controllers.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const companyRouter = express.Router();


companyRouter.get('/', (req, res) => {
    res.send({ body: 'A list of companies' })
})

companyRouter.get('/:id', verifyToken, (req, res) => {
    res.send({ body: 'Company profile' })
})

companyRouter.post('/register-company', verifyToken, addCompany)

companyRouter.patch('/:id/approve', verifyToken, verifyCompany)

companyRouter.delete('/:id', verifyToken, (req, res) => {
    res.send({ body: 'Company profile deleted' })
})

export default companyRouter