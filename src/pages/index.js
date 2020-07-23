import React from "react";
import Layout from "../components/layout";
import styled from "@emotion/styled";
import { rhythm } from "../utils/typography";
import SEO from "../components/seo";
import text from "../../content/index.json";


function Index ({ location }) {
  return (
    <Layout location={location}>
      <SEO title={"Home"}/>
      <Header>
        <Emoji>👋</Emoji>
        <Title>{text.title}</Title>
        <Description>{text.description}</Description>
      </Header>
    </Layout>
  );
}

const Header = styled.header`
  margin: 0 auto;
  max-width: ${rhythm(26)};
`;

const Emoji = styled.div`
  font-size: 2em;
`;

const Title = styled.h1`
  margin-top: 5px;
  font-size: 2.2rem;
`;

const Description = styled.p`
  font-size: 1rem;
`;

export default Index;
