import React from 'react';

import './index.css';

const chatClient = () => {
    return(
        <div className='container-fluid'>
        <div className="row justify-content-center">
            <div className="card col-sm-10 col-md-10 col-xs-10 cardChatStyle d-flex">

                <h3>Atendimento em Andamento</h3>



                <div className="cardChat">
                
                <div className="card-header cardHeader">
                    <p>#15156 - Franquia</p>
                </div>

                <div className="cardBody">
                
                    <div className="contentChat">

                    </div>

                </div>
                
                <div className="card-footer cardChatFooter">
                
                    <div className="contentTypeChat">
                        <input type="text" name="textchat" className="form-control inputChat" placeholder="Digite uma Mensagem" />
                    </div>

                </div>

                
                </div>

            </div>
        </div>
    </div>
    );
    
}

export default chatClient;
