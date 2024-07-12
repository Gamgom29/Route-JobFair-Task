import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource,} from '@angular/material/table';
import { CustomersService } from '../../services/customers.service';
import { FilterPipe } from '../../pipes/filter.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit , AfterViewInit {

  constructor(private _CustomersService:CustomersService) { }

  displayedColumns: string[] = ['CustomerId', 'Name', 'TransId', 'Date' , 'Amount'];
  dataSource = new MatTableDataSource<customerTransaction>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  customers:any[] = [];
  transactions:any[] = [];
  filterObject:any = {name :'' , amount:null};
  customerDetails!:string;
  customerTransaction:any[] = [];
ngOnInit() {
    this.getData();
    this.dataSource.filterPredicate= (data,filter)=>{
      const filterPipe= new FilterPipe();
      return filterPipe.transform([data], JSON.parse(filter)).length > 0 ;
    };
}
  applyFilter(){
    this.dataSource.filter = JSON.stringify(this.filterObject);  }

  getData(){
    this._CustomersService.getCustomers().subscribe({
      next:res=>{
        console.log(res);
        this.customers = res.customers;
        this.transactions = res.transactions
        this.mergeArrays();
      }
    })
  }

  mergeArrays(){
    this.dataSource.data = this.customers.flatMap(cust=>{
      return this.transactions.filter(trans=>  trans.customer_id == cust.id ).map(trans=>({
        CustomerId: cust.id,
        Name: cust.name,
        TransId: trans.id,
        Date: trans.date,
        Amount: trans.amount,
      }))
    })
  } 

  filterCustomersForCharts(){
    console.log(this.customerDetails);
    this.customerTransaction = this.transactions.filter(trans=>trans.customer_id == this.customerDetails);
    console.log(this.customerTransaction);
  }

}


export interface customerTransaction {
  CustomerId: number;
  Name: string;
  TransId: number;
  Date: number;
  Amount: number;
}


