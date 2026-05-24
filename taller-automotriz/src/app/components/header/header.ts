import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatMenuModule, MatDividerModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
