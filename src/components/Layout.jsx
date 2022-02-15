import react from 'react';
import style from './style.module.scss';
import Timer from './Timer';
import Search from './Search';
import Navigator from './Navigator';

export default class Main extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      useBlur: false,
      showNavigator: false,
    }
  }
  // 切换搜索与导航
  changeItems() {
    this.setState({
      showNavigator: !this.state.showNavigator,
    });
    this.changeBlur(!this.state.showNavigator);
  }
  // 切换背景
  changeBlur(status) {
    this.setState({
      useBlur: status,
    })
  }
  render() {
    return (
      <div>
        <div className={ style['main-container'] }>
          <div className={ style['timer-container'] }>
            <Timer
              change={ this.changeItems.bind(this) }
            />
          </div>
          <div className={ style['item-container'] }>
            { // 搜索框与导航栏切换
              this.state.showNavigator ?
                <Navigator/> :
                <Search
                  change={ this.changeBlur.bind(this) }
                /> 
            }
          </div>
        </div>
        {/* 要使用高斯模糊滤镜所以把背景图片独立出来了qwq */}
        <div className={ `${style['background']} ${this.state.useBlur && style['blur']}` }></div>
      </div>
    );
  }
}