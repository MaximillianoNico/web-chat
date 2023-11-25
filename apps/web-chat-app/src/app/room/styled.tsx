import { Input, Card as CardItem } from "antd";
import styled from "styled-components";

interface IChatItem {
  $isOwnChat?: boolean
}

export const Header = styled.div`
  display: grid;
  grid-template-columns: 30px auto;
`

export const Exit = styled.div`
  color: #5DB075;
`

export const Title = styled.div`
  text-align: center;
`

export const ChatContainer = styled.div`
  overflow: scroll;
  height: calc(100vh - 200px);
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  &&::-webkit-scrollbar {
    display: none;
  }
`

export const ChatBox = styled.div`
  position: absolute;
  bottom: 16px;
  left: 4px;
  right: 4px;
`

export const ChatTextfield = styled.div`
  position: relative;
`

export const ChatBoxContainer = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  height: 100px;
  width: auto;
`

export const ArrowWrapper = styled.div`
  position: absolute;
  bottom: 14px;
  right: 6px;
  width: 28px;
  border-radius: 50%;
  background-color: #5DB075;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
`

export const Card = styled(CardItem)<IChatItem>`
  width: 70%;
  background-color: #F6F6F6;
  border: 1px solid #E8E8E8;
  float: ${({ $isOwnChat }) => $isOwnChat ? "right" : "left"};
  margin: 10px 0px;
  background-color: ${({ $isOwnChat }) => $isOwnChat ? "#5DB075" :"#F6F6F6"};
`

export const Textfield = styled(Input.TextArea)`
  font-size: 16px;
  min-height: 40px !important;
  margin: 8px 0px;
  padding-right: 35px;
  color: #BDBDBD;
  background-color: #F6F6F6;
  border-radius: 20px;

  input {
    background-color: #F6F6F6;
  }

  textarea {
    min-height: 40px !important;
  }
`
