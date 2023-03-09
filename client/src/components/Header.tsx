import styled from "@emotion/styled";

const HeaderContainer = styled.div`
    display: flex;
    align-items: center;
    height: 3.5rem;
    padding-left: 1.2rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`

export default function Header(){
    return <HeaderContainer>
            <h1>To Do List, Lavender Snake</h1>
            
        </HeaderContainer>
}