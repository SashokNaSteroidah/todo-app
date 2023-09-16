import logo from '/logo.png'
import {TodoList} from "./components/TodoList";
import './style/style.sass'
import {TodoRemainder} from "./components/TodoRemainder";

export const App = () => {

    return (
        <main>
            <section>
                <img className="logo" src={logo} alt="logo "/>
                <TodoList/>
                <TodoRemainder />
            </section>
        </main>
    )
}

