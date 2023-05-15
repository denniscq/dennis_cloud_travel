import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Hotel } from "../entity/Hotel"

export class HotelController {

    private hotelRepository = AppDataSource.getRepository(Hotel)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.hotelRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const { cityCode } = request.params;

        const hotel = await this.hotelRepository.findOne({
            where: { cityCode }
        })

        return hotel.content
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { cityCode, label } = request.body;

        const hotel = Object.assign(new Hotel(), {
            cityCode,
            label
        })

        return this.hotelRepository.save(hotel)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let removedOne = await this.hotelRepository.findOneBy({ id })

        if (!removedOne) {
            throw Error('data does not exist');
        }

        await this.hotelRepository.remove(removedOne)
        return true
    }
}