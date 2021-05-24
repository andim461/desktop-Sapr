import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const type = "DragableBodyRow";

interface Props {
	index: number;
	moveRow: (index: number, index2: number) => void;
	className: string;
	style: Record<string, string | number>;
}

const DragableBodyRow = ({ index, moveRow, className, style, ...restProps }: Props) => {
	const ref = useRef<HTMLTableRowElement>(null);
	const [{ isOver, dropClassName }, drop] = useDrop<
		{ index: number; type: string },
		void,
		{ isOver?: boolean; dropClassName?: string }
	>({
		accept: type,
		collect: monitor => {
			const { index: dragIndex } = monitor.getItem() || {};
			if (dragIndex === index) {
				return {};
			}
			return {
				isOver: monitor.isOver(),
				dropClassName: dragIndex < index ? " drop-over-downward" : " drop-over-upward",
			};
		},
		drop: item => {
			moveRow(item.index, index);
		},
	});
	const [, drag] = useDrag({
		item: { type, index },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	});
	drop(drag(ref));
	return (
		<tr
			ref={ref}
			className={`${className}${isOver ? dropClassName : ""}`}
			style={{ cursor: "move", ...style }}
			{...restProps}
		/>
	);
};

export default DragableBodyRow;
