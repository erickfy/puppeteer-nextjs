import * as z from "zod";

const fieldNeeded = { required_error: "Campo necesario" }

export const ParamSchema = z.object({
    searchInput: z.string(fieldNeeded).optional()
})
export type TParamSchema = z.infer<typeof ParamSchema>


export const ParamsEditUserSchema = z.object({
    changePassword: z.string().optional()
})
export type TParamsEditUserSchema = z.infer<typeof ParamsEditUserSchema>

