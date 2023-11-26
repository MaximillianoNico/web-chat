import { FC } from "react"
import styled from "styled-components"

interface ILayoutPage {
  children: string | JSX.Element | JSX.Element[]
}

const Layout = styled.div`
`

const Container = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  max-width: 768px;
  padding-left: 1rem;
  padding-right: 1rem;
  color: rgba(55, 65, 81, 1);
`

const LayoutPage: FC<ILayoutPage> = ({ children }) => {
  return (
    <Layout>
      <Container>
        {children}
      </Container>
    </Layout>
  )
}

export default LayoutPage;
