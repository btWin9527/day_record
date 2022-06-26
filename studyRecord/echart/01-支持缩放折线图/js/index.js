// import * as echarts from 'echarts';

// 获取canvas dom节点
let chartDom = document.getElementById('main');
// 初始化echarts
let myChart = echarts.init(chartDom);
// 配置项
let option;

/* 渲染数据部分 */
let base = +new Date(2016, 9, 3);
let oneDay = 24 * 3600 * 1000;
let valueBase = Math.random() * 300;
let valueBase2 = Math.random() * 50;
let data = [];
let data2 = [];
for (let i = 1; i < 10; i++) {
  let now = new Date((base += oneDay));
  let dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-');
  valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase);
  valueBase <= 0 && (valueBase = Math.random() * 300);
  data.push([dayStr, valueBase]);
  valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2);
  valueBase2 <= 0 && (valueBase2 = Math.random() * 50);
  data2.push([dayStr, valueBase2]);
}

/* 参数配置 */
option = {
  // 图标标题
  title: {
    // 对齐方式
    left: 'center',
    // 标题文案
    text: 'Tootip and dataZoom on Mobile Device'
  },
  // 图例
  legend: {
    // 对齐方式
    top: 'bottom',
    //
    data: ['Intention']
  },
  // 提示框
  tooltip: {
    // 触发类型（item|axis）
    trigger: 'item',
    position: function (pt) {
      return [pt[0], 130];
    }
  },
  toolbox: {
    left: 'center',
    itemSize: 25,
    top: 55,
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {}
    }
  },
  // x轴
  xAxis: {
    type: 'time',
    axisPointer: {
      value: '2016-10-7',
      snap: true,
      lineStyle: {
        color: '#7581BD',
        width: 2
      },
      label: {
        show: true,
        formatter: function (params) {
          return echarts.format.formatTime('yyyy-MM-dd', params.value);
        },
        backgroundColor: '#7581BD'
      },
      handle: {
        show: true,
        color: '#7581BD'
      }
    },
    splitLine: {
      show: false
    }
  },
  // y轴
  yAxis: {
    type: 'value',
    axisTick: {
      inside: true
    },
    splitLine: {
      show: true
    },
    axisLabel: {
      inside: true,
      formatter: '{value}\n'
    },
    z: 10
  },
  // 网格
  grid: {
    top: 110,
    left: 15,
    right: 15,
    height: 160
  },
  // 区域缩放
  dataZoom: [
    {
      type: 'inside',
      throttle: 50
    }
  ],
  // 数据集
  series: [
    {
      name: 'Fake Data',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 5,
      sampling: 'average',
      itemStyle: {
        color: '#0770FF'
      },
      stack: 'a',
      data: data
    },
    {
      name: 'Fake Data',
      type: 'line',
      smooth: true,
      stack: 'a',
      symbol: 'circle',
      symbolSize: 5,
      sampling: 'average',
      itemStyle: {
        color: '#F2597F'
      },
      data: data2
    }
  ]
};

option && myChart.setOption(option);
