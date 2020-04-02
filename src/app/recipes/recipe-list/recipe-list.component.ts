import { Component, OnInit, EventEmitter, Output, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  //@Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipesChangedSubs:Subscription;

  recipes: Recipe[];
  constructor(private service: RecipeService,
    private router: Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.recipesChangedSubs = this.service.recipesChanged.subscribe(
      (recipes:Recipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.service.getAllRecipes();
  }

  ngOnDestroy() {
    this.recipesChangedSubs.unsubscribe();
  }

  onRecipeSelected(recipe:Recipe) {
    //this.recipeWasSelected.emit(recipe);
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
