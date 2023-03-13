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
	margin: 2rem;
	margin-top: -1rem;
	background: ${colors.bgSecondary};
	color: ${colors.textSecondary};
	border-radius: 1.2rem;
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
				<CategoryTitle>Urgency</CategoryTitle>
				<ListContainer>
					<ListItem>
						<AiOutlineUnorderedList />
						<span>Urgent</span>
					</ListItem>
					<ListItem className="active">
						<AiOutlineUnorderedList />
						<span>Normal</span>
					</ListItem>
				</ListContainer>
			</CategoryItem>
			<CategoryItem>
				<CategoryTitle>Task type</CategoryTitle>
				<ListContainer>
					<ListItem>
						<AiOutlineUnorderedList />
						<span>Study</span>
					</ListItem>
					<ListItem>
						<AiOutlineUnorderedList />
						<span>Housework</span>
					</ListItem>
					<ListItem>
						<AiOutlineUnorderedList />
						<span>Errands</span>
					</ListItem>
				</ListContainer>
			</CategoryItem>
		</CategoryContainer>
	);
}
