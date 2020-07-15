import React from "react";
import Layout from "../components/layout";
import styled from "@emotion/styled";
import skillsList from '../../content/skills/list.json'
import { rhythm } from "../utils/typography";
import { graphql } from "gatsby";
import GatsbyImage from "gatsby-image";
import SEO from "../components/seo";
import Tool from "../components/tool";


function Skills ({ data, location }) {

  return (
    <Layout location={location}>
      <SEO
        title="My Skills"
        description="A list of my skills and experiences."
      />
      <Wrapper>
        {skillsList.map(s => (
          <SkillGroup id={s.id} key={s.title}>
            <TextSide>
              <h3>{s.title}</h3>
              <div>{s.tools.map(key => <Tool toolKey={key}/>)}</div>
              <p>{s.description}</p>
            </TextSide>
            <ImageSide>
              {data[s.id] && data[s.id].nodes.map((n, i) => (
                <OuterImage i={i} l={data[s.id].nodes.length} key={i}>
                  <InnerImage>
                    <GatsbyImage fluid={n.childImageSharp.fluid}/>
                  </InnerImage>
                </OuterImage>
              ))}
            </ImageSide>
          </SkillGroup>
        ))}
      </Wrapper>
    </Layout>
  )
}

const Wrapper = styled.div`
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
  hr {
    height: 2px;
  }
`;

const SkillGroup = styled.article`
  display: flex;
  padding: 12vh 0;
  width: 70%;
  margin: 0 auto;
  @media (max-width: 900px) {
    flex-direction: column;
    width: 100%;
    padding: 5vh 0;
  }
`;

const TextSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-right: 50px;
  & > div {
    margin: 8px 0;
  }
  @media (max-width: 900px) {
    padding-right: 0;
  }
`;

const ImageSide = styled.div`
  flex: 1.5;
  display: flex;
  @media (max-width: 700px) {
    padding-top: 50px;
  }
`;

const OuterImage = styled.div`
  margin-top: ${p => (p.i) * 20}%;
  width: 15%;
  position: sticky;
`;

const InnerImage = styled.div`
  height: 350px;
   & > div {
    box-shadow: 0 10px 20px rgba(0,0,0,.2);
    border-radius: 8px;
    position: absolute !important;
    width: 600px;
    transition: 0.3s ease-in all;
  }
  & > div:hover {
    transform: translateY(-20px);
  }
  @media (max-width: 700px) {
    & > div {
      width: 300px;
    }
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
    film: allFile(filter: {relativeDirectory: {eq: "skills/film"}}) {
      nodes {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
    photography: allFile(filter: {relativeDirectory: {eq: "skills/photography"}}) {
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