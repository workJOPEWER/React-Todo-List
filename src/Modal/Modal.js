import React from 'react';
import './Modal.css';

export default class Modal extends React.Component {
    state = {
        isOpen: false
    };

    render() {
        return (
            <>
                <button className='openBtnModel' onClick={() => this.setState({isOpen: true})}>Подробности</button>

                {this.state.isOpen && (
                    <div className='modal'>
                        <div className='modal-body'>
                            <h1>О списке дел ...</h1>
                            <p>Все просто!<br/> Прокачиваю скилл! =)</p>

                            <button className="closeBtn" onClick={() => this.setState({isOpen: false})}>X</button>
                        </div>
                    </div>
                )}
            </>
        )
    }
}

