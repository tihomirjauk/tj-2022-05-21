import { Args, Operation } from 'types'
import OperationBuilder from './OperationBuilder';
import RemoveButton from 'components/RemoveButton';
import Select, { booleanOperationOptions } from 'components/Select';


function OperationNot(props: {
    value: Operation,
    onChange: (value: Operation) => void,
    args: Args
}): JSX.Element {
    const { args, value, onChange } = props

    const changeOperation = (index: number) => (operation: Operation): void => {
        const nextValue = { ...value }
        nextValue.params[index] = operation
        onChange(nextValue)
    }

    const changeOperationName = (selected: string): void => {
        if (selected === "or" && value.params) {
            onChange({ name: "or", params: value.params })
        }
        if (selected === "and" && value.params) {
            onChange({ name: "and", params: value.params })
        }
        if (selected === "not" && value.params) {
            onChange({ name: "not", params: [value.params[0]] })
        }
    }

    return (
        <div className="row">
            <Select value={value.name} onChange={changeOperationName} options={booleanOperationOptions} />
            <RemoveButton onChange={onChange} />
            {value.params.map((param, index) => {
                return (<OperationBuilder args={args} value={param} onChange={changeOperation(index)} />)
            })}
        </div>
    )
}

export default OperationNot