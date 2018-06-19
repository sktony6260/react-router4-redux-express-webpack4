//webpack lazyload component
import React from 'react';
class Lazyload extends React.Component {
    
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.load(this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.load !== this.props.load) {
            this.load(nextProps)
        }
    }

    load = (props) => {
        this.setState({
            mod:null
        })

        props.load((mod) => {
            this.setState({
                mod:mod.default?mod.default:mod
            })
        })
    }

    render() {
        return this.props.children(this.state.mod)
    }
}
//webpack component lazying load
export const Loading = () => {
  return <div>loading component....</div>
}
export const lazyComponent = (component) =>() => {
  let AsyncComponent = (
    <Lazyload load={component}>
      {
        (Async) => Async?<Async />:null
      }
    </Lazyload>
  )
  return AsyncComponent
}