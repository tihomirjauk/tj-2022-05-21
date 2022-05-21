import { Operation, Args } from 'types'


export const availableOperationNames = [
    'and',
    'argument',
    'constant',
    'not',
    'or',
] as const

export const EmptyOperation: Operation = {
    name: undefined,
    params: []
}

type Evaluator = {
    [K in typeof availableOperationNames[number]]: any
}

type Result = boolean | undefined

export function evaluateOperation(operation: Operation, args: Args): Result {
    /* ...todo: implement an evaluator for your operations, 
    given some args */
    let result: Result = undefined;
    if (operation.name) {
        return evaluator[operation.name](operation, args, result)
    }
    return result
}

export const evaluator: Evaluator = {
    and: (operation: Operation, args: Args, result: Result): Result => {
        operation.params.forEach((op, index) => {
            result = index === 0 ? evaluateOperation(op, args) : (result && evaluateOperation(op, args))
        });
        return result
    },
    argument: (operation: Operation, args: Args, result: Result): Result => {
        return operation?.argName ? args[operation?.argName] : undefined
    },
    constant: (operation: Operation, args: Args, result: Result): Result => {
        return operation.constValue
    },
    not: (operation: Operation, args: Args, result: Result): Result => {
        const [op] = operation.params
        const eo = evaluateOperation(op, args)
        return eo === undefined ? undefined : !eo
    },
    or: (operation: Operation, args: Args, result: Result): Result => {
        operation.params.forEach((op, index) => {
            result = index === 0 ? evaluateOperation(op, args) : (result || evaluateOperation(op, args))
        })
        return result
    },
}
