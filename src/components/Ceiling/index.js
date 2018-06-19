import React from 'react';
import STYLE from './style';
const Ceiling = (title = 'Admin Tools') => {
  const newYork = moment().tz('America/New_York');
  const london = newYork.clone().tz('Europe/London');
  const sydney = newYork.clone().tz('Australia/Sydney');
  const date = [{
    label:'纽约时间',
    value:newYork.format('YYYY-MM-DD HH:mm:ss')
  },{
    label:'伦敦时间',
    value:london.format('YYYY-MM-DD HH:mm:ss')
  },{
    label:'悉尼时间',
    value:sydney.format('YYYY-MM-DD HH:mm:ss')
  }]
  return (
    <div id="dm-ceiling" className={STYLE['dm-ceiling-wrapper']}>
      <div className="dm-ceiling">
        <div className="dm-ceiling-layoutWrapper">
          <ul className="pull-left">
            {
              _.map(date, (item,index) => {
                return <li key={index}>{item.label} {item.value}</li>
              })
            }
          </ul>
          <ul className="pull-right">
            <li>Jason Chao</li>
            <li>|</li>
            <li><a href="#">后台主站</a></li>
            <li>|</li>
            <li><a href="javscript:;" onClick={ () => {alert('just for test')} }>logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Ceiling