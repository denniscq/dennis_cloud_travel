import { CityController } from "../controller/CityController"

export const cityRoutes = [{
    method: "get",
    route: "/city",
    controller: CityController,
    action: "all"
}, {
    method: "get",
    route: "/city/:cityCode",
    controller: CityController,
    action: "one"
}, {
    method: "post",
    route: "/city",
    controller: CityController,
    action: "save"
}, {
    method: "delete",
    route: "/city/:cityCode",
    controller: CityController,
    action: "remove"
}]