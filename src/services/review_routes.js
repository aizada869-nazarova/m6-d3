import express from 'express'
import { Product, Review } from '../db/models/allModules.js'

const reviewRouter = express.Router()

reviewRouter.post('/', async (req, res, next) => {
    try {
        const data = await Review.create(req.body)
        res.send(data)
    } catch (error) {
        console.log("Review post route error: ", error)
        next(error)
    }
})

reviewRouter.get('/', async (req, res, next) => {
    try {
        const reviews = await Review.findAll(
            {
                include: [
                    { model: Product, attributes: { exclude: ["id", "createdAt", "updatedAt"] } }
                ]
            }
        )
        res.send(reviews)
    } catch (error) {
        console.log(error)
        next(error)
    }
})

reviewRouter.get('/:reviewId', async (req, res, next) => {
    try {
        const review = await Review.findOne ({where: {
            id: req.params.id,
          },
          include: Product,
        })
        if (review) {
            res.send(review)
        } else {
            res.status(404).send(`Review with id ${ req.params.reviewId } not found.`)
        }
    } catch (error) {
        console.log( error)
        next(error)
    }
})

reviewRouter.put('/:reviewId', async (req, res, next) => {
    try {
        const updatedReview = await Review.update(req.body, {
            where: { id: req.params.reviewId },
            returning: true
        })
        res.send(updatedReview)
    } catch (error) {
        console.log( error)
        next(error)
    }
})

reviewRouter.delete('/:reviewId', async (req, res, next) => {
    try {
        const result = await Review.destroy({
            where: { id: req.params.reviewId }
        })
        if (result > 0) {
            res.status(204).send()
        } else {
            res.status(404).send(`Review with id ${ req.params.reviewId } couldn't be deleted since it wasn't found.`)
        }
    } catch (error) {
        console.log(error)
        next(error)
    }
})




export default reviewRouter