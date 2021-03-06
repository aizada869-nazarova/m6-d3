import express from 'express'
import { Category } from '../db/models/allModules.js'

const categoryRouter = express.Router({ mergeParams: true })

categoryRouter.post('/', async (req, res, next) => {
    try {
        const category = await Category.create(req.body)
        res.send(category)
    } catch (error) {
        console.log( error)
        next(error)
    }
})

categoryRouter.post('/bulk', async (req, res, next) => {
    try {
        const categories = await Category.bulkCreate(req.body)
        res.send(categories)
    } catch (error) {
        console.log( error)
        next(error)
    }
})

categoryRouter.get('/', async (req, res, next) => {
    try {
        const categories = await Category.findAll()
        res.send(categories)
    } catch (error) {
        console.log("all route error: ", error)
        next(error)
    }
})

categoryRouter.get('/:categoryId', async (req, res, next) => {
    try {
        const category = await Category.findByPk(req.params.categoryId)
        if (category) {
            res.send(category)
        } else {
            res.status(404).send(`category with id ${ req.params.categoryId } was not found.`)
        }
    } catch (error) {
        console.log( error)
        next(error)
    }
})

categoryRouter.put('/:categoryId', async (req, res, next) => {
    try {
        const updatedCategory = await Category.update(req.body, {
            where: { id: req.params.categoryId },
            returning: true
        })
        res.send(updatedCategory)
    } catch (error) {
        console.log( error)
        next(error)
    }
})

categoryRouter.delete('/:categoryId', async (req, res, next) => {
    try {
        const categoryDelete = await Category.destroy({ where: { id: req.params.categoryId } })
        if (categoryDelete > 0) {
            res.status(204).send()
        } else {
            res.status(404).send(`Sorry, category with id ${ req.params.categoryId } was not found and could not be deleted.`)
        }
    } catch (error) {
        console.log( error)
        next(error)
    }
})



export default categoryRouter