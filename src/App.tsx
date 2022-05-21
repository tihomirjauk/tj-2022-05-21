import { useEffect, useState } from "react"

import { Args, Operation } from 'types'
import { EmptyOperation, evaluateOperation } from "operations"

import ArgumentBuilder from "components/ArgumentBuilder"
import OperationBuilder from 'operations/OperationBuilder'

import { Card, CardContent, Chip, Grid, Paper, Typography } from '@mui/material';

import './App.css'
interface Dict {
  [key: string]: string;
}
const message: Dict = {
  UNDEFINED: "UNDEFINED - please select all arguments",
  TRUE: "TRUE",
  FALSE: "FALSE"
}

const chipStyle = (value: string) => {
  if (value === message.TRUE) {
    return { color: "#fff", backgroundColor: "#393" }
  }
  if (value === message.FALSE) {
    return { color: "#fff", backgroundColor: "#933" }
  }
  return { color: "#fff", backgroundColor: "#444" }
}

const defaultArgs: Args = {
  Argument1: true
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
    <Paper>
      {/* todo: use <OperationBuilder> and have an interface
      for entering arguments and seeing the result */}
      <Grid container spacing={4}>
        <Grid item sm={12}>
          <ArgumentBuilder args={args} onChange={changeArguments} />
        </Grid>

        <Grid item sm={12}>
          <OperationBuilder args={args} value={operation} onChange={changeOperation} />
        </Grid>

        <Grid item sm={12}>
          <Card sx={{ backgroundColor: "#eee" }}>
            <CardContent>
              <Typography variant="body1">Result: </Typography>
              <Chip
                label={evaluationResult}
                sx={chipStyle(evaluationResult)}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default App
