import styled from 'styled-components'

const Table = styled.div`
    display: table;
    width: 100%;
    text-align: center;
    border: 1px solid gray;
    border-radius: 5px;
`

const Header = styled.div`
    display: table-header-group;
    font-weight: 500;
`

const Body = styled.div`
    display: table-row-group;
`

const Row = styled.div`
    display: table-row;
    font-size: 12px;
    font-weight: 100;
    `

const Column = styled.div`
    display: table-cell;
    border-bottom: 1px solid #e0e0e0;
    padding: 2px;
`

export const RespTable = {
    Table,
    Header,
    Body,
    Row,
    Column
};