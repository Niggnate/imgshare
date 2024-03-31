import styled from "styled-components";
import Card from "@/components/styles/card.ts";
import sprite from "@/components/styles/sprite.png"


const dummyStories = [
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "lindo",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "Soadfgafme",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "Sohfghme",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "Sojkjme",
    },
    {
        src: "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        username: "sdfj",
    },
]

const StoriesCard = styled(Card)`
    padding: 16px 0;
    margin-bottom: 24px;
    position: relative;
    .layout {
        height: 84px;
        display: flex;
        align-items: center;
        overflow-y: hidden;
        overflow-x: auto;
        -ms-overflow-style: none;
        scrollbar-width: none;
        &::-webkit-scrollbar {
          display: none;
        }
        .leftArrow,
        .rightArrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          /* z-index: 101; */
          width: 45px;
          height: 45px;
          cursor: pointer;
        }
    
        .leftArrow {
          background: url(${sprite}) no-repeat -379px -128px;
        }
    
        .rightArrow {
          right: 0;
          background: url(${sprite}) no-repeat -244px -107px;
        } 
    }
`

const DashtopStories = () => {
    return (
        <StoriesCard>
            <ul>
                now
            </ul>
        </StoriesCard>
    )
}

export default DashtopStories