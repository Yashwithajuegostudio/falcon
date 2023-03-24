/* eslint-disable react/jsx-key */
import DataField from "@/components/DataField";
import Form from "@/components/Form";
import FormButtonStack from "@/components/FormButtonStack";
import { AppColors, PRIMARY_BUTTON_VARIANT } from "@/lib/constant";
import { buttonFieldProps } from "@/lib/types";
import { NextPage } from "next";
import React, { useState } from "react";
import styled from "styled-components";
import { Label } from "styles/globalStyles";

const AddDeviceId: NextPage = ({}) => {
  const [deviceId, setDeviceId] = useState();

  const buttonList: buttonFieldProps = {
    gap: "2rem",
    marginTop: "1rem",
    property: [
      {
        type: "submit",
        value: "Submit",
        disabled: false,

        width: "custom",
        variant: PRIMARY_BUTTON_VARIANT,
        color: PRIMARY_BUTTON_VARIANT,
      },
    ],
  };
  const onChangeDeviceId = (value: any) => {
    setDeviceId(value);
  };
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // updateWithdrawalLimit();
    // confirmPopUp();
  };
  return (
    <AddDeviceIdContainer>
      <AddDeviceFormContainer>
        <Form
          padding="2rem"
          formBodyStack={[
            <>
              <InputContainer>
                <Label>Device Ids :</Label>
                <DataFieldContainer>
                  <DataField
                    type="text"
                    name="device_id"
                    width="15rem"
                    defaultValue={deviceId}
                    onChange={onChangeDeviceId}
                  />
                  <Label>Enter comma separated Device Ids</Label>
                </DataFieldContainer>
              </InputContainer>
            </>,
          ]}
          formFooterStack={[<FormButtonStack buttonStackList={buttonList} />]}
          onFormSubmit={onFormSubmit}
        />
      </AddDeviceFormContainer>
    </AddDeviceIdContainer>
  );
};
export default React.memo(AddDeviceId);

const AddDeviceIdContainer = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
  background-color: ${AppColors.BgColor};
`;
const AddDeviceFormContainer = styled.div`
  width: 70%;
  height: 100%;
  background-color: ${AppColors.BgColor};
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.7rem;
`;
const DataFieldContainer = styled.main`
  display: flex;
  flex-direction: column;
`;
