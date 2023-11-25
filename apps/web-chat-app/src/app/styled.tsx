import styled from "styled-components";
import { Input, Button as ButtonAntd } from 'antd'

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Container = styled.div`
  margin: 20px 0px;
`

export const Textfield = styled(Input)`
  font-size: 16px;
  height: 50px;
  margin: 8px 0px;
  color: #BDBDBD;
  background-color: #F6F6F6;
`

export const Fixed = styled.div`
  position: fixed;
  bottom: 60px;
  left: 16px;
  right: 16px;
`

export const Button = styled(ButtonAntd)`
  width: 100%;
  font-size: 16px !important;
  height: 50px !important;
  background-color: #5DB075;
`
