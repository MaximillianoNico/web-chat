import styled from "styled-components";
import { Card as CardItem } from "antd";

interface IChatItem {
  $isOwnChat?: boolean
}

export const Card = styled(CardItem)<IChatItem>`
  width: 70%;
  background-color: #F6F6F6;
  border: 1px solid #E8E8E8;
  float: ${({ $isOwnChat }) => $isOwnChat ? "right" : "left"};
  margin: 10px 0px;
  background-color: ${({ $isOwnChat }) => $isOwnChat ? "#5DB075" :"#F6F6F6"};
`

export const Wrapper = styled.div`
  display: grid;
  width: 100%;
`

export const Sender = styled.div`
  float: left;
`
