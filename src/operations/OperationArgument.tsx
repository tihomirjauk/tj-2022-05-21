import { Args, Operation } from 'types'
import Select, { Option } from 'components/Select'
import RemoveButton from 'components/RemoveButton'


function OperationArgument(props: {
    value: Operation,
    onChange: (value: Operation) => void,
    args: Args
}): JSX.Element {
    const { args, value, onChange } = props

    const selectArgument = (arg: string): void => {
        const nextValue: Operation = { ...value }
        nextValue.argName = arg
        onChange(nextValue)
    }

    const argumentOptions = Object.keys(args).map((argName): Option => {
        return {
            label: argName,
            value: argName
        }
    })

    return (
        <div className="row">
            <Select
                value={value.argName}
                onChange={selectArgument}
                options={argumentOptions}
            />
            <RemoveButton onChange={onChange} />
        </div>
    )
}

export default OperationArgument