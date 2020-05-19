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


const Card = styled.div`
    border-radius: 5px;
    width: 50vw;
    min-height: 60vh;
    min-width: 90vw;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
`

export const StyledFlex =  {Row, RowRight, Item, Card, Container};