// Note: we work mainly with JavaScript.
// However, at least this file is in Typescript to illustrate the point of the typesafe APIs.
import { DefaultApi, PonyDto } from "./generated/openapi";

const api = new DefaultApi();

export function getPonies(): Promise<Array<PonyDto>> {
    return api.getPonies()
}

export function addPony(name: string, birthday: Date): Promise<PonyDto> {
    return api.addPony({
        ponyDto: {
            name: name,
            birthday: birthday
        }
    });
}
