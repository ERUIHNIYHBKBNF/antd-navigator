import react from 'react';
import style from '../style.module.scss';
import Timer from './Timer';

export default class Main extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      blur: false
    }
  }
  changeBlur() {
    this.setState({
      blur: !this.state.blur,
    })
  }

  render() {
    return (
      <div>
        <div className={ style['main-container'] }>
          <div className={ style['timer-container'] }>
            <Timer
              change={ this.changeBlur.bind(this) }
            />
          </div>
          <div className={ style['item-container'] }>
            <div>qwq</div>
          </div>
        </div>
        <div className={ `${style['background']} ${this.state.blur ? style['blur'] : ''}` }></div>
      </div>
    );
  }
}