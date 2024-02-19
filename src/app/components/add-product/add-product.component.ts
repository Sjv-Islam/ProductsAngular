import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../Models/product-category';
import { Product } from '../../Models/product';
import { ProductCategoryService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  public productCategoryList: ProductCategory[] = [];
  public model!: ProductCategory;

  constructor(private service: ProductCategoryService, private router: Router) {

  }
  ngOnInit(): void {



    this.model = new ProductCategory();

  }


  OnSubmit() {

    let test: string = '';
    alert(JSON.stringify(this.model));


    this.service.SaveProductCategory(this.model).subscribe({
      next: () => {
        this.router.navigate(['/list']);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }



  AddProduct() {

    this.model.products.push(new Product());
  }

  DeleteProduct(index: number) {
    //let exp = this.model.experiences.at(index);

    const remItem = this.model.products.splice(index, 1);
    console.log(`Removed Items: ${remItem[0].name}`);
  }
}
