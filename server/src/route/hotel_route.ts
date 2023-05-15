
import { HotelController } from "../controller/HotelController"

export const hotelRoutes = [{
    method: "get",
    route: "/hotels",
    controller: HotelController,
    action: "all"
}, {
    method: "get",
    route: "/hotels/:cityCode",
    controller: HotelController,
    action: "one"
}, {
    method: "post",
    route: "/hotels",
    controller: HotelController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:cityCode",
    controller: HotelController,
    action: "remove"
}]
