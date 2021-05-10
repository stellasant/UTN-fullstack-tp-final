import React from 'react'
import { Wrapper, ImageWrapper, Message } from './style'

export const ErrorPlaceholder = (props) => {
  return (
    <Wrapper>
      <ImageWrapper>
        {props.children}
      </ImageWrapper>
      <Message>{props.errorMessage}</Message>
    </Wrapper>
  )
}