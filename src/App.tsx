import logo from '/logo.png'
import {TodoList} from "./components/todoList/TodoList";
import './style/style.sass'

export const App = () => {

    return (
        <main>
            <section>
                <img className="logo" src={logo} alt="logo "/>
                <TodoList/>
            </section>
        </main>
    )
}

