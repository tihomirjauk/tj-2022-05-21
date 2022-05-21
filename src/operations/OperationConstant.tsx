import { Args, Operation } from 'types'
import Select, { booleanOptions } from 'components/Select'
import RemoveButton from 'components/RemoveButton'

function OperationConstant(props: {
    value: Operation,
    onChange: (value: Operation) => void,
    args?: Args
}): JSX.Element {
    const { value, onChange } = props

    const handleChange = (selected: string): void => {
        const nextValue: boolean = selected === "true" ? true : false;
        onChange({
            name: "constant",
            params: [],
            constValue: nextValue
        });
    }

    return (
        <div className="row">
            <Select value={value.constValue} onChange={handleChange} options={booleanOptions} />
            <RemoveButton onChange={onChange} />
        </div>
    )
}

export default OperationConstant