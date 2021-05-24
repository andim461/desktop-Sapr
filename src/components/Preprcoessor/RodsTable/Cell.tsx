import React from "react";
import { Form, InputNumber } from "antd";

interface Props {
	children: React.ReactElement;
	editing: boolean;
	dataIndex: string;
	title: string;
	index: number;
	rod: $Rod;
}

const EditableCell = ({ editing, dataIndex, title, index, children, rod, ...restProps }: Props) => {
	const isInputRowIndexColumn = dataIndex === "index" && rod.index === 0;
	return (
		<td {...restProps}>
			{editing && !isInputRowIndexColumn ? (
				<Form.Item
					style={{ marginBottom: 0 }}
					name={dataIndex}
					rules={[
						{
							type: "number",
							message: "Введите числовое значение",
							whitespace: false,
						},
						{ required: true, message: "Обязательное поле" },
						{
							validator: (_, value) => {
								if (value <= 0 && dataIndex !== "q") {
									return Promise.reject("Введите значение больше нуля");
								} else return Promise.resolve();
							},
						},
					]}>
					<InputNumber />
				</Form.Item>
			) : (
				children
			)}
		</td>
	);
};

export default EditableCell;
