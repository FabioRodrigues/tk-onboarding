import styled from 'styled-components'


const button = styled.button`
display:inline-block;
cursor:pointer;
color:#ffffff;
font-family:Arial;
font-size:13px;
font-weight:bold;
padding:6px 12px;
text-decoration:none;
margin: 2px;
:active{
	position:relative;
	top:1px;
}

`

const Primary = styled(button)`
	box-shadow: inset 0px 1px 0px 0px #9acc85;
	background:linear-gradient(to bottom, #74ad5a 5%, #68a54b 100%);
	background-color:#74ad5a;
	border:1px solid #3b6e22;
    :hover{
        background:linear-gradient(to bottom, #68a54b 5%, #74ad5a 100%);
	    background-color:#68a54b;
    }
`

const Secondary = styled(button)`
	box-shadow:inset 0px 1px 0px 0px #91b8b3;
	background:linear-gradient(to bottom, #768d87 5%, #6c7c7c 100%);
	background-color:#768d87;
	border:1px solid #566963;
    :hover{
        background:linear-gradient(to bottom, #6c7c7c 5%, #768d87 100%);
	    background-color:#6c7c7c;
    }
`

const Delete = styled(button)`
	box-shadow:inset 0px 39px 0px -24px #e67a73;
	background-color:#e4685d;
	border-radius:4px;
	border:1px solid #ffffff;
    padding: 2px 5px;
	text-shadow:0px 1px 0px #b23e35;
	:hover{
		background-color:#eb675e;
	}
`

export const Button = {
    Primary,
	Secondary,
	Delete
}