import styled from "styled-components";

export interface CardProps {
    isNav?: boolean
    radius?: number
    isArticle?: boolean
}

const Card = styled.div<CardProps>`
    border: 1px solid ${(props) => props.isNav || props.isArticle ? "none" : "#000"};
    border-bottom: 1px solid ${(props) => props.isNav ? "#000" : "none"};
    border-radius: ${(props) => (props.isArticle ? 4 : props.radius) + "px"};
    background-color: #3498db;
`

Card.defaultProps = {
    isNav: false,
    radius: 3,
    isArticle: false
}


export default Card