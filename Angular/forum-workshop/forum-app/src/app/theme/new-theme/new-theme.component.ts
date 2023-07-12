import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.css']
})
export class NewThemeComponent {


  constructor(private apiService: ApiService, private router: Router) {}

  addTheme(themeName: string, themeText: string): void {

    this.apiService.addTheme(themeName, themeText);
    this.router.navigate(['/themes']);
  }

}
