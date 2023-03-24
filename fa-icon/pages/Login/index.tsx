/* eslint-disable react/jsx-key */
import Form from "@/components/Form";
import FormButtonStack from "@/components/FormButtonStack";
import FormDataFieldStack from "@/components/FormDataFieldStack";
import Toast from "@/components/Toast";
import { AuthContext } from "@/context/AuthProvider";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  ACCESS_TOKEN,
  AppColors,
  LANDING_PAGE,
  LOGIN_FORM_HEADER,
  LOGIN_FORM_SUB_HEADER,
  MANDATORY_FIELD,
  errorMessages,
  localStorageMethods,
  loginResponseData,
} from "@/lib/constant";
import { loginStackList } from "@/lib/formStackHelper";
import { routerNavigation } from "@/lib/helper";
import { ToastFieldProps, buttonFieldProps } from "@/lib/types";
import { NextPage } from "next";
import React, { useContext, useState } from "react";
import styled from "styled-components";

interface loginDataProps {
  user_name: string;
  password: string;
}

const Login: NextPage = () => {
  const { setToken } = useContext(AuthContext);
  const [setItemInLocalStorage] = useLocalStorage();
  // get the login form input label data from loginStackList
  const { dataFieldList } = loginStackList();
  const { SET } = localStorageMethods;
  const [isLoginBtnClicked] = useState<Boolean>(false);

  const [popUp, setPopUp] = useState<ToastFieldProps>({
    show: false,
    message: " ",
    type: "error",
    position: "top-right",
  });

  const formHeaderProps = {
    header: LOGIN_FORM_HEADER,
    subHeader: LOGIN_FORM_SUB_HEADER,
    style: {
      whiteSpace: "pre",
    },
  };

  const buttonList: buttonFieldProps = {
    property: [
      {
        type: "submit",
        value: "Login",
        disabled: isLoginBtnClicked ? true : false,
      },
    ],
  };
  // form validation function
  const formValidation = (formData: loginDataProps) => {
    if (!formData.user_name || !formData.password) {
      setPopUp({
        ...popUp,
        show: true,
        type: "info",
        position: "top-right",
        message: MANDATORY_FIELD,
      });
    } else {
      return true;
    }
  };
  //on submit form button functionality
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    // create a formData Object
    const formData = {
      user_name: target.email.value,
      password: target.password.value,
    };

    if (formValidation(formData)) {
      if (JSON.stringify(formData) === JSON.stringify(loginResponseData)) {
        setToken(ACCESS_TOKEN);
        setItemInLocalStorage(SET, "accessToken", ACCESS_TOKEN);
        routerNavigation(LANDING_PAGE);
      } else {
        setPopUp({
          ...popUp,
          show: true,
          message: errorMessages.invalid_credentials,
        });
      }
    }
  };

  return (
    <LoginPageContainer>
      <ProductNameContainer />
      <LoginOuterContainer>
        <LoginFormContainer>
          <Form
            margin="2rem 0rem 0rem 0rem"
            formHeader={formHeaderProps}
            formBodyStack={[
              <FormDataFieldStack dataFieldStackList={dataFieldList} />,
            ]}
            formFooterStack={[<FormButtonStack buttonStackList={buttonList} />]}
            onFormSubmit={onFormSubmit}
            boxShadow="none"
          />
        </LoginFormContainer>
      </LoginOuterContainer>
      {popUp.show && (
        <Toast
          type={popUp.type}
          position={popUp.position}
          onClose={() => setPopUp({ ...popUp, message: "", show: false })}
          description={popUp.message}
        />
      )}
    </LoginPageContainer>
  );
};

export default React.memo(Login);
const LoginPageContainer = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  height: 100vh;
  background-color: ${AppColors.White};
`;

const ProductNameContainer = styled.div`
  background-color: ${AppColors.Primary};
`;
const LoginFormContainer = styled.div`
  width: 60%;
  margin: auto;
  background-color: ${AppColors.White};
`;
const LoginOuterContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  overflow: hidden;
`;
