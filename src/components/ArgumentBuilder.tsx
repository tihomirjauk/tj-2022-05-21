import { Args } from 'types'
import Select, { booleanOptions } from 'components/Select';

function ArgumentBuilder(props: {
    args: Args,
    onChange: (value: Args) => void,
}): JSX.Element {
    /* ...todo: an ugly gui for creating operations */
    const { args, onChange } = props;

    const changeArgumentName = (prevArgName: string) => (event: React.ChangeEvent<HTMLInputElement>): void => {
        /* btw this is changing position of arguments */
        const nextArgs = { ...args, [event.target.value]: args[prevArgName] };
        delete nextArgs[prevArgName];
        onChange(nextArgs);
    }

    const selectArgumentValue = (argName: string) => (value: string): void => {
        const nextValue: boolean = value === "true" ? true : false;
        onChange({ ...args, [argName]: nextValue });
    }

    const addArgument = (event: React.SyntheticEvent<HTMLButtonElement>): void => {
        const defaultArgumentName: string = 'newarg'
        onChange({ ...args, [defaultArgumentName]: false });
    }

    return (
        <div className="row">
            <ul className="ArgumentBuilder">
                {Object.keys(args).map((argName, index) => {
                    return (
                        <li key={`arg-${index}`}>
                            <input type="text" value={argName} onChange={changeArgumentName(argName)} placeholder="Enter arg.name" />
                            <Select
                                value={args[argName]}
                                onChange={selectArgumentValue(argName)}
                                options={booleanOptions}
                            />
                        </li>
                    );
                })}
                <li>
                    <button onClick={addArgument}>+ add arg</button>
                </li>
            </ul>
        </div>
    );
}
export default ArgumentBuilder;