import { Component, Input, input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent implements OnChanges {
  @Input() customerData!:any[];

  customerTransacion:{date:string , amount:number}[] = [];
  ngOnChanges(): void {
    this.customerTransacion = this.calculateDailyAmounts();
    console.log(this.customerTransacion);
    this.updateChart();
  }
  
  calculateDailyAmounts(){
  const totalsMap = this.customerData.reduce((acc,transaction)=>{
    const date = transaction.date;
    if(!acc[date]){
      acc[date] = 0;
    }
    acc[date] += transaction.amount;
    return acc;
  },{});

  return Object.keys(totalsMap).map(date=>({
    date,
    amount:totalsMap[date]
  }));
} 


lineChart = new Chart({
  chart:{type: 'line',},
  title:{text:'Customer Transaction Amounts by Date',},
  credits: {
    enabled: false
  },
  xAxis: { categories: [] },
  series:[
    {
      name: 'Total Amount',
      data: [],
      
    }as any,]
})

  updateChart(){
    const dates = this.customerTransacion.map(item=> item.date);
    const amounts = this.customerTransacion.map(item=> item.amount);
    this.lineChart.ref$.subscribe(chart=>{
      chart.xAxis[0].setCategories(dates);
      chart.series[0].setData(amounts);
    });
  }
}
