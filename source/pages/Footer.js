import React, {Component} from 'react';


export class Footer extends Component {

    render() {
        return (
           <div className='footer'>
               <div className="links">
                   <a href="#" className='any-link'> Any first link</a>
                   <a href="#" className='any-link'> Any first link</a>
                   <a href="#" className='any-link'> Any first link</a>
               </div>
               <span>2018 © Все права защищены. Разработано с любовью&nbsp;<a href="https://lectrum.io/intensive/react" rel="noreferrer noopener" target="_blank">в Лектруме</a></span>
               <p className="social">
                   <a href="#" className='facebook'></a>
                   <a href="#" className='telegram'></a>
               </p>
           </div>
        )
    };
}


