import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks } from "../../actions";

import { map, is, contains, curry, reduce, toPairs, __, prop, equals, pipe, find, ifElse, F, identity } from 'ramda';
import { cloneChildren, Head, Content, easingFunctions, getElapsedTime, calcProgressVal, callFn, getNewStyles, setStyleToElement, setStylesToElement, pickFromRect, _findChildren, findChildrenOr, findChildren, findChildrenOrIdentity, getLastPositionStyles, states, openState, afterOpenState, closingState, isActiveState, isAfterOpenState, isClosingState, isOpenedState } from "../../helpers/modal";

class Modal extends React.Component {
  static Head = Head
  static Content = Content

  static defaultProps = {
    timingfunction: 'easeInOutCubic'
  }

  state = {
    styles: {},
    state: states.IDLE
  }

  constructor(props) {
    super(props)

    this._open = this._open.bind(this)
    this._close = this._close.bind(this)
    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
    this.createProps = this.createProps.bind(this)
    this.processCallback = this.processCallback.bind(this)
    this.closeDoneCallback = this.closeDoneCallback.bind(this)
    this.openDoneCallback = this.openDoneCallback.bind(this)

    this.clone = React.createRef()
    this.content = React.createRef()
  }

  animate({ from, to, loop, processCallback, doneCallBack }) {
    const elapsed = getElapsedTime(this.state.startDate)
    const progress = Math.min(elapsed / this.props.ms, 1)
    const styles = this.contentStyles
    
    const newStyles = getNewStyles({
      el: [ from, to ],
      progress,
      timingfunction: this.props.timingfunction
    })

    if (progress < 1) {
      callFn(processCallback, {
        styles,
        newStyles
      })

      requestAnimationFrame(loop)
    } else {
      callFn(doneCallBack, {
        styles,
        newStyles
      })
    }
  }

  processCallback({ styles, newStyles }) {
    setStylesToElement({
      ...newStyles,
      'max-width': `${newStyles.maxwidth}px`,
      height: `${newStyles.height}px`
    }, this.content.current)

    this.contentStyles = {
      ...styles,
      ...newStyles
    }
  }

  openDoneCallback({ styles, newStyles }) {
    this.setState({
      state: states.OPENED,
      styles: {
        ...styles,
        ...newStyles,
        left: '50%',
        top: '50%',
        transform: 'translate3d(-50%, -50%, 0)'
      }
    })
  }

  closeDoneCallback() {
    this.setState({
      state: states.IDLE,
      styles: {},
      bodyStyles: {}
    })
  }

  _open() {
    const { rect, state } = this.state

    if (state !== states.OPEN) return

    this.animate({
      from: rect,
      to: getLastPositionStyles(this.props),
      loop: this._open,
      processCallback: this.processCallback,
      doneCallBack: this.openDoneCallback
    })
  }

  _close() {
    const { cloneRect, rect } = this.state

    this.animate({
      from: rect,
      to: cloneRect,
      loop: this._close,
      processCallback: this.processCallback,
      doneCallBack: this.closeDoneCallback
    })
  }

  setStartData(state) {
    const startDate = performance.now()
    const cloneRect = pickFromRect(this.clone.current.getBoundingClientRect())
    const rect = pickFromRect(this.content.current.getBoundingClientRect())

    const styles = {
      maxwidth: rect.width,
      height: rect.height,
      top: 0,
      left: 0,
      transform: `translate3d(${rect.x}px, ${rect.y}px, 0)`
    }

    this.contentStyles = styles
    this.setState({
      ...state,
      cloneRect,
      startDate,
      rect,
      styles
    })
  }

  open() {    
    if (this.state.state !== states.IDLE) return

    this.setStartData({ state: states.OPEN })

    requestAnimationFrame(this._open)
  }

  close() {
    if (this.state.state === states.IDLE) return

    this.setStartData({
      state: this.state.state === states.OPEN
        ? states.IMMEDIATELY_CLOSE
        : states.CLOSE
    })

    requestAnimationFrame(this._close)
  }

  createProps(Component, props) {
    return {
      ...Component.props,
      modal: {
        ...props,
        isOpen: isActiveState(this.state.state),
        close: this.close
      }
    }
  }

  renderClone() {
    const Head = findChildrenOrIdentity(Modal.Head, this.props.children)

    return Head && isActiveState(this.state.state)
      ? <Head.type {...this.createProps(Head)}/>
      : null
  }

  renderHead() {
    const Head = findChildrenOrIdentity(Modal.Head, this.props.children)

    return Head
      ? <Head.type {...this.createProps(Head, { original: true })}/>
      : null
  }

  renderContent() {
    const Content = findChildren(Modal.Content, this.props.children)

    return Content && isOpenedState(this.state.state)
      ? <Content.type {...this.createProps(Content)}/>
      : null
  }

  getBackgroundStyle() {
    return {
      transition: `opacity ${this.props.ms / 4}ms ease-in-out`
    }
  }

  getContentStyle() {
    return {
      ...this.state.styles,
      transition: `box-shadow ${this.props.ms}ms ease-in-out`
    }
  }

  getContaninerClassNames() {
    const { state } = this.state
    return [
      'transform-modal__container',
      isActiveState(state) ? 'transform-modal__container--open' : '',
      isClosingState(state) ? 'transform-modal__container--closing' : '' 
    ].join(' ')
  }

  render() {
    return (
      <div className='transform-modal' {...this.props}>
        <div ref={this.clone}>
          {this.renderClone()}
        </div>
        <div className={this.getContaninerClassNames()}>
          <div
            className='transform-modal__background'
            onClick={this.close}
            style={this.getBackgroundStyle()}
          />
          <div
            className='transform-modal__content'
            style={this.getContentStyle()}
            onClick={this.open}
            ref={this.content}
          >
            {this.renderHead()}      
            {this.renderContent()}
          </div>
        </div>
      </div>
    )
  }
}

const images = [
  {
    id: 1,
    bg: 'https://images.unsplash.com/photo-1465765407776-61e63b99d10c?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=bc1d692696d6dc9f422fd89b2aaa1cd1',
    title: 'Winner #1',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.'
  },
  {
    id: 2,
    bg: 'https://images.unsplash.com/photo-1485286162995-aa63d31c06cb?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=edb0ee9e83e720444637907175b1b521',
    title: 'Winner #2',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.'
  },
  {
    id: 3,
    bg: 'https://images.unsplash.com/photo-1473346782721-d6cef5897f07?ixlib=rb-0.3.5&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=254be18c40b7520249b2b29f85e05fa4',
    title: 'Winner #3',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.'
  },
  {
    id: 4,
    bg: 'https://images.unsplash.com/photo-1516737347189-ed6ee46a4027?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=bcf69dbf1cf03001f85e570f09237baa',
    title: 'Winner #4',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.'
  },
  {
    id: 5,
    bg: 'https://images.unsplash.com/photo-1516419591857-14c5e8ce3a6e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=a7dc46f376e7dd7650884f1314712c5c',
    title: 'Winner #5',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.'
  },
  {
    id: 6,
    bg: 'https://images.unsplash.com/photo-1520405231068-ff009f727fe6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ&s=4dea33bfbf12e317d9966179cdc14188',
    title: 'Winner #6',
    text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.'
  }
]

const ImageHead = ({ title, bg, modal: { isOpen, original, close } }) => (
  <div className={`image ${isOpen & original ? 'image--active' : ''}`} style={{ }}>
    <div className='image__bg' style={{ backgroundImage: `url(${bg})` }}/>
    <div className='image__content'>
      {
        isOpen & original
          ? <button className='image__close' onClick={close}>&#10006;</button>
          : null
      }
      <h2>{title}</h2>
    </div>
  </div>
)

const ImageContent = ({ title, text }) => (
  <div className='image-content'>
    <h3>{title}</h3>
    <p>{text}</p>
  </div>
)

const ImageModal = item => (
  <div key={item.id} className='grid__item'>
    <Modal
      maxwidth={700}
      maxheight={500}
      ms={500}
    >
      <Modal.Head>
        <ImageHead {...item}/>
      </Modal.Head>
      <Modal.Content>
        <ImageContent {...item}/>
      </Modal.Content>
    </Modal>
  </div>
)

const ImageModalList = ({ images }) => map(ImageModal, images)

const Layout = ({ children }) => (
  <React.Fragment>
    <div className="title">
      <h1>ReactJS Book Library</h1>
    </div>
    {children}
    <div className="credits">Created with <span className="love"></span> by <a href="https://github.com/ElishaKay?tab=repositories">Elisha Kramer</a></div>
  </React.Fragment>
)


class BooksIndex extends Component {
  componentDidMount() {
    this.props.fetchBooks();
  }

  renderBooks() {
    console.log(this.props.books);
    return _.map(this.props.books, book => {
      return (
        <li className="list-group-item" key={book.id}>
          <Link to={`/books/${book.id}`}>
            {book.title}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/books/new">
            Add a Book
          </Link>
        </div>
        <h3>Books</h3>
        <ul className="list-group">
          {this.renderBooks()}
        </ul>
        <Layout>
          <div className='grid'>
            <ImageModalList images={images}/>
          </div>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { books: state.books };
}

export default connect(mapStateToProps, { fetchBooks })(BooksIndex);
