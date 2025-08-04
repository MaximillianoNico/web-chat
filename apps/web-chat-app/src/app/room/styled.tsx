import styled from "styled-components";
import { Input } from "antd";

const { TextArea } = Input;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: white;
  border-bottom: 1px solid #f3f4f6;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const Exit = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background: #f3f4f6;
    color: #111827;
  }
`;

export const Title = styled.div`
  flex: 1;
  text-align: center;
`;

export const UserCount = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  &:hover {
    background: #f3f4f6;
  }
`;

export const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  padding-bottom: 100px; /* Add space for sticky input */
  background: white;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ChatBoxContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 20px 20px 20px;
  background: white;
  border-top: 1px solid #f3f4f6;
  z-index: 100;
`;

export const ChatBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 12px;
`;

export const ChatTextfield = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;
  background: #f3f4f6;
  border-radius: 20px;
  padding: 8px 8px 8px 16px;
  gap: 8px;
`;

export const Textfield = styled(TextArea)`
  border: none;
  background: transparent;
  resize: none;
  font-size: 16px;

  &:focus {
    box-shadow: none;
    border: none;
  }

  &::placeholder {
    color: #9ca3af;
  }

  .ant-input {
    background: transparent;
    border: none;
    box-shadow: none;

    &:focus {
      background: transparent;
      border: none;
      box-shadow: none;
    }
  }
`;

export const ArrowWrapper = styled.div<{ disabled?: boolean }>`
  width: 32px;
  height: 32px;
  background: ${(props) => (props.disabled ? "#d1d5db" : "#3b82f6")};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.disabled ? "#d1d5db" : "#2563eb")};
    transform: ${(props) => (props.disabled ? "none" : "scale(1.05)")};
  }
`;
