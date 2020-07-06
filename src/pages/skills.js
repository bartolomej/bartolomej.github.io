import React from "react";
import Layout from "../components/layout";
import styled from "@emotion/styled";
import skillsList from '../../content/skills/list.json'
import { rhythm } from "../utils/typography";
import { graphql } from "gatsby";
import GatsbyImage from "gatsby-image";
import SEO from "../components/seo";


const toolsIcons = {
  "react-native": require("../assets/tools/react.png"),
  "react": require("../assets/tools/react.png"),
  "babel": require("../assets/tools/babel.png"),
  "behance": require("../assets/tools/behance.png"),
  "dribble": require("../assets/tools/dribble.png"),
  "after-effects": require("../assets/tools/after-effects.png"),
  "figma": require("../assets/tools/figma.png"),
  "go": require("../assets/tools/go.png"),
  "heroku": require("../assets/tools/heroku.png"),
  "java": require("../assets/tools/java.png"),
  "jest": require("../assets/tools/jest.png"),
  "mysql": require("../assets/tools/mysql.png"),
  "netlify": require("../assets/tools/netlify.png"),
  "nodejs": require("../assets/tools/nodejs.png"),
  "premiere-pro": require("../assets/tools/premiere-pro.png"),
  "photoshop": require("../assets/tools/photoshop.png"),
  "redux": require("../assets/tools/redux.png"),
  "typescript": require("../assets/tools/typescript.png"),
  "webpack": require("../assets/tools/webpack.png"),
  "yarn": require("../assets/tools/webpack.png"),
}

function Skills ({ data, location }) {

  return (
    <Layout location={location}>
      <SEO
        title="My Skills"
        description="A list of my skills and experiences."
      />
      <Wrapper>
        {skillsList.map((s,i) => (
          <>
            <SkillItem key={s.title}>
              <TextSide>
                <h3>{s.title}</h3>
                <div>{s.tools.map(t => <ToolIcon alt={t} src={toolsIcons[t]}/>)}</div>
                <p>{s.description}</p>
              </TextSide>
              <ImageSide>
                {data[s.folder] && data[s.folder].nodes.map((n, i) => (
                  <ImageWrapper i={i} dy={100} dx={50} l={data[s.folder].nodes.length}>
                    <GatsbyImage key={i} fluid={n.childImageSharp.fluid}/>
                  </ImageWrapper>
                ))}
              </ImageSide>
            </SkillItem>
            {i !== skillsList.length - 1 && <hr/>}
          </>
        ))}
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 70%;
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
  @media (max-width: 900px) {
    max-width: 90%;
  }
`;

const SkillItem = styled.article`
  display: flex;
  padding-bottom: 30vh;
  padding-top: 10vh;
  @media (max-width: 900px) {
    flex-direction: column;
    padding-bottom: 70vh;
  }
`;

const ToolIcon = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const TextSide = styled.div`
  flex: 1;
  padding-right: 50px;
  @media (max-width: 900px) {
    padding-right: 0;
  }
`;

const ImageSide = styled.div`
  flex: 1.5;
  position: relative;
`;

const ImageWrapper = styled.div`
  --y0: ${p => - ((p.l - 1) * p.dy) / 3}px;
  position: absolute;
  width: 80%;
  transition: 0.3s ease-in all;
  transform: translateY(calc(${p => (p.i * p.dy)}px + var(--y0))) translateX(${p => p.i * p.dx}px);
  & > div {
    box-shadow: 0 10px 20px rgba(0,0,0,.2);
    border-radius: 8px;
  }
  &:hover {
    transform: translateY(calc(${p => (p.i * p.dy)}px + var(--y0))) translateX(${p => p.i * 50}px) translateY(-5%);
  }
  @media (max-width: 900px) {
    --y0: 0px;
  }
`;

export default Skills;

export const query = graphql`
  query {
    backend: allFile(filter: {relativeDirectory: {eq: "skills/backend"}}) {
      nodes {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    website: allFile(filter: {relativeDirectory: {eq: "skills/website"}}) {
      nodes {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    mobile: allFile(filter: {relativeDirectory: {eq: "skills/mobile"}}) {
      nodes {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;
