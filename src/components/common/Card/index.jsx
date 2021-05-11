import styled from 'styled-components'

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #ffffff;
	box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.05);
	border-radius: 4px;
	overflow: hidden;
	height: 100%;
`

export const Header = styled.div`
	display: flex;
	gap: 12px;
	padding: 1rem;
	align-items: center;
	border-bottom: 1px solid #ededed;
`

export const Body = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	padding: 1rem;
	flex: 1;
`

export const Footer = styled.div`
	display: flex;
	padding: 1rem;
	gap: 5px;
	flex-wrap: nowrap;
	border-top: 1px solid #ededed;
	justify-content: flex-end;
`

export const Item = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`

export const Label = styled.label`
	font-size: 0.65rem;
	text-transform: uppercase;
`

export const Value = styled.div`
	color: #000000;
	font-weight: bold;
	font-size: 1rem;
`

export const Image = styled.img`
	src: ${(props) => props.src};
	object-fit: fill;
	height: 50px;
	width: 50px;
	border-radius: 100%;
	border: 2px solid #c5c5c5;
`

export const GridCards = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 20px;
	padding: 4rem 0rem;
`

export const Action = styled.button`
	color: #bf2000 !important;
	background: transparent;
	border: none;
	font-size: 0.8rem;
	padding: 0.5rem;
	&:hover {
		color: #b41e00 !important;
	}
	&:disabled {
		cursor: not-allowed;
		filter: saturate(10%);
		color: #b41e00;
		filter: saturate(20%);

		&:hover {
			background: transparent;
			color: #b41e00;
			filter: saturate(20%);
			cursor: not-allowed;
		}
	}
`

export const Card = {
	Wrapper,
	Image,
	Item,
	Header,
	Body,
	Footer,
	Label,
	Value,
	Action,
}
