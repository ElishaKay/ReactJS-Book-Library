import React from 'react';
import BooksNew from "../Books/BooksNew";

class ShowBook extends Component {
  console.log(this.props);
  state = { udpateBook: false };
  { title, text, published, author } = this.props;

  renderContent() {
    if (this.state.udpateBook) {
      return (
        <BooksNew
          onCancel={() => this.setState({ udpateBook: false })}
        />
      );
    }

    return (
      <div className='image-content'>
	    <h3>{title}</h3>
	    <h6>Author: {author}</h6>
	    <h6>Published: {published}</h6>
	    <p>{text}</p>

	    <button 
	    	className="btn btn-info pull-xs-right"
	    	onClick={this.setState({ udpateBook: true }}
	    >
	        Edit Book
	    </button>
	  </div>
    );
  }

  render() {
    return (
    	 <div>
	        {this.renderContent()}
	     </div>
    );
  }


  



export default 

-------------------


      return (
        <SurveyFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }

    return (
      <SurveyForm
        onSurveySubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return (
     
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);
