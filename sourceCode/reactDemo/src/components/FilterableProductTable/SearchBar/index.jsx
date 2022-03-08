// 搜索条组件
function Index({onchangeInput, onchangeCheckbox}) {
    return (
        <div>
            <input
                type="text"
                onChange={(e) => onchangeInput(e)}/>
            <br/>
            <label htmlFor="chooseStockedId">
                <input
                    type="checkbox" id="chooseStockedId" name="stocked"
                    onChange={(e) => onchangeCheckbox(e)}/>
                Only show products in stock
            </label>
        </div>
    );
}

export default Index;