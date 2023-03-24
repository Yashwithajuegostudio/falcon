/* eslint-disable react/jsx-key */
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import styled from "styled-components";

import { menuLinkProps } from "../../lib/types";
import { SidebarData } from "./SidebarData";

import { AppColors, ButtonName } from "@/lib/constant";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AuthContext } from "@/context/AuthProvider";

interface LayoutProps {
  Component: React.FC<{}>;
}

export const Layout: React.FC<LayoutProps> = ({ Component }) => {
  const router = useRouter();
  const [setLocalStorageClear] = useLocalStorage();

  const { resetToken } = useContext(AuthContext);
  // const { toastMessageData, setToastMessageData }: any =
  //   useContext(ToastMessageContext);
  const [headerData, setHeaderData] = useState({
    icon: <></>,
    title: "",
    path: "",
  });
  useEffect(() => {
    SidebarData.map(
      (item) => item.path === router.pathname && setHeaderData(item)
    );
  }, [router]);

  return (
    <div>
      <SidebarDiv>
        <AppLogo>FAICON </AppLogo>
        <SidebarItem>
          {SidebarData.map((item, index) => {
            return (
              <MenuLink
                onClick={() => router.push(item.path)}
                key={index}
                isActive={router.pathname == item.path}
              >
                {item.icon}
                <Title>{item.title}</Title>
              </MenuLink>
            );
          })}
        </SidebarItem>
      </SidebarDiv>
      <SidebarRightDiv>
        <Header>
          {/* <Span>
          <Icon>{headerData.icon}</Icon>
          {headerData.title}
        </Span> */}
          <ButtonContainer>
            <FiLogOut onClick={resetToken} />
          </ButtonContainer>
        </Header>
        <PageContainer>
          <Component />
        </PageContainer>
      </SidebarRightDiv>
    </div>
  );
};

const Header = styled.div`
  background-color: ${AppColors.White};
  height: 10vh;
  width: 100%;
  float: right;
  display: flex;
  justify-content: flex-end;
  padding: 0rem 4rem;
  align-items: center;
`;
const AppLogo = styled.h2`
  margin-top: 1.5rem;
  text-transform: uppercase;
  font-size: 1.2rem;
`;

const Span = styled.span`
  display: flex;
  font-size: 0.875rem;
  align-items: center;
`;
const Icon = styled.div`
  padding-right: 0.75rem;
  display: flex;
  align-self: center;
`;

const SidebarRightDiv = styled.div`
  width: 85vw;
  float: right;
  height: 100vh;
`;

const SidebarDiv = styled.div`
  width: 15%;
  background-color: ${AppColors.Violet};
  height: 100vh;
  text-align: center;
  color: ${AppColors.White};
  min-width: 15%;
  position: absolute;
`;

const SidebarItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  padding: 0rem 2rem;
  align-content: center;
  flex-flow: column wrap;
`;

const MenuLink = styled.button<menuLinkProps>`
  border-style: none;
  background: none;
  color: ${AppColors.White};
  background-color: ${(props) =>
    props.isActive ? `${AppColors.Active}` : "none"};
  display: flex;
  border-radius: ${(props) => (props.isActive ? "0.5rem" : "none")};
  padding: 0.75rem 0.65rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  :hover {
    cursor: pointer;
  }
  @media only screen and (max-device-width: 1112px) {
    align-self: center;
  }
`;
const Title = styled.span`
  padding-left: 0.875rem;
  @media only screen and (max-device-width: 1112px) {
    display: none;
  }
`;

const PageContainer = styled.div`
  width: 100%;
  height: 90vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  padding: 0.5rem 1rem;
  :hover {
    background-color: ${AppColors.GreyTwo};
  }
`;
