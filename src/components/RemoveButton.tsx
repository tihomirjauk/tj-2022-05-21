import { Operation } from 'types'
import { EmptyOperation } from 'operations'
import { Button } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear';

function RemoveButton(props: {
    onChange: (value: Operation) => void,
}) {
    const { onChange } = props

    const handleRemove = (): void => { onChange(EmptyOperation) }

    return (<Button variant="text" color="error" size="small" onClick={handleRemove}><ClearIcon /></Button>)
}

export default RemoveButton;