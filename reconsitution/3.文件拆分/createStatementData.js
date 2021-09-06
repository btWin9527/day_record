// 创建中间变量
export default function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;
    // 拷贝数据
    function enrichPerformance(aPerformance) {
        const result = Object.assign({}, aPerformance);
        // 安放play字段
        result.play = playFor(result);
        // 安放amount字段
        result.amount = amountFor(result);
        // 安放volumeCredits字段
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }

    // 获取play值
    function playFor(aPerformance) {
        return plays[aPerformance.playID];
    }

    // 抽离volumeCredits
    function volumeCreditsFor(aPerformance) {
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        if ("comedy" === aPerformance.play.type)
            result += Math.floor(aPerformance.audience / 5);
        return result;
    }

    // switch方法抽离
    function amountFor(aPerformance) {
        let result = 0;
        switch (aPerformance.play.type) {
            case "tragedy":
                result = 40000;
                if (aPerformance.audience > 30) {
                    result += 1000 * (aPerformance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (aPerformance.audience > 20) {
                    result += 10000 + 500 * (aPerformance.audience - 20);
                }
                result += 300 * aPerformance.audience;
                break;
            default:
                throw new Error(`unknown type: ${aPerformance.play.type}`);
        }
        return result;
    }

    //  移除totalAmount
    function totalAmount(data) {
        return data.performances.reduce((total, p) => total + p.amount, 0);
    }

    // 修改变量名
    function totalVolumeCredits(data) {
        return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
    }
}
