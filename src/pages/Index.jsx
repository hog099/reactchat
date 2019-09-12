import React from 'react';

import './index.css';

const Index = () => {
    return (
        <div className='container-fluid'>
        <div className="row justify-content-center">
            <div className="card col-sm-12 col-md-6 col-xs-4 cardStyle d-flex">

                <h3>Solicitar Atendimento</h3>

                <div className="cardBody">
                    <form>
                        <input type="text" className="form-control" name="name" placeholder="Digite Seu Nome" required  />
                        <input type="text" className="form-control" name="nameSponsored" placeholder="Digite Nome da Franquia" required  />
                    </form>

                  <button type="submit" className="btn btn-primary btn-block btnlogin" >Acessar</button>

                  </div>

            </div>
            </div>
            </div>
    );
};

export default Index;
