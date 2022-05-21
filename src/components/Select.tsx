import { NativeSelect, } from "@mui/material";

export type Option = {
    label: string,
    value: any
}

function Select(props: {
    value?: any,
    options?: Option[],
    onChange: (value: any) => void;
}) {
    const {
        value,
        options = [],
        onChange
    } = props;

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        onChange(event.target.value)
    }

    return (
        <NativeSelect size="small" value={value} onChange={handleChange}>
            {options.map((option, index) => {
                return (<option key={`option-${index}`} value={option.value} >{option.label}</option>)
            })}
        </NativeSelect>
    )
}

export const booleanOptions = [
    {
        label: "true",
        value: true,
    },
    {
        label: "false",
        value: false
    }
];

export const operationOptions = [
    {
        label: "select ...",
        value: undefined
    },
    {
        label: "constant",
        value: "constant"
    },
    {
        label: "argument",
        value: "argument"
    },
    {
        label: "and",
        value: "and"
    },
    {
        label: "or",
        value: "or"
    },
    {
        label: "not",
        value: "not"
    },
];

export const booleanOperationOptions = [
    {
        label: "and",
        value: "and"
    },
    {
        label: "or",
        value: "or"
    },
    {
        label: "not",
        value: "not"
    },
];

export default Select;