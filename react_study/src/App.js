// import React from 'react';
// import logo from './logo.svg';
import React, {Component} from 'react';
import './App.css';
import TOC from './components/toc';
import ReadContent from './components/readcontent';
import CreateContent from './components/createcontent';
import UpdateContent from './components/updatecontent';
import Subject from './components/subject';
import Control from './components/control';

class App extends Component {
	//constructor 는 초기화. 먼저실행
	constructor(props){
		super(props);
		this.max_content_id = 3;
		this.state = {
			mode:'welcome',
			selected_content_id:2,
			subject:{title:'HTML', sub:'world wide web!'},
			welcome:{title:'welcome', desc:'hello react!'},
			contents:[
				{id:1, title:'HTML', desc:'HTML is for infomation.'},
				{id:2, title:'CSS', desc:'CSS is for Design.'},
				{id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
			]
		}
	}
	getReadContent() {
		var i = 0;
		while(i < this.state.contents.length){
			var data = this.state.contents[i];
			if(data.id === this.state.selected_content_id) {
				return data;
				break;
			}
			i = i + 1;
		}
	}
	getContent() {
		var _title, _desc, _article = null;
		if(this.state.mode === 'welcome'){
			_title = this.state.welcome.title;
			_desc = this.state.welcome.desc;
			_article = <ReadContent title={_title} desc={_desc}></ReadContent>;
		} else if(this.state.mode === 'read'){
			var _content = this.getReadContent();
			_article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
		} else if(this.state.mode === 'create') {
			_article = <CreateContent onSubmit={function(_title, _desc){
				//add content to this.state.contents
				this.max_content_id = this.max_content_id + 1;
				// push 이벤트로 crate 데이터 삽입
				// this.state.contents.push(
				// 	{id:this.max_content_id, title:_title, desc:_desc}
				// );

				// concat 이벤트로 crate 데이터 삽입
				// var _contents = this.state.contents.concat(
				// 	{id:this.max_content_id, title:_title, desc:_desc}
				// );
				// this.setState(
				// 	{contents:_contents}
				// );

				// from array 이벤트로 crate 데이터 삽입
				var newContents = Array.from(this.state.contents);
				newContents.push(
					{id:this.max_content_id, title:_title, desc:_desc}
				);
				this.setState(
					{
						contents:newContents,
						mode:'read',
						selected_content_id:this.max_content_id
					}
				);
			}.bind(this)}></CreateContent>;
		}else if(this.state.mode === 'update') {
			_content = this.getReadContent();
			_article = <UpdateContent data={_content} onSubmit={function(_id, _title, _desc){
				var _contents = Array.from(this.state.contents);
				var i = 0;
				while(i < _contents.length) {
					if(_contents[i].id === _id) {
						_contents[i] = {id:_id, title:_title, desc:_desc};
						break;
					}
					i = i + 1;
				}
				this.setState(
					{
						contents:_contents,
						mode:'read'
					}
				);
				console.log(_title, _desc);
			}.bind(this)}></UpdateContent>;
		}
		return _article;
	}
	render() {
		return (
			<div className="App">
				<Subject 
					title={this.state.subject.title} 
					sub={this.state.subject.sub}
					onChangePage={function(e){
						this.setState({
							mode:'welcome'
						});
					}.bind(this)}
				></Subject>
				<TOC 
				data={this.state.contents} 
				onChangePage={function(id){
					this.setState({
						mode:'read',
						selected_content_id:Number(id)
					});
				}.bind(this)}
				></TOC>
				<Control 
					onChangeMode={
						function(_mode){
							if(_mode === 'delete'){
								if(window.confirm('삭제하시겠습니까?')){
									var _contents = Array.from(this.state.contents);
									var i = 0;
									while(i < _contents.length){
										if(_contents[i].id === this.state.selected_content_id){
											_contents.splice(i,1);
											break;
										}
										i = i + 1;
									}
									this.setState({
										mode:'welcome',
										contents:_contents
									});
									alert('삭제되었습니다.');
								}
							} else {
								this.setState({
									mode:_mode
								});
							}
						}.bind(this)
					}
				></Control>
				{this.getContent()}
			</div>
		);
	}
}

export default App;
