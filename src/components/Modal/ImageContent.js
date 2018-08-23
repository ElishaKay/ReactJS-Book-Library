import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { saveBook, deleteBook  } from "../../actions";


class ImageContent extends Component {
  componentWillMount () {
    let {initialize, title, content, author, published } = this.props;
    initialize({ title, content, author, published});
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="error-text">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    let {saveBook, id, img, modal: { close }} = this.props;
    saveBook({...values, id, img}, () => 
        close()
    );
  }

  onDeleteClick() {
    let {deleteBook, id, modal: { close }} = this.props;
    deleteBook(id, () => 
        close()
    );
  }

  render() {
    const { handleSubmit, newBook } = this.props;

    return (
    <div className="container book-form" >
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title For Book"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Author"
          name="author"
          component={this.renderField}
        />
        <Field
          label="Published"
          name="published"
          component={this.renderField}
        />
        <Field
          label="Book Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Save</button>      
      </form>
      { }
      {!newBook ? <button className="btn btn-danger float-right delete-book"
          onClick={this.onDeleteClick.bind(this)}
        >Delete</button> : ""}
    </div>
    );
  }
}

function validate(values) {
  // console.log(values) -> { title: 'asdf', categories: 'asdf', content: 'asdf' }
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a title";
  }
  if (!values.categories) {
    errors.categories = "Enter some categories";
  }
  if (!values.content) {
    errors.content = "Enter some content please";
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
  validate,
  form: "BooksNewForm"
})(connect(null, { saveBook,deleteBook })(ImageContent));
