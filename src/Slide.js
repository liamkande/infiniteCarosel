import React from "react";
import styled from "styled-components";

const Outer = styled.div`
  padding: 10px 5px;
  width: 250px;
  height: 250px;

`;

const Inner = styled.div`
  width: 200px;
  height: 220px;
  background-color: white;
  color: #111;
  padding: 5px;
  font-size: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default props => {
  return (
    <Outer>
      <Inner>{props.children}</Inner>
    </Outer>
  );
};
