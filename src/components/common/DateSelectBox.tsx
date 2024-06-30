"use client";
"use client";

import { useState } from "react";
import styled from "styled-components";

interface IDateSelectBox {}

function DateSelectBox() {
  return (
    <Container>
      <DateInput type="date" />
    </Container>
  );
}

export default DateSelectBox;

const Container = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 16px;

  background-color: #fff;
  border: 1px solid #dee1e6;
  border-radius: 8px;

  width: 200px;
  height: 40px;
`;

const DateInput = styled.input`
  outline-style: none;
  border-style: none;
  width: 100%;
  position: relative;

  background: url("/icons/dateIcon.svg") no-repeat repeat right center;

  &::-webkit-clear-button,
  &::-webkit-inner-spin-button {
    display: none;
  }
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    color: transparent;
    cursor: pointer;
  }
`;
