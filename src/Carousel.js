import React, {useEffect, useState, useCallback, useRef} from "react";
import styled from "styled-components";
import { left, right } from "./Icons";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(242, 242, 242, 1);
  padding: 20px 0;
`;

const SlidesContainer = styled.div`
  display: flex;
  width: 800px;
  overflow: hidden;
  padding: 0 5px;
`;

const Button = styled.button`
  color: rgba(17, 17, 17, 0.4);
  background-color: transparent;
  padding: 0 10px;
  border: 0;
  display: block;
  align-self: stretch;
`;

function Carousel(props) {

    const [cursor, setCursor] = useState(0);
    const [jump, setJump] = useState(false);
    const ref = useRef();
    const [animating, setAnimating] = useState(false);
    const mounted = useRef();
    const { children } = props;
    const count = React.Children.count(children);
    const style = {
        display: "flex",
        transition: jump ? "none" : "all 200ms ease",
        transform: `translateX(-${(count + cursor) * 250}px)`
      };

    const onTransitionEnd = useCallback(() => {
        const { children } = props;
        const count = React.Children.count(children);

        setAnimating(false)

        if (cursor >= count) {
            setJump(true)
            setCursor(0)
        }

        if (cursor <= -1) {
            setJump(true)
            setCursor(count - 1)
            }
    }, [props, cursor]);


    useEffect(() => {
        const currentRef =  ref.current;

        if (!mounted.current) {
            currentRef.addEventListener("transitionend", onTransitionEnd);
            mounted.current = true;
        } else {
            if (cursor !== children.length) {
                setAnimating(true);
              }
            if (jump) {
            setTimeout(() => {
                setAnimating(false);
                setJump(false)
            }, 1);
            }
        }
    
        // returned function will be called on component unmount 
        return () => {
        currentRef.removeEventListener("transitioned", onTransitionEnd);
        }
    }, [cursor, jump, children, onTransitionEnd])


     const changeCursor = amount => {
        if (animating) {
          return;
        }
        setCursor(prevState => prevState + amount);
      };

    const renderChildren = () => {
        const { children: childrenElements } = props;
        let children = React.Children.toArray(childrenElements);
        children = [].concat(children, children, children);

        return children.map((child, index) => {
         return React.cloneElement(child, { key: index });
    });
    }
    

    return (
        <Wrapper>
          <Button left onClick={() => { cursor >= children.length ?  changeCursor(-1) : setCursor(cursor -1)}}>{left}</Button>
          <SlidesContainer>
            <div style={style} ref={ref}>
              {renderChildren()}
            </div>
          </SlidesContainer>
          <Button onClick={() => { cursor <= children.length ?  changeCursor(1) : setCursor(0)}}>{right}</Button>
        </Wrapper>
      );
}

export default Carousel;


