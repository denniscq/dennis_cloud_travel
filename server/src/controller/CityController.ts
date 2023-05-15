import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { City } from "../entity/City"

export class CityController {
    private cityRepository = AppDataSource.getRepository(City)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.cityRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const { cityCode } = request.params;

        const city = await this.cityRepository.findOne({
            where: { cityCode }
        })

        return city
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { cityCode, label } = request.body;

        const user = Object.assign(new City(), {
            cityCode,
            label
        })

        return this.cityRepository.save(user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id)

        let removedOne = await this.cityRepository.findOneBy({ id })

        if (!removedOne) {
            throw Error('data does not exist');
        }

        await this.cityRepository.remove(removedOne)
        return true
    }
}