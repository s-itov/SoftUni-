import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.css'],
})
export class NewThemeComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  addTheme(addThemeForm: NgForm): void {
    const value: { themeName: string; postText: string } = addThemeForm.value;

    this.apiService.addTheme(value.themeName, value.postText);
    this.router.navigate(['/themes']);
  }
}
