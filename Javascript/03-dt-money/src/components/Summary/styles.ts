import styled, { css } from "styled-components";

export const Container = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: -5rem auto 0;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2rem;
` 

interface CardProps {
  variant?: 'green';
}

export const Card = styled.div<CardProps>`
  background: ${props => props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${props => props.theme['gray-300']};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }

  ${props => props.variant === 'green' && css`
    background: ${props.theme['green-700']};
  `}
`