import react from 'react';
import style from '../style.module.scss';

export default class Main extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      blur: false
    }
  }
  changeBlur(status) {
    this.setState({
      blur: status,
    })
  }

  render() {
    return (
      <div>
        <div className={ style['main-container'] }>
          <button onClick={ () => this.changeBlur(!this.state.blur) }>{ this.state.blur ? 'Unblur' : 'Blur' }</button>
          
        </div>
        <div className={ `${style['background']} ${this.state.blur ? style['blur'] : ''}` }></div>
      </div>
    );
  }
}