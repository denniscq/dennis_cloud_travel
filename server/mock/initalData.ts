import { User } from "../src/entity/User"
import { City } from "../src/entity/City"
import { Hotel } from "../src/entity/Hotel"
import city from "./city.json"
import hotel from "./hotel.json"
import user from "./user.json"

const init = async (AppDataSource) => {
    // init user
    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, user)
    )
    // init hotel
    hotel.forEach(async (p, index) => {
        await AppDataSource.manager.save(
            AppDataSource.manager.create(Hotel, { cityCode: index === 0 ? 'sgsg' : 'klmy', content: p })
        )
    })

    // init city
    await AppDataSource.manager.save(
        AppDataSource.manager.create(City, city)
    )
}

export default init