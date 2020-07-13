import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { animated, useTransition } from "react-spring";
import UseAnimations from "react-useanimations";
import useFocus from "../useFocus";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export const PHOTO_ACTIONS = {
  OPEN_URL: 0,
  SHOW_PHOTO: 1
}

function Photo ({ src, previewSrc, size, caption, styles, orientation, url, action = PHOTO_ACTIONS.SHOW_PHOTO }) {
  const ref = React.useRef();
  const focus = useFocus(ref);
  const [isOpen, setOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (isOpen) {
      previewSrc().then(img => setPreviewImage(img.default))
    }
  }, [isOpen]);

  const imageTransitions = useTransition(isOpen, null, {
    from: { opacity: 0, transform: 'scale(0.2)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0.2)' },
  });

  const bcgTransitions = useTransition(isOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const captionTransitions = useTransition(focus, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  function handleOpen () {
    if (action === PHOTO_ACTIONS.SHOW_PHOTO) {
      setOpen(true);
      disableBodyScroll(document.querySelector('body'));
    } else {
      window.open(url, '_blank');
    }
  }

  function handleClose () {
    if (action === PHOTO_ACTIONS.SHOW_PHOTO) {
      setOpen(false);
      enableBodyScroll(document.querySelector('body'));
    }
  }

  return (
    <>
      {bcgTransitions.map(({ item, key, props }) =>
        item && (
          <>
            <CloseButton
              key={`${key}_1`}
              style={props}
              onClick={handleClose}
            >
              <UseAnimations
                animationKey="plusToX"
                size={56}
                style={{ transform: 'rotate(45deg)' }}
              />
            </CloseButton>
            <OpenBackground key={`${key}_2`} style={props}/>
          </>
        )
      )}
      {imageTransitions.map(({ item, key, props }) =>
        item && (
          <OpenContainer key={key} style={props}>
            <OpenedImage
              alt={caption}
              src={previewImage}
            />
          </OpenContainer>
        )
      )}
      <Container size={size} customStyles={styles} ref={ref} key={src} onClick={handleOpen}>
        {captionTransitions.map(({ item, key, props }) =>
          item && (
            <FocusWrapper key={key} style={props}>
              <MaximizeBtn
                animationKey="maximizeMinimize"
                size={20}
              />
              <Caption>{caption}</Caption>
            </FocusWrapper>
          )
        )}
        <Loading animationKey="loading" />
        <Image
          isFocused={focus && caption}
          blur={caption}
          portrait={orientation === 'portrait'}
          alt={caption}
          src={src}
        />
      </Container>
    </>
  )
}

const Container = styled.div`
  cursor: pointer;
  position: relative;
  mix-blend-mode: exclusion;
  color: ${props => props.theme.dark};
  width: ${props => (props.size || 300) + 'px'};
  height: ${props => (props.size || 300) + 'px'};
  overflow: hidden;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  margin: 10px;
  ${props => props.customStyles};
`;

const Image = styled.img`
  ${props => props.portrait ? 'width: 100%' : 'height: 100%'};
  transition: 0.6s all ease;
  ${props => props.isFocused ? 'transform: scale(1.1); filter: blur(4px) grayscale(1) brightness(0.5)' : ''};
  ${Container}:hover & {
    transform: scale(1.1);
    filter: ${props => props.blur ? 'blur(4px) grayscale(1) brightness(0.5)' : 'brightness(1.3)'};
  }
`;

const Loading = styled(UseAnimations)`
  position: absolute;
  left: 0; 
  right: 0; 
  top: 0;
  bottom: 0;
  width: 60px !important;
  height: 60px;
  margin: auto;
  color: ${props => props.theme.lightText};
`;

const FocusWrapper = styled(animated.div)`
  z-index: 4;
`;

const MaximizeBtn = styled(UseAnimations)`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 4;
  color: ${props => props.theme.light};
`;

const Caption = styled.span`
  z-index: 4;
  position: absolute;
  top: 35%;
  left: 0;
  right: 0;
  font-size: 1.1em;
  font-weight: bold;
  text-align: center;
  color: ${props => props.theme.lightText};
`;

const OpenContainer = styled(animated.div)`
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 4;
  display: flex;
  justify-content: center;
`;

const OpenBackground = styled(animated.div)`
  background: ${props => props.theme.dark};
  position: fixed;
  z-index: 2;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const CloseButton = styled(animated.button)`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 5;
  color: ${props => props.theme.lightText};
`;

const OpenedImage = styled.img`
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

export default Photo;