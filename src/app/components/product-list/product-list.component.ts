import { Component, OnInit } from '@angular/core';
import { Product } from '../../Models/product';
import { ProductCategoryService } from '../../services/products.service';
import { ProductCategory } from '../../Models/product-category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  data: ProductCategory[] = [];
  constructor(private service: ProductCategoryService) {

  }
  ngOnInit(): void {
    this.LoadData();
  }


  LoadData() {
    this.service.GetProductCategories().subscribe((response: ProductCategory[]) => {
      this.data = response;
      console.log(response);
    },
      (err: any) => {
        console.log(err);
      })


  }
  DeleteProduct(pro: ProductCategory) {
    let confirmDelete: boolean = confirm(`Delete ${pro.name}?`);
    if (confirmDelete) {
      this.service.DeleteProductCategory(pro.productCategoryID).subscribe(() => {
        this.LoadData();
      }, (error) => {
        console.log('Observable emitted an error: ' + error);
      });
    }
  }
}
