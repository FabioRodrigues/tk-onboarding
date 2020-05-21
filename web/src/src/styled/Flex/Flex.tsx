import styled from 'styled-components'

const Container = styled.div`
    margin-left: 10%;
    margin-right: 10%;
`

const Row = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    margin: auto;
`

const RowRight = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-end;
    margin: auto;
`

const Item = styled.div`
    align-self: center;
    margin: 5px;
`

export const StyledFlex =  {Row, RowRight, Item, Container};