import styled from "styled-components";
import { Input, Button as ButtonAntd } from 'antd'

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #f3f4f6;
`

export const BackButton = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;

  &:hover {
    color: #111827;
  }
`

export const Container = styled.div`
  min-height: 100vh;
  background: white;
`

export const FormContainer = styled.div`
  padding: 20px;
`

export const SearchInput = styled(Input)`
  border-radius: 16px;
  border: none;
  background-color: #f3f4f6;
  font-size: 16px;
  padding: 12px 16px;
  margin-bottom: 20px;

  input {
    background-color: transparent;
  }

  &:hover {
    background-color: #e5e7eb;
  }

  &:focus {
    background-color: #e5e7eb;
    box-shadow: none;

    input {
      background-color: transparent;
    }
  }

  &::placeholder {
    color: #9ca3af;
  }
`

export const RoomsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const RoomCard = styled.div`
  padding: 16px;
  border-radius: 16px;
  background: white;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
  }
`

export const RoomHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

export const RoomInfo = styled.div`
  color: #6b7280;
  font-size: 14px;
  margin-top: 2px;
`

export const JoinButton = styled(ButtonAntd)`
  background-color: #e5e7eb;
  border: none;
  border-radius: 12px;
  color: #374151;
  font-weight: 500;
  height: 36px;
  padding: 0 16px;

  &:hover {
    background-color: #d1d5db;
    color: #111827;
  }

  &:disabled {
    background-color: #f3f4f6;
    color: #9ca3af;
  }
`

export const Textfield = styled(Input)`
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  font-size: 16px;
  padding: 12px 16px;
  transition: all 0.3s ease;

  &:hover {
    border-color: #d1d5db;
  }

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`

export const Fixed = styled.div`
  position: fixed;
  bottom: 30px;
  left: 20px;
  right: 20px;
  z-index: 1000;
`

export const Button = styled(ButtonAntd)`
  font-size: 14px !important;
  height: 40px !important;
  background: #3b82f6;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background: #2563eb;
  }

  &:disabled {
    background: #e5e7eb;
    color: #9ca3af;
  }
`

export const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Wrapper = styled.div`
  position: relative;
`

export const WelcomeCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
`
