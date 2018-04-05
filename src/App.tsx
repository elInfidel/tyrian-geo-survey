import * as React from 'react';
import './App.css';
import MapProvider from './Scenes/Map';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <MapProvider />
            </div>
        );
    }
}

export default App;
