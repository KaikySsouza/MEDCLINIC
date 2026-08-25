import type { ParamsDictionary } from "express-serve-static-core";
export interface Params extends ParamsDictionary{
    id: string
}
