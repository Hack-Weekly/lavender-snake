import styled from "@emotion/styled";
import {AiOutlineUnorderedList} from "react-icons/ai"

const CategotryContainer = styled.div`
    width: 15%;
    min-height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: #F4F4F4;
`
const CategoryItem = styled.div`

`
const CategoryTitle = styled.div`
    font-size: 1.5rem
`
const ListContainer = styled.div`
    margin: 0.4rem 0 0 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`
const ListItem = styled.div`
    font-size: 1.15rem;
    display: flex;
    align-items: center;
    gap: 0.2rem;
    padding: 0.1rem;
    border-radius: 0.3rem;
    cursor: pointer;
    &.active{
        background: #D5D5D5;
    }
    &:hover{
        background: #BDBDBD;
    }

`

export default function Category() {
    return (
        <CategotryContainer>
            <CategoryItem>
                <CategoryTitle>Category 1</CategoryTitle>
                <ListContainer>
                    <ListItem><AiOutlineUnorderedList /><span>List 1</span></ListItem>
                    <ListItem className="active"><AiOutlineUnorderedList /><span>List 2</span></ListItem>
                </ListContainer>
            </CategoryItem>
            <CategoryItem>
                <CategoryTitle>Category 2</CategoryTitle>
                <ListContainer>
                    <ListItem><AiOutlineUnorderedList /><span>List 3</span></ListItem>
                    <ListItem><AiOutlineUnorderedList /><span>List 4</span></ListItem>
                    <ListItem><AiOutlineUnorderedList /><span>List 5</span></ListItem>
                </ListContainer>
            </CategoryItem>
            <CategoryItem>
                <CategoryTitle>Category 3</CategoryTitle>
                <ListContainer>
                    <ListItem><AiOutlineUnorderedList /><span>List 5</span></ListItem>
                </ListContainer>
            </CategoryItem>
        </CategotryContainer>
    );
}