"use client";

import { useState } from "react";
import styled from "styled-components";

interface IGeneralSelectBox {
  options: {
    value: string;
    columns: string[];
  };
}

function GeneralSelectBox({ options }: IGeneralSelectBox) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const dropDownFunc = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const setSelectValue = ({ value }: { value: string }) => {
    setValue(value);
    setOpen(false);
  };

  return (
    <Container>
      <Value>{value || "선택"}</Value>

      <SelectBoxIcon
        open={open}
        onClick={dropDownFunc}
        src={"/icons/DownArrow.png"}
      />

      {open && (
        <SelectBoxList>
          {options.columns.map((res, index) => (
            <Select onClick={() => setSelectValue({ value: res })} key={index}>
              {res}
            </Select>
          ))}
        </SelectBoxList>
      )}
    </Container>
  );
}

export default GeneralSelectBox;

const Container = styled.div`
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  background-color: #fff;
  border: 1px solid #dee1e6;
  border-radius: 8px;

  max-width: 335px;
  min-width: 100px;
  height: 40px;
`;

const Value = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  margin-left: 5px;
`;

const SelectBoxIcon = styled.img<{ open: boolean }>`
  width: 20px;
  height: 20px;

  transition: all ease 0.5s;
  transform: ${({ open }) => (open ? " rotate(180deg)" : " rotate(0deg)")};
`;

const SelectBoxList = styled.div`
  display: grid;
  gap: 8px;

  position: absolute;
  top: 50px;

  width: 100%;
  padding: 10px 0 10px 5px;

  background-color: #fff;
  border: 1px solid #dee1e6;
  border-radius: 8px;
`;

const Select = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  cursor: pointer;
`;
