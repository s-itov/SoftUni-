export default function Todo({
    _id,
    text,
    isCompleted,
    toggleTodoStatus,
    onDelete,
 }) {

    return (
        <tr key={_id} className={`todo ${isCompleted ? 'is-completed' : ''}`.trim()}>
            <td>{text}</td>
            <td>{isCompleted ? 'Completed' : 'inComplete'}</td>
            <td className="todo-action">
                <button className="btn todo-btn" onClick={() => toggleTodoStatus(_id)}>Change status</button>
                <button className="btn todo-btn" onClick={() => onDelete(_id)}>Delete</button>

            </td>
        </tr>
    );

}