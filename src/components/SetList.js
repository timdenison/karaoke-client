import DraggableList from 'react-draggable-list'
import SongDraggable from './SongDraggable';
import PropTypes from 'prop-types';
import SingerSetList from './SingerSetList';
import Song from '../models/song';
import StageName from './StageName';
import NewSong from './NewSong';
import Button from '../common/Button';
import { Redirect } from 'react-router';


import * as SongUtils from '../utils/songUtils';

var React = require('react');


class SetList extends React.Component {
    
    constructor(props){
        super(props);
        this.state = { rawSongList: null, songList: null, addSong: false }
        this.addSongToList = this.addSongToList.bind(this);

    };

    componentWillMount(){
        SongUtils.getSessionSongs(this.props.sessionId).then((response) => this.setState({rawSongList: response}));
    }

    onListChange(newList){
        const newListWithOrder = newList.map(s => ({ ...s, order: newList.indexOf(s) }));
        this.updateSongOrder(newListWithOrder);
    }
    getSongList(){
        var tempSongList = [];
        this.state.rawSongList.forEach(function(element) {
            tempSongList.push(new Song(element));
        }, this);
        return tempSongList;
    }
    addSongToList(){
        this.setState({addSong: true});
        
    }

    updateSongOrder(testList){
        SongUtils.updateSongOrder(testList).then(response => {this.reloadSongList()});
    }
    reloadSongList(){
        SongUtils.getSessionSongs(this.props.sessionId).then((response) => this.setState({rawSongList: response}));
    }
    
    
    render(){
        
        if (this.state.addSong) return <Redirect to='/AddSong' />
        var songList = this.state.rawSongList ? this.getSongList() : [];
        if(this.props.draggable){
            return (
                <div className="list-group">
                    <Button label="Add Song" onClick={this.addSongToList} />
                    <div>
                    <DraggableList list={songList} template={SongDraggable} itemKey="id" onMoveEnd={newList => this.onListChange(newList)}/>
                    </div>

                </div>

            )
    
        }
        else{
            return (
                <div>
                <Button label="Add Song" onClick={this.addSongToList} />
                <SingerSetList songs = {songList} itemKey="id"/>
                
                {/* <StageName sessionId={this.props.sessionId} stageNameList={["Peaches", "Cream", "Brian"]} /> */}
                </div>
            )
        }
        
    }

};
SetList.propTypes = {
    sessionId: React.PropTypes.number.isRequired,
    draggable: React.PropTypes.bool.isRequired
}

export default SetList;