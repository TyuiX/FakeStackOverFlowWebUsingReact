import React from 'react';
import Model from '../models/model.js';
let x = new Model();
let n = 0;
let q =0;
let anstemp = x.data.questions[1].answers[0];
x.data.questions[1].answers[0] = x.data.questions[1].answers[1];
x.data.questions[1].answers[1] = x.data.questions[1].answers[2];
x.data.questions[1].answers[2] = anstemp;
export default class FakeStackOverflow extends React.Component {
  constructor(props){
    super(props);
    this.displayQuestions = this.displayQuestions.bind(this);
    this.render = this.render.bind(this);
    this.state = ({html: <this.displayQuestions></this.displayQuestions>, tabcolor: {question: "#0281E8" , tags: "#DDDDDD"}, error: [], qref: null});
    this.askQuestionPage = this.askQuestionPage.bind(this);
    this.ChangeToaskQuestionPage = this.ChangeToaskQuestionPage.bind(this);
    this.ChangeTodisplayQuestions = this.ChangeTodisplayQuestions.bind(this);
    this.askQuestInputs = {title: '', text: '', tags: '', username: ''}
    this.tagmap = new Map();
    x.intTagMap(this.tagmap);
    this.postquestion = this.postquestion.bind(this);
    this.answerquestion = this.answerquestion.bind(this);
    this.handleAnswerBtn = this.handleAnswerBtn.bind(this);
    this.tagpage = this.tagpage.bind(this);
    this.goToTag = this.goToTag.bind(this);

  }
  render() {
    return (<div><div id="banner" className = "banner">
    <a id="quest" href="#quest" onClick = {this.ChangeTodisplayQuestions} style={{"backgroundColor" : this.state.tabcolor.question}}>Questions</a>
    <a  id = "tag" href="#tag " onClick = {this.goToTag}style={{"backgroundColor" : this.state.tabcolor.tags}}>Tags</a>
    <b className ="fake">Fake Stack OverFlow</b>
    <div id = "searchbar" className = "searchbar">
          <input id = "searchtext" type="text" name ="" placeholder="Search..." onKeyPress={this.handleSearchKeyPress.bind(this)}></input>
        </div></div>{this.state.html}</div>)
  }
  handleSearchKeyPress(event){
    if (event.key === "Enter"){
      console.log(event.target.value);
      this.searchMatch(event.target.value);
    }

  }
  goToTag(){
    this.setState(({html: <this.tagpage></this.tagpage>, tabcolor: {question: "#DDDDDD" , tags: "#0281E8"}}));

  }
  tagpage(){
    let alltags = []
    let counter = 0;
    let temprow = [];
    for (const i of x.data.tags){
      let tempstr;
      if (this.tagmap.get(i.tid).length == 1){
        tempstr = <p>{this.tagmap.get(i.tid).length} Question</p>
      }
      else{
        tempstr = <p>{this.tagmap.get(i.tid).length} Questions</p>
      }  
      temprow.push(<th id = "tagbox" key = {"tagP" + n} width = "33%"><a id = "tagname" onClick={() => this.getTagQ(i, this)}>{i.name}</a><br></br>{tempstr}</th>)
      n++;
      counter ++;
      if (counter == 3){
        alltags.push(<tr key = {"n" + n}>{temprow}</tr>)
        temprow = [];
        counter = 0;
      }
    }
    alltags.push(<tr key = {"n" + n}>{temprow}</tr>)
    return (<div><table width="100%" id = "QuestionListPage"><tbody>
    <tr height="100px" className = "tagHeader">
      <th id = "amountOftags">{x.data.tags.length} Tags</th>
      <th id = "tagheader" width ="80%" >All Tags</th>
      <th ><button id = "askbutton"><a id ="askbutton" onClick = {this.ChangeToaskQuestionPage} >Ask A Question</a></button></th>
    </tr></tbody>
    </table><table width="100%"><tbody>{alltags}</tbody></table></div>);
  }
  getTagQ(tag){
    let wantedTag = this.tagmap.get(tag.tid);
    let listOfQuestionsHtml = [];
    for (const i of x.data.questions){
      if (wantedTag.indexOf(i.qid) > -1){
        let z = (<tr id = "questionRow" key = {"question" + n.toString()}>
          <th>{i.views} Views<br></br>{i.answers.length} Answers</th>
          <th><a id = "title" onClick={() => this.viewTheQuestion(i, this)}>{i.title}</a><br></br><div id = "tags">{ListallTag(i)}</div></th>
          <th>Asked By {i.askedBy}<br></br>On {i.askedOn}<br></br>At {i.askedAt}</th>
        </tr>)
        listOfQuestionsHtml.push(z)
        n++;
      }
    }
    this.setState({html:<div><table width="100%" id = "QuestionListPage"><tbody>
    <tr height="100px" className = "tagHeader">
      <th>{this.tagmap.get(tag.tid).length} Questions</th>
      <th >Questions tagged [{tag.name}]</th>
      <th><button id = "askbutton"><a id ="askbutton" onClick = {this.ChangeToaskQuestionPage} >Ask A Question</a></button></th>
    </tr></tbody>
    </table><table width="100%"></table> <table id = "questionThreads" width = "100%"><tbody key = "listOfquest">{listOfQuestionsHtml}</tbody></table></div>});

    function ListallTag(questionId){
      let output = [];
      let count = 0;
      for (const y of questionId.tagIds){
        if (count == 3){
          output.push((<br></br>))
  
        }
        for (const z of x.data.tags){
          if (y == z.tid){
            let html = (<a id = "tag" key = {"tag" + q.toString()}>{z.name}</a>)
            count ++;
            output.push(html)
            q++;
            break;
          }
        }
      }
      n++;
      return <div>{output}</div>;
    }

  }
  displayQuestions() {
    let listOfQuestionsHtml = [];
    for (const i of x.data.questions){
      let z = (<tr id = "questionRow" key = {"question" + n.toString()}>
        <th>{i.views} Views<br></br>{i.answers.length} Answers</th>
        <th><a id = "title" onClick={() => this.viewTheQuestion(i, this)}>{i.title}</a><br></br><div id = "tags">{ListallTag(i)}</div></th>
        <th>Asked By {i.askedBy}<br></br>On {i.askedOn}<br></br>At {i.askedAt}</th>
      </tr>)
      listOfQuestionsHtml.push(z)
      n++;
    }
    return(
      <div>
      <table id =  "QuestionListPage"><tbody><tr>
        <th id = "amountquestion">{x.data.questions.length} Questions</th>  
        <th id = "questionHead">All Questions</th>
        <th><button id = "askbutton"><a id ="askbutton" onClick = {this.ChangeToaskQuestionPage} >Ask A Question</a></button></th>
        </tr>
        </tbody>
      </table>
      <table id = "questionThreads" width = "100%"><tbody key = "listOfquest">{listOfQuestionsHtml}</tbody></table>
      </div>);
    function ListallTag(questionId){
      let output = [];
      let count = 0;
      for (const y of questionId.tagIds){
        if (count == 3){
          output.push((<br></br>))
  
        }
        for (const z of x.data.tags){
          if (y == z.tid){
            let html = (<a id = "tag" key = {"tag" + q.toString()}>{z.name}</a>)
            count ++;
            output.push(html)
            q++;
            break;
          }
        }
      }
      n++;
      return <div>{output}</div>;
    }
  
    
  }
  getInputAsk(){
    this.askQuestInputs.title = this.title.value;
    this.askQuestInputs.text = this.text.value;
    this.askQuestInputs.tags = this.tags.value;
    this.askQuestInputs.username = this.username.value
  }
  searchMatch(searchString){
    let searchlist = searchString.split(" ");
    let matchedQuestion = [];
    if (searchString.replace(/\s/g,'') != ""){
      for (const i of x.data.questions){
        let condition = false;
        for (const j of searchlist){
          if (j.charAt(0) == "[" && j.charAt(j.length - 1) == ']'){
            let searchtag = j.substring(1, j.length - 1);
            searchtag = searchtag.toLowerCase();
            for (const z of x.data.tags){
              if (searchtag == z.name){
                searchtag = z.tid;
                condition = true;
                break;
              }
            }
            if (condition == true){
              for (const z of i.tagIds){
                if (searchtag == z){
                  condition = true;
                  break;
                }
                else{
                  condition = false;
                }
              }
            }
          }
          if (condition == true || i.text.toLowerCase().indexOf(j.toLowerCase()) > -1 || i.title.toLowerCase().indexOf(j.toLowerCase()) > -1){
            let z = (<tr id = "questionRow" key = {"seaquestion" + n.toString()}>
              <th>{i.views} Views<br></br>{i.answers.length} Answers</th>
              <th><div id = "title">{i.title}</div><br></br><div id = "tags">{ListallTag(i)}</div></th>
              <th>Asked By {i.askedBy}<br></br>On {i.askedOn}<br></br>At {i.askedAt}</th>
              </tr>);
            matchedQuestion.push(z)
            n++;
            break
          }
        }
      }
    }
    let size = matchedQuestion.length;
    if (matchedQuestion.length == 0){
      matchedQuestion = <tr><th>No Question Found</th></tr>
    }
    let matchedHtml = (<div><table width="100%" id = "QuestionListPage"><tbody>
    <tr height="100px" className = "searchheader">
      <th id = "amountquestion">{size} Questions</th>
      <th id = "questionHead">Search Results</th>
      <th ><button id = "askbutton"><a id ="askbutton" onClick = {this.ChangeToaskQuestionPage}>Ask A Question</a></button></th>
    </tr></tbody>
    </table><table id = "questionThreads" width = "100%"><tbody key = "listOfquest">{matchedQuestion}</tbody></table></div>);
    this.setState({html: matchedHtml, tabcolor: {question: "#DDDDDD" , tags: "#DDDDDD"}, error: []})
    function ListallTag(questionId){
      let output = [];
      let count = 0;
      for (const y of questionId.tagIds){
        if (count == 3){
          output.push((<br></br>))
  
        }
        for (const z of x.data.tags){
          if (y == z.tid){
            let html = (<a id = "tag" key = {"tag" + q.toString()}>{z.name}</a>)
            count ++;
            output.push(html)
            q++;
            break;
          }
        }
      }
      n++;
      return <div>{output}</div>;
    }

  }
  askQuestionPage(){
    
    return (<div id = "askanQuest">{this.state.error}
      <h2>Question Title </h2><label>Title should not be more than 100 characters</label><br></br>
      <input id = "title_input" placeholder = "No more than 100 characters and should not be empty." onChange={this.getInputAsk.bind(this)} ref = {(input) => this.title = input}></input>
      <h2>Question Text</h2>
      <label>Add Details</label><br></br>
      <textarea id = "text_input" placeholder ="Should not be empty" wrap = "virtual" onChange={this.getInputAsk.bind(this)} ref = {(input) => this.text = input}></textarea>
      <h2>Tags</h2>
      <label>Add Keywords seperated by whitespace.</label><br></br>
      <input id = "tag_input" placeholder ="tags..." onChange={this.getInputAsk.bind(this)} name = 'tags' ref = {(input) => this.tags = input}></input>
      <h2>Username</h2>
      <label>Should not be more than 15 character long</label><br></br>
      <input id = "username_input" placeholder ="username" onChange={this.getInputAsk.bind(this)} ref = {(input) => this.username = input}></input>
      <h3><button id = "postAnQuestionBtn" onClick={this.postquestion} ><a id = "postAnQuestionBtn">Post Question</a></button></h3></div>);
  }
  postquestion(){
    let errors = []
    let dateobj = new Date();
    let monthsArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
    let askOn = (monthsArray[dateobj.getMonth()]) + " " +  (dateobj.getDate()) + ", " + (dateobj.getFullYear())
    let atTime = (dateobj.getHours()) + ":" + (dateobj.getMinutes());
    let y = true;
    let tag = this.askQuestInputs.tags;
    tag = tag.split(" ")
    tag = tag.filter(word => word.length > 0 && word != " ");
    let username = this.askQuestInputs.username;
    if (username.length == 0){
      username = "anonymous"
    }
    if (this.askQuestInputs.title.length > 100 || this.askQuestInputs.title.length == 0){
      console.log(this.askQuestInputs.title.length)
      y = false;
      errors.push(<p key = {"title" + n}>The title is more than 100 characters or empty</p>)

    }
    if (this.askQuestInputs.text.length == 0){
      y = false;
      errors.push(<p key = {"text" + n}>The text is empty</p>)
    }
    if (this.askQuestInputs.tags.length == 0  || tag.length == 0){
      y = false;
      errors.push(<p key = {"taginput" + n}>Tag is empty</p>)
    }
    if (this.askQuestInputs.username.length > 15){
      y = false;
      errors.push(<p key = {"userInpu" + n}>The name is greater than 15</p>)
    }
    console.log(errors)
    if (y == true){
      x.addToQuestion(this.askQuestInputs.title, this.askQuestInputs.text, tag, username, askOn, atTime, this.tagmap);
      this.askQuestInputs = {title: '', text: '', tags: '', username: ''}
      this.setState(({html: <this.displayQuestions></this.displayQuestions>, tabcolor: {question: "#0281E8" , tags: "#DDDDDD"}, error: []}));
    }
    else{
      this.setState({html: <this.askQuestionPage></this.askQuestionPage>, tabcolor: {question: "#DDDDDD" , tags: "#DDDDDD"}, error: errors})
    }

  }
  ChangeTodisplayQuestions(){
    this.setState(({html: <this.displayQuestions></this.displayQuestions>, tabcolor: {question: "#0281E8" , tags: "#DDDDDD"}, error: []}));

  }
  ChangeToaskQuestionPage(){
    this.setState(({html: <this.askQuestionPage></this.askQuestionPage>, tabcolor: {question: "#DDDDDD" , tags: "#DDDDDD"}}));
  }
  viewTheQuestion(question){
    question.views += 1;
    let answerToQuestion = [];
    for (const i of question.answers){
      for (const j of x.data.answers){
        if (i == j.aid){
          let answer = (<tr key={"anstoQ" + n}><th width = "85%"><p>{j.text}</p></th><th><p>Ans By {j.ansBy}</p><p>On {j.ansOn}</p><p>At {j.ansAt}</p></th></tr>);
          answerToQuestion.push(answer);
          n++;
          break;

        }
      }

    }
    let questionHtml = (<div><table id =  "QuestionListPage"><tbody><tr>
    <th id = "amountquestion">{x.data.questions.length} Answers</th>  
    <th id = "questionHead" width ="100%">{question.title}</th>
    <th><button id = "askbutton"><a id ="askbutton" onClick = {this.ChangeToaskQuestionPage} >Ask A Question</a></button></th>
    </tr></tbody></table><table width="100%" className = "questionsecondrow"><tbody>
    <tr height="100px" className = "secondrow">
      <th id = "views">Views {question.views}</th>
      <th id = "context" width = "75%"><p>{question.text}</p></th>
      <th><p id = "askby" >Asked By {question.askedBy}</p><p id = "date">Asked On {question.askedOn}</p><p id = "time" >At {question.askedAt}</p></th>
    </tr></tbody>
    </table><table id = "questionThreads"><tbody>{answerToQuestion}</tbody></table><button id = "ansbtn" onClick={() => this.goToanswerquestion(question, this)}><a>Answer Question</a></button></div>)
    this.setState({html: questionHtml, tabcolor: {question: "#DDDDDD" , tags: "#DDDDDD"}});
  }
  answerquestion(){
    return (<div id = "askanQuest">{this.state.error}
    <h2>Answer Text</h2>
    <label>Add Details</label><br></br>
    <textarea id = "text_input" placeholder ="Should not be empty" wrap = "virtual" onChange={this.getInputAns.bind(this)} ref = {(input) => this.text = input}></textarea>
    <h2>Username</h2>
    <label>Should not be more than 15 character long</label><br></br>
    <input id = "username_input" placeholder ="username" onChange={this.getInputAns.bind(this)} ref = {(input) => this.username = input}></input>
    <h3><button id = "postAnQuestionBtn" onClick={this.handleAnswerBtn} ><a id = "postAnQuestionBtn">Post Answer</a></button></h3></div>);
  }
  goToanswerquestion(question){
    this.setState({html: <this.answerquestion></this.answerquestion>, tabcolor: {question: "#DDDDDD" , tags: "#DDDDDD"}, qref: question});

    
  }
  getInputAns(){
    this.askQuestInputs.text = this.text.value;
    this.askQuestInputs.username = this.username.value
  }
  handleAnswerBtn(){
    let errors = []
    let dateobj = new Date();
    let monthsArray = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec')
    let askOn = (monthsArray[dateobj.getMonth()]) + " " +  (dateobj.getDate()) + ", " + (dateobj.getFullYear())
    let atTime = (dateobj.getHours()) + ":" + (dateobj.getMinutes());
    let y = true;
    let username = this.askQuestInputs.username;
    if (username.length == 0){
      username = "anonymous"
    }
    if (this.askQuestInputs.text.length == 0){
      y = false;
      errors.push(<p key = {"text" + n}>The text is empty</p>)
    }
    if (this.askQuestInputs.username.length > 15){
      y = false;
      errors.push(<p key = {"userInpu" + n}>The name is greater than 15</p>)
    }
    if (y == true){
      x.addAnswer(this.state.qref, this.askQuestInputs.text, username, askOn, atTime, this.tagmap);
      this.askQuestInputs = {title: '', text: '', tags: '', username: ''}
      this.viewTheQuestion(this.state.qref)
      this.setState({qref: null});
    }
    else{
      this.setState({html: <this.answerquestion></this.answerquestion>, tabcolor: {question: "#DDDDDD" , tags: "#DDDDDD"}, error: errors})
    }


  }

  


}
