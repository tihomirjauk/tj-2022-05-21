import { Args, Operation } from 'types'
import { EmptyOperation } from 'operations';
import OperationBuilder from './OperationBuilder';
import Select, { booleanOperationOptions } from 'components/Select';
import RemoveButton from 'components/RemoveButton';


function OperationOr(props: {
    value: Operation,
    onChange: (value: Operation) => void,
    args: Args
}): JSX.Element {
    const { args, value, onChange } = props

    const addOperation = (event: React.MouseEvent<HTMLButtonElement>): void => {
        onChange({ ...value, params: [...value.params, EmptyOperation] })
    }

    const changeOperation = (index: number) => (op: Operation): void => {
        const nextValue = { ...value }
        nextValue.params[index] = op
        onChange(nextValue)
    }

    const changeOperationName = (selected: string): void => {
        if ((selected === "and" || selected === "or" || selected === "not") && value.params) {
            onChange({ name: selected, params: value.params })
        }
    }

    return (
        <div className="row">
            <Select value={value.name} onChange={changeOperationName} options={booleanOperationOptions} />
            <RemoveButton onChange={onChange} />
            {value.params.map((param, index) => {
                return (<OperationBuilder key={`ob-${index}`} args={args} value={param} onChange={changeOperation(index)} />)
            })}
            <br />
            <button onClick={addOperation}>+ add op</button>
        </div>
    )
}

export default OperationOr