import React from 'react'
import styled from 'styled-components'

import { Text, NumberInput } from 'blockchain-info-components'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: 48px;
`
const Error = styled(Text)`
  position: absolute;
  display: block;
  top: -18px;
  right: 0;
  height: 15px;
`
const getErrorState = meta => {
  return meta.touched && meta.invalid ? 'invalid' : 'initial'
}

const NumberBox = field => {
  const errorState = getErrorState(field.meta)

  return (
    <Container className={field.className}>
      <NumberInput
        {...field.input}
        errorState={errorState}
        placeholder={field.placeholder}
        data-e2e={field['data-e2e']}
      />
      {field.meta.touched && field.meta.error && (
        <Error
          size='12px'
          weight={500}
          color='error'
          errorBottom={field.errorBottom}
          data-e2e='numberBoxError'
        >
          {field.meta.error}
        </Error>
      )}
      {field.meta.touched && !field.meta.error && field.meta.warning && (
        <Error
          size='12px'
          weight={400}
          color='sent'
          errorBottom={field.errorBottom}
        >
          {field.meta.warning}
        </Error>
      )}
    </Container>
  )
}

export default NumberBox
