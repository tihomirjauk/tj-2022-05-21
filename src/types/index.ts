
export type Args = { [argName: string]: boolean }

export type AllowedNames = "argument" | "constant" | "and" | "or" | "not" | undefined

export type Operation = {
    name?: AllowedNames,
    params: Operation[],
    argName?: string,
    constValue?: boolean,
}
