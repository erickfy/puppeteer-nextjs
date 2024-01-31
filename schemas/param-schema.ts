import * as z from "zod";

const fieldNeeded = { required_error: "Campo necesario" }

export const ParamSchema = z.object({
    search: z.string(fieldNeeded).optional()
})
export type TParamSchema = z.infer<typeof ParamSchema>

