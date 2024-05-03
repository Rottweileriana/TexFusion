import styled, { keyframes } from "styled-components";
import React, { useEffect, useRef } from "react";

const Body = styled.body`
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const HomeBackgroundContainer = styled.div`
  background-color: black;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
`;

const Title = styled.h2`
  font-family: "Marschel", sans-serif;
  font-size: 60px;
  font-weight: 30px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #999898;
  z-index: 1;
  opacity: 0;
  transition: opacity 4s ease;
  padding-left: 10px;
  padding: 35px 0 0 0;
  margin: 0 0 0 0;
`;

const SubTitle = styled.p`
  font-family: "Marschel", sans-serif;
  font-size: 20px;
  font-weight: 30px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #999898;
  opacity: 0;
  transition: opacity 7s ease;
  padding: 0 0 65px 0;
  margin: 0 0 0 0;
`;

const horizontalLineAnimation = keyframes`
  0% {
    width: 0;
    opacity: 0;
    right: 0;
  }

  100% {
    width: calc(50% + 200px);
    opacity: 1;
    right: calc(5%);
  }
`;

const verticalLineAnimation = keyframes`
  0% {
    height: 0;
    opacity: 0;
    top: 100%;
  }

  100% {
    height: calc(70% - 3px);
    opacity: 1;
    top: calc(40% + 20px);
  }
`;

interface LineProps {
  titleHeight?: number;
}

const HorizontalLine = styled.div<LineProps>`
  position: absolute;
  background-color: #888181;
  width: 2px;
  height: 2px;
  animation: ${horizontalLineAnimation} 2s forwards;
`;

const VerticalLine = styled.div`
  position: absolute;
  background-color: #888181;
  width: 2px;
  height: 0;
  top: 100%;
  right: calc(61%);
  animation: ${verticalLineAnimation} 2s forwards;
`;

export function HomeComponent() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subTitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleRef.current && subTitleRef.current) {
        titleRef.current.style.opacity = "1";
        subTitleRef.current.style.opacity = "1";
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Body>
      <HomeBackgroundContainer>
        <Title ref={titleRef}>Tex Fusion</Title>
        <SubTitle ref={subTitleRef}>Premium Tacos</SubTitle>
        <HorizontalLine titleHeight={titleRef.current?.offsetHeight} />
        <VerticalLine />
      </HomeBackgroundContainer>
    </Body>
  );
}
