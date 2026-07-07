

const todo = async ({ params }) => {
    const { id } = await params;

    return (
        <div>
            <h1>Todo Item</h1>
            <p>Todo ID: {id}</p>
        </div>
    );

}

export default todo;
