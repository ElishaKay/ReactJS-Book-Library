import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateBook, deleteBook  } from "../../actions";


class ImageContent extends Component {
  componentWillMount () {
    console.log('this.props in ImageContent Component: ',this.props)
    let {title, content, author, published } = this.props;
    this.props.initialize({ title, content, author, published});
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.updateBook({...values, id: this.props.id, img: this.props.img}, () => {
      this.props.modal.close();
    });
  }

  onDeleteClick() {
    this.props.deleteBook(this.props.id, () => {
      this.props.modal.close();
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
    <div className="container">
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
        <button className="btn btn-danger float-right deleteBook"
          onClick={this.onDeleteClick.bind(this)}
        >Delete</button>
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
})(connect(null, { updateBook,deleteBook })(ImageContent));
