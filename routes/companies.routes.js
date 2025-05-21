import express from 'express'
import { addCompany, verifyCompany } from '../controllers/company.controllers.js';

const companyRouter = express.Router();


companyRouter.get('/', (req, res) => {
    res.send({ body: 'A list of companies' })
})

companyRouter.get('/:id', (req, res) => {
    res.send({ body: 'Company profile' })
})

companyRouter.post('/register-company', addCompany)

companyRouter.patch('/:id/approve', verifyCompany)

companyRouter.delete('/:id', (req, res) => {
    res.send({ body: 'Company profile deleted' })
})

export default companyRouter