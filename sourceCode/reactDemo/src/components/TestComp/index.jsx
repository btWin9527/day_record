import React from 'react';

function Index(props) {

    return (
        <div>
            <button onClick={()=> props.open('')}>打开</button>
            <button onClick={props.close}>关闭</button>
        </div>
    );
}

export default Index;