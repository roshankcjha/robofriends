import React,{ Component } from 'react';
import CardList from '../components/CardList';
import './App.css';
import SearchBox from '../components/SearchBox';
import { robots } from '../robots';//for multiple export we need to use {}
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
class App extends Component { 
    constructor(){//using constructors in order to understand implementation of states
        super();//to call the parent of component
        this.state = {
            robots: [],
            searchfield: '',
        }
    }
    componentDidMount(){
        fetch("https://jsonplaceholder.typicode.com/users").then(response=> response.json())
        .then(users =>this.setState({robots: robots}))
    }

    onSearchChange=(event)=> {
        this.setState({searchfield : event.target.value})
    }
    render(){
        const {robots,searchfield}=this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        return !robots.length ?
             <h1>Loading...</h1>
        
            : (
            <div className='tc'>
                <h1 className="f1">RoboFriends</h1>
                <SearchBox searchChange = { this.onSearchChange }/>
                <Scroll>
                    <ErrorBoundary >
                        <CardList robots = {filteredRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );   
    }
}
export default App;