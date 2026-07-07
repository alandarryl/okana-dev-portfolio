
export async function GET(){
    const res = await fetch('http://localhost:5000/todos');
    const todos = await res.json();

    return NextResponse.json(todos);
}

