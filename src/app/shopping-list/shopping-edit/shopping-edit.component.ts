import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('frm', {static: false}) slFrm: NgForm;
  constructor(private slService: ShoppingListService) { }
  private editSubscription: Subscription;
  editMode = false;
  editedItemIdx:number;
  editedItem:Ingredient;

  ngOnInit(): void {
    this.editSubscription = this.slService.startedEditing.subscribe(
      (idx: number) => {
        this.editMode = true;
        this.editedItemIdx = idx;
        this.editedItem = this.slService.getIngredient(idx);
        this.slFrm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onSubmit(frm: NgForm) {
    const values = frm.value
    const newIngredient = new Ingredient(values.name,values.amount);
    if(this.editMode) {
      this.slService.updatedIngredient(this.editedItemIdx, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }

    this.onClear();
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }

  onClear() {
    this.slFrm.reset();
    this.editMode = false;
    this.editedItem = null;
    this.editedItemIdx = null;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIdx);
    this.onClear();
  }
}
