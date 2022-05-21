import { useEffect, useState } from "react"

import { Args, Operation } from 'types'
import { EmptyOperation, evaluateOperation } from "operations"

import ArgumentBuilder from "components/ArgumentBuilder"
import OperationBuilder from 'operations/OperationBuilder'

import './App.css'

const message = {
  UNDEFINED: "UNDEFINED - please select all arguments",
  TRUE: "TRUE",
  FALSE: "FALSE"
}

const defaultArgs = {
  Argument1: true,
  Something: false
}

function App() {
  const [args, setArgs] = useState<Args>(defaultArgs)
  const [operation, setOperation] = useState<Operation>(EmptyOperation)
  const [evaluationResult, setEvaluationResult] = useState<string>(message.UNDEFINED)

  useEffect(() => {
    if (operation) {
      const evaluated = evaluateOperation(operation, args);
      if (evaluated === undefined) {
        setEvaluationResult(message.UNDEFINED)
      } else {
        setEvaluationResult(evaluated ? message.TRUE : message.FALSE)
      };
    }
  }, [operation, args])

  const changeArguments = (value: Args) => { setArgs(value) }

  const changeOperation = (value: Operation) => { setOperation(value) }

  return (
    <div className="App">
      {/* todo: use <OperationBuilder> and have an interface
      for entering arguments and seeing the result */}
      <ArgumentBuilder args={args} onChange={changeArguments} />

      <OperationBuilder args={args} value={operation} onChange={changeOperation} />

      <div className="row">
        <span>Result: {evaluationResult}</span>
      </div>

    </div>
  );
}

export default App
