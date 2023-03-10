import styled from "@emotion/styled";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { colors } from "../colors";

const CategoryContainer = styled.div`
	width: 15%;
	min-height: 100%;
	padding: 2rem;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	background: ${colors.bgSecondary};
	color: ${colors.textSecondary};
	border-radius: 0 0.7rem 0 0;
`;
const CategoryItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;
const CategoryTitle = styled.div`
	font-size: 1.5rem;
`;
const ListContainer = styled.div`
	margin-top: 0.5rem;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;
const ListItem = styled.div`
	font-size: 1.15rem;
	display: flex;
	align-items: center;
	gap: 0.2rem;
	padding: 0.1rem;
	border-radius: 0.3rem;
	cursor: pointer;
	&.active {
		background: ${colors.bgPrimary};
	}
	&:hover {
		background: ${colors.bgPrimary};
	}
`;

export default function Category() {
	return (
		<CategoryContainer>
			<CategoryItem>
				<CategoryTitle>Category 1</CategoryTitle>
				<ListContainer>
					<ListItem>
						<AiOutlineUnorderedList />
						<span>List 1</span>
					</ListItem>
					<ListItem className="active">
						<AiOutlineUnorderedList />
						<span>List 2</span>
					</ListItem>
				</ListContainer>
			</CategoryItem>
			<CategoryItem>
				<CategoryTitle>Category 2</CategoryTitle>
				<ListContainer>
					<ListItem>
						<AiOutlineUnorderedList />
						<span>List 3</span>
					</ListItem>
					<ListItem>
						<AiOutlineUnorderedList />
						<span>List 4</span>
					</ListItem>
					<ListItem>
						<AiOutlineUnorderedList />
						<span>List 5</span>
					</ListItem>
				</ListContainer>
			</CategoryItem>
			<CategoryItem>
				<CategoryTitle>Category 3</CategoryTitle>
				<ListContainer>
					<ListItem>
						<AiOutlineUnorderedList />
						<span>List 5</span>
					</ListItem>
				</ListContainer>
			</CategoryItem>
		</CategoryContainer>
	);
}
