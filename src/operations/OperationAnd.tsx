import { Args, Operation } from 'types'
import OperationBuilder from './OperationBuilder'
import Select, { booleanOperationOptions } from 'components/Select'
import RemoveButton from 'components/RemoveButton'
import { Button } from '@mui/material';

function OperationAnd(props: {
    value: Operation,
    onChange: (value: Operation) => void,
    args: Args
}): JSX.Element {
    const { args, value, onChange } = props

    const addOperation = (event: React.MouseEvent<HTMLButtonElement>): void => {
        onChange({ ...value, params: [...value.params, { name: undefined, params: [] }] })
    }

    const changeOperation = (index: number) => (operation: Operation): void => {
        const nextValue = { ...value }
        nextValue.params[index] = operation
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
            <Button variant="outlined" onClick={addOperation}>+ add op</Button>
        </div>
    )
}

export default OperationAnd