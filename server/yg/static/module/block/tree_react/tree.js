var React = require('react');
var reactRedux = require('react-redux');
require("./tree.css");
var ReactDOM = require('react-dom');
var Redux=require("redux");
var connect=reactRedux.connect,provider =reactRedux.Provider ;

var React = require('react');
var reactRedux = require('react-redux');
require("./tree.css");

var connect=reactRedux.connect,provider =reactRedux.Provider ;



var React = require('react');
var reactRedux = require('react-redux');
require("./tree.css");

var connect=reactRedux.connect,provider =reactRedux.Provider ;



//getInitialState()
//getDefaultProps()
//propTypes
//mixins
//statics
//componentWillMount()
//componentDidMount()
//componentWillReceiveProps(object nextProps)
//shouldComponentUpdate(object nextProps, object nextState)
//componentWillUpdate(object nextProps, object nextState)
//componentDidUpdate(object prevProps, object prevState)
//componentWillUnmount()
//component.forceUpdate()

var TreeItem=React.createClass({
    componentDidMount:function(e){
    },

    render:function(){
        var d=this.props.itemData.child;
        var itemClick=this.props.itemClick;
        var items= d.map(function(item,index){
            return (
                <li onClick={itemClick} className="position_r item">{item.text}</li>
            );
        });
        return (
            <li className="position_r item">

                <a onClick={itemClick} className="closed">{this.props.itemData.text}</a>
                <ul  className="items position_r">
                {items}
                </ul>
            </li>
        );
    }
})




var Tree = React.createClass({
    treeEntity:{
        html:""
        ,temp:""
    },

    createTree:function(data,itemClick){
        var treeEntity=this.treeEntity,r='', self=this.createTree;
        return data.map(function(item,index){
            if(item.child){
                var lic="position_r item expand "+item.text;
                return(<li className={lic} >
                    <a  onClick= {itemClick.bind(this)} >{item.text}</a>
                    <ul  className="items position_r">
                 {self(item.child,itemClick)}
                    </ul>
                </li>)
            }
            else{
                return (<li className={lic}  >
                    <a onClick= {itemClick.bind(this)}>{item.text}</a>
                </li>)
            }
        })
    },
    //itemClick:function(e){
    //    this.props.store.dispatch({ type: 1 })
    //    var ul=$(e.target).parent().find("ul");
    //    if( ul.children().length>0){
    //        ul.toggle(100);
    //        var t=ul.parent();
    //        t.hasClass("closed")?t.removeClass("closed").addClass("expand"):t.removeClass("expand").addClass("closed");
    //    }
    //      this.props.options.itemClick(e);
    //},
    //getInitialState: function(){
    //    return {
    //        states: this.props.store.getState()
    //    };
    //},
    componentDidMount: function(){
        //var stor= this.props.store;
        //var self=this;
        //this.props.store.sub(function(){
        //    var newState =  stor.getState();
        //    self.setState({
        //        states:stor.getState()
        //    });
        //});
    },
    render: function () {
        var d=this.props.itemData;

        var itemClick=this.props.onItemClick;
        var treehtml=this.createTree(d,itemClick);
        return (
            <div className="tree position_r"   >
                <span >{ this.props.todos.cc1}</span>
                <ul className="items position_r">
                {treehtml}
                </ul>
            </div>
        );
    }
});
const mapStateToProps =function (state) {

    return {
        todos:state
    }
}

const mapDispatchToProps = function(dispatch ,ownProps) {
    return {
        onItemClick: function(e){
            dispatch({ type: 1 })
            var ul=$(e.target).parent().find("ul");
            if( ul.children().length>0){
                ul.toggle(100);
                var t=ul.parent();
                t.hasClass("closed")?t.removeClass("closed").addClass("expand"):t.removeClass("expand").addClass("closed");
            }
            ownProps.options.itemClick(e);
        }
    }
}

var Tree=connect(
    mapStateToProps,
    mapDispatchToProps
)(Tree);
module.exports =Tree;
