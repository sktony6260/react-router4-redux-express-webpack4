import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from 'react-mixin';
import autoBindDecorator from 'autobind-decorator';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
export const classic = Component => {
  Component = autoBindDecorator(Component);
  Component = reactMixin.decorate(PureRenderMixin)(Component);
  return Component;
};

export const myConnect = (dataMaker = () => {}, actions = () => {}) => Component => {
  const mapStateToProps = state => ({data: dataMaker(state)});
  const mapDispatchToProps = dispatch => ({actions: bindActionCreators(actions, dispatch)});

  Component = connect(mapStateToProps, mapDispatchToProps)(Component);
  return Component;
};