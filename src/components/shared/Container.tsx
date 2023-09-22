import styled from "styled-components";
import { MAX_WIDTH } from "../../constants";

const Container = styled.div`
  width: 100%;
  max-width: ${MAX_WIDTH};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: nowrap;
  gap: 16px;
  height: 100%;
  padding: 0px;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
  background: #ffffff;
`;

export default Container;
