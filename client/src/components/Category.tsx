import styled from "@emotion/styled";
import { useState } from "react";
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
	@media (max-width: 660px) {
		display: none;
	}
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
	background: ${(item) => (item.active ? colors.bgPrimary : "inherit")};
	&:hover {
		background: ${colors.bgPrimary};
	}
`;

const categories = [
	{
		name: "Urgency",
		values: ["Urgent", "Normal"],
	},
	{
		name: "Task type",
		values: ["Study", "Housework", "Errands"],
	},
];

export default function Category() {
	const [selectedCategory, setSelectedCategory] = useState({
		category: "Urgency",
		value: "Normal",
	});

	return (
		<CategoryContainer>
			{categories.map((category) => (
				<CategoryItem>
					<CategoryTitle>{category.name}</CategoryTitle>
					<ListContainer>
						{category.values.map((val) => (
							<ListItem
								active={
									selectedCategory.category === category.name &&
									selectedCategory.value === val
								}
								onClick={() =>
									setSelectedCategory({
										category: category.name,
										value: val,
									})
								}
							>
								<AiOutlineUnorderedList />
								<span>{val}</span>
							</ListItem>
						))}
					</ListContainer>
				</CategoryItem>
			))}
		</CategoryContainer>
	);
}
