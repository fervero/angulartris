import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GameService } from './game.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { WellComponent } from './well/well.component';
import { AsideComponent } from './aside/aside.component';
import { BrickComponent } from './brick/brick.component';
import { ModalComponent } from './modal/modal.component';
import { GameControlService } from './game-control.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WellComponent,
    AsideComponent,
    BrickComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GameService, GameControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
