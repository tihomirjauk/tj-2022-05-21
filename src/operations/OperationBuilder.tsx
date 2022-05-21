import { Args, Operation } from 'types'
import OperationConstant from './OperationConstant'
import OperationArgument from './OperationArgument'
import OperationAnd from './OperationAnd'
import OperationOr from './OperationOr'
import OperationNot from './OperationNot'

import Select, { operationOptions } from 'components/Select'
import RemoveButton from 'components/RemoveButton'
import { EmptyOperation } from '.'

/* ...todo:
a system for defining logical operations 
(not, and, or... more if you want) that can be passed:
 - selected args by name: (X and Y)
 - constant values not dependent on args: (true and X)
 - other operations: ((X and Y) or Z) 
 */

function OperationBuilder(props: {
    value: Operation;
    onChange: (value: Operation) => void,
    args: Args
}): JSX.Element {
    const { args, value, onChange } = props

    const handleChange = (selected: string): void => {
        let op: Operation = EmptyOperation

        // Instead of using ifs and switch,
        // prefered method would be like it is implemented in
        // operations/index.ts -> evaluator: Evaluator
        // then we could refactor it further 
        // to have operation initialization, component rendering and evaluator
        // in a single file
        if (selected === "constant") {
            op = {
                name: "constant",
                params: [],
                constValue: false
            }
        } else if (selected === "argument") {
            const firstArg: string = Object.keys(args)[0]
            op = {
                name: "argument",
                params: [],
                argName: firstArg
            }
        } else if (selected === "and") {
            op = {
                name: "and",
                params: [EmptyOperation, EmptyOperation]
            }
        } else if (selected === "or") {
            op = {
                name: "or",
                params: [EmptyOperation, EmptyOperation]
            }
        } else if (selected === "not") {
            op = {
                name: "not",
                params: [EmptyOperation]
            }
        } else {
            op = EmptyOperation
        }
        onChange(op)
    }

    switch (value.name) {
        case "constant":
            return (<OperationConstant args={args} value={value} onChange={onChange} />)
        case "argument":
            return (<OperationArgument args={args} value={value} onChange={onChange} />)
        case "and":
            return (<OperationAnd args={args} value={value} onChange={onChange} />)
        case "or":
            return (<OperationOr args={args} value={value} onChange={onChange} />)
        case "not":
            return (<OperationNot args={args} value={value} onChange={onChange} />)
    }

    return (
        <div className="row">
            <Select
                value={undefined}
                onChange={handleChange}
                options={operationOptions}
            />
            <RemoveButton onChange={onChange} />
        </div>
    );
}

export default OperationBuilder