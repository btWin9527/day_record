// 演出计算器
class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  // 已抽离到子类中
  // get amount() {
  //   let result = 0;
  //   switch (this.play.type) {
  //     case "tragedy":
  //       result = 40000;
  //       if (this.performance.audience > 30) {
  //         result += 1000 * (this.performance.audience - 30);
  //       }
  //       break;
  //     case "comedy":
  //       result = 30000;
  //       if (this.performance.audience > 20) {
  //         result += 10000 + 500 * (this.performance.audience - 20);
  //       }
  //       result += 300 * this.performance.audience;
  //       break;
  //     default:
  //       throw new Error(`unknown type: ${this.performance.play.type}`);
  //   }
  //   return result;
  // }
  get amount() {
    throw new Error('subclass responsibility');
  }

  // volumeCredits计算操作
  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

// tragedy的子类
class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

// comedy的子类
class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    let result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }
  // volumeCredits计算拆分comedy类型
  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5);
  }
}

// 实例化子类
// 为演出计算 器创建子类，并在createStatementData中获取对应的子类。
// 要得到正确的子类， 我需要将构造函数调用替换为一个普通的函数调用，因为JavaScript的构造函数里 无法返回子类。
// 于是我使用以工厂函数取代构造函数
function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);
  }
  return new PerformanceCalculator(aPerformance, aPlay);
}

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
    const calculator = createPerformanceCalculator(
      aPerformance,
      playFor(aPerformance)
    );
    const result = Object.assign({}, aPerformance);
    // 安放play字段
    result.play = calculator.play;
    // 安放amount字段
    result.amount = amountFor(result);
    // 安放volumeCredits字段
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }

  // 获取play值
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  // switch方法抽离
  function amountFor(aPerformance) {
    return createPerformanceCalculator(aPerformance, playFor(aPerformance))
      .amount;
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
