import { Operation } from 'types'
import { EmptyOperation } from 'operations'

function RemoveButton(props: {
    onChange: (value: Operation) => void,
}) {
    const { onChange } = props

    const handleRemove = (): void => { onChange(EmptyOperation) }

    return (<button onClick={handleRemove}>x</button>)
}

export default RemoveButton;