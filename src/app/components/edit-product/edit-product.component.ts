import { Component } from '@angular/core';
import { ProductCategory } from '../../Models/product-category';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../Models/product';
import { ProductCategoryService } from '../../services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  public model!: ProductCategory;
  id!: number;

  constructor(private Service:ProductCategoryService, private router: Router, private route: ActivatedRoute) {

  }
  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.LoadData();


  }


  OnSubmit() {


    this.Service.UpdateProductCategory(this.model).subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  LoadData() {
    this.Service.GetProductCategory(this.id).subscribe((data: ProductCategory) => {
      this.model = data;
      console.log(data);
    }, (error: string) => {
      console.log('Observable emitted an error: ' + error);
    });
  }
  AddProduct() {

    this.model.products.push(new Product());
  }

  DeleteProduct(index: number) {

    const remItem = this.model.products.splice(index, 1);
  }

}

